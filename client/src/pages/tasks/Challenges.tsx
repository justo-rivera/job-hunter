import React, { useContext, useState } from "react";
import axios from "axios";
import config from "../../config";
import { TaskContext } from "../../context/TaskContext";
import { JobContext } from "../../context/JobContext";


const Challenges = () => {
  const taskContext = useContext(TaskContext);
  const { taskState, getTasks } = taskContext;

  const jobContext = useContext(JobContext);
  const { jobState, getJobs } = jobContext;
  console.log(taskState);

  const [job_id, setJobId] = useState("")
  

  const addChallenge = (e) => {
    e.preventDefault();
    // let target = e.currentTarget as any;
    const name = e.target.name.value;
    const url = e.target.url.value;
    const repo = e.target.repo.value;

    axios
      .post(
        `${config.API_URL}/tasks/challenges/add-challenge`,
        {
          name,
          url,
          repo,
          job_id
        },
        { withCredentials: true }
      )
      .then((result) => {
        getTasks();
        Array.from(document.querySelectorAll("input")).forEach(
          input => (input.value = "")
        );
        // console.log(result.data);

      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  };

  const removeChallenge = (index) => {
    console.log(index);
    axios
      .post(
        `${config.API_URL}/tasks/challenges/delete-challenge`,
        {
          index,
        },
        { withCredentials: true }
      )
      .then((result) => {
        getTasks();
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div onSubmit={(e) => addChallenge(e)}>
      <form>
        <input type="text" id="name" name="name" placeholder="Name" required />
        <input type="text" id="url" name="url" placeholder="Url" required />
        <input type="text" id="repo" name="repo" placeholder="Repo" required />

        <input type="submit" value="Add Challenge" />
      </form>
      <div>
        <p>Is this challenge for a job you have saved?</p>
        {jobState ? jobState.map((job)=>{
          return <button onClick={()=>setJobId(job.job_id)}>{job.job_title} at {job.company_name}</button>
        }):null}
      </div>
      <div>
        <h3>Challenges</h3>
        {taskState.challenges
          ? taskState.challenges.map((challenge, index) => {
              return (
                <div key={index}>
                  <p>{challenge.name}</p>
                  <button onClick={() => removeChallenge(index)}>X</button>
                  
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Challenges;
