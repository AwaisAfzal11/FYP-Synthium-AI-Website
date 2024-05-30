import Editor from "@monaco-editor/react";
import { useState } from "react";

function CodeEditor() {
  const [isEditable, setIsEditable] = useState(false);
  const [code, setCode] = useState(`{
    "name": "Muhammad Ishaq",
    "gender": "Male",
    "age": 23,
    "address": {
      "street": "87",
      "city": "Gultari Matyal Skardu",
      "state": "Gilgit Baltistan",
      "postalCode": "16350"
    },
    "phoneNumber": [
      {
        "type": "personal",
        "number": "116263747"
      }
    ]
  }`);
  const [buttonText, setButtonText] = useState('Edit');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEdit = () => {
    if (isEditable) {
      try {
        JSON.parse(code);
        console.log('Valid JSON, saving data:', code);
        setErrorMessage(''); 
      } catch (error) {
        setErrorMessage('Invalid JSON format. Please correct it before saving.');
        return;
      }
    }
    setIsEditable(!isEditable);
    setButtonText(isEditable ? 'Edit' : 'Done');
  };

  return (
    <div className="flex-1 py-4">
      <div className='flex flex-row items-center justify-between w-[100%] px-6 bg-black border border-gray-500 py-3'>
        <p>tabular-actgan.yml</p>
        <button className='border px-2 py-1' onClick={handleEdit}>{buttonText}</button>
      </div>
      {errorMessage && <div className="text-red-500 p-2">{errorMessage}</div>}
      <Editor
        height="370px"
        language="json"
        theme="vs-dark"
        value={code}
        options={{
          fontSize: "16px",
          formatOnType: true,
          automaticLayout: true,
          readOnly: !isEditable,
          minimap: { enabled: false },
          lineNumbersMinChars: 3,
        }}
        onChange={(value) => setCode(value)}
      />
    </div>
  );
}

export default CodeEditor;







// import Editor from "@monaco-editor/react";
// import { useState } from "react";

// function CodeEditor() {
//   const [isEditable, setIsEditable] = useState(false);
//   const [code, setCode] = useState(`{
//     "name": "Muhammad Ishaq",
//     "gender": "Male",
//     "age": 23,
//     "address": {
//       "street": "87",
//       "city": "Gultari Matyal Skardu",
//       "state": "Gilgit Baltistan",
//       "postalCode": "16350"
//     },
//     "phoneNumber": [
//       {
//         "type": "personal",
//         "number": "116263747"
//       }
//     ]
//   }`);
//   const [buttonText, setButtonText] = useState('Edit');

//   const handleEdit = () => {
//     if (isEditable) {
//       // Validate JSON format
//       try {
//         JSON.parse(code);
//         // Save the data (you can replace this with your own saving logic)
//         console.log('Valid JSON, saving data:', code);
//         // Optionally, you can save the code to a file or server here
//         // For example, using an API call to save the JSON data
//       } catch (error) {
//         alert('Invalid JSON format. Please correct it before saving.');
//         return;
//       }
//     }
//     setIsEditable(!isEditable);
//     setButtonText(isEditable ? 'Edit' : 'Done');
//   };

//   return (
//     <div className="flex-1 p-4">
//       <div className='flex flex-row items-center justify-between w-[100%] px-6 bg-[#01313f] py-3'>
//         <p>tabular-actgan.yml</p>
//         <button className='border px-2 py-1' onClick={handleEdit}>{buttonText}</button>
//       </div>
//       <Editor
//         height="400px"
//         language="json"
//         theme="vs-dark"
//         value={code}
//         options={{
//           fontSize: "16px",
//           formatOnType: true,
//           automaticLayout: true,
//           readOnly: !isEditable,
//           minimap: { enabled: false },
//           lineNumbersMinChars: 3,
          
//         }}
//         onChange={(value) => setCode(value)}
//       />
//     </div>
//   );
// }

// export default CodeEditor;

















// import AceEditor from 'react-ace';
// import 'ace-builds/src-noconflict/ace';
// import 'ace-builds/src-noconflict/mode-javascript';
// import 'ace-builds/src-noconflict/mode-json';
// import 'ace-builds/src-noconflict/theme-monokai';
// import 'ace-builds/src-noconflict/theme-solarized_dark';
// import 'ace-builds/src-noconflict/ext-language_tools';

// import { useState } from 'react';

// function CodeEditor() {
//   const [isEditable, setIsEditable] = useState(false);
//   const [code, setCode] = useState(`{
//     "name": "Muhammad Ishaq",
//     "gender": "Male",
//     "age": 23,
//     "address": {
//       "street": "87",
//       "city": "Gultari Matyal Skardu",
//       "state": "Gilgit Baltistan",
//       "postalCode": "16350"
//     },
//     "phoneNumber": [
//       {
//         "type": "personal",
//         "number": "116263747"
//       }
//     ]
//   }`);
//   const [buttonText, setButtonText] = useState('Edit');

