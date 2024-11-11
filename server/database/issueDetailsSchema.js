const mongoose = require('mongoose');

const issueDetailsSchema = new mongoose.Schema({
    name: { // Matches the React state variable 'name'
        type: String,
        required: true, // Assuming this field is required
    },
    email: { // Matches the React state variable 'email'
        type: String,
        required: true,
    },
    selectedProblem: { // Matches the React state variable 'selectedProblem'
        type: String,
        required: true,
    },
    issueDescription: { // Matches the React state variable 'issueDescription'
        type: String,
        required: true,
    }
});

const IssueDetailsModel = mongoose.model('IssueData', issueDetailsSchema);

module.exports = IssueDetailsModel;
