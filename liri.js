
//Variables for twitter, spootify, request, keys, and fs


var twitter = require("twitter");
var spotify = require("node-spotify-api");
var request = require("request");
var key = require("./keys.js")
var fs = require("fs");
var option = process.argv.slice(2);
LIRI(option);

function LIRI(operator)
{
	switch (operator[0]){
		case "my-tweets":{
			tweets();
			break;
		}
		case "spotify-this-song":{
			var song= title(operator.slice(1),"Children of Bodom")
			songs(song);
			break;
		}
		case "movie-this":{
			var movie= title(operator.slice(1),"Jaws")
			movies(movie);
			break;
		}
		case "do-what-it-says":{
			tasks();
			break;
		}
	}
}

function title (titleArray,generic){
	var title="";
	if (titleArray[0]!=undefined)
	{
		for (var i = 0; i < titleArray.length; i++) {
			title+=titleArray[i]+" ";
		}
	}
	else
	{
		title=generic
	}
	console.log(title);
	return title;
}

function songs(songTitle) {
	var client = new spotify({	
		  id: "cb6d39f8c56049a4b3cf12d71262a002",
		  secret: "3dcea1da91bc4729a2f3f5e2426be695"
	});
	client.search({ type: 'track', query: songTitle }, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
	  }	 
	console.log("Song Artist:          " + data.tracks.items[0].artists[0].name);
	console.log("Song Title:           " + data.tracks.items[0].name); 
	console.log("You can find it hear: " + data.tracks.items[0].external_urls.spotify);
	console.log("Album Title:          " + data.tracks.items[0].album.name);
	console.log("");
});
}


function tweets(){
	var client= new twitter({
		consumer_key: '<RLeuvZIBl0940pRtF3kdLYjwd>',
  		consumer_secret: '<khZM8u5sU8u0d794r8vG0X9plzCNORMCKLyHhhKInhlcsvZUuu>',
  		access_token_key: '<917064189499371521-flUMJtdMRIC59tmIRezklmGWPWLJUJM>',
  		access_token_secret: '<S4RKZ4xeI8ryu9HktP4GADL1QBioAdTfpMJIAzkIHQRYY>',

	})



	var url="https://api.twitter.com/oauth/authorize"
	client.get(url, {count:21},function(error, tweets, response) {
	  if(error) throw error;
	  for (var i = 0; i < 20; i++) {
	  	console.log(tweets[i].user.name + " tweeted: " + tweets[i].text);
	  }
	  console.log("");
	});
}



function movies(movieTitle) {
	request("http://www.omdbapi.com/?apikey=40e9cece&t="+encodeURI(movieTitle),function(error, response, body) {
	if (!error && response.statusCode === 200) {
	  	var movieInfo=JSON.parse(body);
	    console.log("Title:                     "+ movieInfo.Title);
	    console.log("Release Year:              "+movieInfo.Year);
	    console.log("IMDB RAting:               "+movieInfo.Ratings[0].Value);
	    console.log("Rotten Tomatos Rating:     "+movieInfo.Ratings[1].Value);
	    console.log("Country of Origin:         "+movieInfo.Country);
	    console.log("Original Language:         "+movieInfo.Language);
	    console.log("Lead Actors and Actresses: "+movieInfo.Actors);
	    console.log("Plot Summary:              "+movieInfo.Plot);
	    console.log("");
		}
	});	
}
function tasks(){
	fs.readFile("random.txt", "utf8", function(error, data) {
		if (error) {
  			return console.log(error);
  		}
  		var tasks= data.split("\n");
  		tasks.forEach(function(task, index){
  			tasks[index]=task.split(" ");
  			LIRI(tasks[index]);
  		});
	});
}