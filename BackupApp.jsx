import ButtonGradient from "./assets/svg/ButtonGradient";
import Benefits from "./components/Benefits";
import Collaboration from "./components/Collaboration";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Pricing from "./components/Pricing";
import Roadmap from "./components/Roadmap";
import Services from "./components/Services";

import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import CombinedDashboard from "./components/CombinedDashboard";


// import Chose from  "./components/Chose"
// import SelectModel from "./components/SelectModel"
// import SelectData from "./components/SelectData"
// import Training from "./components/Training"
// import Quantity from "./components/Quantity";

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
        {/* <Route path="/contact" element={<Contact />} />
        <Route path="/contact/tellus" element={<TellUs />} /> */}
        
        <Route path="/dashboard" element={<CombinedDashboard />} /> {/* Updated route */}
        {/* <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/navbar" element={<Navbar />} /> */}

        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        {/* <Route path="/dashboard/chose" element={<Chose />} />
        <Route path="/dashboard/chose/selectmodel" element={<SelectModel />} />
        <Route path="/dashboard/chose/selectmodel/selectdata" element={<SelectData />} />
        <Route path="/dashboard/chose/selectmodel/selectdata/training" element={<Training />} />
        <Route path="/dashboard/chose/selectmodel/selectdata/training/quantity" element={<Quantity />} /> */}


      </Routes>


      <ButtonGradient />

    </>
  );
};

export default App;
