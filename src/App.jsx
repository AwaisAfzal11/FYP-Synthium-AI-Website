import ButtonGradient from "./assets/svg/ButtonGradient";
import Benefits from "./components/Benefits";
// import Collaboration from "./components/Collaboration";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Pricing from "./components/Pricing";
// import Roadmap from "./components/Roadmap";
// import Services from "./components/Services";

import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import SelectDataArtifact from "./components/SelectDataArtifact";
import Configuration from "./components/Configuration";
import ProjectLander from "./components/ProjectLander";
import LoginForm from "./components/Login";
import SignupForm from "./components/Signup";
import Userprofile from "./components/Userprofile";
import Project from "./components/Project";
import Profile from "./components/Profile";
import DataArtifact from "./components/DataArtifact";
// import TableDataArtifact from "./components/TableDataArtifact";
// import Profile from './Profile';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<>
          <Header />
          <Hero />
          <Benefits />
          <Pricing />
          <Footer />
        </>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/newproject/dataartifacts/configuration/activity/user" element={<Profile />} />
        <Route path="/dashboard/newproject/dataartifacts/configuration/activity/dataartifact" element={<DataArtifact />} />
        <Route path="/project/:project_id" element={<Project />} />
        <Route path="/dashboard/newproject/dataartifacts" element={<SelectDataArtifact />} />
        <Route path="/dashboard/newproject/dataartifacts/configuration" element={<Configuration />} />
        <Route path="/dashboard/newproject/dataartifacts/configuration/activity" element={<ProjectLander />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/userprofile" element={<Userprofile />} />
        {/* <Route path="/userprofile" element={<><Navbar handleLogout={handleLogout} /><Sidebar handleLogout={handleLogout} /><Userprofile /></>} /> */}
        {/* Dashboard, SelectDataArtifact, ProjectLander (4buttons),  */}
        {/* Dashboard, SelectModel, SelectDataArtifact, Configuration, ProjectLander (4buttons),  */}
      </Routes>
      <ButtonGradient />

    </>
  );
};
export default App;