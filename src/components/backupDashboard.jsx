

// 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import axios from 'axios';
import { backend_api_base_url } from "../constants";

function Dashboard() {
  const [setshowSettingDropdown, setsetshowSettingDropdown] = useState(false);
  // const [setshowModelDropdown, setsetshowModelDropdown] = useState(true);
  // const [showModelDropdown, setShowModelDropdown] = useState(true);
  const [showModelDropdown, setShowModelDropdown] = useState(false);

  const handleSettingClick = () => {
    setsetshowSettingDropdown(!setshowSettingDropdown);
    setsetshowModelDropdown(false);
  };


  const handleModelClick = () => {
    setShowModelDropdown(!showModelDropdown);
    setShowSettingDropdown(false);
  };

 

  const [showModal, setShowModal] = useState(false);
  // const [showHelloDropdown, setShowHelloDropdown] = useState(false);
  const [loading, setLoading] = useState(true);



  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = sessionStorage.getItem('access_token');
    if (!accessToken) {
      // No access token found, redirect to login page
      navigate('/login');
    } else {
      // Check the validity of the access token using the /user API endpoint
      axios.get(backend_api_base_url + '/user', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      })
        .then(() => {
          // Token is valid, continue on the same page
          console.log("You are Authenticated!")
          setLoading(false); // Set loading to false after successful authentication
        })
        .catch((error) => {
          console.error(error);
          sessionStorage.removeItem('access_token')
          navigate('/login');
          // if (error.response && error.response.status === 401) {
          //   navigate('/login');
          // }
          setLoading(false); // Set loading to false after authentication check
        });
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex justify-center">
          <div className=" animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-purple-500 text-black"></div>
        </div>
      </div>
    ); // Render a loading indicator while checking authentication
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
      <div className="mx-auto ml-[25%] w-[70%] mr-[50px]">
        <Sidebar />
        <h1 className="text-[40px] mt-10 "> My Dashboard</h1>
        <h1 className="text-[32px] mt-15 mb-5">Projects</h1>


        <hr className="mb-[30px] opacity-70" />
        {/* pop up dialog box  */}
        <div>
          <div className="flex flex-row gap-[500px]">
            <p className="text-[16px]">Create and manage your Gretel projects</p>
            <button onClick={handleOpenModal} className="bg-purple-500 text-white text-[14px] p-3 mt-[-10px] border-white rounded-md">New Project</button>
          </div>

          <div className='gap-5'>
            {/* <button onClick={handleModelClick} className="hover hover:underline mr-5">
              Model
            </button> */}
            <button onClick={handleModelClick} className="hover hover:underline mr-5">
              Model
            </button>
            <button onClick={handleSettingClick} className="hover hover:underline mr-5">
              Setting
            </button>
          </div>

          {/* model and setting button */}

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

        {/* Setting DropDown */}
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
        {/* Setting DropDown */}


        {showModelDropdown && (
          <div>
            <p>Hello</p>
          </div>

        )}

        {/* For search and developed projects */}



        {/* For search and developed projects */}



      </div>

    </>
  );
}

export default Dashboard



