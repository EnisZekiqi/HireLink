import { useState, useEffect } from "react";
import { Droppable, DragDropContext, Draggable } from "@hello-pangea/dnd";
import { motion,AnimatePresence } from "motion/react";
import { CiTrash,CiEdit ,CiLocationArrow1,CiCalendar,CiFilter,CiCircleRemove    } from "react-icons/ci";
  import { ToastContainer, toast } from 'react-toastify';


const Applications = () => {
   const [mockJobs, setMockJobs] = useState(() => {
    const savedJobs = localStorage.getItem('jobs');
    return savedJobs ? JSON.parse(savedJobs) : [
         { id: 1, company: "StarDust", position: ".NET Developer", status: 'Active',  dateApplied: "", progress: 'Applied'  },
        { id: 2, company: "Dark Magician", position: "Frontend Developer", status: 'Active',   dateApplied: "",progress: 'Offer Recived'  },
        { id: 3, company: "Blue Eyes", position: "Backend Developer", status: 'Active',   dateApplied: "",progress: 'Applied'  },
        { id: 4, company: "Synchro Z", position: "Chef", status: 'Closed', dateApplied: newJob.dateApplied || new Date().toISOString().split("T")[0], progress: 'Rejected'  },
      { id: 5, company: "Solo Leveling", position: "Miner", status: "Active",  dateApplied: "",progress: 'Rejected' },
      {id: 6, company: "LinkD", position: "Recruiter", status: "Closed",  dateApplied: "",progress:'Offer Recived'},
       { id: 7, company: "Vipa ", position: "Transporter", status: "Closed",   dateApplied: "",progress: 'Rejected' },
      {id: 8, company: "Hunters Tech", position: "Team Leader", status: "Active",  dateApplied: "",progress:'Offer Recived'},
      { id: 9, company: "White Tiger", position: "Miner", status: "Active",   dateApplied: "",progress: 'Rejected' },

    ];
});

const savedPreferences = JSON.parse(localStorage.getItem("applicationPreferences")) || {};
const defaultJobStatus = savedPreferences.defaultJobStatus || "Pending";
const savedSortingPreference = savedPreferences.sortingPreference || "company";

    const [addJob, setAddJob] = useState(false)
    const [editModal,setEditModal]=useState(false)
const [newJob, setNewJob] = useState({
  company: "",
  position: "",
  status: defaultJobStatus,
  dateApplied: "",
  notes: "",
  progress: "Applied"
});

const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob({ ...newJob, [name]: value });
};

    useEffect(() => {
    if (newJob.company || newJob.position || newJob.status || newJob.dateApplied || newJob.notes || newJob.progress) {
        let savedDrafts = JSON.parse(localStorage.getItem("draftJobs")) || [];
        
        // Remove old draft of the same job if it exists
        savedDrafts = savedDrafts.filter(draft => draft.id !== newJob.id);

        // Add the updated draft
        savedDrafts.push(newJob);
        
        localStorage.setItem("draftJobs", JSON.stringify(savedDrafts));
    }
}, [newJob]);

    
useEffect(() => {
  const savedDraft = JSON.parse(localStorage.getItem("draftJob"));
  if (savedDraft) {
    setNewJob(savedDraft);
  }
}, []); // Runs only on component mount

    
const removeJob = (id) => {
    const updatedJobs = mockJobs.filter(job => job.id !== id);
    setMockJobs(updatedJobs);
    localStorage.setItem('jobs', JSON.stringify(updatedJobs)); // Update localStorage
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

// Load jobs from localStorage on mount
useEffect(() => {
    const savedJobs = localStorage.getItem('jobs');
    if (savedJobs) {
        setMockJobs(JSON.parse(savedJobs));
    }
}, []);


    const [searchJob, setSearchJob] = useState('');
    const [filter, setFilter] = useState('All');
    const [progressFilter, setProgressFilter] = useState("All");


    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchJob(query);

        let filteredJobs = mockJobs.filter((job) => {
            return (
                job.company.toLowerCase().includes(query) ||
                job.position.toLowerCase().includes(query) ||
                job.status.toLowerCase().includes(query)
            );
        });

        if (filter !== 'All') {
            filteredJobs = filteredJobs.filter((job) => job.status === filter);
        }

        if (searchJob.trim() === '') {
            setMockJobs([
            { id: 1, company: "Company A", position: ".NET Developer", status: 'Active' },
            { id: 2, company: "Company B", position: "Frontend Developer", status: 'Active' },
            { id: 3, company: "Company C", position: "Backend Developer", status: 'Active' },
                { id: 4, company: "Company C", position: "Chef", status: 'Closed' },
                        { id: 5, company: "Company C", position: "Chef", status: 'Closed' }
,            { id: 6, company: "Company C", position: "Chef", status: 'Closed' }
,            { id: 7, company: "Company C", position: "Chef", status: 'Closed' }

            ]);
            return;
        }

        setMockJobs(filteredJobs);
    };


 // Default to sorting by company if nothing is saved

