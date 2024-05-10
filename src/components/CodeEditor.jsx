import React, { useEffect, useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
function CodeEditor() {
  const [code, setCode] = useState(`
{
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

  useEffect(() => {
    // No need to register language definition for JSON
  }, []);

  function handleEditorChange(newValue, event) {
    setCode(newValue);
  }

  return (
    <MonacoEditor 
      width="800"
      height="600"
      language="json"
      value={code}
      onChange={handleEditorChange}
      theme="vs-dark"
      
    />
  );
}

export default CodeEditor;






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





