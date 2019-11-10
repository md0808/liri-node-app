# Liri Node App
https://github.com/md0808/liri-node-app

LIRI is a Language Interpretation and Recognition Interface. LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.



## Problem:

Using the command line, this node application allows users to search for information about songs, movies, and upcoming concerts with keywords "spotify-this-song", "movie-this", and "concert-this" respectively, followed by the term they want to search. The keyword "do-what-it-says" reads from a text file (random.txt) to take search parameters. After completing the request, it returns selected information from the database and logs it both into the console, and to a log.txt file.


## Functionality Overview:

 The application begins by determining which database to query by accessing the keyword given by the user. If one of the four predetermined keywords are not used to specify the type of search, Liri let's you know that she doesn't understand. If the user types "spotify-this" followed by a song they want to know more about, Liri will use the Spotify API to retrieve information. The keyword "concert-this" followed by your favorite touring artist retrieves information from Bands In Town, and "movie-this" gets answers from OMDB. 

## Instructions
1. Clone the github repository by copying the link above the table of files in the repository.

<img width="630" alt="Screen Shot 2019-11-09 at 7 09 54 PM" src="https://user-images.githubusercontent.com/51139840/68537166-99f70f00-0325-11ea-9a7a-5f13168b0ed3.png">

2. From the commandline, navigate to the root folder of the liri-nod-app.
3. Install the following npm packages:
     * axios
     * spotify
4. You will need API keys for Spotify, which you can create here: https://developer.spotify.com/ . OMDB and Bands In Town keys are provided.
You will need to create your own keys.js file with the above information. Export the information so it can be read by liri.js. Use .gitignore and .env files to protect your keys. You'll need to install the dotenv npm if you would like to use the .env file to protect your keys (which is recommended).

## Visual Documentation




## Technologies Used
* Node.js
* Axios
* Bands in Town API
* Spotify API
OMDB API
* dotenv npm


## My role in this application: 
Creator of all content
