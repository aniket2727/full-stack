const IssueDetailsData = require('../database/issueDetailsSchema');  // Model name capitalized

const IssueDetailsController = async (req, resp) => {
    const { name, email, selectedProblem, issueDescription } = req.body;

    try {
        const savedData = new IssueDetailsData({
            name,
            email,
            selectedProblem,
            issueDescription
        });

        const result = await savedData.save();

        if (!result) {
            return resp.status(404).json({ message: "Error in saving data" });  // More descriptive error message
        }

        resp.status(201).json({ message: 'Data saved successfully' });

    } catch (error) {
        console.error('Error occurred while saving issue details:', error);  // Added console error for debugging
        resp.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { IssueDetailsController };
