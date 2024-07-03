import { IoIosArrowForward } from 'react-icons/io'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
// import Navbar from './Navbar';
// import Sidebar from './Sidebar';
import CodeEditor from './CodeEditor';
// import CodeEditor from "@monaco-editor/react";

import { element_loader_spinner } from '../utils/visual_utils';
import { get_model_config, update_pending_project } from '../utils/backend_api';


function Configuration(props) {
    const [projectData] = useState(props.projectData);
    const [setshowSettingDropdown, setsetshowSettingDropdown] = useState(false);
    const [setshowModelDropdown, setsetshowModelDropdown] = useState(true);
    const [code, setCode] = useState(null); // Initialize code state
    const [get_model_config_loading, set_get_model_config_Loading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [disableButton, setDisableButton] = useState(false);
    const navigate = useNavigate();

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Fetch Model Configuration File
    useEffect(() => {
        const accessToken = sessionStorage.getItem('access_token');
        get_model_config(accessToken, projectData.project_id)
            .then((response) => {
                // Token is valid, continue on the same page
                console.log("Model Config Fetched Successfully...");
                console.log(response);
                try {
                    const parsedJson = JSON.parse(response.data.ModelConfig_data);
                    setCode((JSON.stringify(parsedJson, null, 2)));
                } catch (error) {
                    // setCode(response.data.ModelConfig_data.replace(/'/g, '"'));
                    setCode(response.data.ModelConfig_data);
                }
                set_get_model_config_Loading(false); // Set loading to false after successful authentication
            })
            .catch((error) => {
                console.error(error);
                set_get_model_config_Loading(false); // Set loading to false after authentication check
            });
    }, []);


    const handleSettingClick = () => {
        setsetshowSettingDropdown(!setshowSettingDropdown);
        setsetshowModelDropdown(false);
    };

    const handleModelClick = () => {
        setsetshowModelDropdown(!setshowModelDropdown);
        setsetshowSettingDropdown(false);
    };

    // const handleSelectModel = () => {
    //     navigate('/dashboard/newproject/dataartifacts/configuration/activity');
    // };

    const updatePendingProject = async () => {
        setIsLoading(true);
        const accessToken = sessionStorage.getItem('access_token');
        const modelConfig_data_string = JSON.stringify(JSON.parse(code));
        try {
            const response = await update_pending_project(accessToken, projectData.project_id, modelConfig_data_string);
            console.log("Updated Pending Project Successfully...");
            console.log(response);
            
            // Wait for 5 seconds
            await sleep(5000);
            
            // Reload the page
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };



    return (
        <div>
            <h1 className='text-[36px] mt-[15px]'>{projectData.name}</h1>
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
                                    className="w-[100%] mt-[0px] mb-[7px] md:w-[270%] border border-gray-300 rounded-md px-3 py-2  text-white "
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
                                    className="  w-[100%] mt-[0px] mb-[7px] md:w-[330%] border border-gray-300 rounded-md px-3 py-2  text-white "
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
                                    className=" w-[100%] mt-[0px] mb-[7px] md:w-[320%] border border-gray-300 rounded-md px-3 py-2  text-white "
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
                            <p className='mt-4'>Deleting your project will delete all  models, data artifacts, and members. <b>Once completed, this action cannot be undone.</b> </p>

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
                    <div className=' text-color-7' style={{ borderBottom: '4px solid', paddingBottom: '2px', display: 'inline-block' }}>Step-3 Configuration</div>
                </div>
            </div>
            {/* tab view of project steps  */}
            <div className='text-[24px] py-[30px]'>
                <h1 className='pb-1'> <b>Almost Done!</b></h1>                    
                <h3 className='text-[18px] my-3'>We've chosen a model configuration based on your selections.</h3>
            </div>

            {/* Code Editor here */}
            {get_model_config_loading && element_loader_spinner()}

            {!get_model_config_loading && (
                <div className="flex-1 w-[100%]">
                    <div className='w-[100%]'>
                        <CodeEditor code={code} setCode={setCode} setDisableButton={setDisableButton}/>
                    </div>
                </div>
            )}
            {/* Code Editor here */}

            <div className='flex justify-center items-center mb-[30px]'>
                {/* <button onClick={updatePendingProject} className="bg-color-7 py-[10px] px-[15px] text-white text-[20px]  mb-[15px]  mt-[10px] border-white rounded-md">Continue</button> */}
                <button
                      onClick={updatePendingProject}
                      className={`bg-color-7 py-[10px] px-[15px] text-white text-[20px]  mb-[15px]  mt-[10px] border-white rounded-md ${disableButton ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={disableButton}
                    >
                      {isLoading ? (
                        <>
                          <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                          Loading...
                        </>
                      ) : (
                        'Continue'
                      )}
                    </button>
            </div>

        </div>
    )
}

export default Configuration