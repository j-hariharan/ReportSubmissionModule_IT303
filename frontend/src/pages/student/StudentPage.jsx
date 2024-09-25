// import { useParams } from "react-router-dom"

// export default function StudentPage () {
//     let { studentID } = useParams()
//     console.log(studentID)
//     return (
//         <></>
//     )
// }

import { useParams } from "react-router-dom"
import { collection, query, where, getDocs } from "firebase/firestore";
import  db  from '../../helpers/firebase'; // Make sure to import your Firestore db configuration
import { useEffect, useState } from "react"; // Import useEffect and useState

export default function StudentPage () {
    let { studentID } = useParams()
    console.log(studentID)
    const [submissions, setSubmissions] = useState([]); // State to hold submissions
    const [loading, setLoading] = useState(true); // State to handle loading
    const [error, setError] = useState(null); // State to handle errors
    useEffect(() => {
                const fetchSubmissions = async () => {
                    try {
                        const results = await getSubmissionByStudentId(studentID);
                        if (results) {
                            setSubmissions(results); // Set submissions state
                            console.log("Result " + results);
                        }
                    } catch (err) {
                        setError("Error fetching submissions: " + err.message); // Handle any errors
                    } finally {
                        setLoading(false); // Set loading to false after fetching
                    }
                };
        
                fetchSubmissions(); // Call the fetch function
            }, [studentID]); // Effect will run when studentID changes
                // Loading and error handling
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    return (
        <></>
    )
}

// Function to fetch submissions based on student ID
const getSubmissionByStudentId = async (studentId) => {
    const submissionsRef = collection(db, "Submission"); // Reference to the submissions collection
   // const q = query(submissionsRef, where("studentId", "==", studentId)); // Query for the specific studentId

    try {
        // const querySnapshot = await getDocs(q);
        const querySnapshot = await getDocs(submissionsRef);
        
        if (querySnapshot.empty) {
            console.log("No matching documents found.");
            return null; // Return null if no document is found
        } else {
            // Iterate through the results
            let submissions = [];
            querySnapshot.forEach((doc) => {
                submissions.push({ id: doc.id, ...doc.data() }); // Add the document ID and data to the array
            });
            return submissions; // Return the array of submissions
        }
    } catch (error) {
        console.error("Error fetching submission: ", error);
        throw error; // Throw the error to handle it in the component
    }
};

// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react"; // Import useEffect and useState
// import { db } from '../../helpers/firebase'; // Make sure to import your Firestore db configuration
// import { collection, query, where, getDocs } from "firebase/firestore";

// export default function StudentPage() {
//     const { studentID } = useParams(); // Get studentID from URL parameters
//     console.log(studentID);
//     const [submissions, setSubmissions] = useState([]); // State to hold submissions
//     const [loading, setLoading] = useState(true); // State to handle loading
//     const [error, setError] = useState(null); // State to handle errors

//     useEffect(() => {
//         const fetchSubmissions = async () => {
//             try {
//                 const results = await getSubmissionByStudentId(studentID);
//                 if (results) {
//                     setSubmissions(results); // Set submissions state
//                 }
//             } catch (err) {
//                 setError("Error fetching submissions: " + err.message); // Handle any errors
//             } finally {
//                 setLoading(false); // Set loading to false after fetching
//             }
//         };

//         fetchSubmissions(); // Call the fetch function
//     }, [studentID]); // Effect will run when studentID changes

//     // Loading and error handling
//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>{error}</p>;

//     // Render submissions or a message if there are none
//     return (
//         <div>
//             <h1>Submissions for Student ID: {studentID}</h1>
//             {submissions.length > 0 ? (
//                 <ul>
//                     {submissions.map((submission) => (
//                         <li key={submission.id}>
//                             {JSON.stringify(submission)} {/* Render the submission data */}
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>No submissions found for this student ID.</p>
//             )}
//         </div>
//     );
// }

// // Function to fetch submissions based on student ID
// const getSubmissionByStudentId = async (studentId) => {
//     const submissionsRef = collection(db, "Submission"); // Reference to the submissions collection
//     const q = query(submissionsRef, where("studentId", "==", studentId)); // Query for the specific studentId

//     try {
//         const querySnapshot = await getDocs(q);
        
//         if (querySnapshot.empty) {
//             console.log("No matching documents found.");
//             return null; // Return null if no document is found
//         } else {
//             // Iterate through the results
//             let submissions = [];
//             querySnapshot.forEach((doc) => {
//                 submissions.push({ id: doc.id, ...doc.data() }); // Add the document ID and data to the array
//             });
//             return submissions; // Return the array of submissions
//         }
//     } catch (error) {
//         console.error("Error fetching submission: ", error);
//         throw error; // Throw the error to handle it in the component
//     }
// };
