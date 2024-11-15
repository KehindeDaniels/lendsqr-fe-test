// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/userContext"; // Ensure this import is correct

import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import GeneralDetails from "./pages/GeneralDetails";
import NotFoundPage from "./pages/NotFoundPage";

const App: React.FC = () => {
  return (
    <UserProvider>
      {" "}
      {/* Wrap all routes in UserProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Login />} />
            <Route path="dashboard" element={<Dashboard />}>
              <Route path="users/:userId" element={<GeneralDetails />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
