import { motion } from "motion/react";
import { useEffect, useState } from "react";
import image from '../assets/undraw_correct-answer_vjt7.svg'
import { CiTrash ,CiWavePulse1 ,CiStar,CiFileOff ,CiFileOn    } from "react-icons/ci";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,PieChart,Pie,Cell } from 'recharts';
const Dashboard = () => {
    return ( 
        <div>
            <JobStats/>
        </div>
     );
}

const JobStats = () => {
    
    const [totalAplication, setTotalAplication] = useState(0)
    
    const [totalActive, setTotalActive] = useState(0)
    
    const [totalRejected, setTotalRejected] = useState(0)
    
    const [totalOffers, setTotalOffers] = useState(0)
    
  const [totalInterviewing, setTotalInterviewing] = useState(0)
  

const [mockJobs, setMockJobs] = useState(() => {
  const savedJobs = localStorage.getItem('jobs');
  return savedJobs
    ? JSON.parse(savedJobs)
    : [
        { id: 1, company: "StarDust", position: ".NET Developer", status: 'Active' },
        { id: 2, company: "Dark Magician", position: "Frontend Developer", status: 'Active' },
        { id: 3, company: "Blue Eyes", position: "Backend Developer", status: 'Active' },
        { id: 4, company: "Synchro Z", position: "Chef", status: 'Closed' },
      { id: 5, company: "Solo Leveling", position: "Miner", status: "Active", progress: 'Rejected' },
      {id: 6, company: "LinkD", position: "Recruiter", status: "Closed",progress:'Offer Recived'},
       { id: 7, company: "Vipa ", position: "Transporter", status: "Closed", progress: 'Rejected' },
      {id: 8, company: "Hunters Tech", position: "Team Leader", status: "Active",progress:'Offer Recived'},
      { id: 9, company: "White Tiger", position: "Miner", status: "Active", progress: 'Rejected' },


      ];
});
  
useEffect(() => {
     const savedJobs = JSON.parse(localStorage.getItem('jobs')) || [];
       const combinedJobs = [...mockJobs, ...savedJobs];


      setTotalAplication(combinedJobs.length); // Count total applications
        setTotalActive(combinedJobs.filter(job => job.status === "Active").length);
        setTotalRejected(combinedJobs.filter(job => job.progress === "Rejected").length);
  setTotalOffers(combinedJobs.filter(job => job.progress === "Offer Received").length);
  setTotalInterviewing(combinedJobs.filter(job => job.progress === 'Interviewing').length)
    
}, [mockJobs])
    
const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

const [newJob, setNewJob] = useState(() => {
  const savedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
  return savedJobs.length > 0 ? savedJobs[0] : {}; // Default to first job or empty object
});

    const [progressState, setProgressState] = useState(0);

    useEffect(() => {
  const savedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
  
  // Find the correct job by matching with newJob
  const currentJob = savedJobs.find(job => job.id === newJob.id);

  if (currentJob) {
    if (currentJob.progress === "Applied") {
      setProgressState(25);
    } else if (currentJob.progress === "Interviewing") {
      setProgressState(50);
    } else if (currentJob.progress === "Offer Received") {
      setProgressState(100);
    } else if (currentJob.progress === "Rejected") {
      setProgressState(1);  // Small width to keep it visible
    }
  }
}, [newJob.progress])


   const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem("jobs")) || [
      { id: 1, company: "StarDust", position: ".NET Developer", status: "Active", dateApplied: "", progress: "Applied" },
      { id: 2, company: "Dark Magician", position: "Frontend Developer", status: "Active", dateApplied: "", progress: "Offer Received" },
      { id: 3, company: "Blue Eyes", position: "Backend Developer", status: "Active", dateApplied: "", progress: "Applied" },
      { id: 4, company: "Synchro Z", position: "Chef", status: "Closed", dateApplied: new Date().toISOString().split("T")[0], progress: "Rejected" },
      { id: 5, company: "Solo Leveling", position: "Miner", status: "Active", dateApplied: "", progress: "Rejected" },
      { id: 6, company: "LinkD", position: "Recruiter", status: "Closed", dateApplied: "", progress: "Offer Received" },
      { id: 7, company: "Vipa", position: "Transporter", status: "Closed", dateApplied: "", progress: "Rejected" },
      { id: 8, company: "Hunters Tech", position: "Team Leader", status: "Active", dateApplied: "", progress: "Offer Received" },
      { id: 9, company: "White Tiger", position: "Miner", status: "Active", dateApplied: "", progress: "Rejected" },
    ];

    // Monthly Counts of Applications
    const monthlyCounts = {};
    const dailyCounts = {};

    savedJobs.forEach((job) => {
      if (job.dateApplied) {
        // Format the month: "Jan", "Feb", etc.
        const month = new Date(job.dateApplied).toLocaleString("default", { month: "short" });
        monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;

        // Track daily application counts with progress breakdown
        dailyCounts[job.dateApplied] = dailyCounts[job.dateApplied] || { Applied: 0, Rejected: 0, "Offer Received": 0 };
        dailyCounts[job.dateApplied][job.progress] += 1;
      }
    });

    // Format monthly data for Recharts
    const formattedMonthlyData = Object.entries(monthlyCounts).map(([month, count]) => ({
      name: month,
      applications: count,
    }));

    // Format daily data for detailed status breakdown (for pie chart or other component)
    const formattedDailyData = Object.entries(dailyCounts).map(([date, statuses]) => ({
      date,
      ...statuses, // Applied, Rejected, etc.
    }));

    setChartData(formattedMonthlyData);
  }, []);

  

