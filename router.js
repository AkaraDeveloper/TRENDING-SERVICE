const express = require("express");
const router = express.Router();
const db = require("./config/mongo-config");
const { trendingModel, trendingTodayModel, trendingWeekModel } = require("./db/schema");
const { trendingInHour } = require('./util/trending-logic');
const { redisClient } = require("./config/redis-config");
const { starterQueue } = require("./util/queue");
db();

//===========================<<--- ROUTE CONFIG --->>==========================
//--- Refactored at 1, octuber 2023
//-----------------------------------

//==========================================
//---- TRENDIGN IN HOUR PODCAST
//----
router.get('/trendinginhour', async (req, res) => {
    // call the logic trendinginhour
    const trendingInHour = await redisClient.get("trendinginhour");
    try {
        if (trendingInHour) {
            return res.json({
                error: false,
                message: "Request Success",
                data: JSON.parse(trendingInHour)
            })
        } else {
            return res.json({
                error: false,
                message: "No data was returned",
                data: null
            })
        }
    } catch (e) {
        return res.json({
            error: true,
            message: e.message,
            data: undefined
        })
    }

})

//==========================================
//---- TRENDING TODAY PODCAST
//----
router.get('/trendingintoday', async (req, res) => {
    // call the logic trendinginhour
    const trendingInToday = redisClient.get("trendingintoday");
    try {
        if (trendingInToday) {
            return res.json({
                error: false,
                message: "Request Success",
                data: JSON.parse(trendingInToday)
            })
        } else {
            return res.json({
                error: false,
                message: "No data ws returned",
                data: null
            })
        }
    } catch (e) {
        return res.json({
            error: true,
            message: e.message,
            data: undefined
        })
    }
});

//==========================================
//---- TRENDING WEEK PODCAST
//----
router.get('/trendinginweek', async (req, res) => {
    // call the logic trendinginhour
    const trendingInWeek = redisClient.get("trendinginweek");
    try {
        if (trendingInWeek) {
            return res.json({
                error: false,
                message: "Request Success",
                data: JSON.parse(trendingInWeek)
            })
        } else {
            return res.json({
                error: false,
                message: "No data was returned",
                data: null
            })
        }
    } catch (e) {
        return res.json({
            error: true,
            message: e.message,
            data: undefined
        })
    }
});
//==========================================
//---- START TRENDING IN HOUR QUEUE
//----
router.post('/startprocessfromnow/trendinginhour', (req, res) => {
    // schedule task to be executed by redis queue every hour
    const TIME_TO_EXECUTE = (1000 * 60 * 60);
    setInterval(() => {
        starterQueue(trendingInHour());
    }, TIME_TO_EXECUTE);
    res.send("Your process trendinginhour is being scheduled to be executed....");
});
//==========================================
//---- START TRENDING TODAY QUEUE
//----
// 
router.post('/startprocessfromnow/trendingintoday', (req, res) => {
    // schedule task to be executed by redis queue every hour
    const TIME_TO_EXECUTE = (1000 * 60 * 60 * 12);
    setInterval(() => {
        starterQueue(trendingInHour());
    }, TIME_TO_EXECUTE);
    res.send("Your process trendingtoday is being scheduled to be executed....");
});
//==========================================
//---- START TRENDING WEEKLY QUEUE
//----
router.post('/startprocessfromnow/trendinginweek', (req, res) => {
    // schedule task to be executed by redis queue every hour
    const TIME_TO_EXECUTE = (1000 * 60 * 60 * 24 * 6);
    setInterval(() => {
        starterQueue(trendingInHour());
    }, TIME_TO_EXECUTE);
    res.send("Your process of trendingweek is being scheduled to be executed....");
})
//==========================================
//---- INSERT TRENDING TO BE TRENDED
//----
router.post('/addtrending', async (req, res) => {
    // insert to trending database 
    try {
        const isExistHour = await trendingModel.findOne({ identify: req.identify });
        const isExistToday = await trendingTodayModel.findOne({ identify: req.identify });
        const isExistWeek = await trendingWeekModel.findOne({ identify: req.identify });
        // add trending in hour 
        if (!isExistHour) {
            const inserter = new trendingModel({
                podcastId: req.body.podcastId,
                trending: 1
            });
            await inserter.save();
            if (!isExistToday) {
                const inserter2 = new trendingTodayModel({
                    podcastId: req.body.podcastId,
                    trending: 1
                });
                await inserter2.save();
            } else if (!isExistWeek) {
                const inserter3 = new trendingWeekModel({
                    podcastId: req.body.podcastId,
                    trending: 1
                })
                await inserter3.save();
            }
            return res.json({
                error: false,
                message: `${req.body.podcastId} was added to trending.`,
                data: null
            });
        } else {
            return res.json({
                error: true,
                message: "Just trending"
            })
        }

    } catch (e) {
        return res.json({
            error: true,
            message: e.message,
            data: null
        })
    }
})
module.exports = router;