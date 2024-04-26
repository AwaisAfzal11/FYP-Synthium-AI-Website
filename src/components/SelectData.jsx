import React, { useState } from 'react';
import { curve } from "../assets";
import Header from "./Header";
import { useNavigate } from 'react-router-dom';
import Button from "./Button";

function SelectData() {

    const navigate = useNavigate();
    const handleButtonClick = () => {
        // Redirect to localhost://5173/dashboard/chose/selectmodel/selectdata
        navigate('/dashboard/chose/selectmodel/selectdata/training');
    }
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
        } else {
            setSelectedFile(null);
        }
    };

    return (
        <section className="pt-[12rem] -mt-[7.25rem]">
            <div>
                <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
                    <Header />
                    <h1 className="h1 mb-6">
                        Where is your{" "}
                        <span className="inline-block relative mt-10">
                            Data!{" "}
                            <img
                                src={curve}
                                className="absolute top-full left-0 w-full xl:-mt-2"
                                width={624}
                                height={28}
                                alt="Curve"
                            />
                        </span>
                    </h1>
                    <p className="body-1 max-w-3xl mx-auto mb- text-n-2 lg:mb-8">
                        Lets begin by defining your data.
                    </p>
                </div>

                {/* input data  */}
                <div className="max-w-[600px] mx-auto border border-gray-300 p-4 rounded-md">
                    <label htmlFor="csvFile" className="block mb-2">Select a .csv file:</label>
                    <input
                        type="file"
                        id="csvFile"
                        accept=".csv"
                        className="mb-4"
                        onChange={handleFileChange}
                    />
                    {selectedFile && (
                        <p className="text-center">Selected file: {selectedFile.name}</p>
                    )}
                    <div className="flex justify-center ">
                        <Button onClick={handleButtonClick} white className="">
                            Continue
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SelectData;


// import React from 'react'
// import { useNavigate } from 'react-router-dom';
// import Header from "./Header";
// import { curve } from "../assets";
// import Button from "./Button";

// function SelectData() {
//   return (
//     <section className="pt-[12rem] -mt-[7.25rem]">
//             <div>
//                 <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
//                     <Header />
//                     <h1 className="h1 mb-6">
//                         {/* nbsp;AI&nbsp; */}
//                         Where's your  {` `}
//                         <span className="inline-block relative mt-10">
//                             Data!{" "}
//                             {/* Rainbow Line below Synthium */}
//                             <img src={curve} className="absolute top-full left-0 w-full xl:-mt-2" width={624} height={28} alt="Curve" />
//                         </span>
//                     </h1>
//                     <p className="body-1 max-w-3xl mx-auto mb- text-n-2 lg:mb-8">
//                         Lets begin by defining your data.
//                     </p>
//                 </div>

//                 {/* input data  */}
//                 <div>

//                 </div>
//             </div>



//         </section>

//   )
// }

// export default SelectData