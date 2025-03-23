# **HireLink**
HireLink is a job application tracking system built using React.js, developed as part of the Self-Directed Internship – React.js Developer – Present. This project helps users manage job applications efficiently, offering detailed tracking, reminders, and UI customization.

### Project Features

## **Dashboard**  
The Dashboard provides an overview of your job applications and quick access to essential data:

Application Statistics:

Total Applications

Total Active Applications

Total Rejected Applications

Total Offers Received

Pie Chart Visualization:

Displays a breakdown of the application's current status for improved UI/UX.

Reminders:

Users can set reminders to apply later to certain jobs. If the selected date matches the current date, a notification will appear in the Applications section.

Saved Drafts:

Jobs that are saved as drafts (in case of incomplete entries or page refresh) will be accessible here.

## **Application Section**  
This section displays all job applications as individual Job Cards, with each card showing the following details:

Job Information: Company, Position, Status, Date Applied, and Progress.

Edit Button: Modify existing job details.

Delete Button: Remove jobs from the list.

More Details Button: Access additional information about the job.

Reminder Button: Set a date to be reminded to apply.

Notification Feature:
If the reminder date set for a job matches today’s date, you’ll receive a notification when you visit the Application Section, reminding you to follow up on that job.

Filter System:

Easily filter jobs by different categories, such as:

Active Jobs

Newest Jobs

Search Jobs by Keywords

And more, to streamline access and enhance user experience.

## **Settings Section**  
The Settings section provides multiple customization options to improve user experience:

Theme Toggler: Switch between light and dark themes.

Notification Settings: Enable or disable reminder notifications.

Reminder Customization: Personalize the reminder message, set the display time, and customize which job positions are visible.

Additional settings will allow further customization for enhanced user control.

Getting Started
This template provides a minimal setup to get React working in Vite with HMR and ESLint rules.

Plugins Used:
@vitejs/plugin-react – uses Babel for Fast Refresh.

@vitejs/plugin-react-swc – uses SWC for Fast Refresh.

Expanding the ESLint Configuration
For production-level applications, we recommend using TypeScript and enabling type-aware lint rules. Check out the TS template to integrate TypeScript and typescript-eslint.