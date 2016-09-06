#Getting started

This project requires:

* [node and npm](http://nodejs.org/) `brew install node`
* `npm install --global gulp-cli`

Install node dependencies:

    npm install

Install bower:

    bower init

To run a gulp build:

    gulp build

To start a web server and watch for file changes:

    gulp

Then open [http://localhost:8000](http://localhost:8000) in your web browser

# Building the project

The project uses Gulp to build assemble the html, minify and concatenate the assets into the `public` folder. The main gulp tasks are:

* `gulp build`: runs an entire build from scratch, running all gulp tasks and compiling the flat site into the `public` directory
* `gulp clean`: clean a public directory
* `gulp`: Run server, open browser and watches for changes to files, and runs tasks relating to the file changes

# Author

* `Amir Rajabi`

