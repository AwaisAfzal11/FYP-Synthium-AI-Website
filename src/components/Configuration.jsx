import { IoIosArrowForward } from 'react-icons/io'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import CodeEditor from './CodeEditor';
// import CodeEditor from "@monaco-editor/react";


function Configuration() {
    const [setshowSettingDropdown, setsetshowSettingDropdown] = useState(false);
    const [setshowModelDropdown, setsetshowModelDropdown] = useState(true);
    // const [code, setCode] = useState(''); // Initialize code state
    const navigate = useNavigate();

    // const handleChange = (value) => {
    //     setCode(value);
    // };


    const handleSettingClick = () => {
        setsetshowSettingDropdown(!setshowSettingDropdown);
        setsetshowModelDropdown(false);
    };

    const handleModelClick = () => {
        setsetshowModelDropdown(!setshowModelDropdown);
        setsetshowSettingDropdown(false);
    };

    const handleSelectModel = () => {
        navigate('/dashboard/newproject/dataartifacts/configuration/activity');
    };



    return (
        <>
            <Navbar />
            <div className="flex ">
                <Sidebar />
                <div className='mx-auto  w-[70%]'>
                    <h1 className='text-[36px] mt-[15px]'>Project-Name</h1>
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
                            <div className='border rounded-md border-purple-500'>
                                <h2 className='ml-5 mt-5 text-[24px] font-bold'>Project Details</h2>
                                <div className='flex flex-row ml-5 mt-5 text-[14px] gap-10'>
                                    <div>
                                        <h3>Display Name</h3>
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Enter your Project Name"
                                            className="w-[100%] mt-[0px] mb-[7px] md:w-[290%] border border-gray-300 rounded-md px-3 py-2  text-white "
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
                                            className="  w-[100%] mt-[0px] mb-[7px] md:w-[360%] border border-gray-300 rounded-md px-3 py-2  text-white "
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
                                            className=" w-[100%] mt-[0px] mb-[7px] md:w-[340%] border border-gray-300 rounded-md px-3 py-2  text-white "
                                        />
                                        <p>A brief description of the project.</p>

                                    </div>
                                </div>
                                <hr className="mb-[30px] opacity-70 border border-purple-500" />
                                <button className="bg-purple-500 ml-4 mb-4  text-white text-[14px] px-6 py-2 mt-[-10px] border-white rounded-md">Save</button>
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

                    {/* tab view of project steps  */}
                    <div className="mx-[0px] mt-[30px] mb-[20px] flex flex-col border-gray-300 border rounded-lg rounded-tr-[30px] rounded-br-[0px] rounded-tl-[0px] rounded-bl-[30px]">
                        <div className='flex flex-row gap-10 my-10 mx-4'>
                            <div >Step-1 Model</div>
                            <IoIosArrowForward />
                            <div >Step-2 Input Data</div>
                            <IoIosArrowForward />
                            <div className=' text-purple-500' style={{ borderBottom: '4px solid', paddingBottom: '2px', display: 'inline-block' }}>Step-3 Configuration</div>
                        </div>
                    </div>
                    {/* tab view of project steps  */}
                    <div className='text-[24px] py-[30px]'>
                        <h1 className='pb-1'> <b>Almost Done!</b></h1>
                        <h3 className='text-[18px] my-3'>We've chosen a model configuration based on your selections.</h3>
                    </div>

                    {/* Code Editor here */}
                    <div className="flex-1  w-[100%]">
                        <div className='w-[100%]'>
                            <CodeEditor />
                        </div>
                    </div>
                    {/* Code Editor here */}

                    <div className='flex justify-center items-center mb-[30px]'>
                        <button onClick={handleSelectModel} className="bg-purple-500 py-[10px] px-[15px] text-white text-[20px]  mb-[15px]  mt-[10px] border-white rounded-md">Continue</button>
                    </div>

                </div>
            </div>
        </>

    )
}

export default Configuration