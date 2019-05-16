const axios = require("axios");
const api = require('genius-api');
const _ = require('lodash');
const cheerio = require('cheerio');
const fetch = require('node-fetch');
// const Bluebird = require('bluebird');
// fetch.Promise = Bluebird;
const GENIUS_CLIENT_ACCESS_TOKEN = "579Jay1weEOxkbcJIRtrzGhwhVXx1_828qmcuL-2kwX4Dlt-52t3p7HS2AMdYhNT";
var genius = new api(GENIUS_CLIENT_ACCESS_TOKEN);
var get_lyrics  = (song_name) => {
    return new Promise(((resolve, reject) => {
        genius.search(song_name).then(async function (response) {
            if (typeof response == null) {
                reject("Song not found")
            }

            for (i in response.hits) {
                // console.log(i);
                const result = _.find((response.hits)[i], {"title": song_name});
                if (typeof result === 'object') {
                        fetch(result.url, {
                        method: "GET",
                    }).then(async res => {

                            const $ = cheerio.load(await res.text());
                            const lyrics = $('.lyrics').text();

                            resolve(lyrics)
                        }).catch(err => {
                        reject(err)
                    });

                }}});
    }))

};
// lyrics("Song 2").then(result=> {
//     console.log("Here: ",result)
// }).catch(err=> {
//     console.log("Error: ", err)
// });

module.exports = get_lyrics;