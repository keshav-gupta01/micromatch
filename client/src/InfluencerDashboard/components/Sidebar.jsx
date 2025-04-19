import React, { useState } from "react";
import {
  Home,
  LayoutDashboard,
 
  Users,
  Activity,
  MessageCircle,
  Bell,
  User,
  Settings,
  LogOut,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

const SIDEBAR_ITEMS = [
  { name: "Overview", icon: LayoutDashboard },
  { name: "Previous Collaborations", icon: Users },
  { name: "Available Opportunities", icon: Activity },
  { name: "Profile", icon: User },
];


const Sidebar = ({ activeTab, setActiveTab }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

   const handleItemClick = (name) => {
    const key = name.toLowerCase().replace(/\s+/g, "-");
    setActiveTab(key);
  };

  return (

    <div
  className={`${
    collapsed ? "w-20" : "w-64"
  } h-screen bg-[#104581] text-white flex flex-col justify-between transition-all duration-300 p-4
  shadow-lg fixed top-4 left-4 rounded-xl z-50`}
>

      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          {!collapsed && <div className="text-xl font-bold ml-2">MicroMatch</div>}
          <button onClick={toggleSidebar}>
            {collapsed ? (
              <ChevronsRight className="w-6 h-6" />
            ) : (
              <ChevronsLeft className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Nav Items */}
        <nav className="mt-8 flex-grow">
          {SIDEBAR_ITEMS.map((item) => {
            const tabKey = item.name.toLowerCase().replace(/\s+/g, "-");
            const isActive = activeTab === tabKey;

            return (
              <div
                key={item.name}
                onClick={() => handleItemClick(item.name)}
                className={`flex items-center p-3 rounded-lg cursor-pointer mb-2 transition-colors ${
                  isActive
                    ? "bg-white text-[#104581] font-semibold"
                    : "hover:bg-blue-800"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {!collapsed && <span className="ml-3">{item.name}</span>}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Profile Section */}
      <div className="flex items-center gap-3 p-3 bg-blue-800 rounded-lg cursor-pointer hover:bg-blue-900">
        <div className="w-8 h-8 rounded-full bg-white text-[#104581] font-bold flex items-center justify-center">
          BR
        </div>
        {!collapsed && <div className="text-sm">Bablu Rathore</div>}
      </div>
    </div>
  );
};

export { Sidebar };
