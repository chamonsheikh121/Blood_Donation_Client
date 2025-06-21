import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // icons for mobile toggle

const navItems = [
  { path: "/admin/", label: "📚 Book Management" },
  { path: "users", label: "👥 User Management" },
  { path: "borrows", label: "🔄 Borrow / Return" },
  { path: "fines", label: "💰 Fines / Payments" },
  { path: "settings", label: "⚙️ Settings" },
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:block w-64 bg-white shadow-md px-6 py-8">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <nav className="space-y-3">
          {navItems.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md transition ${
                  isActive
                    ? "bg-green-100 text-green-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white shadow-md px-4 py-3 flex justify-between items-center z-50">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-40 z-40" onClick={() => setSidebarOpen(false)} />
      )}

      <aside
        className={`md:hidden fixed top-0 left-0 w-64 h-full bg-white shadow-md z-50 transform transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 space-y-6">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
          <nav className="space-y-3">
            {navItems.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md transition ${
                    isActive
                      ? "bg-green-100 text-green-700 font-semibold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main content area */}
      <main className="flex-1 p-6 mt-14 md:mt-0 overflow-x-auto w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
