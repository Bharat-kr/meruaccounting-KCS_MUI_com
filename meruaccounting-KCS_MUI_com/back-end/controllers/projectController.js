const Client = require("../models/client");
const Project = require("../models/project");
const Team = require("../models/team");

exports.createProject = async (req, res) => {
  const employee = req.user;
  if (employee.role === "manager") {
    const { name, clientId } = req.body;
    try {
      const project = new Project({ name });
      const client = await Client.findById(clientId);

      await project.save();
      console.log("THis is project", project);
      client.projects.push(project._id.toHexString());
      await client.save();
      project.client = clientId;
      await project.save();
      res.status(201).json({
        messsage: "Successfully Created Project",
        data: project,
      });
    } catch (error) {
      res.status(500).json({
        messsage: "Bad Request ",
        data: error,
      });
    }
  } else {
    res.status(201).json({
      messsage: "UnAuthorized Manager",
    });
  }
};
exports.getProject = async (req, res) => {
  const id = req.params.id;
  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).send("No project Found");
    }
    res.status(200).json({
      project,
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({
      error,
    });
  }
};
exports.editProject = async (req, res) => {
  const employee = req.user;
  if (employee.role === "manager") {
    const projectId = req.params.id;

    try {
      //   const team = await Team.findOne({ manager: employee._id });

      const project = await Project.findByIdAndUpdate(projectId, req.body);
      if (!project) {
        return res.status(404).send("OOps, no project found");
      }

      res.status(201).json({
        messsage: "Successfully Deleted Project",
        data: project,
      });
    } catch (error) {
      res.status(500).json({
        messsage: "Bad Request ",
        data: error,
      });
    }
  } else {
    res.status(201).json({
      messsage: "UnAuthorized Manager",
    });
  }
};
exports.deleteProject = async (req, res) => {
  const employee = req.user;
  if (employee.role === "manager") {
    const { projectId } = req.body;
    try {
      //   const team = await Team.findOne({ manager: employee._id });

      const project = await Project.findByIdAndRemove(projectId);
      if (!project) {
        return res.status(404).send("OOps, no project found");
      }

      res.status(201).json({
        messsage: "Successfully Deleted Project",
        data: project,
      });
    } catch (error) {
      res.status(500).json({
        messsage: "Bad Request ",
        data: error,
      });
    }
  } else {
    res.status(201).json({
      messsage: "UnAuthorized Manager",
    });
  }
};
exports.projectTeam = async (req, res) => {
  const employee = req.user;
  if (employee.role === "manager") {
    const { teamId, projectId } = req.body;
    try {
      //   const team = await Team.findOne({ manager: employee._id });

      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).send("OOps, no project found");
      }
      const team = await Team.findById(teamId).populate("employees");
      if (!team) {
        return res.status(404).send("OOps, no team found");
      }
      console.log(team);
      // team.employees.forEach((employee) => {});
      for (var i = 0; i < team.employees.length; i++) {
        console.log("Inside For Team Employees ");
        var emp = team.employees[i];

        console.log("This is a EMployee", emp);

        emp.projects.push(projectId);
        await emp.save();
        console.log(emp);
      }

      console.log("THis is project", project);
      project.team.push(teamId);
      team.projects.push(projectId);
      await project.save();
      await team.save();
      res.status(201).json({
        messsage: "Successfully Added team to  Project",
        data: project,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        messsage: "Bad Request ",
        data: error,
      });
    }
  } else {
    res.status(201).json({
      messsage: "UnAuthorized Manager",
    });
  }
};
