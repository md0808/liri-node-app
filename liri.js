
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


//takes in user request 
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


//evaluates user request
function evaluateAction(){
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
}
evaluateAction();

function log(info) {
    fs.appendFile("log.txt", info, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log(info);
    })
}

//concert-this
function concertThis() {
    axios.get("https://rest.bandsintown.com/artists/" + mediaSearch + "/events?app_id=codingbootcamp").then(
        function (response) {
            let info = "\r\n\r\n\r\n*************************"
                + "\nSee " + mediaSearch.replace(/[^\w\s]/gi, " ") + " at " +
                "\n" + JSON.stringify(response.data[0].venue.name).replace(/"/g, "") +
                "\nin " + JSON.stringify(response.data[0].venue.city).replace(/"/g, "") +
                ", " + JSON.stringify(response.data[0].venue.region).replace(/"/g, "") +
                ", " + JSON.stringify(response.data[0].venue.country).replace(/"/g, "") +
                "\nOn " + moment(JSON.stringify(response.data[0].datetime).replace(/"/g, "")).format("MM/DD/YYYY")
                + "\n*************************\r\n\r\n\r\n ";
            log(info);
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error);
            } else {
                console.log("This band or artist might not be touring right now. Try restating, or someone else. \n*************************\r\n\r\n\r\n ");
            }

        });
}
function spotifyThisSong() {
    var song = mediaSearch;
    if (!mediaSearch || mediaSearch == undefined) {
        song = "The Sign Ace of Base"
    }
    spotify.search({ type: "track", query: song.replace(/[^\w\s]/gi, " ") })
        .then(function (response) {
            let info = "\n\r\n\r\n*************************" +
                "\nSong title: " + response.tracks.items[0].name +
                "\nArtist Name: " + response.tracks.items[0].artists[0].name +
                "\nAlbum name: " + response.tracks.items[0].album.name +
                "\nLink to song: " + response.tracks.items[0].external_urls.spotify +
                "\n*************************\n\r\n\r\n";
            log(info);

        })
        .catch(function (err) {
            console.log(err);
        });

}

function movieThis() {
    var movie = mediaSearch;
    if (!mediaSearch || mediaSearch == undefined) {
        movie = "Mr. Nobody"
    }
    axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + movie).then(
        function (response) {
            let title = response.data.Title;
            let year = response.data.Year;
            let IMBDrating = response.data.Ratings[0].Value;
            let rottenToms = response.data.Ratings[1].Value;
            let country = response.data.Country;
            let language = response.data.Language;
            let plot = response.data.Plot;
            let info = "\n\r\n\r\n*************************" +
                "\nTitle: " + title +
                "\nYear Released: " + year +
                "\nIMD Rating: " + IMBDrating +
                "\nRotten Tomatoes Rating:  " + rottenToms +
                "\nCountry Produced In: " + country +
                "\nLanguage(s): " + language +
                "\nPlot: " + plot +
                "\nActors: " + response.data.Actors +
                "\n*************************\n\r\n\r\n";
            log(info);
        }
    )
};


//do-what-it-says
function doWhatItSays() {
    fs.readFile("random.text", "utf8", function(error, data) {
        if(error){
            return console.log(error);
        }
        var input = data.split(",");
        action = input[0];
        mediaSearch = input[1];
        evaluateAction();
        
    })
}
