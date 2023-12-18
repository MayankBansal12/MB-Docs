import { useRecoilState } from "recoil";
import { chatAtom } from "../atom/chat";
import { useState } from "react";

const Chat = () => {
    const [showChat, setShowChat] = useRecoilState(chatAtom)
    const [message, setMessage] = useState("");

    return (
        <div className="chat-container">
            <button className="material-symbols-outlined" onClick={() => setShowChat({ show: false })}>close</button>
            <h3 className="chat-heading">AI is here to help you with your doc!</h3>
            <div className="message-container">
                <div className="message user">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, placeat!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam harum officia eum in iste culpa earum aut dicta, sapiente expedita sunt at ad perspiciatis ea modi officiis delectus et ab?
                </div>
                <div className="message assistant">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, placeat!
                </div>
                <div className="message user">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, placeat!
                </div>
                <div className="message assistant">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, placeat!
                </div>
            </div>
            <div className="send-message">
                <input type="text" placeholder="Enter your queries here" value={message} onChange={(e) => setMessage(e.target.value)} />
                <button className="material-symbols-outlined" onClick={() => console.log("value: ", message)}>send</button>
            </div>
        </div>
    )
}

export default Chat
