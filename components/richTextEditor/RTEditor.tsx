
import { Box } from "@mui/material";
import React from "react";
import ReactQuill, { Quill } from "react-quill";

import 'react-quill/dist/quill.snow.css';


Quill.register(Quill.import("attributors/style/direction"), true);
Quill.register(Quill.import("attributors/style/align"), true);
const Size = Quill.import("attributors/style/size");
Size.whitelist = ["0.75em", "1em", "1.5em", "2.5em"];
Quill.register(Size, true);

// TODO: update replacement of Text indent and list [number, bullet, alphabet]
//Text indent
// const Parchment = Quill.import("parchment");
// class IndentAttributor extends Parchment.Attributor.Style {
//   add(node: any, value: number) {
//     if (value === 0) {
//       this.remove(node);
//       return true;
//     } else {
//       return super.add(node, `${value}em`);
//     }
//   }
// }

// let IndentStyle = new IndentAttributor("indent", "text-indent", {
//   scope: Parchment.Scope.BLOCK,
//   whitelist: ["1em", "2em", "3em", "4em", "5em", "6em", "7em", "8em", "9em"]
// });

// Quill.register(IndentStyle, true);

interface RTEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

/*
* NOTE: learn more about this Rich text editor at https://quilljs.com/playground/snow
*/
export default function RTEditor({
  value,
  onChange = (value) => console.log("RTEditor onChange value >>>", value),
  placeholder = "Write something...",
}: RTEditorProps) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      // [{ size: [] }],
      // [{ font: [] }],
      [{ align: "" }, { align: "center" }, { align: 'right' }, { align: "justify" }],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" },],
      ["link", "image"],
      // [{ color: ["red", "#785412"] }],
      // [{ background: ["red", "#785412"] }]
      [{ color: [] }],
      [{ background: [] }]
    ]
    // TODO: try to make own custom toolbar for line space or line hight
    // toolbar: {
    //   container: "#toolbar",
    //   // handlers: {
    //   //   markYellow
    //   // }
    // }
  };

  const formats = [
    "header",
    "bold", "italic", "underline", "strike", "blockquote",
    "align",
    "list", "bullet", "link", "indent",
    "image",
    "color", "background",
    // "size", // "font"
  ];


  const handleProcedureContentChange = (htmlValue: string, _delta: any, _source: any, _editor: ReactQuill.UnprivilegedEditor) => {
    onChange(htmlValue)
  };

  return (
    <>
      <Box sx={{
        "& .ql-container": {
          borderBottomLeftRadius: '4px',
          borderBottomRightRadius: '4px',
          borderTop: "none",
        },
        "& .ql-toolbar": {
          borderTopLeftRadius: '4px',
          borderTopRightRadius: '4px',
          borderBottom: "none",
        },
        "& .ql-formats": {
          border: "1px solid #A4A4A4",
          borderRadius: '4px',
          marginBottom: '4px',
          "button": {
            // border: "1px solid #A4A4A4",
            borderRight: "1px solid #A4A4A4",
          },
          // "button:first-child": {
          //   borderTopLeftRadius: '4px',
          //   borderBottomLeftRadius: '4px',
          // },
          "button:last-child": {
            borderRight: "none",
            // borderBottomRightRadius: '4px',
            // borderTopRightRadius: '4px',
          }
        }
      }}>
        {/* <CustomToolbar /> */}
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          value={value}
          onChange={handleProcedureContentChange}
          placeholder={placeholder}
        />
      </Box >
    </>
  );
}


// function markYellow() {
//   const { index, length } = this.quill.getSelection();
//   const { underline } = this.quill.getFormat(index, length);
//   this.quill.formatText(index, length, "underline", !underline);
// }


// const CustomToolbar = () => (
//   <div id="toolbar" >
//     <button className="ql-bold">
//       <div>test</div>
//     </button>
//     <button className="ql-italic"></button>
//     <button className="ql-list" value="ordered"></button>
//     <button className="ql-list" value="bullet"></button>
//   </div>
// );

