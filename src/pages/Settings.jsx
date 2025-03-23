import ThemeToggle from "../components/ThemeToggle";
import { useState,useEffect } from "react";
  import { ToastContainer, toast } from 'react-toastify';
import { motion } from "motion/react";
const Settings = () => {

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

 const [isReminderEnabled, setIsReminderEnabled] = useState(
    JSON.parse(localStorage.getItem("reminderSettings")) || false
  );  

 const [reminderTime, setReminderTime] = useState(
    localStorage.getItem("reminderTime") || "12:00PM"
  );
  

const toggleReminder = () => {
    setIsReminderEnabled((prev) => {
      const newState = !prev;
      localStorage.setItem("reminderSettings", JSON.stringify(newState));
      return newState;
    });
    toast.success(`Reminders ${!isReminderEnabled ? "Enabled" : "Disabled"}`);
  };

  const [toastPosition, setToastPosition] = useState("top-right");
const [toastDuration, setToastDuration] = useState(5000);

  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem("notificationSettings"));
    if (savedSettings) {
      setToastPosition(savedSettings.position || "top-right");
      setToastDuration(savedSettings.duration || 5000);
    }
  const savedPreferences = JSON.parse(localStorage.getItem("applicationPreferences"));
    if (savedPreferences) {
      setDefaultJobStatus(savedPreferences.defaultJobStatus || "Pending");
      setSortingPreference(savedPreferences.sortingPreference || "newest");
    }
  }, []);

   const saveSettings = () => {
    const settings = { position: toastPosition, duration: toastDuration };
    localStorage.setItem("notificationSettings", JSON.stringify(settings));
    toast.success("Notification settings saved!");
  };

const [defaultJobStatus, setDefaultJobStatus] = useState("Pending");
  const [sortingPreference, setSortingPreference] = useState("newest");

 const savePreferences = () => {
    const preferences = { defaultJobStatus, sortingPreference };
    localStorage.setItem("applicationPreferences", JSON.stringify(preferences));
    toast.success("Application preferences saved!");
  };
  
  const resetSettings = () => {
    localStorage.removeItem("notificationSettings")
    localStorage.removeItem("applicationPreferences")
    setToastPosition("top-right")
    setToastDuration(5000)
    setDefaultJobStatus("Pending")
    setSortingPreference("newest")
    toast.success("Settings have been reset to default!")
 }

