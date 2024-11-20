import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";

import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard";
import UserDetails from "./pages/UserDetail/UserDetails"; // This is now a top-level route
import NotFoundPage from "./pages/NotFoundPage";
import Login from "./pages/Login/Login";

const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />{" "}
          <Route path="dashboard" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="users/:userId" element={<UserDetails />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
