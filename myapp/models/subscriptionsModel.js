const mongoose = require('mongoose');

const SubscriptionsSchema = new mongoose.Schema({

    MemberId : String,
    Movies : [{
        movieId : String,
        date : Date
    }]
});


module.exports = mongoose.model('subscriptions', SubscriptionsSchema)