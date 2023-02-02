# Hospital-API
##### Project Walkthrough: https://youtu.be/BRrzBy10hmg
## Description 
  API for the doctors of a Hospital to register, create report, fetch all reports of patients.
  There can be 2 types of Users
1. Doctors
2. Patients
- Doctors can log in
- Each time a patient visits, the doctor will follow 2 steps
- Register the patient in the app
- Create a Report
  
# Getting Started
  1. git clone https://github.com/anuragDeol/hospital-api.git
  2. cd hospital-api
  3. npm install
  4. npm start
  
  ## Routes
  
  * ``/doctors/register`` → Registers doctor with username and password 
  * `` /doctors/login `` → Returns the JWT to be used
  * `` /patients/register `` -> Registers patient 
  * `` /patients/:id/create_report `` -> Create new report of a patient 
  * `` /patients/:id/all_reports `` → List all the reports of a patient (oldest to latest) 
  * `` /reports/:status `` → List all the reports of all the patients filtered by a specific status 
  
  -NOTE: All routes other than `` /register `` and `` /login `` are protected, i.e. only doctor can access them, thus the JWT returned on login need to be passed as bearer in Authorization of Header section in order to authorize and make a successful request.
  
  ## Directory Structure (MVC)
  * ```/config``` - Application configuration including environment-specific configs
  * ```/controllers``` - Controllers define functions to serve various express routes
  * ```/models``` - Models define schemas that will be used in storing and retrieving data from Application database
  * ```/routes``` - Contain all express routes
  * ```/views``` - All EJS files
  * ```index.js``` - Entry point to express app
  
