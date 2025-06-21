import { useState } from "react";
import { Save, Bell, Lock, UserCog } from "lucide-react";

const Settings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    currentPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    // You can call an API here to save the settings
    console.log("Saved settings:", settings);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <UserCog size={22} />
        Admin Settings
      </h2>

      {/* Notification Preferences */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-1 text-gray-700">
          <Bell size={18} /> Notifications
        </h3>
        <label className="flex items-center space-x-2 mb-2">
          <input
            type="checkbox"
            name="emailNotifications"
            checked={settings.emailNotifications}
            onChange={handleChange}
            className="accent-green-600"
          />
          <span>Email Notifications</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="smsNotifications"
            checked={settings.smsNotifications}
            onChange={handleChange}
            className="accent-green-600"
          />
          <span>SMS Notifications</span>
        </label>
      </div>

      {/* Change Password */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-1 text-gray-700">
          <Lock size={18} /> Change Password
        </h3>
        <input
          type="password"
          name="currentPassword"
          value={settings.currentPassword}
          onChange={handleChange}
          placeholder="Current Password"
          className="w-full px-4 py-2 border rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="password"
          name="newPassword"
          value={settings.newPassword}
          onChange={handleChange}
          placeholder="New Password"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded flex items-center gap-2"
      >
        <Save size={18} /> Save Changes
      </button>
    </div>
  );
};

export default Settings;
