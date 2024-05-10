import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { check_authenticated } from '../utils/backend_api';

function Userprofile() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = sessionStorage.getItem('access_token');
        if (!accessToken) {
            navigate('/login');
        } else {
            try {
                // Token is valid, continue on the same page
                check_authenticated(accessToken)
                console.log("You are Authenticated! Let's go...")
                setLoading(false); // Set loading to false after successful authentication
              }
              catch(error) {
                console.error(error);
                sessionStorage.removeItem('access_token')
                navigate('/login');
                // if (error.response && error.response.status === 401) {
                //   navigate('/login');
                // }
                setLoading(false); // Set loading to false after authentication check
              }
        }
    }, []);


    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-purple-500 text-black"></div>
                </div>
            </div>
        );
    }
   

    return (
        <>

            <Navbar />
            <div className="mx-auto ml-[25%] w-[70%] mr-[50px]">
                <Sidebar />
                <div className='pt-10 pb-6'>
                    <h1 className='text-[32px] mb-6'>Settings</h1>
                    <p className='text-[24px] '>Manage Your Project Setting</p>
                </div>

                <div className='border border-gray-500'>
                    <h1 className='text-[24px] ml-[10px] my-[10px]'>Accounts</h1>
                    <p className='text-[16px] ml-[10px] my-[10px]'>This information will be displayed publicly if your project is set to public.</p>
                    <div className='flex flex-col'>
                        <div className='flex flex-row gap-10 my-5 ml-[10px]'>
                            <p>First Name</p>
                            <input className=' border border-gray-500' type="text" placeholder='Name' />
                        </div>
                        <div className='flex flex-row gap-10 my-5 ml-[10px]'>
                            <p>Last Name</p>
                            <input className='border border-gray-500' type="text" placeholder='Last Name' />
                        </div>
                        <div className='flex flex-row gap-10 my-5 ml-[10px]'>
                            <p>User Name</p>
                            <input className='border border-gray-500' type="text" placeholder='User Name' />
                        </div>
                        <div>
                            <button className="gap-10 my-5 ml-[10px]  bg-purple-500 text-white text-[14px] px-[16px] py-[8px] mt-[5px] border-white rounded-md">Save</button>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default Userprofile