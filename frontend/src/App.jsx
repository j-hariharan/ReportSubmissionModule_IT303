import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import StudentPage from "./pages/student/StudentPage"
import GuidePage from "./pages/guide/GuidePage"
import GuideSubmission from "./pages/guide/GuideSubmission"


export default function App()
{
    return(
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/student/:studentID" element={<StudentPage />} />
                    <Route path="/guide" element={<GuidePage />} />
                    <Route path="/guide/:studentID" element={<GuideSubmission />} />
                </Routes>
            </Router>
        </div>
    );
}