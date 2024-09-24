import { useState } from "react"
import { useNavigate } from "react-router-dom"

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
        <div>
            <div>
                <input type="text" value={student} onChange={e => setStudent(e.target.value)} />
                <br />
                <button onClick={handleStudent}>Student</button>
            </div>
            <br />
            <hr />
            <br />
            <div>
                <button onClick={() => navigate("/guide")}>Guide</button>
            </div>
        </div>
    )
}