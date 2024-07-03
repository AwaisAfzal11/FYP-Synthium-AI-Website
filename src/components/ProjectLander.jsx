import { useState, useEffect } from 'react';
import { BiLoaderCircle } from "react-icons/bi";
import ConfigEditor from './ConfigCodeEditor';
import ProjectLogs from './ProjectLogs';
import TableDataArtifact from './TableDataArtifact';
import { CustomSpeedometer, D3Speedometer } from './AllSpeedometers';
import { get_data_artifact_metadata, get_project_synthetic_data_artifacts_metadata, get_project, get_model_config, get_synthetic_quality_report, generate_synthetic_data } from '../utils/backend_api';
import { element_loader_spinner } from '../utils/visual_utils';
import moment from 'moment';


const ProjectLander = (props) => {
    const [projectData, setProjectData] = useState(props.projectData);
    const [get_project_IntervalId, set_get_project_IntervalId] = useState(null);
    const [data_artifact_metadata, set_data_artifact_metadata] = useState(null);
    const [generate_synthetic_data_rows, set_generate_synthetic_data_rows] = useState(5000);
    const [model_config_code, set_model_config_code] = useState(null);
    const [openButton, setOpenButton] = useState("Synthetic Data");
    const [showSettingDropdown, setShowSettingDropdown] = useState(false);
    const [showModelDropdown, setShowModelDropdown] = useState(true);
    const [syntheticDataArtifactsMetadata, setSyntheticDataArtifactsMetadata] = useState([]);
    const [syntheticQualityReport, setSyntheticQualityReport] = useState([]);
    const [get_data_artifact_metadata_loading, set_get_data_artifact_metadata_Loading] = useState(true);
    const [get_model_config_code_loading, set_get_model_config_code_Loading] = useState(true);
    const [syntheticDataArtifactsMetadata_loading, set_syntheticDataArtifactsMetadata_Loading] = useState(true);
    const [syntheticQualityReportLoading, setSyntheticQualityReportLoading] = useState(true);
    const [isGenerating, setIsGenerating] = useState(false);

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

    // useEffect(() => {
    //     console.log("Synthetic Data Metadata Recieved", syntheticDataArtifactsMetadata);
    //     set_syntheticDataArtifactsMetadata_Loading(false); // Set loading to false after successful authentication
    // }, [syntheticDataArtifactsMetadata]);

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
            const id = setInterval(fetchProjectData, 10000);
            set_get_project_IntervalId(id);
        }

        return () => {
            clearInterval(get_project_IntervalId);
        };
    }, [projectData.project_id, projectData.status]);

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
    }, [projectData.project_id]);

    // Fetch Synthetic Data Artifacts
    const fetch_generate_synthetic_data = () => {
        const accessToken = sessionStorage.getItem('access_token');
        generate_synthetic_data(accessToken, projectData.project_id, Number(generate_synthetic_data_rows))
            .then((response) => {
                // Token is valid, continue on the same page
                console.log("Synthetic Data Generate Successfully...");
                fetch_synthetic_data_artifacts_metadata();  // To reload the data artifacts
                setIsGenerating(false); // Set loading to false after successful authentication
            })
            .catch((error) => {
                console.error(error);
                setIsGenerating(false); // Set loading to false after successful authentication
            });
    };

    const handleGenerate = () => {
        setIsGenerating(true);
        fetch_generate_synthetic_data();
        // Your generation logic here
        // When done, set isLoading back to false
    };

    // Fetch Synthetic Data Artifacts
    const fetch_synthetic_data_artifacts_metadata = () => {
        const accessToken = sessionStorage.getItem('access_token');
        get_project_synthetic_data_artifacts_metadata(accessToken, projectData.project_id)
            .then((response) => {
                // Token is valid, continue on the same page
                console.log("Synthetic Data Metadatas Fetched Successfully...");
                setSyntheticDataArtifactsMetadata(response.data.synthetic_data_artifacts);
                set_syntheticDataArtifactsMetadata_Loading(false); // Set loading to false after successful authentication
            })
            .catch((error) => {
                console.error(error);
                // set_syntheticDataArtifactsMetadata_Loading(false); // Set loading to false after successful authentication
            });
    };

    useEffect(() => {
        // Call it's function
        fetch_synthetic_data_artifacts_metadata();
    }, [projectData.project_id]);

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
    }, [projectData.project_id]);

    // Fetch Synthetic Quality Report
    useEffect(() => {
        const accessToken = sessionStorage.getItem('access_token');
        get_synthetic_quality_report(accessToken, projectData.project_id)
            .then((response) => {
                // Token is valid, continue on the same page
                console.log("Synthetic Quality Report Fetched Successfully...");
                setSyntheticQualityReport(response.data);
                setSyntheticQualityReportLoading(false); // Set loadingS to false after successful authentication
                // if (response.data.status === 200) {
                //     setSyntheticQualityReportLoading(false); // Set loadingS to false after successful authentication
                // }
            })
            .catch((error) => {
                console.error(error);
                // setSyntheticQualityReportLoading(false); // Set loading to false after authentication check
            });
    }, [projectData.project_id, projectData.status]);


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
                                <h1 className='order-1 my-[10px] ml-2'>Model name</h1>
                                <button className='order-2 justify-items-end text-[15px] my-[10px] mr-2 text-green-500'><span className='mr-5 text-white text-[15px]'>Updated</span><br/>{moment.parseZone(projectData.updated_on).fromNow()}</button>
                            </div>
                            <p className='text-[24px] ml-2 mt-[-30px]'>{projectData.modelType.toUpperCase()}</p>

                            {/* generate 5000 rows */}

                            <div className="flex items-center justify-between my-[20px] mx-[10px]">
                                <div className="flex items-center space-x-4">
                                    <input
                                        type="text"
                                        className="border rounded px-4 py-2"
                                        placeholder='5000...'
                                        value={generate_synthetic_data_rows}
                                        onChange={(event) => set_generate_synthetic_data_rows(event.target.value)}
                                    />
                                    <button 
                                        onClick={handleGenerate}
                                        disabled={isGenerating || projectData.status !== "completed"}
                                        className={`bg-green-600 text-white px-4 py-2 rounded flex items-center justify-center ${
                                            isGenerating || projectData.status !== "completed" ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                    >
                                        {isGenerating ? (
                                            <>
                                            <BiLoaderCircle className="animate-spin mr-2" />
                                            Generating...
                                            </>
                                        ) : projectData.status !== "completed" ? (
                                            'Training in progress...'
                                        ) : (
                                            'Generate'
                                        )}
                                    </button>
                                </div>
                                <div className="flex space-x-8 ml-auto">
                                    <div className="flex items-end flex-col space-x-2 text-green-500">
                                        {
                                            projectData.synthetic_quality_score ? (
                                                <>
                                                    <span className=' text-white'>Quality Score</span>
                                                    <span>{(projectData.synthetic_quality_score * 100).toFixed(2)} / 100</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span className="text-white">Quality Score</span>
                                                    <span>NaN</span>
                                                </>
                                            )
                                        }
                                    </div>
                                    {/* <div className="flex flex-col items-center space-x-2">
                                        <span>Privacy Protection Level</span>
                                        <span>👁️ Normal</span>
                                    </div> */}
                                </div>
                            </div>


                            {/* generate 5000 rows */}


                        </div>

                        <div className='flex flex-row justify-between'>
                            <div className='ml-2 mt-2 mb-2 '>
                                <p className='mb-2'>Status</p>
                                {(() => {
                                    if (projectData.status == "completed") {
                                        return (
                                            <button className='bg-green-500  rounded-full py-[5px] px-[15px] text-[15px]'>{capitalizeFirstLetter(projectData.status)}</button>
                                        )
                                    } else {
                                        return (
                                            <button className='bg-yellow-500  rounded-full py-[5px] px-[15px] text-[15px]'>{capitalizeFirstLetter(projectData.status)}</button>
                                        )
                                    }
                                })()}
                            </div>

                            <div className='ml-2 mt-2'>
                                <p className='mb-4'>Model Type</p>
                                <p>{projectData.modelType.toUpperCase()}</p>
                            </div>
                            <div className='ml-2 mt-2'>
                                <p className='mb-4'>Training Time</p>
                                <p>{(projectData.modelTraining_time / 60).toFixed(1)} mins</p>
                            </div>
                            <div className='mr-2 mt-2'>
                                <p className='mb-4'>Data Source</p>
                                <p>{data_artifact_metadata.original_filename}</p>
                            </div>
                            
                        </div>
                    </div>

                    {/* 4 main buttons: Download, Logs, Config, */}
                    <div className="flex flex-row overflow- ">
                        <button onClick={() => handleButtonClick('Synthetic Data')} className=" mt-5 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"> Synthetic Data </button>

                        {openButton === 'Synthetic Data' && (
                            <div className="absolute mt-[80px] gap-5  w-[60%]">
                                {/* <h1 className=''>Synthetic Data Records</h1> */}

                                {syntheticDataArtifactsMetadata_loading && element_loader_spinner()}

                                {/* {!syntheticDataArtifactsMetadata_loading && (
                                    syntheticDataArtifactsMetadata.map((syntheticDataArtifact) => (
                                        <p key={syntheticDataArtifact.synthetic_data_artifact_id} value={syntheticDataArtifact.synthetic_data_artifact_id}>
                                            {syntheticDataArtifact.synthetic_data_artifact_id + syntheticDataArtifact.file_extension}
                                        </p>
                                    ))
                                )} */}

                                {!syntheticDataArtifactsMetadata_loading && (
                                    // <TableDataArtifact key={JSON.stringify(syntheticDataArtifactsMetadata)} data={syntheticDataArtifactsMetadata}/>
                                    <TableDataArtifact table_data={syntheticDataArtifactsMetadata}/>
                                    // <div>LOL</div>
                                )}

                            </div>


                        )}

                        <button onClick={() => handleButtonClick('Logs')} className="    mt-5 text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                             Logs
                        </button>
                        {openButton === 'Logs' && (
                            <div className="absolute pt-9 w-[60%] p-2 my-[60px] ">
                                <ProjectLogs projectData={projectData} />
                            </div>
                        )}

                        {/* place here */}

                        <button onClick={() => handleButtonClick('Config')} className="mt-5 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                            Config
                        </button>
                        {openButton === 'Config' && (
                            <div className="absolute  w-[60%] px-4 my-[100px] rounded-lg hover:shadow-[15px_0_20px_-5px_#a855f7,_-15px_0_20px_-5px_#d900ff]">
                                {get_model_config_code_loading && element_loader_spinner()}

                                {!get_model_config_code_loading && (
                                    <ConfigEditor code={model_config_code} />
                                )}
                            </div>
                        )}


                        <button onClick={() => handleButtonClick('Report')} className="mt-5 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                             Report
                        </button>
                        {openButton === 'Report' && (
                            <div className="absolute my-[100px] gap-10">
                                {syntheticQualityReportLoading && element_loader_spinner()}

                                {!syntheticQualityReportLoading && (
                                    // Quality score speedometer
                                    <div className="flex flex-row">
                                        <div className="mt-2 p-4 rounded">
                                            <div className="text-white bg-whites">
                                                <h1>Column Shape</h1>
                                                <D3Speedometer score={(syntheticQualityReport.column_shapes*100).toFixed(2)} />
                                            </div>
                                        </div>
                                        <div className="text-white w-[50%] p-[30px] items-center ">
                                            <h1 className="mt-[20px]  ">Synthetic Quality Score</h1>
                                            <CustomSpeedometer value={(projectData.synthetic_quality_score * 100).toFixed(2)} />
                                        </div>
                                        <div className="mt-2 p-4 rounded">
                                            <div className="text-white bg-whites">
                                                <h1>Column Pair Trends</h1>
                                                <D3Speedometer score={(syntheticQualityReport.column_pair_trends*100).toFixed(2)} />
                                            </div>
                                        </div>
                                    </div>
                                )}


                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectLander;


// All Speedometer code
// {/* <div className="absolute ml-[120px] my-[80px]">

// <div className="text-white w-[60%] ml-[130px]  flex flex-col items-center">
//     <h1 className="mt-[20px]">Quality Score Speedometer</h1>
//     <CustomSpeedometer value={75} />

// </div>

// {/* Quality score speedometer */}
// <div className="mt-[-100px] mb-[20px]  flex flex-row">
//     <div className="mt-2 p-4 rounded">
//         <div className="text-white bg-whites">
//             <h1>Quality Score</h1>
//             <D3Speedometer score={90} />
//         </div>
//     </div>
//     <div className="mt-2 p-4 rounded">
//         <div className="text-white bg-whites">
//             <h1>Quality Score</h1>
//             <D3Speedometer score={80} />
//         </div>
//     </div>
//     <div className="mt-2 p-4 rounded">
//         <div className="text-white bg-whites">
//             <h1>Quality Score</h1>
//             <D3Speedometer score={70} />
//         </div>
//     </div>
    
// </div> */}
{/* Quality score speedometer */}

// </div>

// All Speedometer code ends


// 2 Buttons 
                                {/* <div className="flex ">
                                    <button
                                        type="button"
                                        className="bg-purple-500  hover:bg-purple-700 flex flex-row text-white font-bold py-2 px-4 rounded mr-2"
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


                                </div> */}

                                {/* 2 buttons  */}




// <div className="flex flex-row overflow-hidden ">
//                         <button onClick={() => handleButtonClick('Downloads')} className=" mt-7 px-[20px] flex text-[25px] flex-row gap-1 border p-2 hover hover:bg-color-7">
//                             <FaClipboardList className='mx-[10px]' /> Downloads
//                         </button>
//                         {openButton === 'Downloads' && (
//                             <div className="absolute mt-[80px] gap-5 w-[60%]">
//                                 {/* <h1 className=''>Synthetic Data Records</h1> */}

//                                 {syntheticDataArtifactsMetadata_loading && element_loader_spinner()}

//                                 {/* {!syntheticDataArtifactsMetadata_loading && (
//                                     syntheticDataArtifactsMetadata.map((syntheticDataArtifact) => (
//                                         <p key={syntheticDataArtifact.synthetic_data_artifact_id} value={syntheticDataArtifact.synthetic_data_artifact_id}>
//                                             {syntheticDataArtifact.synthetic_data_artifact_id + syntheticDataArtifact.file_extension}
//                                         </p>
//                                     ))
//                                 )} */}

//                                 {!syntheticDataArtifactsMetadata_loading && (
//                                     syntheticDataArtifactsMetadata.map((syntheticDataArtifact) => (
//                                         <div key={syntheticDataArtifact.synthetic_data_artifact_id}>
//                                             <TableDataArtifact
//                                                 syntheticDataArtifactId={syntheticDataArtifact.synthetic_data_artifact_id}
//                                                 fileExtension={syntheticDataArtifact.file_extension}
//                                             />
//                                         </div>
//                                     ))
//                                 )}

//                                 {/*table content will be placed here  */}
//                                 <div>
//                                     {/* <TableDataArtifact /> */}
//                                 </div>
//                                 {/*table content will be placed here  */}

//                                 {/* <h1 className='text-[24px] m-[10px]'>Additional Downloads</h1>
//                                 <div className='flex flex-col'>
//                                     <div className='flex flex-row justify-between border border-gray-500'>
//                                         <h1 className='order-1 my-[10px]'>package_log.json</h1>
//                                         <button className='order-2 text-[25px] my-[10px]'><IoDownloadOutline /></button>
//                                     </div>

//                                 </div> */}
//                             </div>


//                         )}

//                         <button onClick={() => handleButtonClick('Logs')} className=" mt-7 px-[20px] border gap-2 flex flex-row p-2 text-[25px] hover hover:bg-color-7">
//                             <CiClock2 className='mt-[2px]' /> Logs
//                         </button>
//                         {openButton === 'Logs' && (
//                             <div className="absolute pt-9 w-[60%] p-2 my-[60px] ">
//                                 <ProjectLogs projectData={projectData} />
//                             </div>
//                         )}

//                         <button onClick={() => handleButtonClick('Config')} className=" mt-7  px-[20px] border gap-2 flex flex-row p-2 text-[25px] hover hover:bg-color-7">
//                             <GrConfigure className='mt-[2px]' /> Config
//                         </button>
//                         {openButton === 'Config' && (
//                             <div className="absolute  w-[60%]  p-2 my-[80px]">
//                                 {get_model_config_code_loading && element_loader_spinner()}

//                                 {!get_model_config_code_loading && (
//                                     <ConfigEditor code={model_config_code} />
//                                 )}
//                             </div>
//                         )}


//                         <button onClick={() => handleButtonClick('Report')} className="mt-7 flex text-[25px] flex-row px-[20px] gap-1 border p-2 hover hover:bg-color-7">
//                             <BsFillFileBarGraphFill className='px-[2px]' /> Report
//                         </button>
//                         {openButton === 'Report' && (
//                             <div className="absolute ml-[120px] my-[80px]">

//                                 <div className="text-white w-[60%] ml-[130px]  flex flex-col items-center">
//                                     <h1 className="mt-[20px]">Quality Score Speedometer</h1>
//                                     <CustomSpeedometer value={75} />

//                                 </div>

//                                 {/* Quality score speedometer */}
//                                 <div className="mt-[-100px] mb-[20px]  flex flex-row">
//                                     <div className="mt-2 p-4 rounded">
//                                         <div className="text-white bg-whites">
//                                             <h1>Quality Score</h1>
//                                             <D3Speedometer score={90} />
//                                         </div>
//                                     </div>
//                                     <div className="mt-2 p-4 rounded">
//                                         <div className="text-white bg-whites">
//                                             <h1>Quality Score</h1>
//                                             <D3Speedometer score={80} />
//                                         </div>
//                                     </div>
//                                     <div className="mt-2 p-4 rounded">
//                                         <div className="text-white bg-whites">
//                                             <h1>Quality Score</h1>
//                                             <D3Speedometer score={70} />
//                                         </div>
//                                     </div>
                                    
//                                 </div>
//                                 {/* Quality score speedometer */}

//                                 {/* 2 buttons  */}
//                                 {/* <div className="flex ">
//                                     <button
//                                         type="button"
//                                         className="bg-purple-500  hover:bg-purple-700 flex flex-row text-white font-bold py-2 px-4 rounded mr-2"
//                                         onClick={handleReportClick}
//                                     >
//                                         <Spinner isLoading={isLoadingReport} />
//                                         View quality report
//                                     </button>
//                                     <button
//                                         type="button"
//                                         className="bg-purple-500 hover:bg-purple-700 flex flex-row text-white font-bold py-2 px-4 rounded mr-2"
//                                         onClick={handleDownloadClick}
//                                     >
//                                         <Spinner isLoading={isLoadingDownload} />
//                                         Download report
//                                     </button>


//                                 </div> */}

//                                 {/* 2 buttons  */}


//                             </div>
//                         )}
//                     </div>
