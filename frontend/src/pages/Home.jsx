import { useState } from "react"
import { useNavigate } from "react-router-dom"
import './Home.css';

export default function Home () {
    let navigate = useNavigate()
    let [ student, setStudent ] = useState("")

    function handleStudent () {
        if (!student || student.includes(" ")) {
            alert("Please enter valid student ID")
        } else {
            navigate("/student/"+student)
        }
    }

    return (
        <div className="container">
            <h1 className="heading">Report and PPT Submission</h1>
            <div>
                <input type="text" value={student} onChange={e => setStudent(e.target.value)} placeholder="Enter Student ID" />
                &nbsp;
                <button onClick={handleStudent}>Student</button>
            </div>
            <br />
            <hr />
            <br />
            <div>
                <button className="guide-butteon" onClick={() => navigate("/guide")}>Guide</button>
            </div>
        </div>
    )
}