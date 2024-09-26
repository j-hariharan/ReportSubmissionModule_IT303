import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../helpers/firebase"

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
        <div>
            <h1>Submissions</h1>
            <div>
                {
                    submissions.map(submission => (
                        <div key={submission.id}>
                            <a href={`/guide/${submission.id}`}>{submission.id}</a>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}