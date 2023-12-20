import { useRecoilState } from "recoil";
import { chatAtom } from "../atom/chat";
import { useEffect, useState } from "react";
import { IChat } from "../types/types";
import makeRequest from "../utils/api";
import { notify } from "../utils/notification";

const Chat = () => {
    const [_showChat, setShowChat] = useRecoilState(chatAtom)
    const [messages, setMessages] = useState<IChat[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);

    // Fetch all old messages saved in local storage
    useEffect(() => {
        const messageString = localStorage.getItem("messages");
        const messages = messageString ? JSON.parse(messageString) : []
        setMessages(messages);
    }, [])

    // Save new messages in local storage
    useEffect(() => {
        localStorage.setItem("messages", JSON.stringify(messages));
    }, [messages]);


    // Generating response from server and adding in messages state
    const sendMessage = async (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const msg = form.msg.value;
        if (msg) {
            setIsGenerating(true);
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
            } else {
                notify("Error, try again", "error");
            }
            setIsGenerating(false);
        }
    }

    return (
        <div className="chat-container">
            <div className="chat-header">
                <button className="material-symbols-outlined" onClick={() => setShowChat({ show: false })}>close</button>
                {messages && messages.length > 0 ? <button className="chat-clr-btn" onClick={() => {
                    setShowChat({ show: false });
                    localStorage.removeItem("messages");
                    notify("Conversation cleared!", "success", 1000);
                }}>Reset <span className="material-symbols-outlined">delete_sweep</span></button> : <></>}
            </div>
            <h3 className="chat-heading">AI is here to help you!</h3>
            <div className="message-container">
                {messages && messages.length > 0 ? <>
                    {messages.map((message, i) => (
                        <div className={"message " + message.role} key={i}>
                            {message.content}
                        </div>
                    ))}
                </> : <div className="data-info">Starting by discussing your thoughts and ideas about a topic or ask a question.</div>}
            </div>
            {isGenerating ? <div className="text-center">Loading...</div> : <form className="send-message" onSubmit={sendMessage}>
                <input type="text" name="msg" placeholder="What's your message..." required />
                <button type="submit" className="material-symbols-outlined">send</button>
            </form>}
        </div>
    )
}

export default Chat
