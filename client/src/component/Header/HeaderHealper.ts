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

    const handleLogin = async (): Promise<{ name: string; email: string; token: string; id: string }> => {
        helpers.callHelper("Login"); // Outputs: "Login is clicked"
        helpers.callRoute("/login"); // Example route
        
        // Simulate fetching user data
        const userData = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            token: 'sampletoken',
            id: '12345'
        };
        
        // Return user data for further processing
        return userData;
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
        helpers.callHelper("admin"); // Outputs: "admin is clicked"
        helpers.callRoute("/admin"); // Example route
    };

    return { handleLogin, handleRegister, handleLogout, handleAdmin };
};
