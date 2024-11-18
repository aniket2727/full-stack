// src/App.tsx
import React, { Suspense, lazy, useEffect, useState } from "react";
import {  Routes, Route, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NavbarComponent from "./component/Header/NavbarComponent";
import LoaderComponent from "./component/LoaderComponent";

// Lazy load pages for performance optimization
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegistePage = lazy(() => import("./Registerform/Registerpage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const RaiseIssuePage = lazy(() => import("./pages/RaiseIssuePage"));
const AdminprojectTract = lazy(() => import("./pages/AdminprojectUpdate"));
const Projectdetails = lazy(() => import("./component/Projectlist"));
const IssueDetails = lazy(() => import("./component/IssuelistComponent"));
const Adminpage = lazy(() => import("./pages/Adminpage"));
const Userprofile = lazy(() => import("./pages/UserProfile"));

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: any) => state.user);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const [isLoading, setIsLoading] = useState(true); // Track loading state

  // Redirect to login page if user is not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      setIsLoading(true)
      const timeout = setTimeout(() => {
        setIsLoading(false); // Hide loader after timeout
      }, 1000); // Set a delay of 1 second
      navigate("/login"); // Redirect to login if not authenticated
      return () => clearTimeout(timeout); // Cleanup timeout on component unmount
    }
 
  }, [isAuthenticated, navigate]);

  // Simulate loader delay for smooth transition
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false); // Hide loader after timeout
    }, 1000); // Set a delay of 1 second

    return () => clearTimeout(timeout); // Cleanup timeout on component unmount
  }, []);

  return (
   
      <div>
        {/* Navbar */}
        <NavbarComponent isAuthenticated={isAuthenticated} dispatch={dispatch} />

        {/* Show loader if still loading */}
        {isLoading ? (
          <LoaderComponent />
        ) : (
          <Suspense fallback={<LoaderComponent />}>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegistePage />} />
              <Route path="/raiseissue" element={<RaiseIssuePage />} />
              <Route path="/adminproject" element={<AdminprojectTract />} />
              <Route path="/tractproject" element={<Projectdetails />} />
              <Route path="/adminissue" element={<IssueDetails />} />
              <Route path="/admin" element={<Adminpage />} />
              <Route path="/userprofile" element={<Userprofile />} />
              <Route path="/" element={<HomePage />} />
            </Routes>
          </Suspense>
        )}
      </div>
    
  );
}

export default App;
