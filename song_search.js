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
        // reject(Error("Not implemented"));
        const payload = {};
        genius.search(song_name).then(async function (response) {
            if (typeof response == "undefined") {
                reject("Song not found")
            }
            // console.log(response.hits);
            // const result = [];
            // console.log(response.hits);
            // console.log((response.hits).slice(-1)[0]);
            // console.log(response.hits[9]);
            for (const i in response.hits) {

                // if (i == response.hits.length) {
                //     // console.log("I am here");
                //     reject("No lyrics found");
                //     return
                // }
                const result = (_.find((response.hits)[i], {"title": song_name}));
                // console.log(result);

                // console.log("Current #", typeof Number(i), i, "Max hits", typeof response.hits.length, response.hits.length);
                if ((typeof result == 'object') && (result.title === song_name) && ((result.primary_artist.name === artist_name))) {
                    // console.log("Song name and artist");
                    // console.log(payload["lyric"]);
                    // console.log((response.hits)[i]);
                    // console.log(((response.hits).slice(-1)[0]));
                    payload['title'] = result.title;
                    payload['artist'] = result.primary_artist.name;
                    await fetch(result.url, {
                        method: "GET",
                    }).then(async res => {
                        const $ = cheerio.load(await res.text());
                        const lyrics = $('.lyrics').text();
                        // resolve(lyrics);
                        payload['lyric'] = lyrics;
                        resolve(payload);

                    }).catch(err => {
                        reject(err)

                    });

                }
                // console.log(response.hits.length, (Number(i) + 1), (payload["lyric"]), typeof (payload["lyric"]));
                if ((response.hits.length === (Number(i) + 1)) && (typeof payload["lyric"] === 'undefined')) {
                    // console.log("Current #", typeof Number(i), i, "Max hits", typeof response.hits.length, response.hits.length);
                    // console.log(payload["lyric"]);
                    // console.log("Here");
                    reject("No lyrics found");
                }
            }
        })

    }));
};
// get_lyrics("Watch what I do", "Hey Buko").then(result=> {
//     console.log("Here: ",result)
// }).catch(err=> {
//     console.log("Error: ", err)
// });

module.exports = get_lyrics;