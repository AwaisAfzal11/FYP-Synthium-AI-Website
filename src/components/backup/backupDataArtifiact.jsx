import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCircle, faCircleDown } from '@fortawesome/free-solid-svg-icons';
import { faCircleDot } from '@fortawesome/free-solid-svg-icons';

import { get_all_data_artifacts, uploadDataArtifact } from '../utils/backend_api';
import { element_loader_spinner } from '../utils/visual_utils';
import spinner from './Spinner.jsx'


function SelectDataArtifact({ onFormSubmit, projectData }) {
  const navigate = useNavigate();
  const [showSettingDropdown, setShowSettingDropdown] = useState(false);
  const [showModelDropdown, setShowModelDropdown] = useState(true);
  const [file, setFile] = useState(null);
  // vertical collapse buttons
  const [openSection, setOpenSection] = useState(1);
  const [dataArtifacts, setDataArtifacts] = useState(null);
  const [selectedDataArtifactId, setSelectedDataArtifactId] = useState(null);
  const [get_data_artifact_loading, set_get_data_artifact_Loading] = useState(true);

  // Fetch All Data Artifacts
  useEffect(() => {
    const accessToken = sessionStorage.getItem('access_token');
    get_all_data_artifacts(accessToken)
      .then((response) => {
        // Token is valid, continue on the same page
        console.log("Data Artifacts Fetched Successfully...");
        console.log(response);
        setDataArtifacts(response.data.data_artifacts);
        set_get_data_artifact_Loading(false); // Set loading to false after successful authentication
      })
      .catch((error) => {
        console.error(error);
        set_get_data_artifact_Loading(false); // Set loading to false after authentication check
      });

  }, []);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleSelectDataArtifact = () => {
    // navigate('/dashboard/newproject/dataartifacts/configuration');
    const accessToken = sessionStorage.getItem('access_token');
    if (file != null){
      uploadDataArtifact(accessToken, file)
      .then((response) => {
        // Token is valid, continue on the same page
        console.log("Data Artifacts Uploaded Successfully...");
        console.log(response);
        setSelectedDataArtifactId(response.data.data_artifact_id);
        onFormSubmit(response.data.data_artifact_id)
      })
      .catch((error) => {
        console.error(error);
      });
    } else if (selectedDataArtifactId != null){
      console.log(selectedDataArtifactId);
      onFormSubmit(selectedDataArtifactId)
    }
  };

  const handleDataArtifactSelectionChange = (event) => {
    console.log(event.target.value);
    setSelectedDataArtifactId(event.target.value);
  };

  const handleSettingClick = () => {
    setShowSettingDropdown(!showSettingDropdown);
    setShowModelDropdown(false);
  };

  const handleModelClick = () => {
    setShowModelDropdown(!showModelDropdown);
    setShowSettingDropdown(false);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    console.log('Uploaded file:', e.target.files[0].name);
  };

  const triggerFileInput = () => {
    document.getElementById('fileUpload').click();
  };

  // spinner code 
 


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

      <div className="mx-[0px] mt-[30px] mb-[20px] flex flex-col border-gray-300 border rounded-lg rounded-tr-[30px] rounded-br-[0px] rounded-tl-[0px] rounded-bl-[30px]">
        <div className='flex flex-row gap-10 my-10 mx-4'>
          <div>Step-1 Model</div>
          <IoIosArrowForward />
          <div className=' text-color-7' style={{ borderBottom: '4px solid', paddingBottom: '2px', display: 'inline-block' }}>Step-2 Input Data</div>
          <IoIosArrowForward />
          <div>Step-3 Configuration</div>
        </div>
      </div>

      {/* for setting and deleting of project */}
      {showSettingDropdown && (
        <div className='mx-auto '>
          <div className='border rounded-md border-color-7'>
            <h2 className='ml-5 mt-5 text-[24px] font-bold'>Project Details</h2>
            <div className='flex flex-row ml-5 mt-5 text-[14px] gap-10'>
              <div>
                <h3>Display Name</h3>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Enter your Project Name"
                  className="w-[100%] mt-[0px] mb-[7px] md:w-[290%] border border-gray-300 rounded-md px-3 py-2 text-white"
                />
                <p>A human readable title for your project</p>
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
                  className="w-[100%] mt-[0px] mb-[7px] md:w-[360%] border border-gray-300 rounded-md px-3 py-2 text-white"
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
                  className="w-[100%] mt-[0px] mb-[7px] md:w-[340%] border border-gray-300 rounded-md px-3 py-2 text-white"
                />
                <p>A brief description of the project.</p>
              </div>
            </div>
            <hr className="mb-[30px] opacity-70 border border-color-7" />
            <button className="bg-color-7 ml-4 mb-4 text-white text-[14px] px-6 py-2 mt-[-10px] border-white rounded-md">Save</button>
          </div>

          {/* delete project */}
          <div className="border rounded-md border-red-500 my-4">
            <div className='ml-4 text-[18px] mt-4'>
              <h1 className='text-[24px]'>Permanent Options</h1>
              <p className='mt-4'>Deleting your project will delete all models, data artifacts, and members. <b>Once completed, this action cannot be undone.</b> </p>
              <button className="my-4 bg-red-500 text-white text-[14px] p-3 mt-[15px] border-white rounded-md">Delete this Project</button>
            </div>
          </div>
        </div>
      )}
      {/* for setting and deleting of project */}

      <div className='text-[24px] py-[30px]'>
        <h1 className='pb-1'><b>Where is your data artifacts?</b></h1>
        <h3 className='text-[18px] my-3'>Let's begin by defining your input.</h3>

      </div>

      {get_data_artifact_loading && element_loader_spinner()}

      {!get_data_artifact_loading && (
        // upload data artifact main div
        <div>
        {/* Vertical collapse */}
        <div className="text-white">
          {/* Button 1 */}
          <div className="mb-4 w-full">
            <div
              className="flex items-center justify-between cursor-pointer p-4 bg-black rounded"
              onClick={() => toggleSection(1)}
            >
              <label
                className="flex items-center"
                onClick={() => toggleSection(1)}
                style={{ userSelect: 'none', cursor: 'pointer' }}
              >
                <FontAwesomeIcon
                  icon={faCircleDot}
                  className={`mr-2 ${openSection === 1 ? 'text-color-7' : 'text-gray-500'}`}
                />
                I have a data artifact ready to upload
              </label>
            </div>
            {openSection === 1 && (
              <div className="mt-2 p-4 border border-gray-700 rounded bg-black">
                <div className="ml-[30px]">
                  <p>Click the button below to upload your local file or drag and drop your file here</p>
                </div>
                <div className="flex flex-col justify-center border bg-[#000000] mx-[30px] mb-[20px] mt-[10px] border-gray-500 items-center">
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    id="fileUpload"
                  />
                  <button
                    className="bg-color-7 py-[7px] px-[10px] text-white text-[15px] mb-[10px] mt-[30px] border-white rounded-md"
                    onClick={triggerFileInput}
                  >
                    Choose File
                  </button>
                  <p className="text-[15px] mt-[2px] mb-[30px]">or drag and drop a CSV, JSON, or Parquet file here to upload</p>
                  {file && <p className="text-white mt-2">Selected file: {file.name}</p>}
                </div>
              </div>
            )}
          </div>

          {/* Button 2 */}
          <div className="mb-4 w-full">
            <div
              className="flex items-center justify-between cursor-pointer p-4 bg-black rounded"
              onClick={() => toggleSection(2)}
            >
              <label 
                className="flex items-center"
                onClick={() => toggleSection(1)}
                style={{ userSelect: 'none', cursor: 'pointer' }}
              >
                <FontAwesomeIcon
                  icon={faCircleDot}
                  className={`mr-2 ${openSection === 2 ? 'text-color-7' : 'text-gray-500'}`}
                />
                I'd like to connect to my external data source.
              </label>
            </div>
            {openSection === 2 && (
              <div className="mt-2 p-4 border border-gray-700 rounded bg-black">
                <form className="ml-[30px] mb-[30px] max-w-sm">
                  <label htmlFor="data_artifact" className="block mb-2 text-sm font-medium text-white">
                    Select Data Artifact
                  </label>
                  <select
                    id="data_artifact"
                    className="bg-gray-50 border border-color-7 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-black dark:border-purple-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 custom-select"
                    onChange={handleDataArtifactSelectionChange}
                  >
                    <option key={"Default Value"}>Choose from your previous data artifacts.</option>
                    {dataArtifacts.map((dataArtifact) => (
                      <option key={dataArtifact.data_artifact_id} value={dataArtifact.data_artifact_id}>
                        {dataArtifact.name}
                      </option>
                    ))}
                  </select>
                </form>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center items-center ">
          <button onClick={handleSelectDataArtifact} className="bg-color-7 py-[10px] px-[15px] text-white text-[20px] mb-[15px] mt-[50px] border-white rounded-md">
            Continue
          </button>
        </div>
      </div>
      // main div for uploading data artifact
      )}

      
    </div>
  );
}

export default SelectDataArtifact;

