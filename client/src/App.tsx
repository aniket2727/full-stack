import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavbarComponent from "./component/Header/NavbarComponent";

// loader as helper
import LoaderComponent from "./component/LoaderComponent";

// Lazy load pages for performance optimization
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegistePage=lazy(()=>import('./Registerform/Registerpage'));
const HomePage=lazy(()=>import('./pages/HomePage'));
const RaiseIssuePage=lazy(()=>import('./pages/RaiseIssuePage'));
const AdminprojectTract=lazy(()=>import('./pages/AdminprojectUpdate'));
const Projectdetails=lazy(()=>import('./component/Projectlist'));
const IssueDetails=lazy(()=>import('./component/IssuelistComponent'));
// const HomePage = lazy(() => import("./pages/HomePage")); // Assuming you have a HomePage
// const NotFoundPage = lazy(() => import("./pages/NotFoundPage")); // Page for 404

function App() {
  return (
    <div>
      <BrowserRouter>
        {/* Navbar */}
        <NavbarComponent />

        {/* Suspense with fallback for lazy loading */}
        <Suspense fallback={<LoaderComponent/>}>
          <Routes>
            {/* Route for home page */}
           

            {/* Route for login page */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistePage/>} />
            <Route path="/raiseissue" element={<RaiseIssuePage/>} />
            <Route path="/adminproject" element={<AdminprojectTract/>} />
            <Route path="/tractproject" element={<Projectdetails/>} />
            <Route path="/adminissue" element={<IssueDetails/>}/>
            <Route path="/" element={<HomePage/>} />

            {/* Route for 404 (page not found) */}
           
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
