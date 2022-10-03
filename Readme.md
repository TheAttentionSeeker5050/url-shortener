# Url Shortener

## About

It is a website application that shortens website. When a registered user adds an url it is available for other users and unauthenticated users to use.


## Functions

Login, logout and register

Create, update and delete shortened urls



## Things I want to do in the future

Add an easy copy short url button

Unregister functionality, and probably an email address confirmation task for just-registered accounts

A waiting screen, I could put adsense ads, just for fun, and to avoid overuse if someone finds this website

Dashboard and use metrics



## Technologies used

Node.js and express

Vanilla javascript on the frontend

Sessions, cookies libraries on node

Bootstrap

Deployed in heroku and google cloud



## Installation

If you want to clone and edit this website you are free to do it.


Clone the web app from github first:

`git clone https://github.com/TheAttentionSeeker5050/url-shortener.git`


Install dependencies

`npm install`


Provide the environment variables in a .env file


`MONGODB_URL="your_mongo_atlas_url"`

`JSON_WEB_TOKEN="your_token"`

`SESSION_SECRET_TOKEN="global_session_variable"`


Run on debug mode

`npm run start-dev`


Deploy on your favorite cloud provider

`I have a procfile and a yaml file for heroku and gcloud respectively in the repo files`
