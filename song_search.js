const axios = require("axios");
const api = require('genius-api');
const _ = require('lodash');
const cheerio = require('cheerio');
const fetch = require('node-fetch');
// const Bluebird = require('bluebird');
// fetch.Promise = Bluebird;
const GENIUS_CLIENT_ACCESS_TOKEN = "579Jay1weEOxkbcJIRtrzGhwhVXx1_828qmcuL-2kwX4Dlt-52t3p7HS2AMdYhNT";
var genius = new api(GENIUS_CLIENT_ACCESS_TOKEN);
var get_lyrics  = (song_name, artist_name) => {
    return new Promise(((resolve, reject) => {
        const payload = {};
        genius.search(song_name).then(async function (response) {
            if (typeof response == "undefined") {
                reject("Song not found")
            }
                // console.log(response.hits);
            // const result = [];
            // console.log(response.hits);
            for (i in response.hits) {
                // console.log("Current #", i, "Max hits", response.hits.length);
                if (i == response.hits.length) {
                    console.log("I am here");
                    reject("No lyrics found");
                    return
                }
                const result = ( _.find((response.hits)[i], {"title": song_name}));


                if ((typeof result == 'object') && (result.title == song_name) && ((result.primary_artist.name == artist_name))){
                        payload['title'] = result.title;
                        payload['artist'] = result.primary_artist.name;
                        fetch(result.url, {
                        method: "GET",
                    }).then(async res => {

                            const $ = cheerio.load(await res.text());
                            const lyrics = $('.lyrics').text();
                            // resolve(lyrics);
                            payload['lyric'] = lyrics;
                            resolve(payload)
                        }).catch(err => {
                        reject(err)
                    });

                }}});
    }))

};
// get_lyrics("Song 2", "Blur").then(result=> {
//     console.log("Here: ",result)
// }).catch(err=> {
//     console.log("Error: ", err)
// });

module.exports = get_lyrics;