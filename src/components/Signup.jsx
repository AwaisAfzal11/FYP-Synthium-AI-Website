import { useState } from 'react';
import axios from 'axios';
import { backend_api_base_url } from "../constants";

const SignupForm = () => {
    const [alert, setAlert] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // Track loading state

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Basic checks
        if (!firstName || !lastName || !email || !password) {
            setAlert('Please fill in all fields.');
            setTimeout(() => {
                setAlert('');
            }, 3000);
            return;
        }

        // if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        //     setAlert('Please enter a valid email address.');
        //     setTimeout(() => {
        //         setAlert('');
        //     }, 3000);
        //     return;
        // }

        // if (password.length < 8) {
        //     setAlert('Password must be at least 8 characters long.');
        //     setTimeout(() => {
        //         setAlert('');
        //     }, 3000);
        //     return;
        // }

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

        try {
            setLoading(true); // Set loading state to true
            const response = await axios.post(backend_api_base_url+'/auth/', JSON.stringify(formData), options);
            console.log(response.data);
            // Redirect to login page
            window.location.href = '/login';
        } catch (error) {
            console.error(error);
            // Handle signup error, e.g., show an error message
            // For now, just log the error
            setAlert('Signup failed. Please try again.');
            setTimeout(() => {
                setAlert('');
            }, 3000); // Hide alert after 3 seconds
        } finally {
            setLoading(false); // Set loading state to false
        }
    };

    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[50%] mt-[100px] ml-[420px] items-center justify-center">
            <h1 className="text-[50px] mt-4 font-bold flex justify-center text-black mb-[20px]">Create An Account</h1>
            {alert && (
                <p className="text-red-500">{alert}</p>
            )}
            <div className="mb-4 mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                    First Name
                </label>
                <input
                    className="bg-purple-500 shadow appearance-none border rounded w-full py-2 px-3 text-white placeholder-slate-100 leading-tight focus:outline-none focus:shadow-outline"
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                />
            </div>
            <div className="mb-4 mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                    Last Name
                </label>
                <input
                    className="bg-purple-500 shadow appearance-none border rounded w-full py-2 px-3 text-white placeholder-slate-100 leading-tight focus:outline-none focus:shadow-outline"
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                />
            </div>
            <div className="mb-4 mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                </label>
                <input
                    className="bg-purple-500 shadow appearance-none border rounded w-full py-2 px-3 text-white placeholder-slate-100 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
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
                    Create Account
                </button>
                <p className="text-sm font-normal text-gray-600">
                    Already a Member? <a href="/login">Login</a>
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

export default SignupForm;
