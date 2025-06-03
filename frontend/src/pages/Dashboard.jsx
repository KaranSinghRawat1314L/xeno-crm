import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    activeCampaigns: 0,
    ordersThisMonth: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/dashboard/stats", { withCredentials: true });
        setStats(res.data);
      } catch (e) {}
      setLoading(false);
    };
    fetchStats();
  }, []);

  if (loading) {
    return <div className="p-8">Loading dashboard...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-slate-800">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border border-slate-200">
          <div className="text-slate-500">Total Customers</div>
          <div className="text-2xl font-bold text-slate-800">{stats.totalCustomers}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border border-slate-200">
          <div className="text-slate-500">Active Campaigns</div>
          <div className="text-2xl font-bold text-slate-800">{stats.activeCampaigns}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border border-slate-200">
          <div className="text-slate-500">Orders This Month</div>
          <div className="text-2xl font-bold text-slate-800">{stats.ordersThisMonth}</div>
        </div>
      </div>
      <div className="mt-10 text-slate-600">
        Welcome! Use the sidebar to manage campaigns, customers, and orders.
      </div>
    </div>
  );
}
