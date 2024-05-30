import Navbar from './Navbar';
import Sidebar from './Sidebar';

function Profile() {
    return (
        <>
            <Navbar />
            <div className="flex">
                <Sidebar />
                <div className="flex-1 p-4">
                    <div className='pt-10 pb-6'>
                        <h1 className='text-[32px] mb-6'>Settings</h1>
                        <p className='text-[24px] '>Manage Your Personal Settings</p>
                    </div>

                    <div className=''>

                        <div className='flex flex-col border border-gray-500 mb-3'>
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

                        <div className='flex flex-col border border-gray-500 mb-3  '>
                            <div className='text-[17px] ml-[10px] my-2'>
                                <h1 >Email</h1>
                                <p>You are currently authenticated with this email: aaa@gmail.com</p>
                            </div>

                        </div>

                

                        <div className=" flex flex-col   mb-3  border rounded-md border-red-500 ">
                            <div className='ml-4 text-[18px] mt-4'>
                                <h1 className='text-[24px]'>Delete Your Account</h1>
                                <p className='mt-4'>Deleting your project will delete all models, data artifacts, and members. <b>Once completed, this action cannot be undone.</b> </p>

                                <button className="my-4  bg-red-500 text-white text-[14px] p-3 mt-[15px] border-white rounded-md">Delete Profile</button>
                            </div>

                        </div>





                    </div>

                </div>
            </div>
        </>
    );
}

export default Profile;

