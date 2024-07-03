

import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { SiHomeassistant } from "react-icons/si";
import { SiAzuredataexplorer } from "react-icons/si";

function SideBar() {
    const navigate = useNavigate()

    const handleLogout = () => {
        sessionStorage.removeItem('access_token');
        navigate('/login');
    }
    
    return (
        <>
            <div>
                <aside id="default-sidebar" className="fixed top-[4rem] left-3 w-64 h-[calc(100vh-4rem)] transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                    <div className="flex flex-col h-full px-1 py-4">
                        <ul className="flex-grow space-y-2 font-normal text-[18px] overflow-y-auto">
                            <li className="pl-1 mr-7 py-2 rounded-md hover:bg-gray-700">
                                <a href="/" className="sidebar-button flex flex-row gap-4">
                                    <SiHomeassistant  className="text-[25px]"/>
                                    <span className="mt-[3px]">Home</span>
                                </a>
                            </li>
                            <li className="pl-1 mr-7 py-2 rounded-md hover:bg-gray-700">
                                <a href="/dashboard" className="sidebar-button flex flex-row gap-4">
                                    <RxDashboard className="text-[25px]"/>
                                    <span className="mt-[3px]">Dashboard</span>
                                </a>
                            </li>
                            <li className="pl-1 mr-7 py-2 rounded-md hover:bg-gray-700">
                                <a href="/dashboard/newproject/dataartifacts/configuration/activity/user" className="sidebar-button flex flex-row gap-4">
                                    <FaUser className="text-[20px]" />
                                    <span className="mt-[-3px]">Profile</span>
                                </a>
                            </li>
                            <li className="pl-1 mr-7 py-2 rounded-md hover:bg-gray-700">
                                <a href="/dashboard/newproject/dataartifacts/configuration/activity/dataartifact" className="sidebar-button flex flex-row gap-4">
                                    <SiAzuredataexplorer />
                                    <span className="mt-[-3px]">Data Artifact</span>
                                </a>
                            </li>
                        </ul>

                        <div className="pt-4">
                            <button 
                                onClick={handleLogout} 
                                className="w-[80%] bg-color-7 text-white text-[18px]  py-[12px] rounded-md"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </aside>
                <div className="w-64 h-screen"></div>
            </div>
        </>
    )
}

export default SideBar

