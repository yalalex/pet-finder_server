const express = require('express');
const router = express.Router();

// @route     GET api/ads
// @desc      Get all ads
// @ access   Public
router.get('/', (req, res) => {
  res.send('Get all ads');
});

// @route     POST api/ads/
// @desc      Add new ad
// @ access   Private
router.post('/', (req, res) => {
  res.send('Add ad');
});

// @route     PUT api/ads/:id
// @desc      Update ad
// @ access   Private
router.put('/:id', (req, res) => {
  res.send('Update ad');
});

// @route     DELETE api/ads/:id
// @desc      Delete ad
// @ access   Private
router.delete('/:id', (req, res) => {
  res.send('Delete ad');
});

module.exports = router;