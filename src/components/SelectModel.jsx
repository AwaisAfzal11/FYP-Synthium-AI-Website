import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";

function SelectModel({ onFormSubmit, projectData }) {
    // const { project_id } = useParams();
    const [alert, setAlert] = useState('');
    const [setshowSettingDropdown, setsetshowSettingDropdown] = useState(false);
    const [setshowModelDropdown, setsetshowModelDropdown] = useState(true);

    const [selectedModel, setSelectedModel] = useState(null);

    const handleButtonClick = (buttonId) => {
        setSelectedModel(buttonId);
    };

    const handleSelectModel = (e) => {
        e.preventDefault();
        // Basic checks
        if (!selectedModel) {
            setAlert('Please select a model');
            return;
        }
        // Call the onFormSubmit prop function with the form data
        onFormSubmit(selectedModel);
        // Handle select model logic here
        console.log('Selected Model:', selectedModel);
    };

    // const navigate = useNavigate();

    const handleSettingClick = () => {
        setsetshowSettingDropdown(!setshowSettingDropdown);
        setsetshowModelDropdown(false);
    };

    const handleModelClick = () => {
        setsetshowModelDropdown(!setshowModelDropdown);
        setsetshowSettingDropdown(false);
    };

    // const handleSelectModel = () => {
    //     navigate('/dashboard/newproject/dataartifacts');
    // };

    return (
        <div>
            <h1 className='text-[36px] mt-10'>{projectData.name}</h1>
            <div className="flex flex-row gap-5 mt-8 mb-2">
                <button onClick={handleModelClick} className="hover hover:underline">
                    Model
                </button>
                <button onClick={handleSettingClick} className="hover hover:underline">
                    Setting
                </button>
            </div>
            <hr className="mb-[30px] opacity-70" />


            {setshowSettingDropdown && (
                <div>
                    <div className='border rounded-md border-color-7'>
                        <h2 className='ml-5 mt-5 text-[24px] font-bold'>Project Details</h2>
                        <div className='flex flex-row ml-5 mt-5 text-[14px] gap-10'>
                            <div>
                                <h3>Display Name</h3>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Enter your Project Name"
                                    className="w-[70%] mt-[0px] mb-[7px] md:w-[270%] border border-gray-300 rounded-md px-3 py-2  text-white "
                                />
                                <p>A human read-able title for your project</p>
                            </div>
                        </div>

                        <div className='flex flex-row ml-5 mt-5 text-[14px] gap-10'>
                            <div>
                                <h3>Name</h3>
                            </div>
                            <div className='ml-14'>
                                <input
                                    type="text"
                                    placeholder=""
                                    className="  w-[100%] mt-[0px] mb-[7px] md:w-[335%] border border-gray-300 rounded-md px-3 py-2  text-white "
                                />
                                <p className=''>Project Name should be unique.</p>
                            </div>
                        </div>

                        <div className='flex flex-row ml-5 mt-5 text-[14px] gap-10'>
                            <div>
                                <h3>Description</h3>
                            </div>
                            <div className='ml-4 mb-4'>
                                <input
                                    type="text"
                                    placeholder=""
                                    className=" w-[100%] mt-[0px] mb-[7px] md:w-[315%] border border-gray-300 rounded-md px-3 py-2  text-white "
                                />
                                <p>A brief description of the project.</p>

                            </div>
                        </div>
                        <hr className="mb-[30px] opacity-70 border bg-color-7" />
                        <button className="bg-color-7 ml-4 mb-4  text-white text-[14px] px-6 py-2 mt-[-10px] border-white rounded-md">Save</button>
                    </div>

                    {/* del project */}
                    <div className="border rounded-md border-red-500 my-4">
                        <div className='ml-4 text-[18px] mt-4'>
                            <h1 className='text-[24px]'>Permanent Options</h1>
                            <p className='mt-4'>Deleting your project will delete all models, data artifacts, and members. <b>Once completed, this action cannot be undone.</b> </p>

                            <button className="my-4  bg-red-500 text-white text-[14px] p-3 mt-[15px] border-white rounded-md">Delete this Project</button>
                        </div>

                    </div>
                </div>
            )}

            {/* Model Selection symbol  */}
            {setshowModelDropdown && (
                <div>

                    <div className="mx-[0px] mt-[0px] mb-[0px] flex flex-col border-gray-300 border rounded-lg rounded-tr-[30px] rounded-br-[0px] rounded-tl-[0px] rounded-bl-[30px]">
                        <div className='flex flex-row gap-10 my-5 justify-center'>
                            <div className='  text-color-7' style={{ borderBottom: '4px solid', paddingBottom: '2px', display: 'inline-block' }}>Step-1 Model</div>
                            <IoIosArrowForward />
                            <div>Step-2 Input Data</div>
                            <IoIosArrowForward />
                            <div>Step-3 Configuration</div>
                        </div>
                    </div>

                    {/* <div className="mx-[0px] mt-[0px] mb-[0px] flex flex-col  border-gray-300 border rounded-lg rounded-tr-[30px] rounded-br-[0px] rounded-tl-[0px] rounded-bl-[30px]">
            <div className='flex flex-row'> 
              <div> Step-1 Project </div>  
              <div> Step-2 Model</div>              
            </div>
          </div> */}

                    <div className="my-6">
                        <h1 className='text-[24px] mb-2'>Select a Model</h1>
                        <p className="text-[14px]">
                            Chose a Synthium Model for your usecase!
                        </p>
                    </div>

                    <div className="flex flex-col p-8 border-color-7   hover:shadow-[15px_0_20px_-5px_#a855f7,_-15px_0_20px_-5px_#d900ff] border rounded-lg rounded-tr-[30px] rounded-br-[0px] rounded-tl-[0px] rounded-bl-[30px]">
                        <button
                            className={`bg-black border-2 text-left mb-[10px] p-[10px] ${selectedModel === 'ctgan' ? 'border-color-7' : ''
                                }`}
                            onClick={() => handleButtonClick('ctgan')}
                        >
                            <h2 className="text-xl font-bold">CTGAN</h2>
                            <p className="text-sm">AI model for tabular data synthesis.</p>
                        </button>
                        <button
                            className={`bg-black border-2 text-left my-[10px] p-[10px] ${selectedModel === 'dgan' ? 'border-color-7' : ''
                                }`}
                            onClick={() => handleButtonClick('dgan')}
                        >
                            <h2 className="text-xl font-bold">DGAN</h2>
                            <p className="text-sm">AI model for time-series data synthesis</p>
                        </button>
                        {alert && (
                            <p className="text-red-500">{alert}</p>
                        )}
                        <div className="flex justify-center">
                            <button
                                onClick={handleSelectModel}
                                className="bg-color-7 text-white text-[14px] px-6 py-2 mt-4 border-white rounded-md"
                            >
                                Continue
                            </button>
                        </div>
                    </div>

                    {/* <button onClick={handleSelectModel} className="bg-purple-500  my-4  text-white text-[14px] px-6 py-2 mt-[10px] border-white rounded-md">Next</button> */}
                </div>
            )}
            {/* Model Selection Ends */}
        </div>
    );
}

export default SelectModel;

