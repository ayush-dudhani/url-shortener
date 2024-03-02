const  shortid  = require('shortid');
const URL = require('../models/url');

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({error: 'url is required'});
    const shortID = shortid.generate();

    await URL.create({
        shortId: shortID,
        redirectUrl: body.url,
        visitHistory: [],
    });

    return res.json({ id: shortID});
}

async function handleShortId(req, res){
    const id = req.params.id;
    const entry = await URL.findOneAndUpdate({
        shortId: id,
    },
    {
        $push: {
            visitHistory: [
                {
                    timestamp: Date.now(),
                }
            ]
        }
    });
    res.redirect(entry.redirectUrl);
}

async function handleGetAnalytics(req, res) {
    const shortID = req.params.shortId;
    const entry = await URL.findOne({ shortId: shortID });

    return res.json({ numberOfClicks: entry.visitHistory.length, analytics: entry.visitHistory});
}
module.exports = {
    handleGenerateNewShortURL, handleGetAnalytics, handleShortId
}