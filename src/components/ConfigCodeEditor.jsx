import Editor from "@monaco-editor/react";
import { useState } from "react";

function ConfigCodeEditor(props) {

  const [code] = useState(props.code);
  

  

  return (
    <div className="flex-1 py-4 rounded-lg ">
      <Editor
        height="370px"
        language="json"
        theme="vs-dark"
        value={code}
        options={{
          fontSize: "16px",
          formatOnType: true,
          automaticLayout: true,
          minimap: { enabled: false },
          lineNumbersMinChars: 3,
          readOnly: true,
        }}
      />
    </div>
  );
}

export default ConfigCodeEditor;