# BACKEND CHALLENGE <img src="./src/public/favicon.ico" height="50px">

Implement a RESTful API as a horizontally scalable discovery service.

- A number of different client applications will periodically send heartbeats to this service
- The service keeps track of them, periodically removing those that didn't send any heartbeats in some configured time frame (currently set to 30 mins)

[Click here to go to Postman Testing](https://app.getpostman.com/join-team?invite_code=5ffc23705657a99e7b971172adae551b&target_code=e89ce5577ba2e8399b3897c46f3fc251)

#### TECH STACK

>> Typescript
>> NodeJS
>> Express
>> MongoDB

#### ENDPOINTS

- /heart/post/:group/:id 
- /heart/delete/:group/:id
- /heart/get/ - currently malfunctioning
- /heart/get/:group

#### Functions
- Timer: deleteOldHeartbeat (currently set to 30 mins)

#### Progression
- Horizontal Scalability - Sample Templates/ Linted Boilerplates? 
- As this is MongoDB either Sharding via Atlas or Replication - which will be relevant?

#### OPTIONAL EXTRAS -- not yet completed

- Deployed to Heroku
- Green CI page

#### INSTALLATION

When you clone the respository, cd into it.

Install the dependencies
- npm install

Start the server
- nodemon

Your Terminal will tell you what localhost the server is running on.
Tested using Postman software.
###### Package JSON scripts
"npm run build" will automatically get rid of the old build folder, cleans up the code, and then compiles the tsc to js

###### Credits 
>> heartbeat icon credited to [Freepik](https://www.flaticon.com/free-icons/heartbeat)
>> UBIO for providing this Challenge

