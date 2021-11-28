const Client = require("../models/client");
const Project = require("../models/project");
const Team = require("../models/team");

exports.createProject = async (req, res) => {
  const employee = req.user;
  if (employee.role === "manager") {
    const { name, clientId } = req.body;
    try {
      const project = new Project({ name });

      await project.save();
      console.log("THis is project", project);
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
      const team = await Team.findById(teamId);
      if (!team) {
        return res.status(404).send("OOps, no team found");
      }
      console.log(team);

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
