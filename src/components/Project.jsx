import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import EmptyProject from './EmptyProject';
import { IoIosArrowForward } from "react-icons/io";

function Project() {
  const { project_id } = useParams();
  const [setshowSettingDropdown, setsetshowSettingDropdown] = useState(false);
  const [setshowModelDropdown, setsetshowModelDropdown] = useState(true);
  const navigate = useNavigate();

  const handleSettingClick = () => {
    setsetshowSettingDropdown(!setshowSettingDropdown);
    setsetshowModelDropdown(false);
  };

  const handleModelClick = () => {
    setsetshowModelDropdown(!setshowModelDropdown);
    setsetshowSettingDropdown(false);
  };

  const handleSelectModel = () => {
    navigate('/dashboard/newproject/dataartifacts');
  };

  return (
    <>
      <Navbar />
      <div className="flex rounded">
        <Sidebar />
        <div className="w-full flex justify-center rounded-lg bg-n-8">
          <div className='w-[60rem] mx-10'>
            <EmptyProject/>
          </div>
        </div>
      </div>
    </>
  );
}

export default Project;

