const { Router } = require("express");
const ytdl = require("ytdl-core");
const ffmpeg = require("fluent-ffmpeg");
const Util = require("../utils");

const router = Router();

router.post("/", async (req, res, next) => {
    const title = await Util.getVideoTitle(req.body.url);
    const url = req.body.url;
    const format = req.body.format;

    if(!url) return res.status(400).json({ msg: "URL is required" });
    if(!format) return res.status(400).json({ msg: "Format is required" });
    if(!title) return res.status(400).json({ msg: "Invalid/Private YouTube video" });

    switch(format) {
        case "mp4":
            res.status(200).attachment(`${title}.mp4`);
            ytdl(url, { filter: format => format.container === "mp4", quality: "highest" })
                .pipe(res);
            break;
        case "mp3": 
            res.status(200).attachment(`${title}.mp3`);
            ffmpeg()
                .input(ytdl(url, { quality: "highestaudio", filter: "audio" }))
                .toFormat("mp3")
                .pipe(res);
            break;
        default:
            return res.status(400).json({ msg: "Not a valid format" });
    }
});

module.exports = router;