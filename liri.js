
//This allows us to access information in the .env while keeping it protected.
require("dotenv").config();
//allows me to read and write to other files
var fs = require("fs");
//allows us to make requests to other APIs and bring back a response
const axios = require('axios');
const spotify = require('spotify');

//brings in information from the keys.
const keys = require("./keys.js");
// const spotify = new Spotify(keys.spotify);


var nodeArg = process.argv

var action = process.argv[2];
var mediaName = "";

for (var i = 3; i < nodeArg.length; i++) {
    if (i > 3 && i < nodeArg.length) {
        mediaName = mediaName + "+" + nodeArg[i];
    } else {
        mediaName += nodeArg[i];
    }
}


switch (action) {
    case "concert-this":
        concertThis();
        break;

    case "spotify-this-song":
        spotifyThisSong();
        break;

    case "movie-this":
        movieThis();
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;
}

//concert-this
function concertThis() {
    axios.get("https://rest.bandsintown.com/artists/" + mediaName + "/events?app_id=codingbootcamp").then(
        function (response) {
       
        console.log("Bands In Town: " + JSON.stringify(response.data, null, 2));
        console.log("Test 5" + JSON.stringify(response.data[0].offers[0].url));
        console.log("\r\n\r\n\r\n");
        console.log("----------------------------------------------------------");
        console.log("Venue: " + JSON.stringify(response.data[0].venue.name));
        console.log("Test 7" + JSON.stringify(response.data[0].venue.city));
        console.log("Test 8" + JSON.stringify(response.data[0].venue.region));
        console.log("Test 9" + JSON.stringify(response.data[0].venue.country));

        // console.log("Venue: " + JSON.stringify(response.data));
        // console.log("Location: " );
        // console.log("Date: ");
     })


    .catch(function(error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an object that comes back with details pertaining to the error that occurred.
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
    
});
}


//create a function that  calls all of that below when
// Name of Venue, Location, and Date translated by moment

//spotify-this-song
//Artists, Songs name, a preview link of the song from Spotify, and Album. If no long, it should default to Ace of Base the Sign

//movie-this
//Title of movie, year it came out, IMBD rating, rottenToms rating, Country produced, language, plot, and actors
//Defaults to Mr. Nod
// movieThis(){
//     axios.get()
// }

//do-what-it-says
// function doWhatItSays() {
//     fs.read("random.text", "utf8", function (err, data) {
//         if (err) {
//             return console.log(err);
//         }
//         spotifyThisSong()
//     }



// In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.
        //append

    //     fs.appendFile("log.txt", results, function (err) {
    //     if (err) {
    //         return console.log(err);
    //     }
    // });