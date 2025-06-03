import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Campaigns from "./pages/Campaigns";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import useAuth from "./hooks/useAuth";

function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  return (
    <Router>
      {isAuthenticated && <Sidebar />}
      <div className={isAuthenticated ? "ml-64 bg-slate-100 min-h-screen" : "bg-slate-100 min-h-screen"}>
        {isAuthenticated && <Header />}
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
          <Route path="/campaigns" element={isAuthenticated ? <Campaigns /> : <Navigate to="/" />} />
          <Route path="/customers" element={isAuthenticated ? <Customers /> : <Navigate to="/" />} />
          <Route path="/orders" element={isAuthenticated ? <Orders /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
