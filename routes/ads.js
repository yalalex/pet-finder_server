const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Ad = require('../models/Ad');

// @route     GET api/ads
// @desc      Get all ads
// @ access   Public
router.get('/', async (req, res) => {
  try {
    const ads = await Ad.find().sort({ date: -1 });
    res.json(ads);
  } catch (err) {
    console.error(err.message);
    res.status.send('Server Error');
  }
});

// @route     GET api/ads/user
// @desc      Get user ads
// @ access   Private
router.get('/user', auth, async (req, res) => {
  try {
    const ads = await Ad.find({ user: req.user.id }).sort({ date: -1 });
    res.json(ads);
  } catch (err) {
    console.error(err.message);
    res.status.send('Server Error');
  }
});

// @route     POST api/ads/
// @desc      Add new ad
// @ access   Private
router.post(
  '/',
  [
    auth,
    [
      check('pet', 'Pet type is required')
        .not()
        .isEmpty(),
      check('address', 'Address is required')
        .not()
        .isEmpty(),
      check('phone', 'Phone is required').isMobilePhone()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { type, pet, address, photo, phone, description } = req.body;

    try {
      const geoCoder = await fetch(
        `https://eu1.locationiq.com/v1/search.php?key=62c578d5c7451a&q=${address}+Minsk+Belarus&format=json`
      );
      const geo = await geoCoder.json();
      const lat = geo.data[0].lat;
      const lon = geo.data[0].lon;
      console.log(lat, lon);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }

    try {
      const newAd = new Ad({
        type,
        pet,
        address,
        phone,
        photo,
        description,
        coords: { lat, lon },
        user: req.user.id
      });

      const ad = await newAd.save();

      res.json(ad);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route     PUT api/ads/:id
// @desc      Update ad
// @ access   Private
router.put('/:id', auth, async (req, res) => {
  const { type, pet, address, phone, photo, description, coords } = req.body;

  //Build ad object
  const adFields = {};
  if (type) adFields.type = type;
  if (pet) adFields.pet = pet;
  if (address) adFields.address = address;
  if (phone) adFields.phone = phone;
  if (photo) adFields.photo = photo;
  if (description) adFields.description = description;
  if (coords) adFields.coords = coords;

  try {
    let ad = await Ad.findById(req.params.id);

    if (!ad) return res.status(404).json({ msg: 'Ad not found' });

    //Make sure user owns ad
    if (ad.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    ad = await Ad.findByIdAndUpdate(
      req.params.id,
      { $set: adFields },
      { new: true }
    );

    res.json(ad);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route     DELETE api/ads/:id
// @desc      Delete ad
// @ access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let ad = await Ad.findById(req.params.id);

    if (!ad) return res.status(404).json({ msg: 'Ad not found' });

    //Make sure user owns ad
    if (ad.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    await Ad.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Ad removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
