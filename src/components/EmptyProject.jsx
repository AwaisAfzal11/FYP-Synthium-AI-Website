import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import SelectModel from './SelectModel';
import SelectDataArtifact from './SelectDataArtifact';

function EmptyProject() {
  const { project_id } = useParams();
  const [setshowSettingDropdown, setsetshowSettingDropdown] = useState(false);
  const [setshowModelDropdown, setsetshowModelDropdown] = useState(true);
  const [showSelectModel, setShowSelectModel] = useState(true);
  const [selectedModel, setSelectedModel] = useState(null);
  const navigate = useNavigate();

  // const handleFormSubmit = () => {
  //   setShowSelectModel(false); // Update the state when the form is submitted
  // };

  const handleFormSubmit = (selected_model) => {
    setSelectedModel(selected_model);
    
    setShowSelectModel(false);
  };

  return (
    <>
      {showSelectModel ? (
        <SelectModel onFormSubmit={handleFormSubmit} /> // Pass the handleFormSubmit function to SelectModel
      ) : (
        <SelectDataArtifact />
      )}
    </>
  );
}

export default EmptyProject;

