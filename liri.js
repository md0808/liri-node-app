
//This allows us to access information in the .env while keeping it protected.
require("dotenv").config();
//allows me to read and write to other files
const fs = require("fs");
//allows us to make requests to other APIs and bring back a response
const axios = require("axios");
const Spotify = require("node-spotify-api");
const moment = require("moment")

//brings in information from the keys.
const keys = require("./keys.js");
const spotifyKeys = (keys.spotify);

var spotify = new Spotify({
    id: spotifyKeys.id,
    secret: spotifyKeys.secret
})

var nodeArg = process.argv

var action = process.argv[2];
var mediaSearch = "";

for (var i = 3; i < nodeArg.length; i++) {
    if (i > 3 && i < nodeArg.length) {
        mediaSearch = mediaSearch + "+" + nodeArg[i];
    } else {
        mediaSearch += nodeArg[i];
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
    default:
        console.log("Liri doesn't understand you.");
}

//concert-this
function concertThis() {
    axios.get("https://rest.bandsintown.com/artists/" + mediaSearch + "/events?app_id=codingbootcamp").then(
        function (response) {
            console.log("\r\n\r\n\r\n*************************");
            console.log("See " + mediaSearch.replace(/[^\w\s]/gi, " ") + " at " +
                "\n" + JSON.stringify(response.data[0].venue.name).replace(/"/g, "") +
                "\nin " + JSON.stringify(response.data[0].venue.city).replace(/"/g, "") +
                ", " + JSON.stringify(response.data[0].venue.region).replace(/"/g, "") +
                ", " + JSON.stringify(response.data[0].venue.country).replace(/"/g, "") +
                "\nOn " + moment(JSON.stringify(response.data[0].datetime).replace(/"/g, "")).format("MM/DD/YYYY")
                + "\n*************************\r\n\r\n\r\n ");
        })

        .catch(function (error) {
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
                console.log("This band or artist might not be touring right now. Try restating, or someone else. \n*************************\r\n\r\n\r\n ");
            }

        });
}

//mediaSearch.replace(/[^\w\s]/gi, " ")
//spotify-this-song
// If no long, it should default to Ace of Base the Sign
function spotifyThisSong() {
    spotify.search({ type: "track", query: mediaSearch.replace(/[^\w\s]/gi, " ")})
        .then(function (response) {
            console.log(response.tracks.items[0]);
            console.log("\n\r\n\r\n*************************");
            console.log("Song title: " +response.tracks.items[0].name);
            console.log( "Artist Name: "+response.tracks.items[0].artists[0].name);
            console.log("Album name: " + response.tracks.items[0].album.name);
            console.log("Link to song: " + response.tracks.items[0].external_urls.spotify);
            console.log("*************************\n\r\n\r\n");

        })
        .catch(function (err) {
            console.log(err);
        });

}
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