import React from "react";
import dynamic from "next/dynamic";
const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File

const Editor = ({ placeholder, value, onChange }) => {
  return (
    <SunEditor
    id='body'
      lang="en"
      height={"150px"}
      placeholder={placeholder}
      setOptions={{
        // resizingBar: false,
        // autoFocus:true,
        width:"100%",
        height:"550px",
        buttonList: [
          [
            "formatBlock",
            "bold",
            "underline",
            "italic",
            "strike",
            "blockquote",
            "showBlocks",
            "fontColor",
            "hiliteColor",
            "align",
            "list",
            "table",
            "link",
            "image",
            "video",
            "removeFormat",
            "codeView",
          ],
        ],
      }}
      defaultValue={value}
      onChange={(val) => onChange(val)}
    />
  );
};

export default Editor;
