//==================================<<< TRENDING SCHEMA >>=============================
//-------------------------------------------------------------------------------------
//👍👌 : Refactored at 1  
//----
const schema = require("mongoose");
const uuid = require("uuid");

//======================================
// PODCAST SCHEMA
//---
const podcastSchema = new schema.Schema({
    _id: {
        type: String,
        default: uuid.v1
    },
    podcastCategoryName: {
        type: String,
        required: true
    },
    podcastCategoryId: {
        type: String,
        default: null
    },
    owner: {
        type: String,
        default: "Anonymous"
    }
    ,
    podcastTitle: {
        type: String,
        required: true
    },
    podcasterId: {
        type: String,
        required: true
    },
    audioName: {
        type: String,
        required: true
    },
    imageName: {
        type: String,
        required: true
    },
    podcastUrl: {
        type: String,
        defautl: null
    },
    imageUrl: {
        type: String,
        default: null
    },
    podcastDescription: {
        type: String,
        default: "Akara podcast."
    },
    ban: {
        type: String,
        default: "Disbanned"
    }
    ,
    viewed: {
        type: Number,
        default: 0
    },
    favourite: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true,
    versionKey: false
});

// =======================================
// FAVOURITE SCHEMA 
//---
const favouriteSchema = new schema.Schema({
    _id: {
        type: String,
        default: function getUUID() { return uuid.v1() }
    },
    podcastId: {
        type: String,
        required: true
    }, categoryId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

//===================================
// HOUR TRENDING SCHEMA 
//---
const trendingSchema = new schema.Schema({
    _id: {
        type: String,
        default: function getUUID() { return uuid.v1() }
    },
    podcastId: {
        type: String,
        required: true,
    },
    trending: {
        type: Number,
        required: true
    },
    identify: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

//==================================
// TODAY TRENDING SCHEMA 
//---
const trendingTodaySchema = new schema.Schema({
    _id: {
        type: String,
        default: function getUUID() { return uuid.v1() }
    },
    podcastId: {
        type: String,
        required: true,
    },
    trending: {
        type: Number,
        required: true
    },
    identify: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

//===================================
// WEEK TRENDING SCHEMA 
//---
const trendingWeekSchema = new schema.Schema({
    _id: {
        type: String,
        default: function getUUID() { return uuid.v1() }
    },
    podcastId: {
        type: String,
        required: true,
    },
    trending: {
        type: Number,
        required: true
    },
    identify: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});


//===========================<< --- TRENDING MODELS --- >>=========================
//---
const trendingModel = schema.model("trendingModel", trendingSchema);
const trendingTodayModel = schema.model("trendingTodayModel", trendingTodaySchema);
const trendingWeekModel = schema.model("trendingWeekModel", trendingWeekSchema);
const favouriteModel = schema.model("favouriteModel", favouriteSchema);
const podcastModel = schema.model("podcastModel", podcastSchema);

//==========================<< --- EXPORT ALL MODELS --- >>========================
module.exports = {
    favouriteModel,
    podcastModel,
    trendingModel,
    trendingTodayModel,
    trendingWeekModel
}