const [sortOrder, setSortOrder] = useState("asc"); // Default sorting order
const [sortKey, setSortKey] = useState(savedSortingPreference); // Default sort key

const handleSort = (key) => {
  const sortedJobs = [...mockJobs].sort((a, b) => {
    return sortOrder === "asc"
      ? a[key].localeCompare(b[key])
      : b[key].localeCompare(a[key]);
  });

  setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // Toggle order
  setSortKey(key); // Update selected sorting key
  setMockJobs(sortedJobs);
};

// Apply sorting preference on first render
useEffect(() => {
  handleSort(savedSortingPreference);
}, []);



   const handleFilterChange = (e) => {
    setFilter(e.target.value);
};


    const [currentPage, setCurrentPage] = useState(1);
    const [jobsPerPage, setJobsPerPage] = useState(3); // or any number you prefer
    
const indexOfLastJob = currentPage * jobsPerPage;
const indexOfFirstJob = indexOfLastJob - jobsPerPage;
const currentJobs = mockJobs.slice(indexOfFirstJob, indexOfLastJob);
    
const pageNumbers = [];
for (let i = 1; i <= Math.ceil(mockJobs.length / jobsPerPage); i++) {
    pageNumbers.push(i);
}

const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
};

    const [changeText, setChangeText] = useState(false)
    
    const editJob = (jobId) => {
    const jobToEdit = mockJobs.find(job => job.id === jobId);
    setNewJob(jobToEdit);
        setAddJob(true); // Open the modal
        setChangeText(true)
    };
    
    const filteredJobs = mockJobs.filter((job) => {
    return (
        (filter === "All" || job.status === filter) &&
        (progressFilter === "All" || job.progress === progressFilter) &&
        (job.company.toLowerCase().includes(searchJob.toLowerCase()) ||
         job.position.toLowerCase().includes(searchJob.toLowerCase()))
    );
    });
    


    // Save jobs to localStorage whenever they change
  

const handleDragEnd = (result) => {
    if (!result.destination) return; // If dropped outside, do nothing

    // Clone the jobs array
    const newJobs = Array.from(filteredJobs);
    
    // Remove the dragged job from its original position
    const [movedJob] = newJobs.splice(result.source.index, 1);
    
    // Insert the job at the new position
    newJobs.splice(result.destination.index, 0, movedJob);

    // Update the state with the new order
    setMockJobs(newJobs);

    // Save the new order to localStorage
    localStorage.setItem("jobs", JSON.stringify(newJobs));
};

    
    const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.5, delayChildren: 0.5  },
    },
  };

    const letterVariants = {
    hidden: { opacity: 0 ,y:20},
    visible: { opacity: 1,y:0,transition:{duration:0.5} },
  };
    

    const [moreInfo, setMoreInfo] = useState(false) 
    
    const selectInfo =(infoId)=>{
      const jobToEdit = mockJobs.find(job => job.id === infoId);
    setNewJob(jobToEdit);
    setMoreInfo(true)
    }

    const [dateReminder,setDateReminder]=useState(false)
    const [reminderTime,setReminderTime]=useState('')

    const handleReminderTime = (e) => {
        setReminderTime(e.target.value)
    }

 const submitReminder = () => {
  const savedReminders = JSON.parse(localStorage.getItem("reminders")) || [];
  

  const newReminder = { 
    jobId: newJob.id, 
    date: reminderTime, // ✅ Only store the date now
    company: newJob.company, 
    position: newJob.position 
  };

  localStorage.setItem("reminders", JSON.stringify([...savedReminders, newReminder]));
  setDateReminder(false);
  toast.success("✅ Reminder set successfully!");
};

    
const checkReminders = () => {
    const savedReminders = JSON.parse(localStorage.getItem("reminders")) || [];
    const isEnabled =   localStorage.getItem("reminderSettings");

  const todayDate = new Date().toISOString().slice(0, 10); // ✅ Get today's date (YYYY-MM-DD)

  savedReminders.forEach((reminder, index) => {
    if (!reminder?.date) { 
      return;
    }
     if (!isEnabled) {
        return
     }

    if (reminder.date === todayDate) { // ✅ Compare only the date
      toast.info(`⏰ Reminder Alert! Follow up on ${reminder.company} - ${reminder.position}.`);

      // Remove this reminder
      savedReminders.splice(index, 1);
      localStorage.setItem("reminders", JSON.stringify(savedReminders));
    }
  });
};






