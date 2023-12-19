import { useRecoilState } from "recoil";
import { chatAtom } from "../atom/chat";
import { useState } from "react";
import { IChat } from "../types/types";
import makeRequest from "../utils/api";

const Chat = () => {
    const [_showChat, setShowChat] = useRecoilState(chatAtom)
    const [messages, setMessages] = useState<IChat[]>([]);

    const sendMessage = async (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const msg = form.msg.value;
        if (msg) {
            const newMsg = {
                role: "user",
                content: msg
            }
            form.msg.value = "";

            setMessages((prev) => [...prev, newMsg]);
            const res = await makeRequest("POST", "/chat", { messages: [...messages, newMsg] });


            if (res.status === 200) {
                const response = {
                    role: "assistant",
                    content: res.data.response
                }
                setMessages(prev => [...prev, response]);
            }
        }
    }

    return (
        <div className="chat-container">
            <button className="material-symbols-outlined" onClick={() => setShowChat({ show: false })}>close</button>
            <h3 className="chat-heading">AI is here to help you!</h3>
            <div className="message-container">
                {messages && messages.length > 0 ? <>
                    {messages.map((message, i) => (
                        <div className={"message " + message.role} key={i}>
                            {message.content}
                        </div>
                    ))}
                </> : <div className="data-info">Starting by asking your queries</div>}
            </div>
            <form className="send-message" onSubmit={sendMessage}>
                <input type="text" name="msg" placeholder="Enter your queries here" required />
                <button type="submit" className="material-symbols-outlined">send</button>
            </form>
        </div>
    )
}

export default Chat
