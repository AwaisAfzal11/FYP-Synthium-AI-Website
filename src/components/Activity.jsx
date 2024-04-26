import { IoIosArrowForward } from 'react-icons/io'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { FaClipboardList } from "react-icons/fa";
import { BsFillFileBarGraphFill } from "react-icons/bs";
import { GrConfigure } from "react-icons/gr";




function Activity() {

    const [openButton, setOpenButton] = useState(null);

    const handleButtonClick = (button) => {
        setOpenButton(openButton === button ? null : button);
    };
    const [setshowSettingDropdown, setsetshowSettingDropdown] = useState(false);
    const [setshowModelDropdown, setsetshowModelDropdown] = useState(true);
    const navigate = useNavigate();

    const handleSettingClick = () => {
        setsetshowSettingDropdown(!setshowSettingDropdown);
        setsetshowModelDropdown(false);
    };

    const handleModelClick = () => {
        setsetshowModelDropdown(!setshowModelDropdown);
        setsetshowSettingDropdown(false);
    };




    return (
        <>
            <Navbar />
            <div className="mx-auto ml-[25%] w-[70%] mr-[50px]">
                <Sidebar />
                <div>
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

                    {/* for model name  */}
                    <div>
                        <div>
                            <p className='text-[18px] mb-2'>Model name</p>
                            <h1 className='font-bold text-[24px] mb-2'>d-gan</h1>
                            <button className="my-4  bg-red-500 text-white text-[14px] p-3 mt-[15px] border-white rounded-md">Cancel Training</button>
                        </div>
                    </div>
                    {/* for model name  */}

                    {/* 3 main buttons */}
                    <div>
                        <div className="flex flex-row gap-[0px] mt-8 mb-2  py-8">
                            <button onClick={() => handleButtonClick('Downloads')} className="px-[20px] flex text-[25px] flex-row gap-1 border p-2 hover hover:bg-purple-800">
                            <FaClipboardList className='mx-[10px]' />  Downloads
                            </button>
                            {openButton === 'Downloads' && (
                                <div className="absolute   border border-gray-200 my-[80px] gap-5">
                                    <h1 className='text-[24px] m-[10px]'>Records</h1>
                                    <div className='grid grid-cols-3'>
                                        <div>Result</div>
                                        <div className='mr-[24px]'>Created on</div>
                                        <div>Status</div>

                                    </div>
                                </div>
                            )}

                            <button onClick={() => handleButtonClick('Config')} className=" px-[20px] border gap-2 flex flex-row p-2 text-[25px] hover hover:bg-purple-800">
                                <GrConfigure className='mt-[2px]' />  Config
                            </button>
                            {openButton === 'Config' && (
                                <div className="absolute   border border-gray-200 p-2 my-[80px]">
                                    <h1>Config file Code</h1>
                                </div>
                            )}

                            <button onClick={() => handleButtonClick('Report')} className="flex text-[25px] flex-row px-[20px] gap-1  border p-2 hover hover:bg-purple-800">
                              <BsFillFileBarGraphFill className='px-[2px]'/> Report
                            </button>
                            {openButton === 'Report' && (
                                <div className="absolute border border-gray-200 p-[10px] my-[80px]">
                                    <h1>Synthetic Quality Report</h1>
                                </div>
                            )}

                        </div>
                    </div>

                    {/* 3 main buttons */}

                    {/* <div className="flex flex-row gap-0 mt-8 mb-2">
                        <button onClick={handleDownloadClick} className="hover hover:underline">
                            Downloads
                        </button>
                        <button onClick={handleConfigClick} className="hover hover:underline">
                            Config
                        </button>
                        <button onClick={handleControlClick} className="hover hover:underline">
                            Report
                        </button>
                    </div> */}


                    {/* 3 main buttons */}



                </div>
            </div>
        </>

    )
}

export default Activity