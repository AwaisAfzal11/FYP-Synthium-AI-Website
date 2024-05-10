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


function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  // const [showHelloDropdown, setShowHelloDropdown] = useState(false);
  const [loading, setLoading] = useState(true);
  const [get_projects_loading, set_get_projects_Loading] = useState(true);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  const main_screen_loader_spinner = () => {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-purple-500 text-black"></div>
        </div>
      </div>
    ); // Render a loading indicator while checking authentication
  }

  const loader_spinner = () => {
    return (
      <div className="flex items-center justify-center h-[30vh]">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-purple-500 text-black"></div>
        </div>
      </div>
    ); // Render a loading indicator while checking authentication
  }

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
    const get_all_projects_response = get_all_projects(accessToken)
      .then((response) => {
        // Token is valid, continue on the same page
        console.log("Projects Fetched Successfully...");
        console.log(response);
        setProjects(response.data.projects);
        set_get_projects_Loading(false); // Set loading to false after successful authentication
      })
      .catch((error) => {
        console.error(error);
        set_get_projects_Loading(false); // Set loading to false after authentication check
      });
    console.log(get_all_projects_response)

  }, []);



  if (loading) {
    return main_screen_loader_spinner()
  }


  const handleOpenModal = () => {
    setShowModal(true);
  };

  // const handleCloseModal = () => {
  //   setShowModal(false);
  // };

  const handleCreateProject = () => {
    // Perform any necessary actions before navigating
    navigate('/dashboard/newproject');
  };

  // const handleShowHelloDropdown = () => {
  //   setShowHelloDropdown(!showHelloDropdown);
  // };

  // const handleSelectModel = () => {
  //   navigate('/dashboard/newproject/selectModel');
  // };

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

                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div>
                          <h2 className='text-black font-bold text-[24px]'>New Project</h2>
                        </div>

                        <div>
                          <p className='text-gray-700 text-[16px] mt-[8px] mb-[10px]'>Create and manage your personal projects</p>
                          <h2 className='text-[14px] text-black font-bold'>Project Name</h2>
                          <input
                            type="text"
                            placeholder="Enter your Project Name"
                            className="w-[100%] mt-[0px] mb-[40px] bg-color-7 border placeholder-white border-gray-300 rounded-md px-3 py-2  text-white "
                          />
                          <h2 className='text-[14px] text-black font-bold'>Project Description</h2>
                          <input
                            type="textarea"
                            placeholder="Enter your Project Name"
                            className="w-[100%] mt-[0px] mb-[40px] bg-color-7 border placeholder-white border-gray-300 rounded-md px-3 py-2  text-white "
                          />
                          {/* <button onClick={handleCloseModal} className="  bg-purple-500 text-white text-[14px] p-3 mt-[-10px] border-white rounded-md">Create Project</button> */}
                          <button onClick={handleCreateProject} className="bg-color-7 text-white text-[14px] p-3 mt-[-10px] border-white rounded-md">Create Project</button>
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



              {get_projects_loading && loader_spinner()}

              {!get_projects_loading && (
                <div className="relative my-[20px]">
                  <ul>
                    {projects.map((project) => (

                      <li key={project.project_id} className="mb-2">

                        <div className='flex flex-row justify-between border p-4 ml-1 hover:border-color-7'>
                          

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
                                  return(
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
                            <div>Updated {moment(project.updated_on).fromNow()}</div>
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

