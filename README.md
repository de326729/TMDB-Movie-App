# TMDB-Movie-App
This application integrates with TMDB APIs and displays list of now playing movies with filter capability.

The application uses [The Movie Database (TMDb) API](https://www.themoviedb.org/documentation/api) to display movie data.

## Installation
Please install node.js to run this application.

Follow below steps to install in your local machine:

* Clone the repo: https://github.com/de326729/TMDB-Movie-App.git
* Go to TMDB-Movie-App: cd TMDB-Movie-App
* Install the required npm packages: npm install
* Build project and launch: npm run dev
* Open your browser at: http://localhost:8080

##Documentation
Please download docs folder in your local machine and run index.html file to view project documentation.

## Functional Highlights
* Integrates with the TMDB API to fetch and display movies
* Displays a list of movies based on the Now Playig TMDB API response
* Movies can be filtered basd on their Rating and Genres
* Uses Enzyme Jest for unit testing of components

## Technical Details
* Used front end development library provided by Facebook - [React](https://reactjs.org/
* Used Material Design components provided by library [Material UI](https://material-ui.com/)
* Application wide state is managed by [React-Redux](https://github.com/reactjs/react-redux)