const pieData = [
  { name: "Applied", value: totalAplication, fill: "#4ff44f" },
  { name: "Rejected", value: totalRejected, fill: "#f44f4f" },
  { name: "Offer Received", value: totalOffers, fill: "#7fc6f7" },
  { name: "Interviewing", value: totalInterviewing, fill: "#1f9af1" }
];

  const [reminderData, setReminderData] = useState([])
  
  useEffect(() => {
    const savedReminders = JSON.parse(localStorage.getItem("reminders")) || [];
    if (savedReminders) {
      setReminderData(savedReminders)
    }
  },[])

  


  const [drafts, setDrafts] = useState([]);
  const [addJob,setAddJob]=useState(false)



useEffect(() => {
    const savedDrafts = JSON.parse(localStorage.getItem("draftJobs")) || [];
    setDrafts(savedDrafts);
}, []);
  
const openDraft = (draftId) => {
    const savedDrafts = JSON.parse(localStorage.getItem("draftJobs")) || [];
    const selectedDraft = savedDrafts.find(draft => draft.id === draftId);
    
    if (selectedDraft) {
        setNewJob(selectedDraft); // Load draft into modal
        setAddJob(true); // Open modal
    }
};

const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob({ ...newJob, [name]: value });
};
const submitJob = () => {
    let updatedJobs;
    if (newJob.id) {
        // Editing an existing job
        updatedJobs = mockJobs.map(job => job.id === newJob.id ? { ...job, ...newJob } : job);
    } else {
        // Adding a new job
        const newJobEntry = {
            id: mockJobs.length + 1, // Unique ID
            company: newJob.company,
            position: newJob.position,
            status: newJob.status,
            dateApplied: newJob.dateApplied || new Date().toISOString().split("T")[0],
            notes: newJob.notes,
            progress:newJob.progress// Default to today
        };
        updatedJobs = [...mockJobs, newJobEntry];
    }

    setMockJobs(updatedJobs);
    localStorage.setItem('jobs', JSON.stringify(updatedJobs)); // Save to localStorage

    setNewJob({ company: "", position: "", status: "" }); // Reset form
    setAddJob(false)
};
  
 const clearDraft = () => {
    localStorage.setItem("draftJobs", JSON.stringify([])); // Set to an empty array
    setDrafts([]); // Update state to reflect empty drafts
};

  
    return (
      <div>
      <motion.div
      variants={cardVariants}
       initial="hidden"
      animate="visible"
      className="grid  gap-4 p-6 md:grid-cols-2">
      {/* Total Applications */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
              <motion.div
      variants={cardVariants}
      whileHover="hover"
      className="bg-gray-800 text-white p-6 rounded-lg shadow-lg flex flex-col text-center justify-center items-center hover:scale-105 transition-all">
        <CiWavePulse1  className="w-[22px] h-[22px] md:w-[25px] md:h-[25px]"/>
        <h2 className="text-2xl font-bold">{totalAplication}</h2>
        <p className="text-gray-400 text-center text-sm md:text-base">Total Applications</p>
      </motion.div>

      {/* Active Applications */}
      <motion.div
      variants={cardVariants}
      whileHover="hover"
      className="bg-[#0440042a] dark:bg-[#232729] text-black border border-[#044004] dark:border-[#4ff44f] justify-center p-6 rounded-lg shadow-lg flex flex-col items-center hover:scale-105 transition-all">
        <CiFileOn className="w-[22px] h-[22px] md:h-[25px] md:w-[25px] text-[#044004] dark:text-[#4ff44f]"/>
        <h2 className="text-2xl font-bold text-[#044004] dark:text-[#4ff44f]">{totalActive}</h2>
        <p  className="text-[#044004] dark:text-[#4ff44f] text-center text-sm md:text-base">Active Applications</p>
      </motion.div>

      {/* Rejected Applications */}
      <motion.div
      variants={cardVariants}
      whileHover="hover"
      className="bg-[#4004042a] dark:bg-[#232729] border border-[#400404] dark:border-[#f44f4f] text-black p-6 justify-center rounded-lg shadow-lg flex flex-col items-center hover:scale-105 transition-all">
        <CiFileOff  className="w-[22px] h-[22px] md:h-[25px] md:w-[25px] text-[#400404] dark:text-[#f44f4f]"/>
        <h2 className="text-2xl font-bold text-[#400404] dark:text-[#f44f4f]">{totalRejected}</h2>
        <p className="text-[#400404] dark:text-[#f44f4f] text-center w-full text-sm md:text-base">Rejected Applications</p>
      </motion.div>

      {/* Offers Received */}
      <motion.div
      variants={cardVariants}
      whileHover="hover"
      className="bg-[#4faff42a] dark:bg-[#232729] text-[#042740] dark:text-[#4fb0f4] border border-[#042740] justify-center dark:border-[#4fb0f4] p-6 rounded-lg shadow-lg flex flex-col items-center hover:scale-105 transition-all">
        <CiStar className="w-[22px] h-[22px] md:w-[25px] md:h-[25px]"/>
        <h2 className="text-2xl font-bold">{totalOffers}</h2>
        <p className="text-center text-sm md:text-base">Offers Received</p>
      </motion.div>
    </div>
      <div className="flex item-center flex-col h-fit">
      <h1 className="text-[#5e676e] dark:text-[#d6d9dc] text-medium mb-2">Current Progress: <b className="text-medium text-[#232729] dark:text-[#fbfbfb]">{newJob.progress}</b></h1>
        <p className="text-[#848e95] dark:text-[#9fa7ac] text-medium font-light mb-2">This only shows the last job application</p>
       <motion.div className="w-full bg-[#1a1a1a] h-2 rounded-md overflow-hidden">
    {newJob?.progress && (
    <motion.div className="w-full bg-[#fbfbfb] dark:bg-[#404040] h-2 rounded-md border border-[#848e95] dark:border-none overflow-auto">
    <motion.div
      className={`h-full rounded-md ${
      newJob.progress === "Offer Received" 
      ? "bg-[#044004] dark:bg-[#4ff44f]" 
      : newJob.progress === "Rejected" 
      ? "bg-[#400404] dark:bg-[#f44f4f]" 
      : "bg-[#1f9af1] dark:bg-[#4fb0f4]"
      }`}
      initial={{ width: "10%" }} // Start with a small width
      animate={{ width: `${progressState}%` }} 
      transition={{ duration: 0.5 }}
    />
    </motion.div>
    )}



    </motion.div>
     <ResponsiveContainer style={{marginTop:'25px'}} width="100%" height={300}>
      <PieChart>
      <Pie
      data={pieData}
      cx="50%"
      cy="50%"
      labelLine={false}
      outerRadius={100}
      fill="#8884d8"
      dataKey="value"
      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
      >
      {pieData.map((entry, index) => (
      <Cell key={`cell-${index}`} fill={entry.fill} />
      ))}
      </Pie>
      <Tooltip />
      <Legend />
      </PieChart>
    </ResponsiveContainer>
       </div>
   
      <div className="flex flex-col gap-2.5 items-start mt-4 md:mt-6">
      <h1 className="text-xl font-medium text-[#232729] dark:text-[#fbfbfb] mb-2 mt-4">Reminder to Apply Later</h1>
        {reminderData.length === 0 ? (<div className=" w-full items-center text-center justify-items-center flex-col">
          <img className="w-[250px] h-[250px] object-contain" src={image} alt="" />
          Add any job to the reminder to show them here</div>) : 
    reminderData.map((reminder, index) => (
    <div key={index} className="flex bg-[#fbfbfb] dark:bg-[#262626] border border-[#5e676e] dark:border-[#404040] p-1.5 rounded-md items-start gap-2">
    <p className="text-[#5e676e] dark:text-[#d6d9dc] font-light text-sm"> Company: <b className="text-sm font-medium text-[#1f9af1] dark:text-[#4fb0f4]">{reminder.company}</b> </p>
      <p className="text-[#5e676e] dark:text-[#d6d9dc] font-light text-sm"> Position: <b className="text-sm font-medium text-[#1f9af1] dark:text-[#4fb0f4]">{reminder.position}</b> </p>
      <p className="text-[#5e676e] dark:text-[#d6d9dc] font-light text-sm"> Reminder: <b className="text-sm font-medium text-[#1f9af1] dark:text-[#4fb0f4]">{reminder.date}</b> </p>
    </div>
    ))
    }
      </div>
      <div className="drafts-section mt-12 md:mt-8 overflow-y-auto h-[500px]">
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-bold text-[#232729] dark:text-[#fbfbfb]">Saved Drafts & Last Checked</h2>
    <button className="text-md font-medium text-[#232729] dark:text-[#fbfbfb] cursor-pointer flex items-center" onClick={clearDraft}> <p className="hidden md:block">Clear All</p> <CiTrash className="block md:hidden h-[22px] w-[22px] text-[#232729] dark:text-[#fbfbfb]"/></button>
    </div>
      {drafts.length === 0 ? (
      <p className="text-gray-400">No drafts available</p>
    ) : (
      drafts.map((draft) => (
      <div key={draft.id} className="p-3 bg-[#fbfbfb] dark:bg-[#262626]  border border-[#5e676e] dark:border-[#404040] rounded-md mt-2">
        <h3 className="text-[#1f9af1] dark:text-[#4fb0d3]">{draft.company} - {draft.position}</h3>
        <p className="text-[#5e676e] dark:text-[#d6d9dc]">Applied on: {draft.dateApplied || "Not set"}</p>
        <button 
        onClick={() => openDraft(draft.id)} 
        className="bg-[#042740] text-[#1f9af1] dark:bg-[#4fb0f4] dark:text-[#042740] px-2 py-1 rounded-md mt-2">
        Resume
        </button>
      </div>
      ))
    )}
    </div>
    {addJob &&
        <div>
        <div onClick={() => setAddJob(false)} className="fixed top-0 transition-all duration-300 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.5)] blur-md"></div>
        <div className="fixed p-2 w-[400px] transition-all duration-300 h-[520px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#262626] flex flex-col items-center gap-4 border border-[#404040] rounded-md">
         <h1 className="font-medium text-[#232729] dark:text-[#fbfbfb] text-lg"> Resume Job Application</h1>
        <label className="w-full">
        <span className="text-[#fbfbfb]">Company</span>
          <input type="text" name="company" value={newJob.company} onChange={handleInputChange} className="bg-[#1a1a1a] border text-[#fbfbfb] focus:outline-0 border-[#404040] w-full" />
          </label>
          <label className="w-full">
          <span className="text-[#fbfbfb]">Position</span>
          <input type="text" name="position" value={newJob.position} onChange={handleInputChange} className="bg-[#1a1a1a] border text-[#fbfbfb] focus:outline-0 border-[#404040] w-full" />
          </label>
          <label className="w-full">
          <span className="text-[#fbfbfb]">Status</span>
          <select name="status" value={newJob.status} onChange={handleInputChange} className="bg-[#1a1a1a] border text-[#fbfbfb] focus:outline-0  border-[#404040] w-full">
            <option value="Active">Active</option>
            <option value="Closed">Closed</option>
          </select>
          </label>
          <label className="w-full flex flex-col" htmlFor="">
           <span className="text-[#fbfbfb]">Date Applied</span>
          <input 
            type="date" 
            className="text-[#fbfbfb]"
            name="dateApplied" 
            value={newJob.dateApplied} 
            onChange={handleInputChange} 
          />
          </label>
          <label className="w-full">
    <span className="text-[#fbfbfb]">Application Notes</span>
    <textarea 
      name="notes" 
      value={newJob.notes} 
      onChange={handleInputChange} 
      className="bg-[#1a1a1a] border mt-1 text-[#fbfbfb] focus:outline-0 border-[#404040] w-full h-24"
      placeholder="Add details about this job application..."
    />
          </label>
          <label className="w-full">
    <span className="text-[#fbfbfb]">Application Progress</span>
    <select 
      name="progress" 
      value={newJob.progress} 
      onChange={handleInputChange} 
      className="bg-[#1a1a1a] border text-[#fbfbfb] focus:outline-0 border-[#404040] w-full"
    >
      <option value="Applied">Applied</option>
      <option value="Interviewing">Interviewing</option>
      <option value="Offer Received">Offer Received</option>
      <option value="Rejected">Rejected</option>
    </select>
    </label>

          <button onClick={submitJob} className="bg-[#1a1a1a] w-full cursor-pointer text-[#fbfbfb] p-2 rounded-md">Submit</button>
        </div>
        </div>
      }
      </motion.div>
      

      </div>
    )
}
 
export default Dashboard;