const Applications = () => {

    const mockJobs = [
        { id: 1, company: "Company A", position: ".NET Developer" ,status:'Active'},
        { id: 2, company: "Company B", position: "Frontend Developer",status:'Active'},
        { id: 3, company: "Company C", position: "Backend Developer",status:'Active' },
        { id: 4, company: "Company C", position: "Chef",status:'Closed' }

  
    ]

    const jobsColor = mockJobs.status ==='Active' ? 'text-[#1ff11f]' : 'text[#f11f1f]'

    return (
        <div>
            <h2 className="text-xl font-medium">Applications</h2>

            {mockJobs.map((jobs) => (
                <li key={jobs.id} className="flex justify-between items-center p-2 bg-[#262626] text-[#fbfbfb]">
                    <div className="flex items-center gap-6">
                        <p>{jobs.company} </p>|<p>Position: {jobs.position}</p>
                        <span style={{color:jobs.status === 'Active'? '#1ff11f':'#f11f1f'}}>
                            {jobs.status}
                        </span>
                    </div>
                </li>
            ))}
        </div>
    );
}
 
export default Applications;