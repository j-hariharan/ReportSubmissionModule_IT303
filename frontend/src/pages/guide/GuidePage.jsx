import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../helpers/firebase"
import './GuidePage.css';

export default function GuidePage () {
    let [ submissions, setSubmissions ] = useState([])
    
    useEffect(() => {
        async function getData () {
            let colRef = collection(db, "submissions")
            let docs = await getDocs(colRef)
            let submissions = docs.docs.map(doc => ({ id: doc.id, ...doc.data() }))

            setSubmissions(submissions)
        }

        getData()
    }, [])

    return (
        <div className="guide-contaianer">
            <h1 className="guide-heading">Submissions</h1>
            <div className="submissions-list">
                {
                    submissions.map(submission => (
                        <div key={submission.id} className="submission-wrapper">
                            <a href={`/guide/${submission.id}`} className="submission-item">{submission.id}</a>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}