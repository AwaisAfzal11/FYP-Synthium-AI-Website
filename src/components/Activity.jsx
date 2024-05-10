// import { IoIosArrowForward } from 'react-icons/io'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { FaClipboardList } from "react-icons/fa";
import { BsFillFileBarGraphFill } from "react-icons/bs";
import { GrConfigure } from "react-icons/gr";
import CodeEditor from './CodeEditor';



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
            <div className="flex  ">
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


                    {setshowSettingDropdown && (
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
                                        <p className="text-sm text-white">A human read-able title for your project</p>
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
                                        <p className="text-sm text-white">A Brief Description of your project.</p>
                                    </div>                                
                                </div>

                                <hr className="mb-[30px] opacity-70 border border-color-7" />
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

                    {/* for model name  */}
                    <div>
                        <div>
                            <p className='text-[18px] mb-2'>Model name</p>
                            <h1 className='font-bold text-[24px] mb-2'>d-gan</h1>
                            <button className="my-4  bg-red-500 text-white text-[14px] p-3 mt-[15px] border-white rounded-md">Cancel Training</button>
                        </div>
                    </div>

                    <div>
                        <div className="flex flex-row gap-[0px] mt-8 mb-2  py-8">

                            {/* Downlaod */}
                            <button onClick={() => handleButtonClick('Downloads')} className="px-[20px] flex text-[25px] flex-row gap-1 border p-2 hover hover:bg-purple-800">
                                <FaClipboardList className='mx-[10px]' />  Downloads
                            </button>
                            {openButton === 'Downloads' && (
                                <div className="absolute   border border-gray-200 my-[80px] gap-5">
                                    <h1 className='text-[24px] m-[10px]'>Records</h1>
                                    {/* All functionality */}
                                    <div className=' mb-5 border border-gray-200 grid grid-cols-3'>
                                        <div className='flex flex-col'><h1>Results</h1>
                                            <p>file name</p>
                                        </div>
                                        <div className='mr-[24px]'><h1>Created on</h1> <p>12/12/23</p></div>
                                        <div><h1>Status</h1> <p>Done</p></div>

                                    </div>

                                    <h1 className='text-[24px] m-[10px]'>Addtional Downloads</h1>
                                    {/* All functionality */}
                                    <div className='grid grid-cols-3'>
                                        <div className=''>
                                            <div className='flex flex-row gap-10 my-2'>
                                                <h1>pagkage_log.json</h1> <button className='border border-purple-500'>Download</button>
                                            </div>
                                            <div className='flex flex-row gap-10 my-2'>
                                                <h1>pagkage_log.json</h1> <button className='border border-purple-500'>Download</button>
                                            </div>
                                            <div className='flex flex-row gap-10'>
                                                <h1>pagkage_log.json</h1> <button className='border border-purple-500'>Download</button>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            )}

                            {/* Config */}
                            <button onClick={() => handleButtonClick('Config')} className=" px-[20px] border gap-2 flex flex-row p-2 text-[25px] hover hover:bg-purple-800">
                                <GrConfigure className='mt-[2px]' />  Config
                            </button>
                            {openButton === 'Config' && (
                                <div className="absolute border w-[60%] border-gray-200 p-2 my-[80px]">
                                    <CodeEditor />
                                </div>
                            )}

                            {/* Report */}
                            <button onClick={() => handleButtonClick('Report')} className="flex text-[25px] flex-row px-[20px] gap-1  border p-2 hover hover:bg-purple-800">
                                <BsFillFileBarGraphFill className='px-[2px]' /> Report
                            </button>
                            {openButton === 'Report' && (
                                <div className="absolute border border-gray-200 p-[10px] my-[80px]">
                                    <h1>Synthetic Quality Report</h1>
                                </div>
                            )}

                        </div>
                    </div>


                </div>
            </div>
        </>

    )
}

export default Activity