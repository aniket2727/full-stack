import { useNavigate } from "react-router-dom";

// Define the type for the helper functions
type ClickHandler = () => void;

// Defining the helper object
const helperObject = {
    callHelper: (funcName: string) => {
        console.log(`${funcName} is clicked`);
    },
};

// Custom hook that utilizes the helper object
const useHelper = () => {
    const navigate = useNavigate();

    const callRoute = (routeName: string) => {
        navigate(routeName);
    };

    return {
        ...helperObject,
        callRoute,
    };
};

// Exporting functions
export const useAuthHelpers = () => {
    const helpers = useHelper();

    const handleLogin: ClickHandler = () => {
        helpers.callHelper("Login"); // Outputs: "Login is clicked"
        helpers.callRoute("/login"); // Example route
    };

    const handleRegister: ClickHandler = () => {
        helpers.callHelper("Register"); // Outputs: "Register is clicked"
        helpers.callRoute("/register"); // Example route
    };

    const handleLogout: ClickHandler = () => {
        helpers.callHelper("Logout"); // Outputs: "Logout is clicked"
        helpers.callRoute("/logout"); // Example route
    };

    const handleAdmin: ClickHandler = () => {
        helpers.callHelper("admin"); // Outputs: "Logout is clicked"
        helpers.callRoute("/admin"); // Example route
    };


    return { handleLogin, handleRegister, handleLogout ,handleAdmin};
};
