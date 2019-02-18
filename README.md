# TMDB-Movie-App
This application integrates with TMDB APIs and displays list of now playing movies with filter capability.

The application uses open [The Movie Database (TMDb) API] (https://www.themoviedb.org/documentation/api) to display movie data.

## Installation
Please install node.js to run this application.

Follow below steps to install in your local machine:

* Clone the repo: https://github.com/de326729/TMDB-Movie-App.git
* Go to TMDB-Movie-App: cd TMDB-Movie-App
* Install the required npm packages: npm install
* Build project and launch: npm run dev
* Open your browser at: http://localhost:8080


## Functional Highlights
* Integrates with the TMDB API to fetch and display movies
* Displays a list of movies based on the Now Playig TMDB API response
* Movies can be filtered basd on their Rating and Genres

## Technical Details
* Used Material Design components provided by library [Material UI](https://material-ui.com/)
* Responsive design using [Bootstrap](https://getbootstrap.com/)
* Application wide state is managed by [React-Redux](https://github.com/reactjs/react-redux)
