### TEAM API

@desc Creating Team
@name createTeam
@route POST /team/create
@data sent object {name : "team name"}

@desc Get Team List / Employee List
@name getTeam
@route GET /team/getTeam
@data sent

@desc Update Memeber / Add Employee to Team
@name updateMember
@route PATCH /team/updateTeam
@data sent object {employeId : "employee id" , teamId , "team id"}

@desc Remove/ Delete Memeber
@name removeMember
@route DELETE team/removeMember
@data sent object {employeId : "employee id" , teamId , "team id"}

### EMPLOYEE API

@desc Get Employee Details
@name getEmployeeDetails
@route GET /employee/${id}
@data sent string "id"

### CLIENT API

@desc Get Client Details
@name getClient
@route GET /client/getClient
@data sent

@desc Add new Client
@name addClient
@route POST /client
@data sent object {name : "client name"}

### PROJECTS API

@desc Get Project Details
@name getClientProjects
@route GET /client/getClientProjects
@data sent

@desc Create a Project
@name createProject
@route POST /project
@data sent object {name : "project name" , clientId:"client id"}

@desc Add an existing Team to Project
@name addTeamToProject
@route PATCH /project
@data sent object {projectId : "project id" , teamId:"team id"}

@desc Edit an existing project
@name editProject
@route PATCH /project/${id}
@data sent string "id" , object {name:"new project name"}

@desc Delete an existing project
@name deleteProject
@route DELETE /project
@data sent object {projectId:"project id"}
