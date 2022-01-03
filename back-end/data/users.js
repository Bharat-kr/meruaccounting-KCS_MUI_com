import bcrypt from 'bcrypt';

// password for all users is 123456
// days mock data not added

const users = [
  {
    role: 'manager',
    isManager: true,
    firstName: 'Ayush',
    lastName: 'Garg',
    email: 'ayushg@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    payRate: 500,
    lastActive: '00',
    activityStatus: false,
    accountInfo: {
      managerFor: [],
      country: 'India',
      ip: '',
      countryName: 'India',
    },
    projects: [],
    teams: [],
    clients: [],
    settings: {
      ScreenShotPerHour: {
        isTeamSetting: true,
        teamValue: 8,
        individualValue: 12,
      },
      AllowBlur: {
        isTeamSetting: true,
        teamValue: false,
        individualValue: true,
      },
      AppsAndUrlTracking: {
        isTeamSetting: true,
        teamValue: true,
        individualValue: false,
      },
      WeeklyTimeLimit: {
        isTeamSetting: true,
        teamValue: 500,
        individualValue: 1000,
      },
      AutoPause: {
        isTeamSetting: true,
        teamValue: 8,
        individualValue: 12,
      },
      OfflineTime: {
        isTeamSetting: true,
        teamValue: false,
        individualValue: true,
      },
      NotifyUser: {
        isTeamSetting: true,
        teamValue: true,
        individualValue: false,
      },
      WeekStart: {
        isTeamSetting: true,
        teamValue: 'Monday',
        individualValue: 'Sunday',
      },
      currencySymbol: {
        isTeamSetting: true,
        teamValue: '$',
        individualValue: '₹',
      },
    },
    days: [
      {
        date: '0',
        hours: '0',
        activities: [],
      },
    ],
  },
  {
    role: 'manager',
    isManager: true,
    firstName: 'Ayush',
    lastName: 'Dwivedi',
    email: 'ayushd@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    payRate: 500,
    lastActive: '00',
    activityStatus: false,
    accountInfo: {
      managerFor: [],
      country: 'India',
      ip: '',
      countryName: 'India',
    },
    projects: [],
    teams: [],
    clients: [],
    settings: {
      ScreenShotPerHour: {
        isTeamSetting: true,
        teamValue: 8,
        individualValue: 12,
      },
      AllowBlur: {
        isTeamSetting: true,
        teamValue: false,
        individualValue: true,
      },
      AppsAndUrlTracking: {
        isTeamSetting: true,
        teamValue: true,
        individualValue: false,
      },
      WeeklyTimeLimit: {
        isTeamSetting: true,
        teamValue: 500,
        individualValue: 1000,
      },
      AutoPause: {
        isTeamSetting: true,
        teamValue: 8,
        individualValue: 12,
      },
      OfflineTime: {
        isTeamSetting: true,
        teamValue: false,
        individualValue: true,
      },
      NotifyUser: {
        isTeamSetting: true,
        teamValue: true,
        individualValue: false,
      },
      WeekStart: {
        isTeamSetting: true,
        teamValue: 'Monday',
        individualValue: 'Sunday',
      },
      currencySymbol: {
        isTeamSetting: true,
        teamValue: '$',
        individualValue: '₹',
      },
    },
    days: [
      {
        date: '0',
        hours: '0',
        activities: [],
      },
    ],
  },
  {
    role: 'employee',
    isManager: false,
    firstName: 'Kamal',
    lastName: 'Singh',
    email: 'kamal@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    payRate: 500,
    lastActive: '00',
    activityStatus: false,
    accountInfo: {
      managerFor: [],
      country: 'India',
      ip: '',
      countryName: 'India',
    },
    projects: [],
    teams: [],
    clients: [],
    settings: {
      ScreenShotPerHour: {
        isTeamSetting: true,
        teamValue: 8,
        individualValue: 12,
      },
      AllowBlur: {
        isTeamSetting: true,
        teamValue: false,
        individualValue: true,
      },
      AppsAndUrlTracking: {
        isTeamSetting: true,
        teamValue: true,
        individualValue: false,
      },
      WeeklyTimeLimit: {
        isTeamSetting: true,
        teamValue: 500,
        individualValue: 1000,
      },
      AutoPause: {
        isTeamSetting: true,
        teamValue: 8,
        individualValue: 12,
      },
      OfflineTime: {
        isTeamSetting: true,
        teamValue: false,
        individualValue: true,
      },
      NotifyUser: {
        isTeamSetting: true,
        teamValue: true,
        individualValue: false,
      },
      WeekStart: {
        isTeamSetting: true,
        teamValue: 'Monday',
        individualValue: 'Sunday',
      },
      currencySymbol: {
        isTeamSetting: true,
        teamValue: '$',
        individualValue: '₹',
      },
    },
    days: [
      {
        date: '0',
        hours: '0',
        activities: [],
      },
    ],
  },
  {
    role: 'employee',
    isManager: false,
    firstName: 'Bharat',
    lastName: 'Kumar',
    email: 'bharat@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    payRate: 500,
    lastActive: '00',
    activityStatus: false,
    accountInfo: {
      managerFor: [],
      country: 'India',
      ip: '',
      countryName: 'India',
    },
    projects: [],
    teams: [],
    clients: [],
    settings: {
      ScreenShotPerHour: {
        isTeamSetting: true,
        teamValue: 8,
        individualValue: 12,
      },
      AllowBlur: {
        isTeamSetting: true,
        teamValue: false,
        individualValue: true,
      },
      AppsAndUrlTracking: {
        isTeamSetting: true,
        teamValue: true,
        individualValue: false,
      },
      WeeklyTimeLimit: {
        isTeamSetting: true,
        teamValue: 500,
        individualValue: 1000,
      },
      AutoPause: {
        isTeamSetting: true,
        teamValue: 8,
        individualValue: 12,
      },
      OfflineTime: {
        isTeamSetting: true,
        teamValue: false,
        individualValue: true,
      },
      NotifyUser: {
        isTeamSetting: true,
        teamValue: true,
        individualValue: false,
      },
      WeekStart: {
        isTeamSetting: true,
        teamValue: 'Monday',
        individualValue: 'Sunday',
      },
      currencySymbol: {
        isTeamSetting: true,
        teamValue: '$',
        individualValue: '₹',
      },
    },
    days: [
      {
        date: '0',
        hours: '0',
        activities: [],
      },
    ],
  },
  {
    role: 'employee',
    isManager: false,
    firstName: 'Harnish',
    lastName: 'Shah',
    email: 'harnish@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    payRate: 500,
    lastActive: '00',
    activityStatus: false,
    accountInfo: {
      managerFor: [],
      country: 'India',
      ip: '',
      countryName: 'India',
    },
    projects: [],
    teams: [],
    clients: [],
    settings: {
      ScreenShotPerHour: {
        isTeamSetting: true,
        teamValue: 8,
        individualValue: 12,
      },
      AllowBlur: {
        isTeamSetting: true,
        teamValue: false,
        individualValue: true,
      },
      AppsAndUrlTracking: {
        isTeamSetting: true,
        teamValue: true,
        individualValue: false,
      },
      WeeklyTimeLimit: {
        isTeamSetting: true,
        teamValue: 500,
        individualValue: 1000,
      },
      AutoPause: {
        isTeamSetting: true,
        teamValue: 8,
        individualValue: 12,
      },
      OfflineTime: {
        isTeamSetting: true,
        teamValue: false,
        individualValue: true,
      },
      NotifyUser: {
        isTeamSetting: true,
        teamValue: true,
        individualValue: false,
      },
      WeekStart: {
        isTeamSetting: true,
        teamValue: 'Monday',
        individualValue: 'Sunday',
      },
      currencySymbol: {
        isTeamSetting: true,
        teamValue: '$',
        individualValue: '₹',
      },
    },
    days: [
      {
        date: '0',
        hours: '0',
        activities: [],
      },
    ],
  },
];

export default users;