const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

  return (
    <motion.div
    variants={cardVariants}
         initial="hidden"
        animate="visible"
      className="p-4">
      <h2 className="text-2xl font-medium text-[#232729] dark:text-[#fbfbfb]">Settings</h2>
       <h2 className="text-md font-medium text-[#232729] dark:text-[#fbfbfb] mt-4">Theme</h2>
      <p className="text-sm font-light flex items-center gap-2 text-[#5e676e] dark:text-[#d9d9d9] mt-2 mb-4">Change Theme for your preference between light & dark</p>
      <div className="flex items-center gap-4">
        <ThemeToggle />
      </div>
      <h2 className="text-md font-medium text-[#232729] dark:text-[#fbfbfb] mt-6">Notification</h2>
      <p className="text-sm font-light flex items-center gap-2 text-[#5e676e] dark:text-[#d9d9d9] mt-2 mb-4">Enable/Disable reminders notification in your specific day</p>
     <p className="text-sm font-light flex items-center gap-2 text-[#404004] dark:text-[#f4f44f] mt-0 w-full md:w-3/7 mb-4">Enable this will only show a notification to remind you about the job you have set to remind , also the reminder jobs will always show in the dashboard</p>
  <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={isReminderEnabled}
          onChange={toggleReminder}
          className="switch"
        />
        <span>{isReminderEnabled ? "Enabled" : "Disabled"}</span>
      </label>
      <h2 className="text-md font-medium text-[#232729] dark:text-[#fbfbfb] mt-6">Notification Message</h2>
     <p className="text-sm font-light flex items-center gap-2 text-[#5e676e] dark:text-[#d9d9d9] mt-2 mb-4">Adjust the notitifaction message pop up for your preference</p>
      <div className="flex flex-col w-fit">
        <label className="block mt-4 text-sm font-light text-[#5e676e] dark:text-[#d9d9d9]">Toast Position:</label>
      <select
        value={toastPosition}
        onChange={(e) => setToastPosition(e.target.value)}
        className="p-1 border border-[#5e676e] dark:border-[#3b4145] rounded mt-1 w-fit"
      >
        <option className="text-[#232729] dark:text-[#fbfbfb]  bg-[#eff0f1] dark:bg-[#181a1b]" value="top-right">Top Right</option>
        <option className="text-[#232729] dark:text-[#fbfbfb]  bg-[#eff0f1] dark:bg-[#181a1b]" value="top-left">Top Left</option>
        <option className="text-[#232729] dark:text-[#fbfbfb]  bg-[#eff0f1] dark:bg-[#181a1b]" value="bottom-right">Bottom Right</option>
        <option className="text-[#232729] dark:text-[#fbfbfb]  bg-[#eff0f1] dark:bg-[#181a1b]" value="bottom-left">Bottom Left</option>
      </select>
      
      <label className="block mt-4 text-sm font-light text-[#5e676e] dark:text-[#d9d9d9] -mb-0">Toast Duration:</label>
      <select
        value={toastDuration}
        onChange={(e) => setToastDuration(Number(e.target.value))}
        className="p-1 border border-[#5e676e] dark:border-[#3b4145] rounded w-fit"
      >
        <option className="text-[#232729] dark:text-[#fbfbfb]  bg-[#eff0f1] dark:bg-[#181a1b]" value={3000}>Short (3s)</option>
        <option className="text-[#232729] dark:text-[#fbfbfb]  bg-[#eff0f1] dark:bg-[#181a1b]" value={5000}>Medium (5s)</option>
        <option className="text-[#232729] dark:text-[#fbfbfb]  bg-[#eff0f1] dark:bg-[#181a1b]" value={8000}>Long (8s)</option>
      </select>
      
      

      <button onClick={saveSettings} className="mt-4 bg-[#042740] text-[#4fb0f4] dark:bg-[#4fb0f4] dark:text-[#042740] font-medium p-2 rounded  cursor-pointer">
        Save Settings
      </button>
 </div>
      {/* Reminder Time Selector */}
     <div className="flex flex-col w-fit">
       <h2 className="text-md font-medium text-[#232729] dark:text-[#fbfbfb] mt-6">Application Preferences</h2>
        <p className="text-sm font-light flex items-center gap-2 text-[#5e676e] dark:text-[#d9d9d9] mt-2 mb-4">Adjust the notitifaction message pop up for your preference</p>

      <label className="block mt-4 text-sm font-light text-[#5e676e] dark:text-[#d9d9d9]">Default Job Status:</label>
      <select
        value={defaultJobStatus}
        onChange={(e) => setDefaultJobStatus(e.target.value)}
        className="p-1 border border-[#5e676e] dark:border-[#3b4145] rounded w-fit"
      >
        <option className="text-[#232729] dark:text-[#fbfbfb]  bg-[#eff0f1] dark:bg-[#181a1b]" value="Pending">Pending</option>
        <option className="text-[#232729] dark:text-[#fbfbfb]  bg-[#eff0f1] dark:bg-[#181a1b]" value="Interview">Interview</option>
        <option className="text-[#232729] dark:text-[#fbfbfb]  bg-[#eff0f1] dark:bg-[#181a1b]" value="Rejected">Rejected</option>
      </select>
      
      <label className="block mt-4 text-sm font-light text-[#5e676e] dark:text-[#d9d9d9]">Sorting Preference:</label>
      <select
        value={sortingPreference}
        onChange={(e) => setSortingPreference(e.target.value)}
        className="p-1 border border-[#5e676e] dark:border-[#3b4145]   rounded w-fit"
      >
        <option className="text-[#232729] dark:text-[#fbfbfb]  bg-[#eff0f1] dark:bg-[#181a1b]" value="newest">Newest First</option>
        <option className="text-[#232729] dark:text-[#fbfbfb]  bg-[#eff0f1] dark:bg-[#181a1b]" value="company">Company Name</option>
        <option className="text-[#232729] dark:text-[#fbfbfb]  bg-[#eff0f1] dark:bg-[#181a1b]" value="status">Status</option>
      </select>
      
      <button onClick={savePreferences} className="mt-4  bg-[#042740] text-[#4fb0f4] dark:bg-[#4fb0f4] dark:text-[#042740] cursor-pointer font-medium p-2 rounded w-fit">
        Save Preferences
      </button>
      </div>
       <button onClick={resetSettings} className="mt-4 text-[#f44f4f] cursor-pointer bg-[#400404] dark:bg-[#f44f4f] dark:text-[#400404] p-2 rounded">
        Reset to Default
      </button>
    </motion.div>
  );
};

export default Settings;
    