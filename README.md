# ScreenShot Monitoring Application

![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen.svg?style=flat-square)&nbsp;![License](https://img.shields.io/badge/license-MIT-brightgreen)&nbsp;![Made with Love in India](https://madewithlove.org.in/badge.svg)

ScreenShot Monitoring is a web application which can be used to monitor employee's screen.
We are using our own backend server for the handling the API requests.

Our documentation includes a quickstart guide to help you get started with ScreenShot Monitoring Service, as well as guides on how to add and manage teams, projects, clients, user data into the application.

## Quickstart

This quickstart walks you through:

## App Description

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

\*\*1. Install the dependencies and devDependencies and start the server.

```sh
cd back-end
npm i
npm run dev
```

\*\*2. Install the dependencies and devDependencies and start the client.

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
