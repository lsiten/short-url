'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ShortUrlSchema = new Schema({
    shortUrl: {
      type: String,
    },
    longUrl: {
      type: String,
    },
    visit: {
      type: Number,
      default: 0,
    },
    userid: {
      type: String,
      default: '',
    },
    expireTime: {
      type: Number,
    },
  });
  return mongoose.model('ShortUrl', ShortUrlSchema);
};
