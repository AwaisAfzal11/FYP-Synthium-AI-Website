import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import axios from 'axios';
import { backend_api_base_url } from "../constants";


function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [showHelloDropdown, setShowHelloDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = sessionStorage.getItem('access_token');
    if (!accessToken) {
      // No access token found, redirect to login page
      navigate('/login');
    } else {
      // Check the validity of the access token using the /user API endpoint
      // If the request is unauthorized (e.g., 401 status code), redirect to login page
      // You can use axios or any other library to make the API request
      axios.get(backend_api_base_url+'/user', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        // Token is valid, continue on the same page
        console.log("You are Authenticated!")
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
      });
    }
  }, []);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCreateProject = () => {
    // Perform any necessary actions before navigating
    navigate('/dashboard/newproject');
  };

  const handleShowHelloDropdown = () => {
    setShowHelloDropdown(!showHelloDropdown);
  };

  const handleSelectModel = () => {
    navigate('/dashboard/newproject/selectModel');
  };

  return (
    <>
      <Navbar />
      <div className="mx-auto ml-[25%] w-[70%] mr-[50px]">
        <Sidebar />
        <h1 className="text-[40px] mt-10 "> My Dashboard</h1>
        <h1 className="text-[32px] mt-15 mb-5">Projects</h1>
        {/* pop up dialog box  */}
        <div>
          <div className="flex flex-row gap-[500px]">
            <p className="text-[16px]">Create and manage your Gretel projects</p>
            <button onClick={handleOpenModal} className="bg-purple-500 text-white text-[14px] p-3 mt-[-10px] border-white rounded-md">New Project</button>
          </div>

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
                        className="w-[100%] mt-[0px] mb-[40px] bg-purple-500 border placeholder-white border-gray-300 rounded-md px-3 py-2  text-white "
                      />
                      {/* <button onClick={handleCloseModal} className="  bg-purple-500 text-white text-[14px] p-3 mt-[-10px] border-white rounded-md">Create Project</button> */}
                      <button onClick={handleCreateProject} className="bg-purple-500 text-white text-[14px] p-3 mt-[-10px] border-white rounded-md">Create Project</button>
                    </div>


                    {/* <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <input type="text" className="border-2 border-gray-300 rounded-md p-2 mb-4" placeholder="Enter project name" />
                        <button onClick={handleCloseModal} className="bg-blue-500 text-white text-[14px] p-3 mt-[-10px] border-white rounded-md">Create Project</button>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <hr className="my-[30px]  opacity-70" />

        {/* For search and developed projects */}
        <div>
          <div className="relative">
            <input type="text" className="pl-10 pr-40 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Search by project name" />
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.8 3.4l4.8 4.8-1.4 1.4-4.8-4.8A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </span>
          </div>

          <div className="relative my-[20px]">
            <button className=" border border-gray-300 hover:bg-purple-500 text-white font-normal py-4 px-4 rounded w-full">
              <div className="flex flex-col items-start text-[20px]">
                <span className="text-[30px] font-bold mb-[10px]">Rain</span>
                <div className="text-[15px] flex-col items-start space-y-3 space-x-10">
                  <span>Updated Now</span>
                  <span>Created Now</span>
                </div>
              </div>
            </button>

            <button className=" border border-gray-300 hover:bg-purple-500 text-white font-normal py-4 px-4 rounded w-full">
              <div className="flex flex-col items-start text-[20px]">
                <span className="text-[30px] font-bold mb-[10px]">Rain</span>
                <div className=" flex-col items-start space-y-3 space-x-10">
                  <span>Updated Now</span>
                  <span>Created Now</span>
                </div>
              </div>
            </button>

            <button className=" border border-gray-300 hover:bg-purple-500 text-white font-normal py-4 px-4 rounded w-full">
              <div className="flex flex-col items-start text-[20px]">
                <span className="text-[30px] font-bold mb-[10px]">Rain</span>
                <div className="text-[15px] flex-col items-start space-y-3 space-x-10">
                  <span>Updated Now</span>
                  <span>Created Now</span>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

    </>
  );
}

export default Dashboard

