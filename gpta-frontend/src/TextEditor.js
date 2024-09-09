import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const TextEditor = () => {
  const [text, setText] = useState('');

  const handleTextChange = (value) => {
    setText(value); // Updates the text state when the editor content changes
  };

  return (
    <div>
      <h2>Your Travel Document</h2>
      <ReactQuill
        value={text}
        onChange={handleTextChange}
        placeholder="Write something amazing..."
        modules={TextEditor.modules}
        formats={TextEditor.formats}
      />
    </div>
  );
};

/* Quill editor modules to customize the toolbar */
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

/* Quill editor formats */
TextEditor.formats = [
  'header', 'font', 'list', 'bullet',
  'bold', 'italic', 'underline', 'strike',
  'color', 'background', 'align', 'link', 'image',
];

export default TextEditor;
