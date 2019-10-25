const { Router } = require("express");
const ytdl = require("ytdl-core");
const ffmpeg = require("fluent-ffmpeg");
const Util = require("../utils");

const router = Router();

router.post("/", async (req, res, next) => {
    const title = await Util.getVideoTitle(req.body.url);

    if(title) {
        return res.status(200).json({
            valid: true,
            title            
        });
    } else {
        return res.status(400).json({
            valid: false,
            msg: "Invalid/Private YouTube video"
        });
    }
});

module.exports = router;