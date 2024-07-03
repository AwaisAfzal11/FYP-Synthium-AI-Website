import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000';

export const fetchData = async () => {
  try {
    const response = await axios.get(`${baseURL}/data`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const createData = async (data) => {
  try {
    const response = await axios.post(`${baseURL}/data`, data);
    return response.data;
  } catch (error) {
    console.error('Error creating data:', error);
    throw error;
  }
};

export const signup = async (firstName, lastName, email, password) => {
  const formData = {
    'first_name': firstName,
    'last_name': lastName,
    'email': email,
    'password': password
  };

  const options = {
      headers: {
          'Content-Type': 'application/json',
      },
  };

  const response = await axios.post(`${baseURL}/auth/`, JSON.stringify(formData), options);
  return response;
};

export const login = async (username, password) => {
  const formData = new URLSearchParams();
  formData.append('grant_type', 'password');
  formData.append('username', username);
  formData.append('password', password);

  const options = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'accept': 'application/json',
    },
  };

  const response = await axios.post(`${baseURL}/auth/token`, formData.toString(), options);
  return response;
};

export const check_authenticated = async (accessToken) => {
   // Check the validity of the access token using the /user API endpoint
   const options = {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
  };

  const response = await axios.get(`${baseURL}/user`, options);

  return response;
};

export const get_all_data_artifacts = async (accessToken) => {
  // Check the validity of the access token using the /user API endpoint
  const options = {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  };

  const response = await axios.get(`${baseURL}/get_all_data_artifacts`, options);

  return response;
};

export const get_all_projects = async (accessToken) => {
   // Check the validity of the access token using the /user API endpoint
   const options = {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
  };

  const response = await axios.get(`${baseURL}/get_all_projects`, options);

  return response;
};

export const get_project = async (accessToken, project_id) => {
   // Check the validity of the access token using the /user API endpoint
   const options = {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
  };

  const response = await axios.get(`${baseURL}/get_project/${project_id}`, options);

  return response;
};

export const get_data_artifact_metadata = async (accessToken, project_id) => {
   // Check the validity of the access token using the /user API endpoint
   const options = {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
  };

  const response = await axios.get(`${baseURL}/get_data_artifact_metadata/${project_id}`, options);

  return response;
};

export const get_project_synthetic_data_artifacts_metadata = async (accessToken, project_id) => {
   // Check the validity of the access token using the /user API endpoint
   const options = {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
  };

  const response = await axios.get(`${baseURL}/get_project_synthetic_data_artifacts_metadata/${project_id}`, options);

  return response;
};

export const get_model_config = async (accessToken, project_id) => {
   // Check the validity of the access token using the /user API endpoint
   const options = {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
  };

  const response = await axios.get(`${baseURL}/get_model_config/${project_id}`, options);

  return response;
};

export const get_model_logs = async (accessToken, project_id) => {
   // Check the validity of the access token using the /user API endpoint
   const options = {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
  };

  const response = await axios.get(`${baseURL}/get_model_logs/${project_id}`, options);

  return response;
};

export const get_synthetic_quality_report = async (accessToken, project_id) => {
   // Check the validity of the access token using the /user API endpoint
   const options = {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
  };

  const response = await axios.get(`${baseURL}/get_synthetic_quality_report/${project_id}`, options);

  return response;
};

export const download_synthetic_data = async (accessToken, synthetic_data_artifact_id) => {
   // Check the validity of the access token using the /user API endpoint
   const options = {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        responseType: 'blob', // Important for file downloads
  };

  const response = await axios.get(`${baseURL}/download_synthetic_data/${synthetic_data_artifact_id}`, options);

  return response;
};

export const generate_synthetic_data = async (accessToken, project_id, num_rows) => {
  const formData = {
    'project_id': project_id,
    'num_rows': num_rows
  };
  const options = {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
  };

  const response = await axios.post(`${baseURL}/generate_synthetic_data`, JSON.stringify(formData), options);

  return response;
};

export const uploadDataArtifact = async (accessToken, file) => {
  const formData = new FormData();
  formData.append('file', file);

  const options = {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'multipart/form-data',
    },
  };

  const response = await axios.post(`${baseURL}/upload_data_artifact`, formData, options);

  return response;
};

export const create_new_project = async (accessToken, name, description) => {
  const formData = {
    'name': name,
    'description': description
  };
  const options = {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
  };

  const response = await axios.post(`${baseURL}/create_new_project`, JSON.stringify(formData), options);

  return response;
};

export const update_empty_project = async (accessToken, project_id, modelType, data_artifact_id) => {
  const formData = {
    'project_id': project_id,
    'modelType': modelType,
    'data_artifact_id': data_artifact_id
  };
  const options = {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
  };

  const response = await axios.post(`${baseURL}/update_empty_project`, JSON.stringify(formData), options);

  return response;
};

export const update_pending_project = async (accessToken, project_id, modelConfig_data) => {
  const formData = {
    'project_id': project_id,
    'modelConfig_data': modelConfig_data
  };
  const options = {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
  };

  const response = await axios.post(`${baseURL}/update_pending_project`, JSON.stringify(formData), options);

  return response;
};

