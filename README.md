

**********************************************************************************************************

**********************************************************************************************************

**********************************************************************************************************

**********************************************************************************************************

<div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header />
        <Hero />
        <Benefits />
        {/* <Collaboration /> */}
        {/* <Services /> */}
        <Pricing />
        {/* <Roadmap /> */}
        <Footer />
      </div>

**********************************************************************************************************
talilwind.config.js => pre-defined properties
index.css => pre-defined fonts and rotations
Reuseable components (18:00) gradient-button 
src-constant-index.js => content is present  here
useLocation (tells where are we) => react-router-dom 
src-components-desing-Header.jsx => small balls, circles and border_lines {Rings, Background circles, lines}
Hero.jsx => npm install parallax {move balls with cursor}
&nbsp; (spacing)
Benefits.jsx => {item.light && <GradientLight />} => bg-gradient => index.js (light=true) => src-design-benefits.jsx





**********************************************************************************************************
font-code
text-n-1, text-n-1/50, transition-colors, hover:text-color-1, text-n-2, body-1, 


**********************************************************************************************************









Dashboard Components:

**DashboardLayout.jsx:**This component defines the overall layout of the dashboard, including the sidebar, header, and main content area.

**DashboardHeader.jsx:** Renders the header of the dashboard, which may include the logo, user profile, and settings.

**DashboardSidebar.jsx:** Renders the sidebar navigation menu with links to different sections of the dashboard.
DashboardMain.jsx: Contains the main content of the dashboard, which may include various widgets, charts, and data visualizations.


Utils:


ApiUtils.js: Utility functions for making API calls.
DateUtils.js: Utility functions for formatting dates and times.


Charts:


BarChart.jsx: A component for rendering a bar chart.
LineChart.jsx: A component for rendering a line chart.
PieChart.jsx: A component for rendering a pie chart.

DataTables || Settings 


=> **1 Dashboard, 3 Pages, 4 Apps and 7 Charts.**
|==> 3 Pages: {Orders, Employee and Customer Tables`}


**********************************************************************************************************

=> Note its layout, components, functionality, and design elements.
=> Implement Components: Begin by implementing the basic components of the dashboard, such as the sidebar, header, and main content area. Use React components for modularity and reusability.
=> Add Functionality: Implement the interactive elements of the dashboard, such as data visualization components, filters, and search functionality.
=> Next.js, offering additional features like server-side rendering, routing, and API routes.
=> You'll need to handle routing, data fetching, and other aspects that Next.js simplifies.

 focusing on server-side rendering (SSR) and routing

4. Data Fetching: 3 types...
 => getStaticProps, getServerSideProps, getInitialProps

 export async function getServerSideProps() {
      const res = await fetch('https://api.example.com/stock-prices');
      const stockPrices = await res.json();
      return { props: { stockPrices } };
    }

  export async function getStaticProps() {
    const res = await fetch('https://api.example.com/posts');
    const posts = await res.json();
    return { props: { posts } };
  }

export default function handler(req, res){
  res.status(200).json({message:"Hello"})
}


**********************************************************************************************************
API ROUTES HANDLING:

// pages/api/example.js
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello from the API route!' });
}


// pages/about.js
import React from 'react';

function About() {
  return <h1>About Page</h1>;
}

export default About;


// pages/about.js
import React, { useState, useEffect } from 'react';

function About() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/example');
      const data = await response.json();
      setMessage(data.message);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>About Page</h1>
      <p>{message}</p>
    </div>
  );
}

export default About;


**********************************************************************************************************
Hooks in React:
useState and useEffect


**********************************************************************************************************
Setting up a dashboard setup:

landing-page/
├── src/
│   ├── components/
│   │   └── LandingPage.jsx
│   └── App.js
└── package.json


dashboard/
├── pages/
│   ├── index.js
│   ├── dashboard.js
│   └── ...
├── components/
│   ├── Sidebar.js
│   ├── Header.js
│   └── MainContent.js
├── package.json
└── ...

npx create-next-app dashboard

**********************************************************************************************************

Create Dashboard Components: Inside the dashboard directory, create the necessary components for your dashboard (Sidebar.js, Header.js, MainContent.js).

Configure Routes: In the pages directory of your Next.js project, create a dashboard.js file to represent the dashboard page. Define the routes for the dashboard components in this file.


**********************************************************************************************************

// dashboard/pages/dashboard.js

import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import MainContent from '../components/MainContent';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content">
        <Header />
        <MainContent />
      </div>
    </div>
  );
};

export default Dashboard;




**********************************************************************************************************

Linking to the Dashboard:

In your landing page (LandingPage.jsx), add a link or button to navigate to the dashboard:

// landing-page/src/components/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      <h1>Landing Page</h1>
      <Link to="/dashboard">Go to Dashboard</Link>
    </div>
  );
};

export default LandingPage;


**********************************************************************************************************
Setting Up Routing:

If you're using React Router for routing in your landing page, ensure the BrowserRouter is wrapping your App component in App.js:

// landing-page/src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Dashboard from '../dashboard/pages/dashboard';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  );
};

export default App;

**********************************************************************************************************


**********************************************************************************************************




**********************************************************************************************************




**********************************************************************************************************



**********************************************************************************************************



**********************************************************************************************************



**********************************************************************************************************
