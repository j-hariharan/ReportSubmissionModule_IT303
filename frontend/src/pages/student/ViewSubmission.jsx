import './ViewSubmission.css'; // Import your CSS file

export default function ViewSubmission({ submission }) {
    return (
        <div className="submission-container">
            <div className="upload-time">
                <p>Upload time: {(new Date(submission.upload_time.seconds * 1000)).toString()}</p>
            </div>
            <div className="file-links">
                <div className="button-wrapper">
                    <a target="_blank" rel="noopener noreferrer" href={submission.ppt_link}>
                        <button className="file-button">View PPT</button>
                    </a>
                    <a target="_blank" rel="noopener noreferrer" href={submission.report_link}>
                        <button className="file-button">View Report</button>
                    </a>
                </div>
            </div>
            <div className="feedback">
                <p>Feedback: {submission.feedback || "No feedback received yet."}</p>
            </div>
        </div>
    );
}

