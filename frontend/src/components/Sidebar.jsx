import { NavLink } from "react-router-dom";
import React from "react";

import {
  UserGroupIcon,
  DocumentTextIcon,
  HomeIcon,
  ClipboardDocumentListIcon
} from "@heroicons/react/24/outline";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: <HomeIcon className="w-6 h-6" /> },
  { to: "/campaigns", label: "Campaigns", icon: <DocumentTextIcon className="w-6 h-6" /> },
  { to: "/customers", label: "Customers", icon: <UserGroupIcon className="w-6 h-6" /> },
  { to: "/orders", label: "Orders", icon: <ClipboardDocumentListIcon className="w-6 h-6" /> },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 w-64 h-full bg-slate-800 text-white flex flex-col shadow-lg z-20">
      <div className="p-6 text-2xl font-bold tracking-wide border-b border-slate-700">Xeno CRM</div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center px-3 py-2 rounded-lg transition-colors font-medium ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-200 hover:bg-slate-700 hover:text-white"
              }`
            }
          >
            {/* Pass isActive to the icon */}
            {({ isActive }) => (
              <>
                {React.cloneElement(item.icon, {
                  className: `w-6 h-6 ${isActive ? "text-white" : "text-slate-200"}`
                })}
                <span className={`ml-3 text-white`}>{item.label}</span>
              </>
            )}
        </NavLink>
        ))}
      </nav>
      <div className="p-4 text-xs text-white border-t border-slate-700">© 2025 Xeno CRM made by Karan Singh Rawat</div>
    </aside>
  );
}
