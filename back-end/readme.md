# ScreenShot Monitoring Application

![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen.svg?style=flat-square)&nbsp;![License](https://img.shields.io/badge/license-MIT-brightgreen)&nbsp;![Made with Love in India](https://madewithlove.org.in/badge.svg)

ScreenShot Monitoring is a web application which can be used to monitor employee's screen.
We are using our own backend server for the handling the API requests.

Our documentation includes a quickstart guide to help you get started with ScreenShot Monitoring Service, as well as guides on how to add and manage teams, projects, clients, user data into the application.

## Authorization

# POST Creating Employee

URL : http://localhost:8000/register
BODY:
{
"role":"employeee",
"fistName":"Prakhar",
"lastName":"Sharma",
"email":"prakhar1234@gmail.com",
"password":"rohit" ,
"day":{}
}

# POSTLogin

URl:http://localhost:8000/login
BODY:
{
"email":"shrey@gmail.com",
"password":"0000"
}

## Employee

@Routes

# PATCH Edit Employee

URL:http://localhost:8000/employee/edit/6194f2dad3945a978811238f

HEADERS:
Authorization
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYjhlMWI2MzQzZTgyOWRkOTk2MzUxMiIsImlhdCI6MTY0MDAxOTQwNSwiZXhwIjoxNjQwMTkyMjA1fQ.uXeiHtzYtmlZDKJLyuggUXxKxGbe2AwkiGnQ32t\_-k4

BODY Raw
{
"role":"employee",
"name":"Prakhar",
"email":"srivastava@gmail.com",
"password":"123",
"day":{
"date":"2018-03-29",
"hours":5,
"screenShot":[]
}
}

# GET Getting Details

URL: http://localhost:8000/employee/6194f2dad3945a978811238f

HEADERS:
Authorization
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYjhlMWI2MzQzZTgyOWRkOTk2MzUxMiIsImlhdCI6MTY0MDAxOTQwNSwiZXhwIjoxNjQwMTkyMjA1fQ.uXeiHtzYtmlZDKJLyuggUXxKxGbe2AwkiGnQ32t\_-k4

BODY Raw
{
"role":"employee",
"name":"Prakhar",
"email":"srivastava@gmail.com",
"password":"123",
"day":{
"date":"2018-03-29",
"hours":5,
"screenShot":[]
}
}

## Team

@Routes

# POST Creating Team

URL:http://localhost:8000/team/create

HEADERS
Authorization
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYjhlMWI2MzQzZTgyOWRkOTk2MzUxMiIsImlhdCI6MTY0MDAzNjE1OCwiZXhwIjoxNjQwMjA4OTU4fQ.Z7wQx8TDD8D4GQiLWDFLeIRV9rtLEUyV_KkJ8L59s5c
BODY
{
"name":"FRONT END Shrey SHARMA"
}

# GET Get Team Employee List

URL: http://localhost:8000/team/getTeam
AUTHORIZATION
Bearer Token
This request is using Bearer Token from collectionScreenShot Monitor
HEADERS
Authorization
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYmEyZTJlOGFjYmVlNjVkZTZmYjIzMyIsImlhdCI6MTYzOTYxMDI0NSwiZXhwIjoxNjM5NzgzMDQ1fQ.-oRe7D31_XY9QTsAG4a1zl1py9_65BgLIozIuCXUaxE

# PATCH Add Employee TO Team

URL : http://localhost:8000/team/updateMember/

AUTHORIZATION
Bearer Token
This request is using Bearer Token from collectionScreenShot Monitor

HEADERS
Authorization
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYmEyZTJlOGFjYmVlNjVkZTZmYjIzMyIsImlhdCI6MTYzOTY1NjA3MSwiZXhwIjoxNjM5ODI4ODcxfQ.HYWdNDGC6ENLqKPQjJHeTlcsKvLm3gjgLeoc_TWhzN4
BODY
{
"employeeId":"61b8a93ed63720e0c0e20c9c",
"teamId":""
}

# DELRemoving Team Memebers

URL : http://localhost:8000/team/removeMember
AUTHORIZATION
Bearer Token
This request is using Bearer Token from collectionScreenShot Monitor
BODYraw
{
"employeeId":"6194f6ef8d1b2a54d35fad70",
"teamId":"619532ab972949a630926abf"

}

# DEL Delete Team

URL : http://localhost:8000/team
AUTHORIZATION
Bearer Token
This request is using Bearer Token from collectionScreenShot Monitor
HEADERS
Authorization
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYjhlMWI2MzQzZTgyOWRkOTk2MzUxMiIsImlhdCI6MTY0MDAzNjE1OCwiZXhwIjoxNjQwMjA4OTU4fQ.Z7wQx8TDD8D4GQiLWDFLeIRV9rtLEUyV_KkJ8L59s5c
BODY
{

"teamId":"61bafeef424fc17806f3c361"

}

## CLIENT

# POSTAdd Client

URL :http://localhost:8000/client

AUTHORIZATION
Bearer Token
This request is using Bearer Token from collectionScreenShot Monitor

HEADERS
Authorization
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYjhkYjJjMzYyMjQxNDg5NmRmMmM0NyIsImlhdCI6MTYzOTU4NzUwMSwiZXhwIjoxNjM5NzYwMzAxfQ.Foy7w05H_3fGumGEqOuRsR2z1vzg8AzHE6lIPBlBpfU

BODY
{
"name":"Adobe"
}

# DEL Delete Client

URL : http://localhost:8000/client

AUTHORIZATION
Bearer Token
This request is using Bearer Token from collectionScreenShot Monitor

HEADERS
Authorization
Bearer

# GET GetCLient

URL : http://localhost:8000/client/getClient

AUTHORIZATION
Bearer Token
This request is using Bearer Token from collectionScreenShot Monitor

HEADERS
Authorization
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYjhlMWI2MzQzZTgyOWRkOTk2MzUxMiIsImlhdCI6MTYzOTc1MzM2MywiZXhwIjoxNjM5OTI2MTYzfQ.tyw8u7DFQSlpShlZ2sEnDKZMoTj9ng-3B6HIq6TtiSU

# POST Get Client Projects

URL : http://localhost:8000/client/getClientProjects

AUTHORIZATION
Bearer Token
This request is using Bearer Token from collectionScreenShot Monitor

HEADERS
Authorization
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYjhlMWI2MzQzZTgyOWRkOTk2MzUxMiIsImlhdCI6MTY0MDEwNDcyOSwiZXhwIjoxNjQwMjc3NTI5fQ.Z_upQzy7xlFzMb4JcxGBnpoCwy7zjKqCPm2vatQBo_Y

BODY
{
"clientId":"61bacf2c424fc17806f3c2ec"
}

# PATCH Edit Client

URL: ttp://localhost:8000/client/getClientProjects

AUTHORIZATION
Bearer Token
This request is using Bearer Token from collectionScreenShot Monitor

HEADERS
Authorization
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYWRmY2ZiNTI3NDAxNTEyNDVmOWVkMyIsImlhdCI6MTYzODk2NzA0NywiZXhwIjoxNjM5MTM5ODQ3fQ.-50YjQx7rLonCyxr4WsaitvCZgdZh0kYvzljpu7C5Kc

BODY
{
"clientId":"61b0b6f8233b7cb13d6bb37f"
}

## Project

# POST Create Project

URL :http://localhost:8000/project

AUTHORIZATION
Bearer Token
This request is using Bearer Token from collectionScreenShot Monitor
HEADERS

Authorization
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYjhlMWI2MzQzZTgyOWRkOTk2MzUxMiIsImlhdCI6MTY0MDA2OTIzOCwiZXhwIjoxNjQwMjQyMDM4fQ.bzMGaTjVx3RPPO0pkjwBMSSSruhwcZi3fSGGxc54hGA

BODY
{
"name":"",
"clientId":"61bacf2c424fc17806f3c2ec"
}

# GET Get Project

URL : http://localhost:8000/project/61bad3bb424fc17806f3c2f9

AUTHORIZATION
Bearer Token
This request is using Bearer Token from collectionScreenShot Monitor

HEADERS
Authorization
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYjhlMWI2MzQzZTgyOWRkOTk2MzUxMiIsImlhdCI6MTY0MDAxOTQwNSwiZXhwIjoxNjQwMTkyMjA1fQ.uXeiHtzYtmlZDKJLyuggUXxKxGbe2AwkiGnQ32t\_-k4

# DELDelete Project

URL : http://localhost:8000/project

AUTHORIZATION
Bearer Token
This request is using Bearer Token from collectionScreenShot Monitor
HEADERS
Authorization
Bearer

BODY
{

    "projectId":"619cda45bf726ae585a69ac8"

}

# PATCH Edit Project

URL : http://localhost:8000/project/61ba1f2c8871a974e121d6a6

AUTHORIZATION
Bearer Token
This request is using Bearer Token from collectionScreenShot Monitor

HEADERS
Authorization
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYjhkYjJjMzYyMjQxNDg5NmRmMmM0NyIsImlhdCI6MTYzOTU4NzUwMSwiZXhwIjoxNjM5NzYwMzAxfQ.Foy7w05H_3fGumGEqOuRsR2z1vzg8AzHE6lIPBlBpfU

BODY
{

"name":"Adobe Website Deployment"

}

# PATCH Add Team

URL : http://localhost:8000/project

AUTHORIZATION
Bearer Token
This request is using Bearer Token from collectionScreenShot Monitor

HEADERS
Authorization
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYjhlMWI2MzQzZTgyOWRkOTk2MzUxMiIsImlhdCI6MTYzOTc1OTQ0MCwiZXhwIjoxNjM5OTMyMjQwfQ.VlUqgU1DrEMcjX3XqZOhOtxikU8UZ9gIRtLJTJPfmQ4

BODY
{
"projectId":"61bb73e28501429ec25b4f82",
"teamId":"61bafeef424fc17806f3c361"

}
