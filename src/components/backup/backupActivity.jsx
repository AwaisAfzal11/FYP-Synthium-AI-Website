import { useState } from 'react';
import { FaClipboardList } from "react-icons/fa";
import { BsFillFileBarGraphFill } from "react-icons/bs";
import { GrConfigure } from "react-icons/gr";
import { IoDownloadOutline } from "react-icons/io5";
import Navbar from './Navbar';
import Sidebar from './Sidebar';
// import CodeEditor from './CodeEditor';
import ConfigEditor from './ConfigCodeEditor';
import { CiClock2 } from "react-icons/ci";
import ActivityContent from './ActivityContent';


const Activity = () => {
    const [openButton, setOpenButton] = useState(null);
    const [showSettingDropdown, setShowSettingDropdown] = useState(false);
    const [showModelDropdown, setShowModelDropdown] = useState(true);

    const handleButtonClick = (button) => {
        setOpenButton(openButton === button ? null : button);
    };
    
    const handleSettingClick = () => {
        setShowSettingDropdown(true);
        setShowModelDropdown(false);
    };

    const handleModelClick = () => {
        setShowModelDropdown(true);
        setShowSettingDropdown(false);
    };

    return (
        <>
            <Navbar />
            <div className="flex">
                <Sidebar />
                <div className='mx-auto w-[70%]'>
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

                    {showSettingDropdown && (
                        <div className=''>
                            <div className='border rounded-md border-color-7'>
                                <h2 className='ml-5 mt-5 text-[24px] font-bold'>Project Details</h2>
                                <div className=' flex flex-row ml-5 mt-5 text-[14px] gap-10'>
                                    <div>
                                        <h3>Display Name</h3>
                                    </div>
                                    <div className="w-[100%] ml-[0px] max-w-md sm:max-w-lg md:max-w-xl lg:max-w-3xl">
                                        <input
                                            type="text"
                                            placeholder="Enter your Project Name"
                                            className="w-full mt-0 mb-2 border border-gray-300 rounded-md px-3 py-2 text-white bg-black"
                                        />
                                        <p className="text-sm text-white">A human readable title for your project</p>
                                    </div>
                                </div>
                                <div className=' flex flex-row ml-5 mt-5 text-[14px] gap-10'>
                                    <div>
                                        <h3>Name</h3>
                                    </div>
                                    <div className="w-[100%] sm:ml-[30px] lg:ml-[60px] max-w-md sm:max-w-lg md:max-w-xl lg:max-w-3xl">
                                        <input
                                            type="text"
                                            className="w-full mt-0 mb-2 border border-gray-300 rounded-md px-3 py-2 text-white bg-black"
                                        />
                                        <p className="text-sm text-white">Project name should be unique</p>
                                    </div>
                                </div>
                                <div className=' flex flex-row ml-5 mt-5 text-[14px] gap-10 mb-6'>
                                    <div>
                                        <h3>Description</h3>
                                    </div>
                                    <div className="w-[100%] sm:ml-[10px] lg:ml-[20px] max-w-md sm:max-w-lg md:max-w-xl lg:max-w-3xl">
                                        <input
                                            type="text"
                                            className="w-full mt-0 mb-2 border border-gray-300 rounded-md px-3 py-2 text-white bg-black"
                                        />
                                        <p className="text-sm text-white">A brief description of your project.</p>
                                    </div>
                                </div>
                                <hr className="mb-[30px] opacity-70 border border-color-7" />
                                <button className="bg-color-7 ml-4 mb-4 text-white text-[14px] px-6 py-2 mt-[-10px] border-white rounded-md">Save</button>
                            </div>
                            <div className="border rounded-md border-red-500 my-4">
                                <div className='ml-4 text-[18px] mt-4'>
                                    <h1 className='text-[24px]'>Permanent Options</h1>
                                    <p className='mt-4'>Deleting your project will delete all models, data artifacts, and members. <b>Once completed, this action cannot be undone.</b> </p>
                                    <button className="my-4 bg-red-500 text-white text-[14px] p-3 mt-[15px] border-white rounded-md">Delete this Project</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {showModelDropdown && (
                        <div>

                            <div className='border border-gray-500'>
                                {/* 2 Divs: Model name and Model description  */}
                                <div className='border border-gray-500'>
                                    <div className='flex flex-row justify-between'>
                                        <h1 className='order-1 my-[10px]'>Model name</h1>
                                        <button className='order-2 text-[15px] my-[10px]'>user updated 15s ago</button>
                                    </div>
                                    <p className='text-[25px]'> CT-GAN</p>
                                </div>

                                <div className='flex flex-row justify-between'>
                                    <div className='ml-2 mt-2'>
                                        <p className='mb-2'>Status</p>
                                        <button className='bg-green-400 opacity-50 rounded-full p-1 text-[10px]'>Completed</button>
                                    </div>
                                    <div className='ml-2 mt-2'>
                                        <p className='mb-2'>Model Type</p>
                                        <p>CT-GAN</p>
                                    </div>
                                    <div className='ml-2 mt-2'>
                                        <p className='mb-2'>Training Time</p>
                                        <p>45sec</p>
                                    </div>
                                    <div className='mr-2 mt-2'>
                                        <p className='mb-2'>Data Source</p>
                                        <p>Weather Data</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-row gap-[0px] mt-8 mb-[200px] py-8">
                                <button onClick={() => handleButtonClick('Downloads')} className="px-[20px] flex text-[25px] flex-row gap-1 border p-2 hover hover:bg-purple-800">
                                    <FaClipboardList className='mx-[10px]' /> Downloads
                                </button>
                                {openButton === 'Downloads' && (
                                    <div className="absolute border border-gray-200 mt-[80px] gap-5 w-[70%]">
                                        <h1 className='text-[30px] my-[10px]'>Records</h1>
                                        <div className='mb-5 border border-gray-200 grid grid-cols-3'>
                                            <div className='flex flex-col my-[10px] ml-[10px]'>
                                                <h1>Results</h1>
                                                <p>file name</p>
                                            </div>
                                            <div className='mr-[24px] my-[10px] ml-[10px]'>
                                                <h1>Created on</h1>
                                                <p>12/12/23</p>
                                            </div>
                                            <div className='my-[10px] ml-[10px]'>
                                                <h1>Status</h1>
                                                <p>Done</p>
                                            </div>
                                        </div>
                                        <h1 className='text-[24px] m-[10px]'>Additional Downloads</h1>
                                        <div className='flex flex-col'>
                                            <div className='flex flex-row justify-between border border-gray-500'>
                                                <h1 className='order-1 my-[10px]'>package_log.json</h1>
                                                <button className='order-2 text-[25px] my-[10px]'><IoDownloadOutline /></button>
                                            </div>
                                            <div className='flex flex-row justify-between border border-gray-500'>
                                                <h1 className='order-1 my-[10px]'>package_log.json</h1>
                                                <button className='order-2 text-[25px] my-[10px]'><IoDownloadOutline /></button>
                                            </div>
                                            <div className='flex flex-row justify-between border border-gray-500'>
                                                <h1 className='order-1 my-[10px]'>package_log.json</h1>
                                                <button className='order-2 text-[25px] my-[10px]'><IoDownloadOutline /></button>
                                            </div>
                                            <div className='flex flex-row justify-between border border-gray-500'>
                                                <h1 className='order-1 my-[10px]'>package_log.json</h1>
                                                <button className='order-2 text-[25px] my-[10px]'><IoDownloadOutline /></button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <button onClick={() => handleButtonClick('Activity')} className="px-[20px] border gap-2 flex flex-row p-2 text-[25px] hover hover:bg-purple-800">
                                    <CiClock2 className='mt-[2px]' /> Activity
                                </button>
                                {openButton === 'Activity' && (
                                    <div className="absolute border w-[60%] border-gray-200 p-2 my-[80px]">

                                        <ActivityContent/>

                                    </div>
                                )}

                                <button onClick={() => handleButtonClick('Config')} className="px-[20px] border gap-2 flex flex-row p-2 text-[25px] hover hover:bg-purple-800">
                                    <GrConfigure className='mt-[2px]' /> Config
                                </button>
                                {openButton === 'Config' && (
                                    <div className="absolute border w-[60%] border-gray-200 p-2 my-[80px]">
                                        <ConfigEditor />
                                    </div>
                                )}


                                <button onClick={() => handleButtonClick('Report')} className="flex text-[25px] flex-row px-[20px] gap-1 border p-2 hover hover:bg-purple-800">
                                    <BsFillFileBarGraphFill className='px-[2px]' /> Report
                                </button>
                                {openButton === 'Report' && (
                                    <div className="absolute border border-gray-200 p-[10px] my-[80px]">
                                        <h1>Activity then Result</h1>
                                        <p>import all the items that are visible in Activity-Result-AllSpeedometer content...</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Activity;
