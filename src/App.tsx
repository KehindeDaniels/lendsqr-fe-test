import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";

import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import UserDetails from "./pages/UserDetails"; // This is now a top-level route
import Login from "./pages/Login";
import NotFoundPage from "./pages/NotFoundPage";

const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />{" "}
          {/* Login page without layout */}
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
