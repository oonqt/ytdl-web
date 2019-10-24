const { maxVideoLengthMinutes } = require("./config.json");
const ytdl = require("ytdl-core");

module.exports = class {

    /**
     * Check if the length (minutes) is less than the max length
     * @param {string} YouTube video url
     * @returns {boolean} is video too long
     */
    static isTooLong(url) {
        return new Promise(async resolve => {
            await ytdl.getInfo(url)
                .then(info => {
                    if(info.length_seconds / 60 > maxVideoLength) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                });
        });
    }

    /**
     * @param {string} YouTube video url
     * @returns {string} Video title
     */
    static getVideoTitle(url) {
        return new Promise(async resolve => {
            await ytdl.getInfo(url)
                .then(info => {
                    resolve(info.title);
                })
                .catch(() => resolve(undefined));
        });
    }
}