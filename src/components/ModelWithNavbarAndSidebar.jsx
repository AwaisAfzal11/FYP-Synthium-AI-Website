import React from 'react';
import CombinedDashboard from './CombinedDashboard';
import Model from './Model';

const ModelWithNavbarAndSidebar = () => {
 return (
    <CombinedDashboard>
      <Model />
    </CombinedDashboard>
 );
};

export default ModelWithNavbarAndSidebar;
