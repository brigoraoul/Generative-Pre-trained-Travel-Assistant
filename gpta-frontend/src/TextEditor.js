import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import './TextEditor.css'; 

const TextEditor = ({ editorContent, setEditorContent }) => {

  const [text, setText] = useState('');

  // switch on to save rich text locally, e.g. for development
  const saveLocally = true; 

  useEffect(() => {
    if (saveLocally) {
      const savedText = localStorage.getItem('editorContent');
      if (savedText) {
        setText(savedText);
        setEditorContent(savedText);
      }
    }
  }, [saveLocally]);

  useEffect(() => {
    setText(editorContent);
  }, [editorContent]);

  const handleTextChange = (value) => {
    setText(value);
    setEditorContent(value);
    if (saveLocally) {
      localStorage.setItem('editorContent', value);
    }
  };

  return (
    <div>
      <ReactQuill
        value={text}
        onChange={handleTextChange}
        placeholder="Write something amazing..."
        modules={TextEditor.modules}
        formats={TextEditor.formats}
        className="custom-editor" // Custom class
      />
    </div>
  );
};

// Quill editor modules to customize the toolbar
TextEditor.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ['link', 'image'],
    ['clean'],
  ],
};

// Quill editor formats
TextEditor.formats = [
  'header', 'font', 'list', 'bullet',
  'bold', 'italic', 'underline', 'strike',
  'color', 'background', 'align', 'link', 'image',
];

export default TextEditor;
