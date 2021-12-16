### TEAM API

@desc Creating Team
@route POST /team/create
@data sent object {name : "team name"}

@desc Get Team List / Employee List
@route GET /team/getTeam
@data sent

@desc Update Memeber / Add Employee to Team
@route PATCH /team/updateTeam
@data sent

### EMPLOYEE API

@desc Get Employee Details
@route GET /employee/${\_id}
@data sent string "\_id"

### CLIENT API

@desc Get Client Details
@route GET /getClient
@data sent
