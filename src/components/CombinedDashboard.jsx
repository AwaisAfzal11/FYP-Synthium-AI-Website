import { useLocation } from 'react-router-dom';

import Navbar from './Navbar';
import Sidebar from './Sidebar';
// import Model from './Model';
import Dashboard from './Dashboard';

function CombinedDashboard() {
   //  const location = useLocation();
   //  const navbarRoutes = ['/dashboard', '/profile', '/settings', '/help'];
   
    return (
       <div>
         {/* {navbarRoutes.includes(location.pathname) && <Navbar />} */}
         <Navbar />
         <Sidebar />
         <Dashboard/>
         
       </div>
    );
   }
export default CombinedDashboard;   
   

// import { useLocation } from 'react-router-dom';

// import Navbar from './Navbar';
// import Sidebar from './Sidebar';
// import Dashboard from './Dashboard';

// function CombinedDashboard() {
//     const location = useLocation();t
//     const navbarRoutes = ['/dashboard', '/profile', '/settings', '/help'];
//  return (
//     <div>
//       {navbarRoutes.includes(location.pathname) && <Navbar />}
//       <Sidebar />
//       <Dashboard />
//     </div>
//  );
// }

// export default CombinedDashboard;
