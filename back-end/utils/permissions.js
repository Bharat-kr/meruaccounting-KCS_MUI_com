export let grantsObject = {
  admin: {
    client: {
      "create:any": ["*"],
      "read:any": ["*"],
      "update:any": ["*"],
      "delete:any": ["*"],
    },
    members: {
      "create:any": ["*"],
      "read:any": ["*"],
      "update:any": ["*"],
      "delete:any": ["*"],
    },
    project: {
      "create:any": ["*"],
      "read:any": ["*"],
      "update:any": ["*"],
      "delete:any": ["*"],
    },
    team: {
      "create:any": ["*"],
      "read:any": ["*"],
      "update:any": ["*"],
      "delete:any": ["*"],
    },
  },
  owner: {
    client: {
      "create:any": ["*"],
      "read:any": ["*"],
      "update:any": ["*"],
      "delete:any": ["*"],
    },
    members: {
      "create:any": ["*"],
      "read:any": ["*"],
      "update:any": ["*"],
      "delete:any": ["*"],
    },
    project: {
      "create:any": ["*"],
      "read:any": ["*"],
      "update:any": ["*"],
      "delete:any": ["*"],
    },
    team: {
      "create:any": ["*"],
      "read:any": ["*"],
      "update:any": ["*"],
      "delete:any": ["*"],
    },
  },
  manager: {
    client: {
      "create:any": ["*"],
      "read:any": ["*"],
      "update:any": ["*"],
      "delete:any": ["*"],
    },
    members: {
      "read:any": ["*"],
      "update:any": ["*", "!payRate"],
      //   "delete:any": ["*"],
    },
    project: {
      "create:any": ["*"],
      "read:any": ["*"],
      "update:any": ["*"],
      "delete:any": ["*"],
    },
    team: {
      "create:own": ["*"],
      "read:own": ["*"],
      "update:own": ["*"],
      "delete:own": ["*"],
    },
  },
  projectLeader: {
    client: {
      "read:any": ["*"],
    },
    member: {
      "read:any": ["*"],
      //   "delete:any": ["*"],
    },
    project: {
      "read:own": ["*"],
      "update:own": ["*"],
      "delete:own": ["*"],
    },
    team: {
      "read:own": ["*"],
    },
  },
  employee: {
    client: {
      "read:own": ["*"],
    },
    client: {
      "read:own": ["*"],
    },
    project: {
      "read:own": ["*"],
    },
    team: {
      "read:own": ["*"],
    },
  },
};
