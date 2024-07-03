import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import TableDataArtifact from './TableDataArtifact';
import { get_project_synthetic_data_artifacts_metadata } from '../utils/backend_api';
import { element_loader_spinner } from '../utils/visual_utils';

const DataArtifact = () => {
    const [syntheticDataArtifactsMetadata, setSyntheticDataArtifactsMetadata] = useState([]);
    const [syntheticDataArtifactsMetadata_loading, set_syntheticDataArtifactsMetadata_Loading] = useState(true);

    useEffect(() => {
        fetch_synthetic_data_artifacts_metadata();
    }, []);

    const fetch_synthetic_data_artifacts_metadata = () => {
        const accessToken = sessionStorage.getItem('access_token');
        const projectId = sessionStorage.getItem('project_id');

        get_project_synthetic_data_artifacts_metadata(accessToken, projectId)
            .then((response) => {
                console.log("Synthetic Data Metadatas Fetched Successfully...");
                setSyntheticDataArtifactsMetadata(response.data.synthetic_data_artifacts);
                set_syntheticDataArtifactsMetadata_Loading(false);
            })
            .catch((error) => {
                console.error(error);
                set_syntheticDataArtifactsMetadata_Loading(false);
            });
    };

    return (
        <div>
            <Navbar />
            <div className="flex flex-row">
                <Sidebar />
                <div className="absolute mt-[80px] gap-5 w-[60%] ml-[25%]">
                    <h1 className='text-[36px] mt-[15px] mb-[30px]'>Synthetic Data Artifacts</h1>
                    
                    {syntheticDataArtifactsMetadata_loading && element_loader_spinner()}

                    {!syntheticDataArtifactsMetadata_loading && (
                        <div className="rounded-lg hover:shadow-[15px_0_20px_-5px_#a855f7,_-15px_0_20px_-5px_#d900ff] cursor-pointer">
                            <TableDataArtifact table_data={syntheticDataArtifactsMetadata} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DataArtifact;