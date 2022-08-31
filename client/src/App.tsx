import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import AppBar from "./components/AppBar";
import CollegeView from "./pages/CollegeView";
import Dashboard from "./pages/Dashboard";

type Props = {};

const App = (props: Props) => {
  return (
    <>
      <AppBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/colleges/*" element={<CollegeView />} />
      </Routes>
    </>
  );

  //   return <Dashboard />;
};

export default App;
