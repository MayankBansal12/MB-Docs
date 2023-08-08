import React, { useCallback } from 'react';
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "../assets/styles.css";

var toolbarOptions = [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['image','blockquote', 'code-block'],

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
    const wrapperRef = useCallback((wrapper) => {
        if (wrapper == null) return;
        wrapper.innerText = "";
        const editor = document.createElement("div");
        wrapper.append(editor);
        new Quill(editor, {
            modules: {
                toolbar: toolbarOptions,
                history: {
                    delay: 2000,
                    maxStack: 500,
                    userOnly: true
                }
            },
            theme: "snow"
        });
    }, []);

    return (
        <div className="text-editor" ref={wrapperRef}></div>
    )
}

export default TextEditor;