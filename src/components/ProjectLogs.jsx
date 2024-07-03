import { useState, useEffect } from "react";
import LogsCodeEditor from "./LogsCodeEditor";
// import Speedometer from "./Speedometer";
import { get_model_logs } from "../utils/backend_api";
import { element_loader_spinner } from "../utils/visual_utils";


function ProjectLogs(props) {
    const [projectData] = useState(props.projectData);
    const [model_logs_data, set_model_logs_data] = useState(null);
    const [get_model_logs_IntervalId, set_get_model_logs_IntervalId] = useState(null);
    const [get_model_logs_metadata_loading, set_get_model_logs_metadata_Loading] = useState(true);

    // Refreshes modelLogs for a specific time interval
    useEffect(() => {
        const fetchModelLogs = async () => {
          try {
            const accessToken = sessionStorage.getItem('access_token');
            const response = await get_model_logs(accessToken, projectData.project_id);
            console.log("Project Logs Fetched Successfully...", response);
            set_model_logs_data(response.data);
            set_get_model_logs_metadata_Loading(false);
          } catch (error) {
            console.error(error);
            if (error.response && error.response.status === 204) {
              console.log(`Project with id ${projectData.project_id} does not exist!`);
            }
            set_get_model_logs_metadata_Loading(false);
          }
        };
    
        fetchModelLogs();
    
        if (projectData.status === "training") {
          const intervalId = setInterval(fetchModelLogs, 5000);
          return () => clearInterval(intervalId);
        }
        }, [projectData.project_id, projectData.status]);

    return (
        <>
            <div className="">
                <div className="">
                    {/* horizontal timeline */}
                    <div className=''>
                        <ol className="items-center sm:flex">
                            <li className="relative mb-6 sm:mb-0">
                                <div className="flex items-center">
                                    <div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                                        <svg className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                        </svg>
                                    </div>
                                    <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                                </div>
                                <div className="mt-3 sm:pe-8">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Processing Dataset</h3>
                                </div>
                            </li>
                            <li className="relative mb-6 sm:mb-0">
                                <div className="flex items-center">
                                    <div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                                        <svg className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                        </svg>
                                    </div>
                                    <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                                </div>
                                <div className="mt-3 sm:pe-8">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Creating Model</h3>
                                </div>
                            </li>
                            <li className="relative mb-6 sm:mb-0">
                                <div className="flex items-center">
                                    <div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                                        <svg className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                        </svg>
                                    </div>
                                    <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                                </div>
                                <div className="mt-3 sm:pe-8">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Results</h3>
                                </div>
                            </li>
                            <li className="relative mb-6 sm:mb-0">
                                <div className="flex items-center">
                                    <div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                                        <svg className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="mt-3 sm:pe-8">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Done</h3>
                                </div>
                            </li>
                        </ol>
                    </div>                    
                </div>

                <div className="my-4">
                    <h2 className="text-xl font-semibold">Model Training Logs</h2>
                    {get_model_logs_metadata_loading && element_loader_spinner()}

                    {!get_model_logs_metadata_loading && (
                        <LogsCodeEditor key={JSON.stringify(model_logs_data)} logs={model_logs_data?.ModelLog_data}/>
                    )}
                </div>
   
            </div>


        </>
    );
}

export default ProjectLogs;


















