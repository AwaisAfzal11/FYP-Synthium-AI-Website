import { useState, useEffect } from 'react';
import { FaClipboardList } from "react-icons/fa";
import { BsFillFileBarGraphFill } from "react-icons/bs";
import { GrConfigure } from "react-icons/gr";
import { IoDownloadOutline } from "react-icons/io5";
// import CodeEditor from './CodeEditor';
import ConfigEditor from './ConfigCodeEditor';
import { CiClock2 } from "react-icons/ci";
import ProjectLogs from './ProjectLogs';
import TableDataArtifact from './TableDataArtifact';

import Spinner from "./Spinner";
import { CustomSpeedometer, D3Speedometer } from './AllSpeedometers';


import { get_data_artifact_metadata, get_project_synthetic_data_artifacts_metadata, get_project, get_model_config } from '../utils/backend_api';
import { element_loader_spinner } from '../utils/visual_utils';
import moment from 'moment';


const ProjectLander = (props) => {
    const [projectData, setProjectData] = useState(props.projectData);
    const [get_project_IntervalId, set_get_project_IntervalId] = useState(null);
    const [data_artifact_metadata, set_data_artifact_metadata] = useState(null);
    const [model_config_code, set_model_config_code] = useState(null);
    const [openButton, setOpenButton] = useState("Downloads");
    const [showSettingDropdown, setShowSettingDropdown] = useState(false);
    const [showModelDropdown, setShowModelDropdown] = useState(true);
    const [syntheticDataArtifactsMetadata, setSyntheticDataArtifactsMetadata] = useState(null);
    const [get_data_artifact_metadata_loading, set_get_data_artifact_metadata_Loading] = useState(true);
    const [get_model_config_code_loading, set_get_model_config_code_Loading] = useState(true);
    const [syntheticDataArtifactsMetadata_loading, set_syntheticDataArtifactsMetadata_Loading] = useState(true);

    // spinner button 
    // for spinner svg and button 
    const [isLoadingReport, setIsLoadingReport] = useState(false);
    const [isLoadingDownload, setIsLoadingDownload] = useState(false);

    const handleReportClick = () => {
        setIsLoadingReport(true);
        // Simulate an API call or some other action
        setTimeout(() => {
            setIsLoadingReport(false);
        }, 3000);
    };

    const handleDownloadClick = () => {
        setIsLoadingDownload(true);
        // Simulate an API call or some other action
        setTimeout(() => {
            setIsLoadingDownload(false);
        }, 3000);
    };

    const handleButtonClick = (button) => {
        // setOpenButton(openButton === button ? null : button);
        setOpenButton(button);
    };

    const handleSettingClick = () => {
        setShowSettingDropdown(true);
        setShowModelDropdown(false);
    };

    const handleModelClick = () => {
        setShowModelDropdown(true);
        setShowSettingDropdown(false);
    };

    // Refreshes projectData for a specific time interval
    useEffect(() => {
        const fetchProjectData = () => {
            const accessToken = sessionStorage.getItem('access_token');

            get_project(accessToken, projectData.project_id)
                .then((response) => {
                    console.log("Project Data Fetched Successfully...");
                    console.log(response);
                    setProjectData(response.data);

                    if (response.data.status !== "training") {
                        clearInterval(get_project_IntervalId);
                    }
                })
                .catch((error) => {
                    console.error(error);
                    if (error.response && error.response.status === 204) {
                        console.log(`Project with id ${projectData.project_id} does not exist!`);
                    }
                });
        };

        if (projectData.status === "training") {
            const id = setInterval(fetchProjectData, 5000);
            set_get_project_IntervalId(id);
        }

        return () => {
            clearInterval(get_project_IntervalId);
        };
    }, [projectData.project_id, projectData.status, get_project_IntervalId]);

    // Fetch Data Artifacts Metadata
    useEffect(() => {
        const accessToken = sessionStorage.getItem('access_token');
        get_data_artifact_metadata(accessToken, projectData.project_id)
            .then((response) => {
                // Token is valid, continue on the same page
                console.log("Model Config Fetched Successfully...");
                console.log(response);
                set_data_artifact_metadata(response.data);
                set_get_data_artifact_metadata_Loading(false); // Set loading to false after successful authentication
            })
            .catch((error) => {
                console.error(error);
                set_get_data_artifact_metadata_Loading(false); // Set loading to false after authentication check
            });
    });

    // Fetch Synthetic Data Artifacts
    useEffect(() => {
        const accessToken = sessionStorage.getItem('access_token');
        get_project_synthetic_data_artifacts_metadata(accessToken, projectData.project_id)
            .then((response) => {
                // Token is valid, continue on the same page
                console.log("Model Config Fetched Successfully...");
                console.log(response);
                setSyntheticDataArtifactsMetadata(response.data.synthetic_data_artifacts);
                set_syntheticDataArtifactsMetadata_Loading(false); // Set loading to false after successful authentication
            })
            .catch((error) => {
                console.error(error);
                set_syntheticDataArtifactsMetadata_Loading(false); // Set loading to false after authentication check
            });
    });

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
                    set_model_config_code((JSON.stringify(parsedJson, null, 2)));
                } catch (error) {
                    // setCode(response.data.ModelConfig_data.replace(/'/g, '"'));
                    set_model_config_code(response.data.ModelConfig_data);
                }
                set_get_model_config_code_Loading(false); // Set loading to false after successful authentication
            })
            .catch((error) => {
                console.error(error);
                set_get_model_config_code_Loading(false); // Set loading to false after authentication check
            });
    });


    //capitalize only the first letter of the string. 
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div className=''>
            <h1 className='text-[36px] mt-[15px]'>{projectData.name}</h1>
            {/* model and setting button */}
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

            {get_data_artifact_metadata_loading && element_loader_spinner()}

            {!get_data_artifact_metadata_loading && showModelDropdown && (
                <div className=''>
                    <div className='border border-gray-500'>
                        {/* 2 Divs: Model name and Model description  */}
                        <div className='border border-gray-500'>
                            <div className='flex flex-row justify-between'>
                                <h1 className='order-1 my-[10px]'>Model name</h1>
                                <button className='order-2 text-[15px] my-[10px]'>user updated {moment.parseZone(projectData.updated_on).fromNow()}</button>
                            </div>
                            <p className='text-[25px]'>{projectData.modelType.toUpperCase()}</p>
                        </div>

                        <div className='flex flex-row justify-between'>
                            <div className='ml-2 mt-2'>
                                <p className='mb-2'>Status</p>
                                {(() => {
                                    if (projectData.status == "completed") {
                                        return (
                                            <button className='bg-green-500  rounded-full p-[3px] text-[15px]'>{capitalizeFirstLetter(projectData.status)}</button>
                                        )
                                    } else {
                                        return (
                                            <button className='bg-yellow-500  rounded-full p-[3px] text-[15px]'>{capitalizeFirstLetter(projectData.status)}</button>
                                        )
                                    }
                                })()}
                            </div>

                            <div className='ml-2 mt-2'>
                                <p className='mb-2'>Model Type</p>
                                <p>{projectData.modelType.toUpperCase()}</p>
                            </div>
                            <div className='ml-2 mt-2'>
                                <p className='mb-2'>Training Time</p>
                                <p>{Math.floor(projectData.modelTraining_time / 60)} mins</p>
                            </div>
                            <div className='mr-2 mt-2'>
                                <p className='mb-2'>Data Source</p>
                                <p>{data_artifact_metadata.original_filename}</p>
                            </div>
                        </div>
                    </div>

                    {/* 4 main buttons: Download, Logs, Config, */}
                    <div className="flex flex-row overflow-hidden ">
                        <button onClick={() => handleButtonClick('Downloads')} className=" mt-7 px-[20px] flex text-[25px] flex-row gap-1 border p-2 hover hover:bg-purple-800">
                            <FaClipboardList className='mx-[10px]' /> Downloads
                        </button>
                        {openButton === 'Downloads' && (
                            <div className="absolute mt-[80px] gap-5 w-[60%]">
                                {/* <h1 className=''>Synthetic Data Records</h1> */}

                                {syntheticDataArtifactsMetadata_loading && element_loader_spinner()}

                                {!syntheticDataArtifactsMetadata_loading && (
                                    syntheticDataArtifactsMetadata.map((syntheticDataArtifact) => (
                                        <p key={syntheticDataArtifact.synthetic_data_artifact_id} value={syntheticDataArtifact.synthetic_data_artifact_id}>
                                            {syntheticDataArtifact.synthetic_data_artifact_id + syntheticDataArtifact.file_extension}
                                        </p>
                                    ))
                                )}

                                {/*table content will be placed here  */}
                                <div>
                                    <TableDataArtifact />
                                </div>
                                {/*table content will be placed here  */}

                                <h1 className='text-[24px] m-[10px]'>Additional Downloads</h1>
                                <div className='flex flex-col'>
                                    <div className='flex flex-row justify-between border border-gray-500'>
                                        <h1 className='order-1 my-[10px]'>package_log.json</h1>
                                        <button className='order-2 text-[25px] my-[10px]'><IoDownloadOutline /></button>
                                    </div>

                                </div>
                            </div>


                        )}

                        <button onClick={() => handleButtonClick('Logs')} className=" mt-7 px-[20px] border gap-2 flex flex-row p-2 text-[25px] hover hover:bg-purple-800">
                            <CiClock2 className='mt-[2px]' /> Logs
                        </button>
                        {openButton === 'Logs' && (
                            <div className="absolute pt-9 w-[60%] p-2 my-[60px] ">
                                <ProjectLogs projectData={projectData} />
                            </div>
                        )}

                        <button onClick={() => handleButtonClick('Config')} className=" mt-7  px-[20px] border gap-2 flex flex-row p-2 text-[25px] hover hover:bg-purple-800">
                            <GrConfigure className='mt-[2px]' /> Config
                        </button>
                        {openButton === 'Config' && (
                            <div className="absolute  w-[60%]  p-2 my-[80px]">
                                {get_model_config_code_loading && element_loader_spinner()}

                                {!get_model_config_code_loading && (
                                    <ConfigEditor code={model_config_code} />
                                )}
                            </div>
                        )}


                        <button onClick={() => handleButtonClick('Report')} className="mt-7 flex text-[25px] flex-row px-[20px] gap-1 border p-2 hover hover:bg-purple-800">
                            <BsFillFileBarGraphFill className='px-[2px]' /> Report
                        </button>
                        {openButton === 'Report' && (
                            <div className="absolute  my-[80px]">

                                <div className="text-white w-[60%] flex flex-col items-center">
                                    <h1 className="mt-[20px]">Quality Score Speedometer</h1>
                                    <CustomSpeedometer value={75} />
                                    
                                </div>

                                {/* Quality score speedometer */}
                                <div className="mt-[-70px] flex flex-row">
                                    <div className=" rounded">
                                        <div className="text-white bg-whites">
                                            <h1>Quality Score</h1>
                                            <D3Speedometer score={50} />
                                        </div>
                                    </div>
                                    <div className="mt-2 p-4 rounded">
                                        <div className="text-white bg-whites">
                                            <h1>Quality Score</h1>
                                            <D3Speedometer score={50} />
                                        </div>
                                    </div>
                                    <div className="mt-2 p-4 rounded">
                                        <div className="text-white bg-whites">
                                            <h1>Quality Score</h1>
                                            <D3Speedometer score={50} />
                                        </div>
                                    </div>
                                </div>
                                {/* Quality score speedometer */}

                                {/* 2 buttons  */}
                                <div className="flex ">
                                    <button
                                        type="button"
                                        className="bg-purple-500 hover:bg-purple-700 flex flex-row text-white font-bold py-2 px-4 rounded mr-2"
                                        onClick={handleReportClick}
                                    >
                                        <Spinner isLoading={isLoadingReport} />
                                        View quality report
                                    </button>
                                    <button
                                        type="button"
                                        className="bg-purple-500 hover:bg-purple-700 flex flex-row text-white font-bold py-2 px-4 rounded mr-2"
                                        onClick={handleDownloadClick}
                                    >
                                        <Spinner isLoading={isLoadingDownload} />
                                        Download report
                                    </button>


                                </div>

                                {/* 2 buttons  */}


                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectLander;
