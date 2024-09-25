export default function ViewSubmission ({ submission }) {
    console.log(submission)
    return (
        <div>
            <p>Upload time: {(new Date(submission.upload_time.seconds*1000)).toString()}</p>
            <a target="_blank" href={submission.ppt_link}>PPT</a>
            <br />
            <a target="_blank" href={submission.report_link}>Report</a>
            <br />
            <p>Feedback: {submission.feedback || "nothing yet"}</p>
        </div>
    )
}