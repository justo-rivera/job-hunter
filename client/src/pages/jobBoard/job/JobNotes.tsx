import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../../config";
import {
  PageContainer,
} from "../../../styles/styled-components/StyledContainers";

const JobNotes = ({job}) => {

  const jobId = job.job_id

  useEffect(() => {
    document.getElementById("notesField").innerHTML = job.job_notes;
  });

  const [input, setInput] = useState("")

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const saveNotes = () => {
    let jobNotes = input;

    console.log(jobNotes);
    axios
      .post(
        `${config.API_URL}/job-board/job-detail/add-notes`,
        {
          jobNotes,
          jobId
        },
        { withCredentials: true }
      )
      .then((result) => {
        console.log(result.data);
        // getJobDetail(jobId)

      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    saveNotes()
  };

  setTimeout(()=>{
    saveNotes()
  }, 60000)

  return (
    <PageContainer>
      <h1>Job Notes</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          name="jobNotes"
          id="notesField"
          placeholder="Type Notes Here"
          onChange={handleChange}
        ></textarea>
        <input type="submit" value="Save Notes"></input>
      </form>
    </PageContainer>
  );
};

export default JobNotes;