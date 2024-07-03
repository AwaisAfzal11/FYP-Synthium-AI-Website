import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import EmptyProject from './EmptyProject';
import Configuration from './Configuration';
import ProjectLander from './ProjectLander';


import { check_authenticated, get_project } from '../utils/backend_api';
import { main_screen_loader_spinner, element_loader_spinner } from '../utils/visual_utils';

function Project() {
  const navigate = useNavigate();
  const { project_id } = useParams();
  const [loading, setLoading] = useState(true);
  const [get_project_loading, set_get_project_Loading] = useState(true);

  const [projectData, setProjectData] = useState([]);
  const [projectStatus, setProjectStatus] = useState(null);
  

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
  }, [navigate]);

  // Fetch Project's Data
  useEffect(() => {
    const accessToken = sessionStorage.getItem('access_token');
    get_project(accessToken, project_id)
      .then((response) => {
        // Token is valid, continue on the same page
        console.log("Project Data Fetched Successfully...");
        console.log(response);
        // Bubble Sort To Sort the Projects by their creation time
        setProjectData(response.data);
        setProjectStatus(response.data.status)
        console.log(response.data.status);
        console.log(projectData["status"]);
        set_get_project_Loading(false); // Set loading to false after successful authentication
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.status === 204) {
          console.log(`Project with id ${project_id} does not exists!`)
          navigate('/dashboard');
        }
        set_get_project_Loading(false); // Set loading to false after authentication check
      });

  }, [navigate, project_id]);


  if (loading) {
    return main_screen_loader_spinner()
  }

  return (
    <>
      <Navbar />
      <div className="flex rounded">
        <Sidebar />
        <div className="w-full flex justify-center rounded-lg bg-black">
          <div className='w-[60rem] mx-10'>
            {get_project_loading && element_loader_spinner()}

            {!get_project_loading && (
              ((() => {
                if (projectStatus === null) {
                  return (
                    element_loader_spinner()
                  )
                } else if (projectStatus == "empty") {
                  return (
                    <EmptyProject projectData={projectData}/>
                  )
                } else if (projectStatus == "pending" || projectStatus == "training_failed") {
                  return (
                    <Configuration projectData={projectData}/>
                  )
                } else if (projectStatus == "training") {
                  return (
                    // <Training projectData={projectData}/>
                    <ProjectLander projectData={projectData}/>
                  )
                } else if (projectStatus == "completed") {
                  return (
                    <ProjectLander projectData={projectData}/>
                  )
                } else {
                  return (
                    <div>Unable to Fetch Project Status!</div>
                  )
                }
              })())
            )}

          </div>
        </div>
      </div>
    </>
  );
}

export default Project;

