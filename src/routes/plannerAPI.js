'use strict';

/**
 * @file Manages planner API endpoints
 */

var planner = require(__dirname + '/../libs/planner.js');

module.exports = function(app, db) {

	app.post('/planner/get', function(req, res) {
		var date = {
			year : parseInt(req.body.year),
			month: parseInt(req.body.month)
		};

		planner.getMonthEvents(db, req.user.user, date, true, function(err, events) {
			if(err) {
				var errorMessage = err.message;
			} else {
				var errorMessage = null;
			}
			res.json({
				error : errorMessage,
				events: events
			});
		});
	});

	app.post('/planner/add', function(req, res) {
		var start = new Date(parseInt(req.body.startYear), parseInt(req.body.startMonth) - 1, parseInt(req.body.startDay));
		var end = new Date(parseInt(req.body.endYear), parseInt(req.body.endMonth) - 1, parseInt(req.body.endDay));

		var insertEvent = {
			id     : req.body.id,
			title  : req.body.title,
			desc   : req.body.desc,
			classId: req.body.classId,
			start  : start,
			end    : end,
			link   : req.body.link
		};

		planner.upsertEvent(db, req.user.user, insertEvent, function(err, id) {
			if(err) {
				var errorMessage = err.message;
			} else {
				var errorMessage = null;
			}
			res.json({
				error: errorMessage,
				id: id
			});
		});
	});

	app.post('/planner/delete', function(req, res) {
		planner.deleteEvent(db, req.user.user, req.body.id, function(err) {
			if(err) {
				var errorMessage = err.message;
			} else {
				var errorMessage = null;
			}
			res.json({ error: errorMessage });
		});
	});

}
