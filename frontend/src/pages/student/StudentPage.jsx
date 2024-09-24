import { useParams } from "react-router-dom"

export default function StudentPage () {
    let { studentID } = useParams()
    console.log(studentID)
    return (
        <></>
    )
}