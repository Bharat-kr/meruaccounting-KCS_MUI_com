import { indexOf } from 'lodash-es';
import React, { createContext, useState } from 'react';

export const CurrentUserContext = createContext();

export const CurrentUserContextProvider = (props) => {
  const [currentUser, setcurrentUser] = useState({
    role: 'User',
    company: 'Meru Accounting',
    firstName: 'Kamal',
    lastName: 'Singh',
    email: 'kamal021099@gmail.com',
    password: '12345678',
    day: {
      1638729000: {
        date: `${new Date()}`,
        hours: 50,
        timeRange: [
          {
            startTime: '6:04pm',
            endTime: '6:32pm',
            activityLevel: 50,
            taskName: 'Development',
            screenShots: [
              {
                activityLevel: 70,
                url: 'https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Google_Docs.max-1100x1100.png',
                time: new Date(),
                taskName: 'VELLA',
              },
            ],
          },
        ],
      },
    },
  });
  // save days as unix timestamps gmt/utc to access as keys by clicking on the calendar.
  // task name for the timerange as well.

  return (
    <div>
      <CurrentUserContext.Provider value={{ currentUser }}>
        {props.children}
      </CurrentUserContext.Provider>
    </div>
  );
};

export default CurrentUserContextProvider;

//     role: "User"
//   company: "Meru Accounting"
//   fistName: "Kamal"
//   lastName: "Singh"
//   email: "kamal021099@gmail.com"
//   password: "12345678"
// //   team: {
// //     type: mongoose.Schema.Types.ObjectId,
// //     ref: Team,
// //   },
// //   Settings: {
// //     ScreenShotPerHour: Number,
// //     AllowBlur: Boolean,
// //     AppsAndUrlTracking: Boolean,
// //     WeeklyTimeLimit: Number,
// //     AutoPause: Number,
// //     OfflineTime: Boolean,
// //     NotifyUser: Boolean,
// //     WeekStart: String,
// //     CurrencySymbol: String,
// //   },
// //   pay: Number,
//   day:[
//     {
//       date: `${new Date()}`,
//       hours: 50,
//       timeRange: [
//         {
//           startTime: new Date(),
//           endTime: new Date(),
//           activityLevel: 50,
//           screenShots: [
//             {
//               activityLevel: 70,
//               url: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Google_Docs.max-1100x1100.png",
//               time: new Date(),
//               taskName: "VELLA"
//             },
//           ],
//         },
//       ],
//     },
//   ]