//   const handleEdit = () => {
//     if (isEditable) {
//       // Validate JSON format
//       try {
//         JSON.parse(code);
//         // Save the data (you can replace this with your own saving logic)
//         console.log('Valid JSON, saving data:', code);
//         // Optionally, you can save the code to a file or server here
//         // For example, using an API call to save the JSON data
//       } catch (error) {
//         alert('Invalid JSON format. Please correct it before saving.');
//         return;
//       }
//     }
//     setIsEditable(!isEditable);
//     setButtonText(isEditable ? 'Edit' : 'Done');
//   };

//   return (
//     <div className="flex-1 p-4">
//       <div className='flex flex-row items-center justify-between w-[100%] px-6 bg-[#01313f] py-3'>
//         <p>tabular-actgan.yml</p>
//         <button className='border px-2 py-1' onClick={handleEdit}>{buttonText}</button>
//       </div>
//       <AceEditor
//         value={code}
//         mode="json"
//         theme="solarized_dark"
//         fontSize="16px"
//         width="100%"
//         highlightActiveLine={true}
//         onChange={setCode}
//         setOptions={{
//           enableLiveAutocompletion: true,
//           showLineNumbers: true,
//           tabSize: 2,
//           readOnly: !isEditable
//         }}
//       />
//     </div>
//   );
// }

// export default CodeEditor;










// import AceEditor from 'react-ace';
// import 'ace-builds/src-noconflict/ace';
// import 'ace-builds/src-noconflict/mode-javascript';
// import 'ace-builds/src-noconflict/mode-json';
// import 'ace-builds/src-noconflict/theme-monokai';
// import 'ace-builds/src-noconflict/theme-solarized_dark';
// import 'ace-builds/src-noconflict/ext-language_tools';

// import { useState } from 'react';

// function CodeEditor() {
//   const [isEditable, setIsEditable] = useState(false);
//   const [code, setCode] = useState(`{
//     "name": "Muhammad Ishaq",
//     "gender": "Male",
//     "age": 23,
//     "address": {
//       "street": "87",
//       "city": "Gultari Matyal Skardu",
//       "state": "Gilgit Baltistan",
//       "postalCode": "16350"
//     },
//     "phoneNumber": [
//       {
//         "type": "personal",
//         "number": "116263747"
//       }
//     ]
//   }`);

//   const handleEdit = () => {
//     setIsEditable(!isEditable);
//   };

//   return (
//     <div className="flex-1 p-4">
//       <div className='flex flex-row items-center justify-between w-[100%] px-6  bg-[#01313f] py-3'>
//         <p>tabular-actgan.yml</p>
//         <button className='border px-2 py-1' onClick={handleEdit}>Edit</button>
//       </div>
//       <AceEditor
//         value={code}
//         mode="json"
//         theme="solarized_dark"
//         fontSize="16px"
//         width="100%"
//         highlightActiveLine={true}
//         setOptions={{
//           enableLiveAutocompletion: true,
//           showLineNumbers: true,
//           tabSize: 2,
//           readOnly: !isEditable
//         }}
//       />
//     </div>
//   );
// }

// export default CodeEditor;















// function CodeEditor() {
//   const code = `{
//     "name": "Muhammad Ishaq",
//     "gender": "Male",
//     "age": 23,
//     "address": {
//       "street": "87",
//       "city": "Gultari Matyal Skardu",
//       "state": "Gilgit Baltistan",
//       "postalCode": "16350"
//     },
//     "phoneNumber": [
//       {
//         "type": "personal",
//         "number": "116263747"
//       }
//     ]
//   }`

//   return (
//     <AceEditor
//       // height="100px"
//       value={code}
//       mode="json"
//       theme="solarized_dark"
//       fontSize="16px"
//       highlightActiveLine={true}
//       setOptions={{
//         enableLiveAutocompletion: true,
//         showLineNumbers: true,
//         tabSize: 2
//       }}
//     />
//   );
// }

// export default CodeEditor;


// import React, { useState } from 'react';
// import Editor from 'react-simple-code-editor';
// import { highlight, languages } from 'prismjs/components/prism-core';
// import 'prismjs/components/prism-clike';
// import 'prismjs/components/prism-javascript';
// import 'prismjs/themes/prism.css';

// const CodeEditor = () => {
//   const [code, setCode] = useState(
//     `{
//       "name": "Muhammad Ishaq",
//       "gender": "Male",
//       "age": 23,
//       "address": {
//         "street": "87",
//         "city": "Gultari Matyal Skardu",
//         "state": "Gilgit Baltistan",
//         "postalCode": "16350"
//       },
//       "phoneNumber": [
//         {
//           "type": "personal",
//           "number": "116263747"
//         }
//       ]
//     }`
//   );

