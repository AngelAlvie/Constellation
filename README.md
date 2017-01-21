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

## What is *content discovery*?
Recently, users of various websites will be shown content which complements their previous searches and other metadata which leads to users seeing the same type of content everytime they enter the website.
This *Echo Chamber Effect* has become a serious problem with major websites which build either separate communities within their websites which don't engage with content outside of their chamber, or the website forces unity within their userbase, causing the entire community of the website to become one larger echo chamber.
We believe that this problem is one which needs to be addressed through website design, so we came up with the idea of *Content Discovery*.
Content discovery is the combination of our search and reward system.
We want to promote users to explore the website and discover new stuff.
Both the discoverer and the creator will be rewarded when their content gets used a lot.

#### We hope to push your know how and appreciation for the world *beyond the horizon*!

## How to use our
Here is a list of steps if you want to use our code to create a local implementation of our website:
 1. First clone our repository.
 2. In your desired terminal of choice, navigate to the repository, then run `npm install` in the directory.
 3. a new folder called node_modules should have been created with all the node.js dependencies. create a new directory called data using `mkdir data`
 4. Now you will want to begin the database. In another console, navigate to your mongoDB and run mongod
  * If you are on mac, simply run `mongod --dbpath PATHTO\data`.
  * If you are on windows run `cd C:\"Program Files"\mongoDB\Server\3.4\bin` then run `mongod --dbpath PATHTO\data`.
 5. now run `npm start`. connecting to localhost:3000 should now let you view the website

## DEVELOPMENT TASK LIST
 * figure out how authentication will interact with database
 * Decide on and or impliment Handlebars templating or Angular templating
 * Decide on a search algorithm
 * Decide on constellation viewing
 * finish constellation
 * implement parallax scrolling (if using angular)
 * finish pages/templates for stars and constellations
 * html tooltips?
