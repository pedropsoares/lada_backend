const mongoose = require('mongoose');
const aws = require('aws-sdk');

const s3 = new aws.S3();

const CvSchema = new mongoose.Schema({
  name: String,
  size: Number,
  url: String,
  key: String,
  createAt: {
    type: Date,
    default: Date.now,
  },
  dev: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dev',
    require: true,
  }
})

CvSchema.post('save', async function (cv) {
  const Dev = require('./Dev');

  let currentDev = await Dev.findById(cv.dev)

  await Dev.findOneAndUpdate({ _id: cv.dev }, {
    cv: [...currentDev.cv, cv]
  })

})

CvSchema.post('findOneAndDelete', async function (cv) {
  const Dev = require('./Dev');

  let currentDev = await Dev.findById(cv.dev)

  await Dev.findOneAndUpdate({ _id: cv.dev }, {
    cv: currentDev.cv.filter(({ _id }) => String(_id) !== String(cv._id))
  })

  return s3.deleteObject({
    Bucket: 'uploadslada',
    Key: cv.key
  }).promise();

})

module.exports = mongoose.model('Cv', CvSchema);