//   const handleCodeChange = (newCode) => {
//     setCode(newCode);
//   };

//   return (
//     <Editor
//       value={code}
//       padding={10}
//       onValueChange={handleCodeChange}
//       highlight={(code) => highlight(code, languages.js)}
//       style={{
//         fontFamily: 'monospace',
//         fontSize: 17,
//         border: '1px solid black'
//       }}
//     />
//   );
// };

// export default CodeEditor;





// import { useEffect, useState } from 'react';
// import MonacoEditor from 'react-monaco-editor';

// function CodeEditor() {
//   const [code, setCode] = useState(`
// {
//   "name": "Muhammad Ishaq",
//   "gender": "Male",
//   "age": 23,
//   "address": {
//     "street": "87",
//     "city": "Gultari Matyal Skardu",
//     "state": "Gilgit Baltistan",
//     "postalCode": "16350"
//   },
//   "phoneNumber": [
//     {
//       "type": "personal",
//       "number": "116263747"
//     }
//   ]
// }`);

//   useEffect(() => {
//     // No need to register language definition for JSON
//     // MonacoEditor provides syntax highlighting for JSON by default when language is set to "json"
//   }, []);

//   function handleEditorChange(newValue, event) {
//     setCode(newValue);
//   }

//   return (
//     <MonacoEditor
//       width="800"
//       height="600"
//       language="json" // JSON syntax highlighting is applied automatically
//       value={code}
//       onChange={handleEditorChange}
//       theme="vs-dark" // You can change the theme here if desired
//     />
//   );
// }

// export default CodeEditor;








// import { useEffect, useState } from 'react';
// import MonacoEditor from 'react-monaco-editor';
// function CodeEditor() {
//   const [code, setCode] = useState(`
// {
//   "name": "Muhammad Ishaq",
//   "gender": "Male",
//   "age": 23,
//   "address": {
//     "street": "87",
//     "city": "Gultari Matyal Skardu",
//     "state": "Gilgit Baltistan",
//     "postalCode": "16350"
//   },
//   "phoneNumber": [
//     {
//       "type": "personal",
//       "number": "116263747"
//     }
//   ]
// }`);

//   useEffect(() => {
//     // No need to register language definition for JSON
//   }, []);

//   function handleEditorChange(newValue, event) {
//     setCode(newValue);
//   }

//   return (
//     <MonacoEditor 
//       width="800"
//       height="600"
//       language="json"
//       value={code}
//       onChange={handleEditorChange}
//       theme="vs-dark"
      
//     />
//   );
// }

// export default CodeEditor;






// import React, { useState } from 'react';
// import MonacoEditor from 'react-monaco-editor';

// function CodeEditor() {
//   const [code, setCode] = useState(`
// // Example Data
// {
//   "name": "Muhammad Ishaq",
//   "gender": "Male",
//   "age": 23,
//   "address": {
//     "street": "87",
//     "city": "Gultari Matyal Skardu",
//     "state": "Gilgit Baltistan",
//     "postalCode": "16350"
//   },
//   "phoneNumber": [
//     {
//       "type": "personal",
//       "number": "116263747"
//     }
//   ]
// }`);

//   function handleEditorChange(newValue, event) {
//     setCode(newValue);
//   }

//   return (
//     <MonacoEditor
//       width="800"
//       height="600"
//       language="json"
//       value={code}
//       onChange={handleEditorChange}
//       options={{ automaticLayout: true }} // Optional: adjust layout automatically
//       theme="vs-dark"
//     />
//   );
// }

// export default CodeEditor;




// import React, { useState } from 'react';

// const CodeEditor = () => {
//  const [code, setCode] = useState(``);

//  const handleCodeChange = (event) => {
//     setCode(event.target.value);
//  };

//  return (
//     <div className="flex flex-col text-white items-center justify-center bg-gray-100">
//       <textarea
//         value={code}
//         onChange={handleCodeChange}
//         className="w-full h-64 p-4 bg-black rounded-lg shadow-md focus:outline-none border border-gray-500 focus:ring-2 focus:ring-purple-500"
//         placeholder="Enter your code here..."
//       />
//     </div>
//  );
// };

// export default CodeEditor;

// import React, { useState } from 'react';
// const CodeEditor = () => {
//  const [code, setCode] = useState(`def hello_world():
//     print('Hello, world!')

// hello_world()`);

//  const handleCodeChange = (event) => {
//     setCode(event.target.value);
//  };

//  return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <textarea
//         value={code}
//         onChange={handleCodeChange}
//         className="w-full h-64 p-4 bg-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//         placeholder="Enter your code here..."
//       />
//     </div>
//  );
// };

// export default CodeEditor;