// Dependency ensures UI updates when reminders change

useEffect(() => {
  
  const interval = setInterval(() => {
    checkReminders();
  }, 5000); // Every 5 seconds

  return () => {
    clearInterval(interval);
  };
}, []);


    const openReminder =(reminderId)=>{
        const jobToEdit = mockJobs.find(job => job.id === reminderId);
    setNewJob(jobToEdit);
        setDateReminder(true); // Open the modal
    }

    const [openFilter,setOpenFilter]=useState(false)

    const activateFilter =()=>{
        setOpenFilter(true)
    }

   const closeFilter = (e) => {
  e.stopPropagation();  // Stop event from propagating to parent elements > Learned :)
  setOpenFilter(false);
};

    
    return (
        <div className="">
            <div className="flex items-center justify-between mb-10 mt-10 px-5">
                <div className="flex flex-col items-start">
                    <h2 className="text-xl font-medium text-[#232729] dark:text-[#fbfbfb]">Applications</h2>
                <p className="text-xs md:text-sm font-light flex items-center gap-2 text-[#5e676e] dark:text-[#d9d9d9] mt-2 ml-0">
                if you are a company and have a job application
<button onClick={() => {
    const savedDraft = JSON.parse(localStorage.getItem("draftJob"));
    if (savedDraft) {
        setNewJob(savedDraft);  // Load the draft if it exists
    } else {
        setNewJob({ company: "", position: "", status: "Active", dateApplied: "", notes: "", progress: "Applied" });
    }
    setChangeText(false); // Ensure it's for adding a job
    setAddJob(true); // Open modal
}} 
className="bg-transparent  text-[#848e95] dark:text-[#a6a6a6] text-xs md:text-sm font-light cursor-pointer">
    Click here
</button>
                         </p>
                </div>
                <div className="hidden  md:flex items-center gap-2">
                    <div className="flex flex-col items-start">
                        <p className="font-light text-sm">Search a Job</p>
                        <input type="text" value={searchJob} onChange={handleSearch} className="border text-[#232729] p-1 dark:text-[#fbfbfb] border-[#848e95] dark:border-[#404040] focus:outline-0 " />
                    </div>
            
                    <div className="flex flex-col items-start">
                    <p className="font-light text-sm">Status</p>
                     <select value={filter} onChange={handleFilterChange} className="border text-[#232729] p-1 dark:text-[#fbfbfb] border-[#848e95] dark:border-[#404040] focus:outline-0">
                        <option className="text-[#232729] dark:text-[#fbfbfb]  bg-[#eff0f1] dark:bg-[#181a1b]" value="All">All</option>
                        <option className="text-[#232729] dark:text-[#fbfbfb] bg-[#eff0f1] dark:bg-[#181a1b]" value="Active">Active</option>
                        <option className="text-[#232729] dark:text-[#fbfbfb] bg-[#eff0f1] dark:bg-[#181a1b]" value="Closed">Closed</option>
                    </select>
                   </div>
<div className="flex flex-col items-start">
  <p className="font-light text-sm">Sort By</p>
  <select 
    onChange={(e) => handleSort(e.target.value)} 
    value={sortKey} 
    className="border text-[#232729] p-1 dark:text-[#fbfbfb] border-[#848e95] dark:border-[#404040] focus:outline-0"
  >
    {/* Always include the main sorting options */}
    <option className="text-[#232729] dark:text-[#fbfbfb]  bg-[#eff0f1] dark:bg-[#181a1b]" value="company">Sort by Company</option>
    <option className="text-[#232729] dark:text-[#fbfbfb]  bg-[#eff0f1] dark:bg-[#181a1b]" value="position">Sort by Position</option>

    {/* Add saved sorting preference dynamically if it's not already in the list */}
    {["company", "position", "status"]
      .filter((option) => option === sortKey)
      .map((option) => (
        <option className="text-[#232729] dark:text-[#fbfbfb]  bg-[#eff0f1] dark:bg-[#181a1b]" key={option} value={option}>{`Sort by ${option.charAt(0).toUpperCase() + option.slice(1)}`}</option>
      ))}
  </select>
</div>


  <div className="flex flex-col items-start">
     <p className="font-light text-sm">Progress</p>
    <select className="border text-[#232729] p-1 dark:text-[#fbfbfb] border-[#848e95] dark:border-[#404040] focus:outline-0" value={progressFilter} onChange={(e) => setProgressFilter(e.target.value)}>
        <option className="text-[#232729] dark:text-[#fbfbfb]  bg-[#eff0f1] dark:bg-[#181a1b]" value="All">All Progress</option>
        <option className="text-[#232729] dark:text-[#fbfbfb]  bg-[#eff0f1] dark:bg-[#181a1b]" value="Applied">Applied</option>
        <option className="text-[#232729] dark:text-[#fbfbfb]  bg-[#eff0f1] dark:bg-[#181a1b]" value="Interviewing">Interviewing</option>
        <option className="text-[#232729] dark:text-[#fbfbfb]  bg-[#eff0f1] dark:bg-[#181a1b]" value="Offer Received">Offer Received</option>
        <option className="text-[#232729] dark:text-[#fbfbfb]  bg-[#eff0f1] dark:bg-[#181a1b]" value="Rejected">Rejected</option>
    </select>
  </div>
                </div>
                <div onClick={activateFilter} className="flex md:hidden cursor-pointer">
                    <CiFilter className="w-[30px] h-[30px] bg-[#fbfbfb] dark:bg-[#232829] border border-[#5e6a6e] dark:border-[#3b4245] rounded-md  p-1" />
                    <AnimatePresence>
                        {openFilter &&(
                            <div>
                     <motion.div
                     intial={{opacity:0}}
                     animate={{opacity:1,transition:{duration:0.5}}}
                     exit={{opacity:0,transition:{duration:0.5}}}
                     className="fixed top-0 right-0 left-0 bottom-0 z-[100] bg-[#00000038]" onClick={closeFilter}></motion.div>
                              <motion.div
                    initial={{opacity:0,x:25}}
                    animate={{opacity:1,x:0,transition:{duration:0.5}}}
                    exit={{opacity:0,x:25,transition:{duration:0.5}}}
                    className="md:hidden flex-col items-center gap-6 fixed right-0 top-0 bottom-0 bg-[#fbfbfb] dark:bg-[#181a1b] border-l border-[#3b4145] p-2 z-[150]">
                                    <div className="flex flex-col items-start">
                                        <div className="flex items-center justify-between gap-2 w-full mb-8">
                                            <h1 className="font-medium text-xl text-[#232729] dark:text-[#fbfbfb]">Filter Jobs</h1> 
                                      <button onClick={closeFilter}><CiCircleRemove className="w-[22px] h-[22px]"/></button>
                                        </div>
                                        <p className="font-light text-sm">Search a Job</p>
                        <input type="text" value={searchJob} onChange={handleSearch} className="border text-[#232729] p-1 dark:text-[#fbfbfb] border-[#848e95] dark:border-[#404040] focus:outline-0 " />
                    </div>
            
                    <div className="flex flex-col items-start mt-4">
                    <p className="font-light text-sm">Status</p>
                     <select value={filter} onChange={handleFilterChange} className="border text-[#232729] p-1 dark:text-[#fbfbfb] border-[#848e95] dark:border-[#404040] focus:outline-0">
                        <option className="text-[#232729] dark:text-[#fbfbfb]  bg-[#eff0f1] dark:bg-[#181a1b]" value="All">All</option>
                        <option className="text-[#232729] dark:text-[#fbfbfb] bg-[#eff0f1] dark:bg-[#181a1b]" value="Active">Active</option>
                        <option className="text-[#232729] dark:text-[#fbfbfb] bg-[#eff0f1] dark:bg-[#181a1b]" value="Closed">Closed</option>
                    </select>
                   </div>
<div className="flex flex-col items-start mt-4">
  <p className="font-light text-sm">Sort By</p>
  <select 
    onChange={(e) => handleSort(e.target.value)} 
    value={sortKey} 
    className="border text-[#232729] p-1 dark:text-[#fbfbfb] border-[#848e95] dark:border-[#404040] focus:outline-0"
  >
    {/* Always include the main sorting options */}
    <option className="text-[#232729] dark:text-[#fbfbfb]  bg-[#eff0f1] dark:bg-[#181a1b]" value="company">Sort by Company</option>
    <option className="text-[#232729] dark:text-[#fbfbfb]  bg-[#eff0f1] dark:bg-[#181a1b]" value="position">Sort by Position</option>

    {/* Add saved sorting preference dynamically if it's not already in the list */}
    {["company", "position", "status"]
      .filter((option) => option === sortKey)
      .map((option) => (
        <option className="text-[#232729] dark:text-[#fbfbfb]  bg-[#eff0f1] dark:bg-[#181a1b]" key={option} value={option}>{`Sort by ${option.charAt(0).toUpperCase() + option.slice(1)}`}</option>
      ))}
  </select>
</div>


  <div className="flex flex-col items-start mt-4">
     <p className="font-light text-sm">Progress</p>
    <select className="border text-[#232729] p-1 dark:text-[#fbfbfb] border-[#848e95] dark:border-[#404040] focus:outline-0" value={progressFilter} onChange={(e) => setProgressFilter(e.target.value)}>
        <option className="text-[#232729] dark:text-[#fbfbfb]  bg-[#eff0f1] dark:bg-[#181a1b]" value="All">All Progress</option>
        <option className="text-[#232729] dark:text-[#fbfbfb]  bg-[#eff0f1] dark:bg-[#181a1b]" value="Applied">Applied</option>
        <option className="text-[#232729] dark:text-[#fbfbfb]  bg-[#eff0f1] dark:bg-[#181a1b]" value="Interviewing">Interviewing</option>
        <option className="text-[#232729] dark:text-[#fbfbfb]  bg-[#eff0f1] dark:bg-[#181a1b]" value="Offer Received">Offer Received</option>
        <option className="text-[#232729] dark:text-[#fbfbfb]  bg-[#eff0f1] dark:bg-[#181a1b]" value="Rejected">Rejected</option>
    </select>
  </div>
                </motion.div>
                            </div>
                       ) }
                    </AnimatePresence>      
                </div>
            </div>
           <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="jobsList">
                {(provided) => (
                        <motion.div
                      variants={containerVariants}
                         initial="hidden"
                            animate="visible"
                        className="grid grid-cols-1 md:grid-cols-3 gap-4 pl-5 md:pl-10"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {filteredJobs.map((job, index) => (
                            <Draggable key={job.id} draggableId={String(job.id)} index={index}>
                                {(provided) => (
                                    <motion.div
                                        variants={letterVariants}
                                        initial="hidden"
                                        animate="visible"
                                        whileHover={{border:'1px solid #4fb0f4'}}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className="card flex justify-between rounded-md border border-[#dde0e2] dark:border-[#1a1a1a] flex-col w-[350px] h-[275px] items-start gap-10 p-3 bg-[#fbfbfb] dark:bg-[#262626] text-[#232729] dark:text-[#fbfbfb]"
                                    >
                                        <div className="flex flex-col gap-2 -mt-2 w-full">
                                            <div className="flex items-center justify-between mb-6 w-full">
                                                <p className="text-md font-medium ">{job.company}</p>
                                                <div className="flex items-center gap-2">
                                                    <button className="rounded-md p-0.5 cursor-pointer opacity-70" onClick={() => editJob(job.id)}><CiEdit className="text-[#044004] dark:text-[#4ff44f]" style={{width:'25px',height:'25px'}}/></button>
                                                    <button className="rounded-md p-0.5 cursor-pointer opacity-70" onClick={() => removeJob(job.id)}><CiTrash className="text-[#400404] dark:text-[#f44f4f]" style={{width:'25px',height:'25px'}}/></button>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-start gap-2">
                                                <p className="text-[#5e676e] dark:text-[#d6d9dc] font-light text-md">
                                                    Position: <b className="text-md font-light text-[#1f9af1] dark:text-[#4fb0d3]">{job.position}</b>
                                                </p>
                                                <span className="flex items-center gap-1 text-[#5e676e] dark:text-[#d6d9dc] font-light text-md">
                                                    Job Status:
                                                    <p style={{ color: job.status === 'Active' ? '#1ff11f' : '#f11f1f' }}>{job.status}</p>
                                                </span>
                                                <p className="text-[#5e676e] dark:text-[#d6d9dc] font-light text-md">
                                                    Date Applied: <b className="text-md font-light text-[#1f9af1] dark:text-[#4fb0d3]">{job.dateApplied}</b>
                                                </p>
                                            </div>
                                            <p className="text-[#5e676e] dark:text-[#d6d9dc] font-light text-md flex items-center gap-1">
                                                Progress:
                                                <b className={`text-md font-light ${job.progress === "Offer Received" ? "text-[#044004] dark:text-green-400" : job.progress === "Rejected" ? "text-red-400" : "text-[#1f9af1] dark:text-[#4fb0d3]"}`}>
                                                    {job.progress}
                                                </b>
                                            </p>
                                            <div className="flex items-center gap-2 w-full mt-4">
                                                <motion.button
                                                className="-mt-2 w-[88%]   "
                                                onClick={() => selectInfo(job.id)}>
                                                <motion.div
                                                    whileHover={{opactiy:1}}
                                                    className="bg-[#fbfbfb] dark:bg-[rgba(24,26,27,0.4)] cursor-pointer p-1 flex items-center gap-6 rounded-md border border-[#5e676e] dark:border-[#3b4145]">
                                                    <motion.div whileHover={{ transform: "rotate(30deg)" }}>
                                                <CiLocationArrow1 className="text-[#1f9af1] dark:text-[#4fb0d3]" style={{ width: '25px', height: '25px'}} /></motion.div>
                                                <p className="text-[#232729] dark:text-[#fbfbfb] text-medium font-medium">More Details on the Job</p>
                                                </motion.div>
                                            </motion.button>
                                                <button
                                                onClick={()=>openReminder(job.id)}
                                                    className="bg-[#7fc6f7] w-[12%] cursor-pointer p-1 rounded-md -mt-2">
                                                    <CiCalendar style={{ width: '25px', height: '25px' ,color:'rgba(24,26,27,0.9)'}}/>
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </motion.div>
                )}
            </Droppable>
        </DragDropContext>

            
            <div className="flex justify-center gap-2 mt-4">
    {pageNumbers.map((number) => (
        <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={`p-2 border rounded ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
            {number}
        </button>
    ))}
</div>

            {addJob &&
                <div>
                    <div onClick={() => setAddJob(false)} className="fixed top-0 transition-all duration-300 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.5)] blur-md"></div>
                    <div className="fixed p-2 w-[400px] transition-all duration-300 h-fit top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#262626] flex flex-col items-center gap-4 border border-[#404040] rounded-md">
                    <div className="flex items-center gap-2 justify-between w-full">
                      {changeText ?  <h1 className="font-medium text-[#fbfbfb] text-lg"> Edit Job Application</h1>: <h1 className="font-medium text-[#fbfbfb] text-lg"> Create A Job Application</h1>}                        
                      <button className="block md:hidden" onClick={()=>setAddJob(false)}><CiCircleRemove  className="w-[22px] h-[22px]"/> </button>
                    </div>
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
  <select 
    name="status" 
    value={newJob.status} 
    onChange={handleInputChange} 
    className="bg-[#1a1a1a] border text-[#fbfbfb] focus:outline-0 border-[#404040] w-full"
  >
    {/* Always include main options */}
    <option value="Active">Active</option>
    <option value="Closed">Closed</option>

    {/* Dynamically include the saved preference if it's not already in the list */}
    {["Pending", "Interview", "Rejected"]
      .filter((status) => status === defaultJobStatus) // Show only the matching one
      .map((status) => (
        <option className="text-[#232729] dark:text-[#fbfbfb]  bg-[#eff0f1] dark:bg-[#181a1b]" key={status} value={status}>{status}</option>
      ))}
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
            {editModal && 
                <div>
                    <div onClick={() => setEditModal(false)} className="fixed top-0 transition-all duration-300 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.5)] blur-md"></div>
                    <div className="fixed p-2 w-[400px] transition-all duration-300 h-[400px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#262626] flex flex-col items-center gap-4 border border-[#404040] rounded-md">
                        <h1 className="font-medium text-[#fbfbfb] text-lg"> Edit the Company Job</h1>
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
                        <button onClick={submitJob} className="bg-[#1a1a1a] text-[#fbfbfb] p-2 rounded-md">Submit</button>
                    </div>
                </div> 
            }
             <AnimatePresence>
                  {moreInfo &&
                <motion.div
                initial={{opactiy:0}}
                animate={{opactiy:1,transition:{duration:0.5}}}
                exit={{ opacity: 0, transition: { duration: 0.5 } }}
                >
                    <div onClick={() => setMoreInfo(false)} className="fixed top-0 transition-all duration-300 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.5)] blur-md"></div>
                        <div className="fixed p-2 w-[400px] transition-all duration-300 h-[400px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#262626] flex flex-col items-center gap-4 border border-[#404040] rounded-md">
                          <h1 className="font-medium text-[#fbfbfb] text-lg">{newJob.company}</h1>
                        <div className="w-full flex items-center justify-between">
                    <p className="text-[#d6d9dc] font-light text-md">
                                Position: <b className="text-md font-light text-[#4fb0d3]">{newJob.position}</b>
                            </p>
                        </div>
                       <span className="flex items-start gap-1 text-[#d6d9dc] font-light text-md w-full justify-start">
                         Job Status:
                        <p style={{ color: newJob.status === 'Active' ? '#1ff11f' : '#f11f1f' }}>{newJob.status}</p>
                         </span>
                         <p className="text-[#d6d9dc] font-light text-md w-full items-start">
                         Date Applied: <b className="text-md font-light text-[#4fb0d3]">{newJob.dateApplied}</b>
                         </p>
                        <label className="w-full">
                    <p className="text-[#d6d9dc] font-light text-md flex items-center gap-1 mb-4">
                  Progress:
                 <b className={`text-md font-light ${newJob.progress === "Offer Received" ? "text-green-400" : newJob.progress === "Rejected" ? "text-red-400" : "text-[#4fb0d3]"}`}>
                     {newJob.progress}
                    </b>
                </p>
    <span className="text-[#d6d9dc] font-light text-md w-full items-start mt-2">Application Notes</span>
    <p name="notes" 
        className=" mt-1 text-[#9fa7ac] w-full h-24"
        placeholder="Add details about this job application..."
    >{newJob.notes}</p>
                        </label>

                        <motion.button
                        initial={{border:'1px solid #3b4145'}}
                        whileHover={{border:'1px solid #4fb0f4'}}
                        onClick={() => setMoreInfo(false)} className="bg-[#1a1a1a]  w-full cursor-pointer text-[#fbfbfb] p-2 rounded-md">Close</motion.button>
                    </div>
                </motion.div>
                }
                {dateReminder && 
                <motion.div
                initial={{opactiy:0}}
                animate={{opactiy:1,transition:{duration:0.5}}}
                exit={{ opacity: 0, transition: { duration: 0.5 } }}
                        className="">
                 <div onClick={() => setDateReminder(false)} className="fixed top-0 transition-all duration-300 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.5)] blur-md"></div>
                        <div className="fixed -2 w-[400px] transition-all duration-300 h-[200px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#262626] flex flex-col items-center gap-4 border border-[#404040] rounded-md">
                            <h1 className="text-[#fbfbfb] font-medium text-md mt-4">Remind yourself later</h1>
                            <div className="flex items-center justify-between w-full gap-2 px-2">
                                <p className="text-sm font-light text-[#d6d9dc]">Company: <b className="font-medium text-sm text-[#4fb0d3]">{newJob.company}</b> </p>
                                <p className="text-sm font-light text-[#d6d9dc]"> Position: <b className="font-medium text-sm text-[#4fb0d3]">{newJob.position}</b></p>
                            </div>
                            <input type="date"
                           className="text-[#fbfbfb] mt-2"
                            name="Date Reminder" id="" value={reminderTime} onChange={handleReminderTime} />
                            <button onClick={submitReminder} className="bg-[#1a1a1a] text-[#fbfbfb] p-2 rounded-md w-full mx-2 mt-4">Submit</button>
                    </div>
                </motion.div>
                }
             </AnimatePresence>
        </div>
    );
}

export default Applications;