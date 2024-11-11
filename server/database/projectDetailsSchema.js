// projectDetailsSchema.js
const mongoose = require('mongoose');

const projectDetailsSchema = new mongoose.Schema({
    projectname: {
        type: String,
        required: true,
    },
    projectmanagername: {
        type: String,
        required: true,
    },
    areaname: {
        type: String,
        required: true,
    },
    projecttype: {
        type: String,
        required: true,
    },
    projectcost: {
        type: Number,  // Assuming project cost is a number; change to String if necessary
        required: true,
    },
});

const ProjectDetailsData = mongoose.model('ProjectDetailsData', projectDetailsSchema);

module.exports = ProjectDetailsData;
