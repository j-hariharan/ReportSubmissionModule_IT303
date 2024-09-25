import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { db, storage } from "../../helpers/firebase"
import { collection, doc, setDoc } from "firebase/firestore"

export default function UploadDocuments () {
    let { studentID } = useParams()
    let [ report, setreport ] = useState(null)
    let [ ppt, setPpt ] = useState(null)

    async function handleSubmit () {
        if (!report || !ppt) {
            alert("Upload both the report and PPT to submit")
            return
        }

        const reportRef = ref(storage, `reports/${studentID}.pdf`)
        const pptRef = ref(storage, `ppts/${studentID}.pdf`)

        await Promise.all([ uploadBytes(reportRef, report), uploadBytes(pptRef, ppt) ])

        const data = {
            upload_time: new Date(),
            feedback: null,
            ppt_link: await getDownloadURL(pptRef),
            report_link: await getDownloadURL(reportRef)
        }

        let docRef = doc(collection(db, "submissions"), studentID)
        await setDoc(docRef, data)
        alert("Submitted")
        location.reload()
    }

    return (
        <div>
            <input 
                type="file" 
                accept=".pdf" 
                placeholder="Upload Report" 
                onChange={e => setreport(e.target.files[0]) }
            />
            <br /><br />
            <input 
                type="file" 
                accept=".pdf" 
                placeholder="Upload PPT" 
                onChange={e => setPpt(e.target.files[0]) }
            />
            <br /><br />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}