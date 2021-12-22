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
  - [Screenshots](#screenshots)
  - [Authentication](#authentication)
  - [Schema](#schema)
    - [Client Schema](#client-schema)
    - [Project Schema](#project-schema)
    - [Team Schema](#team-schema)
    - [User Schema](#user-schema)
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
  > _Add Employee to Company_
  > _Appoint Admin_
- **Admin**
  <br>
  > _Set Pay Rates_
  > _Appoint Manager_
  > _View Different Teams_
  > _Set Budget for Different Team( to be added later )_
- **Manager**
  <br>
  > _Edit Employee Settings_ 
  > _Add Employee to Team_ 
  > _Add Clients and Projects_ 
  > _View Employee Details_
- **Employee**

## API Documentation

## Screenshots

## Authentication

To use ScreenShot Monitoring Service, you need to provide credentials to authenticate your requests. You can authenticate by doing either of the following:

- Provide your ScreenShot Monitoring username and password when starting the service
- Include encrypted credentials (token) in HTTP headers for API request

## Schema

We have used different schemas to store different object

### Client Schema

```
const clientSchema = new Schema({
  name: { type: String },
  manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
});
```

### Project Schema

```
const projectSchema = new Schema({
  name: { type: String },
  client: { type: mongoose.Schema.Types.ObjectId, ref: Client },
  team: [{ type: mongoose.Schema.Types.ObjectId, ref: Team }],
});
```

### Team Schema

```
const teamSchema = new Schema({
  name: { type: String },
  manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  employees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
});
```

### User Schema

```
const userSchema = new Schema({
  role: { type: String },
  isAdmin: Boolean,
  isManager: Boolean,
  company: String,
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  password: { type: String },
  team: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
  settings: {
    ScreenShotPerHour: Number,
    AllowBlur: Boolean,
    AppsAndUrlTracking: Boolean,
    WeeklyTimeLimit: Number,
    AutoPause: Number,
    OfflineTime: Boolean,
    NotifyUser: Boolean,
    WeekStart: String,
    CurrencySymbol: String,
  },
  pay: Number,
  day: {
    date: {
      hours: Number,
      timeRange: [
        {
          startTime: Date,
          endTime: Date,
          activityLevelTotal: Number,
          screenShots: [
            {
              activityLevel: Number,
              url: String,
              time: Date,
              taskName: String,
            },
          ],
        },
      ],
    },
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
- [**Prakhar**](https://github.com/Prakhar-tech)

## License

Closed source application
Copyright by Meru Accounting
<br>
![Meru Accounting](./front-end/public/logo.png)
