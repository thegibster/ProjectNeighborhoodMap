## ProjectNeighborhoodMap


Which can be installed using the npm install commad via the command line of the folder where you would contain this project.

### Setup

To clone the repo or copy the url to proceed to the direct link:
```sh
$ git clone https://github.com/thegibster/ProjectNeighborhoodMap
```
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
 ```
 This project uses the npm package manager and has the following devDependencies :

     "browser-sync": "^2.17.0",
     "del": "^2.2.2",
     "gulp": "^3.9.1",
     "gulp-autoprefixer": "^3.1.1",
     "gulp-buffer": "0.0.2",
     "gulp-concat": "^2.6.0",
     "gulp-eslint": "^3.0.1",
     "gulp-inject": "^4.1.0",
     "gulp-sass": "^2.3.2",
     "gulp-uglify": "^2.0.0",
     "merge2": "^1.0.2",
     "request": "^2.75.0",
     "vinyl-source-stream": "^1.1.0"
```

## Up and Running the Project
1. After forking the project ,cloning the project or downloading the zip(unzip) version of the project.
2. To load all package dependencies run: 
     >$ npm install

2. To run on the local server from the terminal from within the ProjectNeighborhoodMap directory,and run:
       
     >$ node src/server 

    this will start the  local server on default port localhost 3000.


### Services provided
1. From a predifined list of locations the user may filter locations in real-time and have the list view change by filter parameter as well as the visable map markers.
2. Clicking on a marker causes the marker to bounce as well as change color and open an info window. 
3. The info window is populated with yelp reviews of the top five restaurants based on the lat/lng of the markers location.
4. Clicking on a yelp review will open the review in a new tab.


### Build Tools
1. Gulp(gulpfile.js) is used to watch the index.html, scss and javascript files in src and pipe any changes into the index.html in the dist folder.
2. Running
    
    >$ gulp serve

    will serve up the watch function where changes to index.html, scss and javascript files are watched and updated.

3. This command will concatenate and minify the javascript files into one file called all.js in dist/js.

### Accreditation
1. Google Maps API was utilized.
2. Yelp API is used to provide the Yelp reviews.
