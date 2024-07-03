import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import {
  check_authenticated,
  get_all_projects,
  create_new_project,
} from '../utils/backend_api';
import { GiBrain } from "react-icons/gi";
import moment from 'moment';

import { main_screen_loader_spinner, element_loader_spinner } from '../utils/visual_utils';

function Dashboard() {
  const [alert, setAlert] = useState('');
  const [showModal, setShowModal] = useState(false);
  // const [showHelloDropdown, setShowHelloDropdown] = useState(false);
  const [loading, setLoading] = useState(true);
  const [get_projects_loading, set_get_projects_Loading] = useState(true);
  const [create_new_project_loading, set_create_new_project_loading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [new_project_name, set_new_project_name] = useState('');
  const [new_project_description, set_new_project_description] = useState('');
  const navigate = useNavigate();

  // Check Authentication
  useEffect(() => {
    const accessToken = sessionStorage.getItem('access_token');
    if (!accessToken) {
      // No access token found, redirect to login page
      navigate('/login');
    } else {
      // Check the validity of the access token using the /user API endpoint
      check_authenticated(accessToken)
        .then(() => {
          // if 200 succcess then this will run.
          // Token is valid, continue on the same page
          console.log("You are Authenticated! Let's go...")
          setLoading(false); // Set loading to false after successful authentication
        })
        .catch((error) => {
          console.error(error);
          if (error.response && error.response.status === 401) {
            sessionStorage.removeItem('access_token')
            navigate('/login');
          }
          setLoading(false); // Set loading to false after authentication check.
        });
    }
  }, []);

  // Fetch All Projects
  useEffect(() => {
    const accessToken = sessionStorage.getItem('access_token');
    get_all_projects(accessToken)
      .then((response) => {
        // Token is valid, continue on the same page
        console.log("Projects Fetched Successfully...");
        console.log(response);
        // Bubble Sort To Sort the Projects by their creation time
        const sorted_projects = response.data.projects.sort((a, b) => new Date(b.created_on) - new Date(a.created_on))
        setProjects(sorted_projects);
        set_get_projects_Loading(false); // Set loading to false after successful authentication
      })
      .catch((error) => {
        console.error(error);
        set_get_projects_Loading(false); // Set loading to false after authentication check
      });

  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showModal && !event.target.closest('.modal')) {
        setShowModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showModal]);

  if (loading) {
    return main_screen_loader_spinner()
  }

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCreateProject = async (event) => {
    set_create_new_project_loading(true)
    event.preventDefault();

    const accessToken = sessionStorage.getItem('access_token');

    // Basic checks
    if (!new_project_name || !new_project_description) {
      setAlert('Please fill in all fields.');
      setTimeout(() => {
        setAlert('');
      }, 3000);
      set_create_new_project_loading(false);
      return;
    }

    create_new_project(accessToken, new_project_name, new_project_description)
      .then((response) => {
        // if 200 succcess then this will run.
        console.log("New Project Created! Let's go...")
        console.log(response)
        set_create_new_project_loading(false); // Set loading to false after successful authentication
        // navigate('/dashboard/newproject');
        navigate(`/project/${response.data.project_id}`);
      })
      .catch((error) => {
        console.error(error);
        if (error.response) {
          setAlert('Error occurred while creating new project!');
        }
        set_create_new_project_loading(false); // Set loading to false after authentication check.
      });

  };


  return (
    <>
      <Navbar />
      <div className="flex rounded">
        <Sidebar />
        <div className="w-full flex justify-center rounded-lg bg-n-8">
          <div className='w-[60rem] mx-10'>
            <h1 className="text-[40px] mt-10"> My Dashboard</h1>
            <h1 className="text-[32px] mt-15 mb-5">Projects</h1>
            {/* pop up dialog box  */}
            <div>
              <div className="flex flex-row gap-[500px]">
                <p className="text-[16px]">Create and manage your Gretel projects</p>
                <button onClick={handleOpenModal} className="bg-color-7 text-white text-[14px] p-3 mt-[-10px] border-white rounded-md">New Project</button>
              </div>

              {/* model and setting button */}
              {/* New Project Popup */}
              {showModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                  <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                    <div className="inline-block align-bottom bg-n-7 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full modal">
                      <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div>
                          <h2 className='font-bold text-[24px]'>New Project</h2>
                        </div>

                        <div>
                          <p className='text-[16px] mt-[8px] mb-[10px]'>Create and manage your personal projects</p>
                          {alert && (
                            <p className="text-red-500">{alert}</p>
                          )}
                          <h2 className='text-[14px] font-bold'>Project Name</h2>
                          <input
                            id="new_project_name"
                            type="text"
                            value={new_project_name}
                            onChange={(event) => set_new_project_name(event.target.value)}
                            placeholder="Enter Project Name"
                            className="w-[100%] mb-5 bg-black border placeholder-gray-400 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-color-7"
                          />
                          <h2 className='text-[14px] font-bold'>Project Description</h2>
                          <input
                            id="new_project_description"
                            type="text"
                            value={new_project_description}
                            onChange={(event) => set_new_project_description(event.target.value)}
                            placeholder="Enter Project Description"
                            className="resize-y w-[100%] mb-[40px] bg-black border placeholder-gray-400 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-color-7"
                          />
                          {/* <button onClick={handleCloseModal} className="  bg-purple-500 text-white text-[14px] p-3 mt-[-10px] border-white rounded-md">Create Project</button> */}
                          <div className="flex items-center justify-between">
                            <button type="submit" onClick={handleCreateProject} className="bg-color-7 text-white text-[14px] p-3 mt-[-10px] border-white rounded-md">Create Project</button>
                            {
                              create_new_project_loading && (
                                <div className="flex justify-center">
                                  <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-purple-500 text-black"></div>
                                </div>
                              )
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* model and setting button */}


            </div>
            <hr className="my-[30px] opacity-70" />

            <div>
              {/* Search Bar */}
              <div className="relative">
                <input type="text" className="pl-10 pr-40 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-color-7" placeholder="Search by project name" />
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.8 3.4l4.8 4.8-1.4 1.4-4.8-4.8A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </span>
              </div>



              {get_projects_loading && element_loader_spinner()}

              {!get_projects_loading && (
                <div className="relative my-[20px]">
                  <ul>
                    {projects.map((project) => (

                      <li key={project.project_id} className="mb-2">

                        <div className='flex flex-row justify-between border p-4 ml-1 hover:border-color-7 cursor-pointer' onClick={() => navigate(`/project/${project.project_id}`)}>

                          <div className='flex flex-col w-[300px]'>
                            {/* Project Name */}
                            <div className='text-[16px] font-bold hover:text-color-7'>{project.name}</div>
                            {/* Project Description */}
                            <div className='text-[14px]'>
                              <p className="truncate">
                                {project.description}
                              </p>
                            </div>
                          </div>

                          <div className='flex flex-col items-start justify-between'>
                            {/* <div className='flex flex-row gap-2'> < GiBrain /> Cloud Project</div> */}
                            {/* this is model pill */}
                            <div className="flex items-center space-x-1 text-sm px-2 bg-teal-950 rounded-full">
                              <div>< GiBrain /></div>
                              {(() => {
                                if (project.model_type == null) {
                                  return (
                                    <div>No Model Selected</div>
                                  )
                                } else {
                                  return (
                                    <div className="uppercase">{project.model_type}</div>
                                  )
                                }
                              })()}
                            </div>
                            {/* this is status pill */}
                            {(() => {
                              if (project.status == "empty") {
                                return (
                                  <div className="flex items-center space-x-1 text-sm px-2 bg-gray-700 rounded-full">
                                    <div className="bg-gray-200 rounded-full w-[0.4rem] h-[0.4rem]"></div>
                                    <div>Empty</div>
                                  </div>
                                )
                              } else if (project.status == "pending") {
                                return (
                                  <div className="flex items-center space-x-1 text-sm px-2 bg-gray-700 rounded-full">
                                    <div className="bg-yellow-500 rounded-full w-[0.4rem] h-[0.4rem]"></div>
                                    <div>Pending</div>
                                  </div>
                                )
                              } else if (project.status == "training") {
                                return (
                                  <div className="flex items-center space-x-1 text-sm px-2 bg-gray-700 rounded-full">
                                    <div className="bg-orange-500 rounded-full w-[0.4rem] h-[0.4rem]"></div>
                                    <div>Training</div>
                                  </div>
                                )
                              } else if (project.status == "complete") {
                                return (
                                  <div className="flex items-center space-x-1 text-sm px-2 bg-gray-700 rounded-full">
                                    <div className="bg-green-500 rounded-full w-[0.4rem] h-[0.4rem]"></div>
                                    <div>Complete</div>
                                  </div>
                                )
                              } else {
                                return (
                                  <div className="flex items-center space-x-1 text-sm px-2 bg-gray-700 rounded-full">
                                    <div className="bg-red-500 rounded-full w-[0.4rem] h-[0.4rem]"></div>
                                    <div className="capitalize">{project.status}</div>
                                  </div>
                                )
                              }
                            })()}
                          </div>

                          <div>
                            <div>Updated {moment.parseZone(project.updated_on).fromNow()}</div>
                            <div>Created At {`${new Date(project.created_on).getMonth() + 1}/${new Date(project.created_on).getDate()}/${new Date(project.created_on).getFullYear()}`}</div>
                          </div>

                        </div>
                      </li>

                    ))}
                  </ul>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default Dashboard

