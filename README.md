# Constellation

## Synopsis
Constellation is an crowd sourced knowledge hub that allows users to easily learn, teach, find and create new tutorials.

## Interaction
 There are three modes of interaction on our website:
* An editor which makes it easy to create new content. (Nebulae)
* A simple search interface which makes *content discovery* quick.
* A constellation viewer which makes constellation viewing engaging.

## What is a star?
* A star is a snippet of information tailored by the users.
  * Think of this as a webpage where you share a piece of information.
  * Some examples may include:
    * A list of commands in BASH.
    * A recipe on fried okra.
    * A step by step guide on how to integrate by parts.
* Each user will have a *my stars* page to view stars they have contributed to the website.
  * Each user can remove or edit their stars, or create new new ones on this page.
    * Doing so will take the user to the *Nebula* Editor
* Each user will also have a *discovered stars* page to view stars which they have bookmarked

## What are constellations?
* Constellations are tutorial series which are simply combinations of stars.
* When a user finds a constellation, they are taken to it's page, which will then redirect the user to the pages of the star which are part of that constellation in the order the original constellation has designated it to be in.
  * Constellations may have *linear* or *branched* structures, which could allow the user to find their own path through the tutorial/learn what they want to learn.
* Each user will have a *my constellations* tab to view their constellations, and a *discovered constellations* tab which

#### We hope to push your know how and appreciation for the world *beyond the horizon*!

## How to use our code
Here is a list of steps if you want to use our code to create a local implementation of our website:
 1. First clone our repository.
 2. In your desired terminal of choice, navigate to the repository, then run `npm install` in the directory.
 3. a new folder called node_modules should have been created with all the node.js dependencies. create a new directory called data using `mkdir data`
 4. Now you will want to begin the database. In another console, navigate to your mongoDB and run mongod
  * If you are on mac, simply run `mongod --dbpath PATHTO\data`.
  * If you are on windows run `cd C:\"Program Files"\mongoDB\Server\3.4\bin` then run `mongod --dbpath PATHTO\data`.
 5. If you want the code on this repo is being used for a Microsoft Azure web Server, if you want to run it locally, make sure to change the server port in the bin/www:
  * change ` if (process.env.NODE_ENV == "production") {server.listen(process.env.PORT);} else {server.listen(80);}` to `server.listen(port);` to run the code locally
 6. now run `npm start`. connecting to localhost:3000 should now let you view the website


## Sources for various snippets of code

* configure passport taken from https://code.tutsplus.com/tutorials/authenticating-nodejs-applications-with-passport--cms-21619
* using update routing found in http://blog.ocliw.com/2012/11/25/mongoose-add-to-an-existing-array/
* Fixing outline: http://stackoverflow.com/questions/20340138/remove-blue-border-from-css-custom-styled-button-in-chrome
* Changing Placeholder text properties: https://css-tricks.com/almanac/selectors/p/placeholder/
* Dashed lines system found at http://stackoverflow.com/questions/6012940/html5-animating-a-dashed-line
* Recursive array cloning technique found here: http://stackoverflow.com/questions/2294703/multidimensional-array-cloning-using-javascript
* Some Citations for some of the css:
* Flexbox: https://css-tricks.com/snippets/css/a-guide-to-flexbox/
* Fixing form apperance: https://css-tricks.com/almanac/properties/a/appearance/

## Frameworks in use:

Using node.js to run backend
Using  Express for backend
Using Passport for authentication
Using mongoose to connect to a mongoDB database
Considering using angular for frontend
Using Jquery for frontend manipulation

## DEVELOPMENT TASK LIST


TODO: Clean up code and comments
TODO: Cleanup console.log() statements and add them where appropriate (severside events and errors)
TODO: populate mesage area on error
TODO: create form filter function which prevents XSS
TODO: filter user input for bad stuff, or really long things for username/title
TODO: look into the passport secret in the app.js (should it be something else?)
TODO: [LOW] handle invalid bookmark AJAX requests, check to make sure that there is actually a star or constellation by that ID
TODO: [LOW] handle errors involving saving properly
TODO: Make sure that constellations and stars actually have things.
