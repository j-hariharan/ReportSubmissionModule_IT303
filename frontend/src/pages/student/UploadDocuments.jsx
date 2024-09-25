import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { useState, useRef } from "react";
import { useParams } from "react-router-dom"
import { db, storage } from "../../helpers/firebase"
import { collection, doc, setDoc } from "firebase/firestore"
import './UploadDocuments.css';

export default function UploadDocuments () {
    let { studentID } = useParams()
    let [ report, setreport ] = useState(null)
    let [ ppt, setPpt ] = useState(null)

    const reportInputRef = useRef(null); // Reference for the report input
    const pptInputRef = useRef(null); // Reference for the PPT input

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
        <div className="upload-container">
            <div className="upload-section report-section">
                <h2>Report Submission</h2>
                <button className="choose-file-button" onClick={() => reportInputRef.current.click()}>
                    Choose File
                </button>
            <input 
                type="file" 
                accept=".pdf" 
                onChange={e =>{
                    const file = e.target.files[0];
                    setreport(file);
                } }
                className="file-input"
                ref={reportInputRef} // Use reference for the report input
                style={{ display: 'none' }} // Hide the default file input
            />
                <div className="file-name">
                    {report ? report.name : "No file chosen"}
                </div>
            </div>
            <div className="upload-section ppt-section">
            <h2>PPT Submission</h2>
            <button className="choose-file-button" onClick={() => pptInputRef.current.click()}>
                    Choose File
                </button>
            <input 
                type="file" 
                accept=".pdf" 
                placeholder="Upload PPT" 
                onChange={e => {
                    const file = e.target.files[0];
                    setPpt(file);
                }}
                className="file-input"
                ref={pptInputRef} // Use reference for the PPT input
                style={{ display: 'none' }} // Hide the default file input
            />
            <div className="file-name">
                    {ppt ? ppt.name : "No file chosen"}
                </div>
            </div>
            <button onClick={handleSubmit} className="submit-button">Submit</button>
        </div>
    )
}