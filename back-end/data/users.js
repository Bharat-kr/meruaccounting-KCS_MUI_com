import bcrypt from 'bcrypt';

const users = [
  {
    role: 'employee',
    isAdmin: false,
    isManage: false,
    company: 'Mern Accounting',
    firstName: 'Prakhar',
    lastName: 'Sharma',
    email: 'prakhar@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    projects: [],
    team: [],
    settings: {
      ScreenShotPerHour: 6,
      AllowBlur: false,
      AppsAndUrlTracking: true,
      WeeklyTimeLimit: 120,
      AutoPause: 4,
      OfflineTime: false,
      NotifyUser: true,
      WeekStart: 'Monday',
      currencySymbol: '$',
    },
    payRate: 4,
    lastActive: 1640435784,
    activityStatus: false,
    days: [],
  },
];

export default users;
