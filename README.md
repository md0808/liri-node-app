# Liri Node App
https://github.com/md0808/liri-node-app

LIRI is a Language Interpretation and Recognition Interface. LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.



## Problem:

Using the command line, this node application allows users to search for information about songs, movies, and upcoming concerts with keywords "spotify-this-song", "movie-this", and "concert-this" respectively, followed by the term they want to search. The keyword "do-what-it-says" reads from a text file (random.txt) to take search parameters. After completing the request, it returns selected information from the database and logs it both into the console, and to a log.txt file.


## Functionality Overview:

 The application begins by determining which database to query by accessing the keyword given by the user. If one of the four predetermined keywords are not used to specify the type of search, Liri let's you know that she doesn't understand. 
3. Give start-to-finish instructions on how to run the app
## Instructions
1. Clone the github repository by c
2. From the commandline, navigate to the root folder of the liri-nod-app.
3. Install the following npm packages:
     * axios
     * spotify
4. You will need API keys for Spotify. OMDB and Bands In Town keys are provided.
You will need to create your own keys.js file with the above information. Export the information so it can be read by liri.js. Use .gitignore and .env files to protect your keys. You'll need to install the dotenv npm if you would like to use the .env file to protect your keys (which is recommended).

## Visual Documentation

![liri2](https://user-images.githubusercontent.com/51139840/68537035-23591200-0323-11ea-9f54-9f69c6540f50.gif)



## Technologies Used
* Node.js
* Axios
* Bands in Town API
* Spotify API
OMDB API
* dotenv npm


## My role in this application: 
Creator of all content
