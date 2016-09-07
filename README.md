## ProjectNeighborhoodMap
``` hello 

 ```
 This project uses the npm package manager and has the following dependencies :

    "body-parser": "~1.13.2",
    "cookie-parser": "~1.3.5",
    "debug": "~2.2.0",
    "express": "~4.13.1",
    "gulp-sass": "^2.3.2",
    "morgan": "~1.6.1",
    "node-fetch": "^1.6.0",
    "request": "^2.74.0",
    "request-promise": "^4.1.1",
    "yelp": "^1.0.1"
```
Which can be installed using the npm install commad via the command line of the folder where you would contain this project.

### Setup

To clone the repo or copy the url to proceed to the direct link:
```sh
$ git clone https://github.com/thegibster/ProjectNeighborhoodMap
```
Site may be reached at :
```sh
https://healthknow.herokuapp.com/
```
## Up and Running the Project
1. After cloning or downloading the zip(unzip)
2. To run on local server use the terminal to enter the directory and run nodemon to start the local server default port localhost 3000.
3. Or go to the heroku link for this project provided earlier in this Readme.

### Services provided
1. A user must either login or sign-up to use the app.
2. User will be able to view their current and past medical information including blood-type, past surgeries, etc... 
3. User will be able to look up a pill by either name or by the scarring that is on the pill and have a response returned to them identifying said pill or medication. 


### Known bugs and Issues
1. Ability to edit user data was pre-populated beforehand.
2. If the xml2js module is not used then the pill data cannot be used since the return data is in the form of xml and would not be properly parsed unless converted to the JSON object form.
