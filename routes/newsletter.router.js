const express = require('express');
const User = require('../models/User.model');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/newsletter/subscribe', auth, async (req, res) => {
	if (!req.user) return res.redirect('/log-in');
	try {
		try {
			const user = await User.findById(req.user._id);
			if (!user) return res.redirect('/error');
			await user.updateOne({ subscriptionStatus: true });
			return res.redirect('/dashboard');
		} catch (error) {
			return res.redirect('/error');
		}
	} catch (error) {
		return res.redirect('/error');
	}
});

router.post('/newsletter/unsubscribe', auth, async (req, res) => {
	if (!req.user) return res.redirect('/log-in');
	try {
		try {
			const user = await User.findById(req.user._id);
			if (!user) return res.redirect('/error');
			await user.updateOne({ subscriptionStatus: false });
			return res.redirect('/dashboard');
		} catch (error) {
			return res.redirect('/error');
		}
	} catch (error) {
		return res.redirect('/error');
	}
});

module.exports = router;
