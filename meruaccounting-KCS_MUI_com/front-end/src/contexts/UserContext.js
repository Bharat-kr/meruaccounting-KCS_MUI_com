import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export function convertString(string) {
  const str = string
    .split(/(?=[A-Z])/)
    .join()
    .replaceAll(',', ' ');
  // console.log(str);
  return str;
}
export const UserContextProvider = (props) => {
  const [User, setUser] = useState([
    {
      name: 'Ayush',
      id: 1,
      email: 'ayushrocks@gmail.com',
      pay: 15,
      role: 'Manager',
      Settings: {
        ScreenShotPerHour: 12,
        AllowBlur: true,
        AppsAndUrlTracking: true,
        WeeklyTimeLimit: 100,
        AutoPause: 5,
        OfflineTime: true,
        NotifyUser: true,
        WeekStart: 'sunday',
        CurrencySymbol: 'rupees'
      }
    },
    {
      name: 'kamal',
      id: 2,
      email: 'Kamali@gmail.com',
      pay: 12,
      role: 'Admin',
      Settings: {
        ScreenShotPerHour: 12,
        AllowBlur: true,
        AppsAndUrlTracking: true,
        WeeklyTimeLimit: 100,
        AutoPause: 5,
        OfflineTime: true,
        NotifyUser: true,
        WeekStart: 'sunday',
        CurrencySymbol: 'rupees'
      }
    },
    {
      name: 'Jay Maethew',
      id: 3,
      email: 'jaymath@gmail.com',
      pay: 16,
      role: 'Employee',
      Settings: {
        ScreenShotPerHour: 12,
        AllowBlur: true,
        AppsAndUrlTracking: true,
        WeeklyTimeLimit: 100,
        AutoPause: 5,
        OfflineTime: true,
        NotifyUser: true,
        WeekStart: 'sunday',
        CurrencySymbol: 'rupees'
      }
    },
    {
      name: 'Jacob lame',
      id: 4,
      email: 'jacoblame@gmail.com',
      pay: 10,
      role: 'Employee',
      Settings: {
        ScreenShotPerHour: 12,
        AllowBlur: true,
        AppsAndUrlTracking: true,
        WeeklyTimeLimit: 100,
        AutoPause: 5,
        OfflineTime: true,
        NotifyUser: true,
        WeekStart: 'sunday',
        CurrencySymbol: 'rupees'
      }
    },
    {
      name: 'Ryan rands',
      id: 5,
      email: 'ryanr@gmail.com',
      pay: 19,
      role: 'Manager',
      Settings: {
        ScreenShotPerHour: 12,
        AllowBlur: true,
        AppsAndUrlTracking: true,
        WeeklyTimeLimit: 100,
        AutoPause: 5,
        OfflineTime: true,
        NotifyUser: true,
        WeekStart: 'sunday',
        CurrencySymbol: 'rupees'
      }
    },
    {
      name: 'Raksha',
      id: 6,
      email: 'raksha@gmail.com',
      pay: 20,
      role: 'Employee',
      Settings: {
        ScreenShotPerHour: 12,
        AllowBlur: true,
        AppsAndUrlTracking: true,
        WeeklyTimeLimit: 100,
        AutoPause: 5,
        OfflineTime: true,
        NotifyUser: true,
        WeekStart: 'sunday',
        CurrencySymbol: 'rupees'
      }
    },
    {
      name: 'Surya',
      id: 7,
      email: 'surya@gmail.com',
      pay: 13,
      role: 'Employee',
      Settings: {
        ScreenShotPerHour: 12,
        AllowBlur: true,
        AppsAndUrlTracking: true,
        WeeklyTimeLimit: 100,
        AutoPause: 5,
        OfflineTime: true,
        NotifyUser: true,
        WeekStart: 'sunday',
        CurrencySymbol: 'rupees'
      }
    },
    {
      name: 'Sushma',
      id: 8,
      email: 'susma@gmail.com',
      pay: 13,
      role: 'Employee',
      Settings: {
        ScreenShotPerHour: 12,
        AllowBlur: true,
        AppsAndUrlTracking: true,
        WeeklyTimeLimit: 100,
        AutoPause: 5,
        OfflineTime: true,
        NotifyUser: true,
        WeekStart: 'sunday',
        CurrencySymbol: 'rupees'
      }
    }
  ]);
  //   const [currentClient, setcurrentClient] = useState(User[0]);

  //   const changeClient = (client) => {
  //     setcurrentClient(client);
  //   };

  return (
    <div>
      <UserContext.Provider value={{ User }}>{props.children}</UserContext.Provider>
    </div>
  );
};

export default UserContextProvider;
