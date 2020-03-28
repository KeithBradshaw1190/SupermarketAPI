const express = require("express");
const router = express.Router();
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
//Webtoken for Facebook
router.get('/api/facebook', (req, res) => {
    let VERIFY_TOKEN = process.env.VERIFY_TOKEN_FACEBOOK;
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];
    console.log("route hit");
    if (mode && token == VERIFY_TOKEN) {
        res.status(200).send(challenge);
    } else {
        res.sendStatus(403);
    }
});


module.exports = router;