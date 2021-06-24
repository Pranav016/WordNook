const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const auth = require('../middlewares/auth');
const User = require('../models/User.model');
const testimonials = require('../dummy-data/testimonial');
const Testimonial = require('../models/Testimonial.model');

const router = express.Router();
router.use(methodOverride('_method'));
router.use(bodyParser.json());

// Get request for testimonial-wall
router.get('/testimonial-wall', auth, async (req, res) => {
	const testimonial = await Testimonial.find();

	res.render('./testimonials/testimonial-wall', {
		isAuthenticated: !!req.user,
		testimonials,
		testimonial,
	});
});

// Post request for testimonial-wall
router.post('/testimonial-wall', auth, async (req, res) => {
	const inputViews = req.body.views;
	const _id = req.user;
	const user = await User.findById(_id);
	const inputAuthor = `${user.firstName} ${user.lastName}`;
	// Adding a new Testimonial in the database
	const newtestimonial = new Testimonial({
		author: inputAuthor,
		views: inputViews,
	});

	try {
		await newtestimonial.save();
	} catch (e) {
		console.log(e);
		return res.redirect('/error');
	}
	res.redirect('/testimonial-wall');
});

module.exports = router;
