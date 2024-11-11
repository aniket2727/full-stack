// projectDetailsController.js
const ProjectDetailsData = require('../database/projectDetailsSchema');

const projectDetailsController = async (req, resp) => {
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

module.exports = projectDetailsController;
