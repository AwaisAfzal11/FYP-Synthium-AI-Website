import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import SelectModel from './SelectModel';
import SelectDataArtifact from './SelectDataArtifact';

import { update_empty_project } from '../utils/backend_api';

function EmptyProject(props) {
  // const navigate = useNavigate();
  const [projectData] = useState(props.projectData);
  const [showSelectModel, setShowSelectModel] = useState(true);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedDataArtifactId, setSelectedDataArtifactId] = useState(null);

  // const handleFormSubmit = () => {
  //   setShowSelectModel(false); // Update the state when the form is submitted
  // };

  const handleModelSelectionFormSubmit = (selected_model) => {
    setSelectedModel(selected_model);
    setShowSelectModel(false);
  };

  const handleDataArtifactSelectionFormSubmit = (selected_data_artifact_id) => {
    const accessToken = sessionStorage.getItem('access_token');
    setSelectedDataArtifactId(selected_data_artifact_id);
    update_empty_project(accessToken, projectData.project_id, selectedModel, selected_data_artifact_id)
      .then((response) => {
        // Token is valid, continue on the same page
        console.log("EmptyProject Updated Successfully...");
        console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      {showSelectModel ? (
        <SelectModel onFormSubmit={handleModelSelectionFormSubmit} projectData={projectData}/> // Pass the handleFormSubmit function to SelectModel
      ) : (
        <SelectDataArtifact onFormSubmit={handleDataArtifactSelectionFormSubmit} projectData={projectData}/>
      )}
    </>
  );
}

export default EmptyProject;

