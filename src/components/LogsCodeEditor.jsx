import Editor, { loader } from "@monaco-editor/react";
import { useState, useEffect } from "react";

function LogsCodeEditor(props) {
    const [logs] = useState(props.logs);

    useEffect(() => {
        loader.init().then((monaco) => {
            monaco.editor.defineTheme('custom-dark-blue', {
                base: 'vs-dark',
                inherit: true,
                rules: [],
                colors: {
                    'editor.background': '#120354',
                    'editor.foreground': '#ffffff', 
                },
            });
        });
    }, []);

    function handleEditorDidMount(editor, monaco) {
        if (editor) {
            const threshold = 12
            const lineCount = editor.getModel().getLineCount();
            console.log(lineCount);
            if (lineCount > threshold) {
                editor.revealLine(lineCount-threshold);
            }
        }
    }

    return (
        <div className="flex-1 py-4">
            <Editor
                height="260px"
                language="json"
                theme="custom-dark-blue"
                onMount={handleEditorDidMount}
                value={logs}
                options={{
                    fontSize: "14px",
                    formatOnType: true,
                    automaticLayout: true,
                    minimap: { enabled: false },
                    lineNumbersMinChars: 1,
                }}
            />
        </div>
    );
}

export default LogsCodeEditor;





// import Editor from "@monaco-editor/react";
// import { useState } from "react";

// function LogsCodeEditor(props) {

//   const [logs] = useState(props.logs);

  

//   return (
//     <div className="flex-1 py-4">
//       <Editor
//         height="260px"
//         language="json"
//         theme="vs-dark"
        
//         value={logs}
//         options={{
//           fontSize: "16px",
//           formatOnType: true,
//           automaticLayout: true,
//           minimap: { enabled: false },
//           lineNumbersMinChars: 3,
//         }}
//       />
//     </div>
//   );
// }

// export default LogsCodeEditor;