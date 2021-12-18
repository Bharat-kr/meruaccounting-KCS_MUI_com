# ScreenShot Monitoring Application

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

ScreenShot Monitoring is a web application which can be used to monitor employee's screen.
We are using our own backend server for the handling the API requests.

Our documentation includes a quickstart guide to help you get started with ScreenShot Monitoring Service, as well as guides on how to add and manage teams, projects, clients, user data into the application.

## Quickstart

This quickstart walks you through:

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

Install the dependencies and devDependencies and start the server.

```sh
cd back-end
npm i
npm run dev
```

Install the dependencies and devDependencies and start the client.

```sh
cd front-end
npm i
npm run start
```

## Contributors

<table>
<tbody>
<tr valign="top">
<td width="20%" align="center">
<a href = "https://github.com/ayushsnofi" target='blank'> <img src="https://avatars.githubusercontent.com/u/75434610?v=4" height='45' weight='45' /></a></td>
<td width="20%" align="center">
<a href = "https://github.com/kamal021099" target='blank'> <img src="https://avatars.githubusercontent.com/u/67367642?v=4" height='45' weight='45' /></a></td>
<td width="20%" align="center">
<a href = "https://github.com/Prakhar-tech" target='blank'> <img src="https://avatars.githubusercontent.com/u/83545428?v=4" height='45' weight='45' /></a></td>
<td width="20%" align="center">
<a href = "https://github.com/ayush181000" target='blank'> <img src="https://avatars.githubusercontent.com/u/88030372?v=4" height='45' weight='45' /></a></td>
<td width="20%" align="center">
<a href = "https://github.com/Bharat-kr" target='blank'> <img src="https://avatars.githubusercontent.com/u/73836790?v=4" height='45' weight='45' /></a></td>
</tr>
</tbody>
</table>

## License

[MIT](/LICENSE.md)
