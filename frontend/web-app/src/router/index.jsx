import React from "react";
import { Routes, Route } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
{/*import PrivateRoutes from "./PrivateRoutes";*/}

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/*" element={<PublicRoutes />} />
      {/*<Route path="/dashboard/*" element={<PrivateRoutes />} />*/}
    </Routes>
  );
};

export default AppRouter;
