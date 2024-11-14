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

const getPaginatedIssues = async (req, res) => {
    // Get the page and limit from the request, or use defaults
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;  // Calculate how many documents to skip

    try {
        // Fetch the specific set of documents based on pagination parameters
        const issues = await IssueDetailsData.find()
            .sort({ createdAt: -1 })  // Sort by creation date, newest first
            .limit(limit)
            .skip(skip)
            .lean();

        // Fetch the total count of documents to return the total number of pages
        const totalDocuments = await IssueDetailsData.countDocuments();
        const totalPages = Math.ceil(totalDocuments / limit);

        // Respond with the paginated documents and pagination info
        res.status(200).json({
            data: issues,
            pagination: {
                currentPage: page,
                totalPages: totalPages,
                totalDocuments: totalDocuments,
            }
        });
    } catch (error) {
        console.error("Error fetching paginated issues:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { IssueDetailsController,getPaginatedIssues };
