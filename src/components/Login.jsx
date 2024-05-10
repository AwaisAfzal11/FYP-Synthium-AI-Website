import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../utils/backend_api';


const LoginForm = () => {
    const [alert, setAlert] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    // const [accessToken, setAccessToken] = useState('');

    const handleSubmit = async (event) => {
        console.log('check')
        event.preventDefault();

        if (!username || !password) {
            setAlert('Please fill in all fields.');
            setTimeout(() => {
                setAlert('');
            }, 3000);
            return;
        }
    
        try {
            setLoading(true);
            const response = await login(username, password)
            const accessToken = response.data.access_token;
            // setAccessToken(accessToken);
            sessionStorage.setItem('access_token', accessToken); // Save the access token in session storage
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data && error.response.data.error_description) {
                setAlert(error.response.data.error_description);
            } else {
                setAlert('Login failed. Please try again.');
            }
            setTimeout(() => {
                setAlert('');
            }, 3000);
        } finally {
            setLoading(false);
        }
      
    };

    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[50%] mt-[100px] ml-[420px] items-center justify-center">
            <h1 className="text-[50px] mt-4 font-bold flex justify-center text-black mb-[20px]">Login</h1>
            {alert && (
                <p className="text-red-500">{alert}</p>
            )}
            <div className="mb-4 mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                    Username
                </label>
                <input
                    className="bg-purple-500 shadow appearance-none border rounded w-full py-2 px-3 text-white placeholder-slate-100 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                </label>
                <input
                    className="placeholder-slate-100 bg-purple-500 text-white shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </div>
            <div className="flex items-center justify-between">
                <button
                    className="bg-purple-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    onClick={handleSubmit}
                >
                    Login
                </button>
                <p className="text-sm font-normal text-gray-600">
                    Already a Member? <a href="/signup">Signup</a>
                </p>
                {loading && (
                    <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-purple-500 text-black"></div>
                    </div>
                )} 
            </div>
        </div>
    );
};

export default LoginForm;
