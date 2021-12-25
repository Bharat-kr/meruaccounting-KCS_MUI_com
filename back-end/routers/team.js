import express from 'express';
import Team from '../models/team.js';
import User from '../models/user.js';
import { authPass } from '../controllers/authController.js';

const router = express.Router();

router.post('/create', authPass, async (req, res) => {
  const manager = req.user;
  console.log(manager);
  const { name } = req.body;
  if (!manager.role === 'manager') {
    return res.status(401).json({
      status: 'UnAuthorized',
    });
  }
  try {
    const team = new Team({ name });
    await team.save();
    console.log(manager._id.toHexString());
    team.manager = manager._id;
    manager.team.push(team._id.toHexString());
    console.log(team);
    console.log(manager.team);

    await manager.save();
    await team.save();
    res.status(201).json({
      status: 'Created Team',
      data: team,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: 'Error',
      data: error,
    });
  }
});

router.post('/add/:id', authPass, async (req, res) => {
  const id = req.params.id;
  const employee = req.user;
  if (employee.role === 'manager') {
    try {
      console.log(team);
      await team.save();
      team.employees.push(id);
      await team.save();

      res.json({
        status: 'Ok',
        data: team,
      });
    } catch (error) {
      res.json({
        status: 'Error',
        data: error,
      });
    }
  } else {
    res.json({
      message: 'UnAuthorized',
    });
  }
});

router.patch('/updateMember', authPass, async (req, res) => {
  const manager = req.user;
  if (!manager.role == 'manager') {
    return res.json({
      message: 'UnAuthorized',
    });
  }
  const settings = manager.settings;

  const employeeMail = req.body.employeeMail;
  const teamId = req.body.teamId;
  var alreadyMember = false;
  try {
    const team = await Team.findById(teamId);
    const newEmployee = await User.findOne({ email: employeeMail });
    const employeeId = newEmployee._id;
    console.log(team);
    console.log(employeeId);
    team.employees.forEach((employee) => {
      console.log(employee);
      // console.log(employeeMail);

      if (employee.equals(employeeId)) {
        console.log('Inside IF');
        alreadyMember = true;
      }
    });
    if (alreadyMember == true) {
      return res.json({
        status: 'Ok',
        data: 'Already A Member',
      });
    }
    const employee = await User.findById(employeeId);
    employee.settings = settings;
    employee.save();
    team.employees.push(employeeId);
    await team.save();

    res.json({
      status: 'Ok',
      data: team,
    });
  } catch (error) {
    res.json({
      status: 'Error',

      status: 'Error',

      data: error,
    });
  }
});

router.delete('/removeMember', async (req, res) => {
  const employeeId = req.body.employeeId;

  const teamId = req.body.teamId;

  var alreadyMember = false;

  try {
    const team = await Team.findById(teamId);
    console.log(team);
    team.employees.forEach((employee, index) => {
      console.log(employee);
      console.log(employeeId);

      if (employee.equals(employeeId)) {
        console.log('Inside IF');
        alreadyMember = true;
        team.employees.splice(index, 1);
      }
    });

    if (alreadyMember == false) {
      return res.json({
        status: 'Ok',
        data: 'No Member Found',
      });
    }

    await team.save();

    res.json({
      status: 'Ok',
      data: team,
    });
  } catch (error) {
    res.json({
      status: 'Error',
      data: error,
    });
  }
});

router.get('/getTeam/:id', authPass, async (req, res) => {
  const user = req.user;
  const teamId = req.params.id;

  if (!user) {
    return res.status(401).json({
      msg: 'UnAuthorized',
    });
  }
  // const manager = await User.populate(user, { path: "team" });
  const team = await Team.findById(teamId);

  if (!team) {
    return res.status(404).json({
      msg: 'No Team Found!!',
    });
  }

  console.log(team);
  // const team = await user.populate("team").execPopulate();
  const TeamMembers = await Team.populate(team, {
    path: 'employees',
  });

  var teamMember = [];

  for (var i = 0; i < TeamMembers.employees.length; i++) {
    const emp = TeamMembers.employees[i];
    const member = await User.populate(emp, {
      path: 'projects',
    });
    teamMember.push(member);
  }
  // TeamMembers.employees.forEach(async(emp)=>{
  //   const member=await User.populate(emp,{
  //     path:"projects"
  //   })
  // })
  // const teamMembers = TeamMembers.employees.populate("projects");
  // const teamMembers

  const TeamProject = await Team.populate(team, {
    path: 'projects',
  });
  const teamProject = TeamProject.projects;
  // const teamProject = team.populate("projects");
  // t.populate("my-path").execPopulate();
  res.json({
    msg: 'Success',
    data: {
      team,
      teamMember,
      teamProject,
    },
  });
});

router.get('/getTeam', authPass, async (req, res) => {
  const responseArray = [];
  const user = req.user;
  // const teamId = req.params.id;

  if (!user) {
    return res.status(401).json({
      msg: 'UnAuthorized',
    });
  }

  for (var i = 0; i < user.team.length; i++) {
    const team = await Team.findById(user.team[i]);
    if (team) {
      console.log(team);
      // const team = await user.populate("team").execPopulate();
      await Team.populate(team, {
        path: 'employees',
      });
      // const teamMembers = TeamMembers.employees;

      await Team.populate(team, {
        path: 'projects',
      });
      // const teamProject = TeamProject.projects;
      responseArray.push(team);
    } else {
      continue;
    }
  }

  // const teamProject = team.populate("projects");
  // t.populate("my-path").execPopulate();
  res.json({
    msg: 'Success',
    data: responseArray,
  });
});

router.delete('/', authPass, async (req, res) => {
  const manager = req.user;
  if (!manager.role == 'manager') {
    return res.json({
      message: 'UnAuthorized',
    });
  }

  const teamId = req.body.teamId;

  try {
    const team = await Team.findByIdAndRemove(teamId);

    const teamMembers = team.employees;

    const managerId = team.manager;
    if (!managerId === manager._id) {
      return res.json({
        message: 'You Can Only Delete Your Teams',
      });
    }

    manager.team.forEach((team, index) => {
      console.log(team);

      if (team.equals(team._id)) {
        console.log('Inside IF');
        // alreadyMember = true;
        manager.team.splice(index, 1);
      }
    });
    await manager.save();

    for (var i = 0; i < teamMembers.length; i++) {
      const id = teamMembers[i].toHexString();
      const employee = await User.findById(id);

      console.log(employee);

      employee.team.forEach((team, index) => {
        console.log(team);

        if (team.equals(team._id)) {
          console.log('Inside IF');
          // alreadyMember = true;
          employee.team.splice(index, 1);
        }
      });
      await employee.save();
    }

    res.json({
      status: 'Deleted Team',
      data: team,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: 'Error',
      data: error,
    });
  }
});
export default router;
