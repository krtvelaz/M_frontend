import React from 'react'
import useRoutes from './config/routes'
import AppRouter from './utils/components/router/AppRouter'
import Template from './utils/components/template'

const MedeinnApp = () => {
  const allRoutes = useRoutes();
  
  return (
    <div>
      <AppRouter template={Template} routes={allRoutes} />
    </div>
  )
}

export default MedeinnApp
