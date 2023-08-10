import React, { useCallback, useEffect, useState } from 'react';
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "../assets/styles.css";
import { io } from "socket.io-client";

var toolbarOptions = [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['image', 'blockquote', 'code-block'],

    [{ 'font': [] }],
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'align': [] }],

    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript

    ['clean']                                         // remove formatting button
];

const TextEditor = () => {
    const [socket, setSocket] = useState();
    const [quill, setQuill] = useState();

    // Intializing/Connecting to socket server
    useEffect(() => {
        const newSocket = io("http://localhost:5000");
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        }
    }, []);

    // Sending the change to server whenever user types 
    useEffect(() => {
        if (socket == null || quill == null) return

        const handleChange = (delta, oldDelta, source) => {
            if (source !== "user") return
            socket.emit("send", delta);
        }
        quill.on("text-change", handleChange);

        return () => {
            quill.off("text-change", handleChange);
        }

    }, [socket, quill]);

    // Receiving the change from server to update the doc
    useEffect(() => {
        if (socket == null || quill == null) return

        const handleChange = (delta) => {
            quill.updateContents(delta);
        }
        socket.on("receive", handleChange);

        return () => {
            socket.off("receive", handleChange);
        }
    }, [socket, quill]);

    // Intializing the quill editor
    const wrapperRef = useCallback((wrapper) => {
        if (wrapper == null) return;
        wrapper.innerText = "";
        const editor = document.createElement("div");
        wrapper.append(editor);
        setQuill(new Quill(editor, {
            modules: {
                toolbar: toolbarOptions,
                history: {
                    delay: 2000,
                    maxStack: 500,
                    userOnly: true
                },
            },
            theme: "snow"
        }));
    }, []);

    return (
        <div className="text-editor" ref={wrapperRef}></div>
    )
}

export default TextEditor;