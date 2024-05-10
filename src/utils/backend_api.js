import axios from 'axios';

const baseURL = 'https://wjhn0hxw-8000.inc1.devtunnels.ms';

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

  const response = await axios.post(`${baseURL}/get_all_projects`, JSON.stringify(formData), options);

  return response;
};

