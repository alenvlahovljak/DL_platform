# DL_platform
 Distance Learning platform

> ### Mongodb/Express.js/React.js/Node.js Application

# Getting started

To get the Node server running locally:

- Clone this repo;
- `cd server/ && npm install` to install all required dependencies;
- Install MongoDB Community Edition ([instructions](https://docs.mongodb.com/manual/installation/#tutorials)) and run it by executing `mongod`;
- `cd client/ && npm install && npm run build` to install and build React.js app;
- `npm run start` to start the local server;
- `cd client/ && npm start` to start React.js app.

Alternately, to quickly try out this repo in Heroku: http://dl-platforma.herokuapp.com/

### Folder structure
```
├───client
│   ├───public
│   └───src
│       ├───actions
│       ├───components
│       │   ├───courses
│       │   ├───lecturers
│       │   ├───logins
│       │   ├───pages
│       │   └───users
│       ├───reducers
│       ├───styling
│       └───userApi
└───server
    ├───models
    └───routes
        ├───course
        ├───lecturer
        └───user
```