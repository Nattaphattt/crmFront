// import React, { useState } from 'react';
// import { Editor, EditorState } from 'react-draft-wysiwyg';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// export default function EditorPage() {
//     const [editorState, setEditorState] = useState<EditorState | null>(null);

//     const onEditorStateChange = (newEditorState: EditorState) => {
//         setEditorState(newEditorState);
//     };

//     return (
//         // <Editor
//         //     editorState={editorState ?? undefined}
//         //     toolbarClassName="toolbarClassName"
//         //     wrapperClassName="wrapperClassName"
//         //     editorClassName="editorClassName"
//         //     onEditorStateChange={onEditorStateChange}
//         // />

//         <Editor
//             toolbarClassName="flex"
//             wrapperClassName="w-full border border-gray-300 rounded-md p-2"
//             editorClassName="flex-grow outline-none"
//             placeholder='Job Description'
//             editorState={editorState ?? undefined}
//             onEditorStateChange={onEditorStateChange}
//             toolbar={{
//                 options: ['inline', 'list', 'textAlign', 'history'],
//                 inline: {
//                     options: ['bold', 'italic', 'underline', 'strikethrough']
//                 },
//             }}
//         />
//     );
// }


