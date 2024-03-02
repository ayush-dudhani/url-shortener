const express = require('express');
const { handleGenerateNewShortURL, handleGetAnalytics, handleShortId } = require('../controllers/url');
const router = express.Router();

router.post('/', handleGenerateNewShortURL);
router.get('/:id', handleShortId);
router.get('/analytics/:shortId', handleGetAnalytics);
module.exports = router;