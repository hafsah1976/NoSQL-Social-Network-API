const router = require('express').Router();

// Import all of the API routes from /api/index.js --

const apiRoutes = require ('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
  res.status(404).send('<h1>Wrong Route! Please try again.</h1>');
});

// module.exports = apiRoutes;
module.exports = router;
