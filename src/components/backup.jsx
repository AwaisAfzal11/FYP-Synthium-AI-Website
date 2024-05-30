// Orignal code for toggle functionality
import { IoIosArrowForward } from 'react-icons/io';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SelectDataArtifact() {
  const [showSettingDropdown, setShowSettingDropdown] = useState(false);
  const [showModelDropdown, setShowModelDropdown] = useState(true);
  const [openDiv, setOpenDiv] = useState(null);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleSelectModel = () => {
    navigate('/dashboard/newproject/dataartifacts/configuration');
  };

  const handleSettingClick = () => {
    setShowSettingDropdown(!showSettingDropdown);
    setShowModelDropdown(false);
  };

  const handleModelClick = () => {
    setShowModelDropdown(!showModelDropdown);
    setShowSettingDropdown(false);
  };

  const handleClick = (div) => {
    setOpenDiv((prevDiv) => (prevDiv === div ? null : div));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    console.log('Uploaded file:', e.target.files[0].name);
  };

  const triggerFileInput = () => {
    document.getElementById('fileUpload').click();
  };
  // const handleDrop = (e) => {
  //   e.preventDefault();
  //   if (e.dataTransfer.files && e.dataTransfer.files[0]) {
  //     setFile(e.dataTransfer.files[0]);
  //     console.log('Dropped file:', e.dataTransfer.files[0].name);
  //   }

  const handleDragOver = (e) => {
    e.preventDefault();
  };


  return (
    <div>
      <h1 className='text-[36px] mt-[15px]'>Project-Name</h1>
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
          <div className=' text-purple-500' style={{ borderBottom: '4px solid', paddingBottom: '2px', display: 'inline-block' }}>Step-2 Input Data</div>
          <IoIosArrowForward />
          <div>Step-3 Configuration</div>
        </div>
      </div>

      {/* for setting and deleting of project */}
      {showSettingDropdown && (
        <div className='mx-auto '>
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
            <hr className="mb-[30px] opacity-70 border border-purple-500" />
            <button className="bg-purple-500 ml-4 mb-4 text-white text-[14px] px-6 py-2 mt-[-10px] border-white rounded-md">Save</button>
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

      <div className="">

        {/* implement toggle and div functionality here */}
        
        <div className="flex flex-col space-y-4">
          <div className='border border-gray-500 pt-[17px] pl-[17px]'>
            <div className='flex flex-row'>
              <div className="flex items-center mt-[2px] ml-[2px] pb-[10px]">
                <input
                  id="default-radio-1"
                  type="radio"
                  value=""
                  name="default-radio"
                  className="w-4 h-4"
                  onClick={() => handleClick('div1')}
                  checked={openDiv === 'div1'}
                />
              </div>
              <div>
                <h3 className='text-[18px] ml-[14px] mb-[10px]'>I have a data artifact ready to upload</h3>
              </div>
            </div>

            {/* file upload funtionality  */}
            {openDiv === 'div1' && (
              <>
                <div className='ml-[30px]'>
                  <p>Click the button below to upload your local file or drag and drop your file here</p>
                </div>
                <div
                  className='flex flex-col justify-center border bg-[#000000] mx-[30px] mb-[20px] mt-[10px] border-gray-500 items-center'
                >
                  <input
                    type="file"
                    accept=".csv,.json,.parquet"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    id="fileUpload"
                  />
                  <button
                    className="bg-purple-500 py-[7px] px-[10px] text-white text-[15px] mb-[10px] mt-[30px] border-white rounded-md"
                    onClick={triggerFileInput}
                  >
                    Choose File
                  </button>
                  <p className='text-[15px] mt-[2px] mb-[30px]'>or drag and drop a CSV, JSON, or Parquet file here to upload</p>
                  {file && <p className="text-white mt-2">Selected file: {file.name}</p>}
                </div>
              </>
            )}
            {/* end of file upload funtionality  */}

          </div>

          <div className='border border-gray-500 mt-[20px] pt-[17px] pl-[17px]'>
            <div className='flex flex-row'>
              <div className="flex items-center mt-[2px] ml-[2px] pb-[10px]">
                <input
                  id="default-radio-2"
                  type="radio"
                  value=""
                  name="default-radio"
                  className="w-4 h-4"
                  onClick={() => handleClick('div2')}
                  checked={openDiv === 'div2'}
                />
              </div>
              <div>
                <h3 className='text-[18px] ml-[14px] mb-[10px]'>I'd like to connect to my external data source.</h3>
              </div>
            </div>

            {openDiv === 'div2' && (
              <>
                <div className='ml-[30px]'>
                  <p className="text-white">Select an existing data source.</p>
                </div>
                <form className="ml-[30px] mb-[30px] max-w-sm">
                  <label htmlFor="data_artifact" className="block mb-2 text-sm font-medium text-white"></label>
                  <select
                    id="data_artifact"
                    className="bg-gray-50 border border-purple-500 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-black dark:border-purple-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 custom-select"
                  >
                    <option selected>Choose from your previous data artifacts.</option>
                    <option value="Synthium AI">Synthium AI</option>
                    <option value="Weather Dataset">Weather Dataset</option>
                    <option value="Frequent Pattern Recognition Dataset">Frequent Pattern Recognition Dataset</option>
                  </select>
                </form>                
              </>


            )}
          </div>
        </div>


        <div className='flex justify-center items-center mb-[-30px]'>
          <button onClick={handleSelectModel} className="bg-purple-500 py-[10px] px-[15px] text-white text-[20px] mb-[15px] mt-[50px] border-white rounded-md">Continue</button>
        </div>
      </div>
      {/* main div for uploading data artifact */}
    </div>
  );
}

export default SelectDataArtifact;


// Orignal code for toggle functionality