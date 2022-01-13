# ScreenShot Monitoring Application

![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen.svg?style=flat-square)&nbsp;![License](https://img.shields.io/badge/license-MIT-brightgreen)&nbsp;![Made with Love in India](https://madewithlove.org.in/badge.svg)

ScreenshotMonitor is a time tracking / screenshot monitoring tool used to get a clear picture of time and money spent on each project, client and task. Employees start monitoring using a lightweight desktop application. The tracked time, screenshots, activity level, active applications & URLs, selected projects and task notes – are all uploaded online for both manager and employee to see.

We are using our own backend server for the handling the API requests.

Our documentation includes a quickstart guide to help you get started with ScreenShot Monitoring Service, as well as guides on how to add and manage teams, projects, clients, user data into the application.

## Table of Contents

- [ScreenShot Monitoring Application](#screenshot-monitoring-application)
  - [Table of Contents](#table-of-contents)
  - [Quickstart](#quickstart)
  - [App Functionality](#app-functionality)
      - [Roles](#roles)
  - [API Documentation](#api-documentation)
    - [Activity API](#activity-api)
    - [Auth API](#auth-api)
    - [Client API](#client-api)
    - [Project API](#project-api)
    - [Teams API](#teams-api)
    - [Employee API](#employee-api)
  - [Screenshots](#screenshots)
  - [Authentication](#authentication)
  - [Schema](#schema)
    - [Client Schema](#client-schema)
    - [Project Schema](#project-schema)
    - [Team Schema](#team-schema)
    - [User Schema](#user-schema)
    - [Activity Schema](#activity-schema)
    - [Screenshot Schema](#screenshot-schema)
  - [Installation](#installation)
  - [Contributors](#contributors)
  - [License](#license)

## Quickstart

This quickstart walks you through:
[ tutorials will be added here later ]

## App Functionality

#### Roles

- **Super admin**
  <br>
  - _Add Employee to Company_
  - _Appoint Admin_
    <br>
- **Admin**
  <br>
  - _Set Pay Rates_
  - _Appoint Manager_
  - _View Different Teams_
  - _Set Budget for Different Team_
    <br>
- **Manager**
  <br>
  - _Edit Employee Settings_
  - _Add Employee to Team_
  - _Add Clients and Projects_
  - _View Employee Details_
    <br>
- **Employee**
  <br>

## API Documentation

### Activity API

```

// @desc      Add a new screenshot to an activity array
// @route     POST /activity/screenshot
// @access    Private
// @location  back-end/controllers/activity.js/createScreenshot
// @params    object : {clientId , projectId , task , image , activityAt , activityId , performanceData , title }
// @res       201 : { status , screenshot } , 500 : Internal Server Error


// @desc      Add a new activity
// @route     POST /activity
// @access    Private
// @location  back-end/controllers/activity.js/createActivity
// @params    object : {clientId , projectId , task , startTime , endTime , performanceData , isInternal }
// @res       201 : { status , activity , days } , 500 : Internal Server Error


// @desc      Update the activity
// @route     PATCH /activity/:id
// @access    Private
// @location  back-end/controllers/activity.js/updateActivity
// @params    id: "activityId" , object : { body }
// @res       202 : { data , activity } , 404: No activity found - activityId , 500 : Internal Server Error

```

<br>

### Auth API

```

// @desc      Register new user
// @route     POST /register
// @access    Public
// @location  back-end/controllers/auth.js/register
// @params    object: { firstName , lastName , email , role , isManager , password}
// @res       201 : { status , user , token } , 400: User already exists , 500 : Internal Server Error


// @desc      Login user
// @route     POST /login
// @access    Public
// @location  back-end/controllers/auth.js/login
// @params    object: { email , password}
// @res       200 : { status , user , token } , 400 : Invalid username or password , 401 : Missing credentials


// @desc      Get common data
// @route     GET /commondata
// @access    Private
// @location  back-end/controllers/auth.js/commondata
// @params
// @res       200 : { status , user } , 404 : No user found , 500 : Internal Server Error

```

<br>

### Client API

```

// @desc      Create a new client
// @route     POST /client
// @access    Private
// @location  back-end/controllers/client.js/createClient
// @params    object : { name }
// @res       201 : { status , client } , 500 : Internal Server Error


// @desc      Get client
// @route     GET /client/getClient
// @access    Private
// @location  back-end/controllers/client.js/getClient
// @params
// @res       200 : { status , client } , 404 : No clients found , 500 : Internal Server Error


// @desc      Get client by id
// @route     GET /client/:id
// @access    Private
// @location  back-end/controllers/client.js/getClientById
// @params    id : "clientId"
// @res       200 : { status , client } , 404 : No client found , 500 : Internal Server Error


// @desc      Delete client
// @route     DELETE /client/:id
// @access    Private
// @location  back-end/controllers/client.js/deleteClient
// @params    id : "clientId"
// @res       202 : { status , client } , 404 : No client found , 500 : Internal Server Error


// @desc      Edit client
// @route     PATCH /client/:id
// @access    Private
// @location  back-end/controllers/client.js/editClient
// @params    id : "clientId" , object : { body }
// @res       200 : { status , client } , 404 : No client found , 500 : Internal Server Error

```

<br>

### Project API

```

// @desc      Create a new project
// @route     POST /project
// @access    Private
// @location  back-end/controllers/project.js/createProject
// @params    object : { name , clientId }
// @res       201 : { status , project } , 404 : No client found , 500 : Internal Server Error


// @desc      Get user's all projects
// @route     GET /project
// @access    Private
// @location  back-end/controllers/project.js/getProject
// @params
// @res       200 : { status , projects } , 500 : Internal Server Error


// @desc      Get project by id
// @route     GET /project/:id
// @access    Public
// @location  back-end/controllers/project.js/getProjectById
// @params    id: "projectId"
// @res       200 : { status , projects } , 404 : No project found , 500 : Internal Server Error


// @desc      Edit project
// @route     PATCH /project
// @access    Private
// @location  back-end/controllers/project.js/editProject
// @params    id: "projectId"
// @res       200 : { status , project } , 404 : No project found , 500 : Internal Server Error


// @desc      Delete a project
// @route     DELETE /project
// @access    Private
// @location  back-end/controllers/project.js/deleteProject
// @params    object : { projectId }
// @res       202 : { status , project } , 404 : No project found , 500 : Internal Server Error


// @desc      Add employee to project by email
// @route     POST /project/addMember/:id
// @access    Private
// @location  back-end/controllers/project.js/addMember
// @params    id : "projectId" , object : { employeeMail }
// @res       200 : { "Already a member" , project } , 201 : { "ok" , project } , 404 : No project/employee found , 500 : Internal Server Error


// @desc      Remove employee from project by id
// @route     PATCH /project/removeMember/:id
// @access    Private
// @location  back-end/controllers/project.js/removeMember
// @params    id : "projectId" , object : { employeeId }
// @res       200 : { status , project } , 404 : No project/employee found , 500 : Internal Server Error


// @desc      Assign project leader to the given project id
// @route     POST /project/projectLeader/:id
// @access    Private
// @location  back-end/controllers/project.js/assignProjectLeader
// @params    id : "projectId" , object : { employeeId }
// @res       200 : { status , project } , 404 : No project/employee found , 500 : Internal Server Error

```

<br>

### Teams API

```

// @desc      Create a new team
// @route     POST /team/create
// @access    Private
// @location  back-end/controllers/teams.js/createTeam
// @params    object : { name }
// @res       201 : { status , team } , 500 : Internal Server Error


// @desc      Add member to team
// @route     PATCH /team/updateMember
// @access    Private
// @location  back-end/controllers/teams.js/updateMember
// @params    { teamId , employeeMail }
// @res       200 : { "Already a member" , team } , 200 : { "ok" , team } , 500 : Internal Server Error


// @desc      Remove member
// @route     DELETE /team/updateMember
// @access    Private
// @location  back-end/controllers/teams.js/removeMember
// @params    { teamId , employeeId }
// @res       200 : { status , team } , 200 : { No such member found , team } , 404 : No team/employee found ,  500 : Internal Server Error


// @desc      Get teams per id
// @route     GET /team/getTeam/:id
// @access    Private
// @location  back-end/controllers/teams.js/getTeamById
// @params    id : "teamId"
// @res       200 : { status , team } , 404 : No team found ,  500 : Internal Server Error


// @desc      Get all teams of user
// @route     GET /team/getTeam
// @access    Private
// @location  back-end/controllers/teams.js/getTeam
// @params
// @res       200 : { status , team } ,  500 : Internal Server Error


// @desc      Delete teams
// @route     DELETE /team
// @access    Private
// @location  back-end/controllers/teams.js/deleteTeam
// @params    { teamId }
// @res       202 : { status , team } , 401 : Unauthorised manager ,  500 : Internal Server Error

```

<br>

### Employee API

```

```

<br>

## Screenshots

## Authentication

To use ScreenShot Monitoring Service, you need to provide credentials to authenticate your requests. You can authenticate by doing either of the following:

- Provide your ScreenShot Monitoring username and password when starting the service
- Include encrypted credentials (token) in HTTP headers for API request

## Schema

We have used different schemas to store different objects

### Client Schema

```

const clientSchema = new mongoose.Schema(
{
name: { type: String },
projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
},
{ timestamps: true }
);

```

### Project Schema

```

const projectSchema = new mongoose.Schema(
{
name: { type: String },
consumeTime: { type: String },
budgetTime: { type: Number },
projectLeader: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
employees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
},
{ timestamps: true }
);

```

### Team Schema

```

const teamSchema = new mongoose.Schema(
{
name: { type: String, required: true },
manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
},
{ timestamps: true }
);

```

### User Schema

```

const userSchema = new mongoose.Schema(
{
role: { type: String },
isManager: { type: Boolean, default: false },
firstName: { type: String, required: true },
lastName: { type: String, required: true },
email: { type: String, required: true, unique: true },
password: { type: String, required: true },
payRate: { type: Number, default: 100 },
lastActive: { type: String, default: "0" },
activityStatus: { type: Boolean, default: false },
accountInfo: {
managerFor: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
country: { type: String, default: "India" },
ip: { type: String },
countryName: { type: String, default: "India" },
},
projects: [
{
type: mongoose.Schema.Types.ObjectId,
ref: "project",
},
],
clients: [
{
type: mongoose.Schema.Types.ObjectId,
ref: "client",
},
],
teams: [
{
type: mongoose.Schema.Types.ObjectId,
ref: "team",
},
],
notifications: [
{
id: String,
title: String,
description: String,
avatar: String,
type: String,
createdAt: Date,
isUnRead: Boolean,
},
],
settings: {
ScreenShotPerHour: {
isTeamSetting: { type: Boolean, required: true, default: true },
teamValue: { type: Number, default: 6 },
individualValue: { type: Number, default: 6 },
},
AllowBlur: {
isTeamSetting: { type: Boolean, required: true, default: true },
teamValue: { type: Boolean, default: false },
individualValue: { type: Boolean, default: false },
},
AppsAndUrlTracking: {
isTeamSetting: { type: Boolean, required: true, default: true },
teamValue: { type: Boolean, default: true },
individualValue: { type: Boolean, default: true },
},
WeeklyTimeLimit: {
isTeamSetting: { type: Boolean, required: true, default: true },
teamValue: { type: Number, default: 120 },
individualValue: { type: Number, default: 120 },
},
AutoPause: {
isTeamSetting: { type: Boolean, required: true, default: true },
teamValue: { type: Number, default: 4 },
individualValue: { type: Number, default: 4 },
},
OfflineTime: {
isTeamSetting: { type: Boolean, required: true, default: true },
teamValue: { type: Boolean, default: false },
individualValue: { type: Boolean, default: false },
},
NotifyUser: {
isTeamSetting: { type: Boolean, required: true, default: true },
teamValue: { type: Boolean, default: false },
individualValue: { type: Boolean, default: false },
},
WeekStart: {
isTeamSetting: { type: Boolean, required: true, default: true },
teamValue: { type: String, default: "Monday" },
individualValue: { type: String, default: "Monday" },
},
CurrencySymbol: {
isTeamSetting: { type: Boolean, required: true, default: true },
teamValue: { type: String, default: "$" },
        individualValue: { type: String, default: "$" },
},
},
days: [
{
date: { type: String, default: "0" },
hours: { type: Number, default: 0 },
activities: [{ type: mongoose.Types.ObjectId, ref: "Activity" }],
},
],
},
{ timestamps: true }
);

```

### Activity Schema

```

const activitySchema = new mongoose.Schema({
hoursWorked: {
projectHours: { type: Number, default: 0.0 },
internalHours: { type: Number, default: 0.0 },
},
client: {
type: mongoose.Schema.Types.ObjectId,
ref: 'curClientId',
},
project: {
type: mongoose.Schema.Types.ObjectId,
ref: 'curProjectId',
},
task: {
type: String,
default: '',
},
startTime: {
type: String,
default: '',
},
endTime: {
type: String,
default: '',
},
consumeTime: {
type: String,
default: '',
},
isAccepted: {
type: Boolean,
default: true,
},
isInternal: { type: Boolean, default: false },
performanceData: { type: Number, default: 0 },
screenshots: [{ type: mongoose.Types.ObjectId, ref: 'Screenshot' }],
});

```

### Screenshot Schema

```

const screenshotSchema = new mongoose.Schema({
employee: {
type: mongoose.Schema.Types.ObjectId,
ref: 'curUserId',
},
client: {
type: mongoose.Schema.Types.ObjectId,
ref: 'curClientId',
},
project: {
type: mongoose.Schema.Types.ObjectId,
ref: 'curProjectId',
},
task: {
type: String,
default: '',
},
image: {
type: String,
default: '',
},
activityAt: {
type: String,
},
activityId: {
type: mongoose.Schema.Types.ObjectId,
ref: 'activityId',
},
performanceData: {
type: Number,
default: 0,
},
title: {
type: String,
default: 'Default title',
},
});

```

## Installation

ScreenShot Monitoring requires [Node.js](https://nodejs.org/) v14+ and [npm](https://www.npmjs.com/) v6+ to run

**1. Install the dependencies and devDependencies and start the server.**

```sh
cd back-end
npm i
npm run dev
```

**2. Install the dependencies and devDependencies and start the client.**

```sh
cd front-end
npm i
npm run start
```

**3. Create a `.env` file in the project root folder and copy the format of `.env.sample` file.**

- `.env.sample` file contains all the environment variables required for running the project.

**4. Open your browser and go to `https://localhost:3000`**

## Contributors

- [**Ayush Dwivedi**](https://github.com/ayushsnofi)
- [**Kamal**](https://github.com/kamal021099)
- [**Ayush Garg**](https://github.com/ayush181000)
- [**Bharat Kumar**](https://github.com/Bharat-kr)

## License

Closed source application
Copyright by Meru Accounting
<br>
![Meru Accounting](./front-end/public/logo.png)
