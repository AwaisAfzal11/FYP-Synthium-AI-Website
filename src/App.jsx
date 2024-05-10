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
import Dataartifacts from "./components/Dataartifacts";
import Configuration from "./components/Configuration";
import Activity from "./components/Activity";
import LoginForm from "./components/Login";
import SignupForm from "./components/Signup";
import Userprofile from "./components/Userprofile";
import Model from "./components/Model";

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
        <Route path="/dashboard/newproject" element={<Model />} />
        <Route path="/dashboard/newproject/dataartifacts" element={<Dataartifacts />} />
        <Route path="/dashboard/newproject/dataartifacts/configuration" element={<Configuration />} />
        <Route path="/dashboard/newproject/dataartifacts/configuration/activity" element={<Activity />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/userprofile" element={<Userprofile />} />
        {/* <Route path="/userprofile" element={<><Navbar handleLogout={handleLogout} /><Sidebar handleLogout={handleLogout} /><Userprofile /></>} /> */}
      </Routes>
      <ButtonGradient />

    </>
  );
};
export default App;