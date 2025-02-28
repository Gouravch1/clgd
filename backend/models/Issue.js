
const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  urgencyLevel: { type: String, required: true },
  status: { type: String, default: 'open' },
  location: {
    country: { type: String, required: true },
    city: { type: String, required: true },
    area: { type: String, required: true }
  },
  organization: {
    name: { type: String, required: true },
    contactPerson: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true }
  },
  dateReported: { type: Date, default: Date.now },

});

const Issue = mongoose.model('Issue', issueSchema);
module.exports = Issue;