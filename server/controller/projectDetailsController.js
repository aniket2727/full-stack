// projectDetailsController.js
const ProjectDetailsData = require('../database/projectDetailsSchema');

exports.projectDetailsController = async (req, resp) => {
    const { projectname, projectmanager, areaname, projecttype, projectcost } = req.body;

    try {
        // Create a new instance of the project details model with data from the request body
        const projectdetailsSave = new ProjectDetailsData({
            projectname,
            projectmanager,
            areaname,
            projecttype,
            projectcost
        });

        // Save the new project details to the database
        const result = await projectdetailsSave.save();

        if (!result) {
            return resp.status(404).json({ message: "Error in saving data" });
        }

        resp.status(201).json({ message: "Successfully added" });

    } catch (error) {
        console.error("Error saving project details:", error); // Log the error for debugging
        resp.status(500).json({ message: "Internal server error" });
    }
};


exports.getProjectDetails = async (req, resp) => {

    // Corrected line
    const page = parseInt(req.query.page) || 1;  // Fix typo from req.quary to req.query
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;  // Calculate how many documents to skip


    try {
        // Fetch the specific set of documents based on pagination parameters
        const projectData = await ProjectDetailsData.find()
            .sort({ createdAt: -1 })  // Sort by creation date, newest first
            .limit(limit)
            .skip(skip)
            .lean();

        // Fetch the total count of documents to return the total number of pages
        const totalDocuments = await ProjectDetailsData.countDocuments();
        const totalPages = Math.ceil(totalDocuments / limit);

        // Respond with the paginated documents and pagination info
        resp.status(200).json({
            data: projectData,
            pagination: {
                currentPage: page,
                totalPages: totalPages,
                totalDocuments: totalDocuments,
            }
        });

    }
    catch (error) {
        resp.status(500).json({ message: 'internal server error' });
        console.log("the error is ", error);
    }

}
//module.exports = { projectDetailsController, getProjectDetails };
