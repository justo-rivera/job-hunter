import React, { useState, useEffect } from "react";
import { initialData } from "./initialJobData";
import JobColumn from "./JobColumn";
import { DragDropContext } from "react-beautiful-dnd";
import {
  Card,
  CardContent,
  JobCard,
  JobHeader,
  CardFooter,
  JobTitle,
} from "../styles/styled-components/StylesCard";

// export const initialData = {
//   columns: {
//     'column-1': {
//       id: "column-1",
//       title: "Saved",
//       category: "job_saved",
//       jobIds:[]
//     },
//     'column-2': {
//       id: "column-2",
//       title: "Applied",
//       category: "applied",
//       jobIds:[]

//     },
//     'column-3': {
//       id: "column-3",
//       title: "In Contact",
//       category: "incontact",
//       jobIds:[]

//     },
//     'column-4': {
//       id: "column-4",
//       title: "Interview 1",
//       category: "interview_1",
//       jobIds:[]

//     },
//     'column-5': {
//       id: "column-5",
//       title: "Interview 2",
//       category: "interview_2",
//       jobIds:[]

//     },
//     'column-6': {
//       id: "column-6",
//       title: "Interview 3",
//       category: "interview_3",
//       jobIds:[]

//     },
//     'column-7': {
//       id: "column-7",
//       title: "Hired",
//       category: "hired",
//       jobIds:[]

//     },
//     'column-8': {
//       id: "column-8",
//       title: "Denied",
//       category: "denied",
//       jobIds:[]

//     },
//     'column-9': {
//       id: "column-9",
//       title: "Archived",
//       category: "archived",
//       jobIds:[]
//     },
//   },
//   columnOrder: ["column-1", "column-2", "column-3", "column-4", "column-5", "column-6", "column-7", "column-8", "column-9"],
// };

const JobBoardRender = (props) => {
  const [columnState, setColumnState] = useState(initialData);
  const [jobIdArrays, setJobIdArrays] = useState({
    job_saved: [],
    applied: [],
    incontact: [],
    interview_1: [],
    interview_2: [],
    interview_3: [],
    hired: [],
    denied: [],
    archived: [],
  });
  const [column, setColumn] = useState();



  for (let key in jobIdArrays) {
    for (let eachColumn in initialData.columns) {
      if(initialData.columns[eachColumn].category === key){
        initialData.columns[eachColumn].jobIds = jobIdArrays[key]

      }
    }
  }

  window.onload = function(){
    let columns = []

    props.jobs.map((job) => {
      for (let eachColumn in columnState.columns) {
        let column = columnState.columns[eachColumn]

        if (column.category === job.job_category) {
          
       
          setJobIdArrays(prevState=>({
            ...prevState, 
            [column.category]:[...prevState[column.category], String(job.job_id)]}))

            const newColumn = {
              ...column,
              jobIds:[...column.jobIds, String(job.job_id)]
            }
            columns.push(newColumn)
            
            const newState = {
              ...columnState,
              columns: {
                ...columnState.columns,
                [newColumn.id]: newColumn,
              },
            };

        }

      }

    });
  }


  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = columnState.columns[source.droppableId];
    const finish = columnState.columns[destination.droppableId];

    if (start === finish) {
      const newJobIds = Array.from(start.jobIds);
      newJobIds.splice(source.index, 1);
      newJobIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        jobIds: newJobIds,
      };

      const newState = {
        ...columnState,
        columns: {
          ...columnState.columns,
          [newColumn.id]: newColumn,
        },
      };
      setColumnState(newState);
      return;
    }

    //MOVING BETWEEN COLUMNS
    const startJobIds = Array.from(start.jobIds);
    startJobIds.splice(source.index, 1);

    const newStart = {
      ...start,
      jobIds: startJobIds,
    };

    const finishJobIds = Array.from(finish.jobIds);
    finishJobIds.splice(destination.index, 0, draggableId);

    const newFinish = {
      ...finish,
      jobIds: finishJobIds,
    };

    const newMoveState = {
      ...columnState,
      columns: {
        ...columnState.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    // console.log(draggableId);
    props.changeStatus(finish.category, draggableId);
    setColumnState(newMoveState);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {columnState.columnOrder.map((columnId) => {
        const column = columnState.columns[columnId];
        const jobs = column.jobIds.flatMap((jobId) =>
          props.jobs.filter((job) => job.job_id == jobId)
        );
        return (
          <JobColumn
            key={column.id}
            column={column}
            handleStar={props.handleStar}
            removeJob={props.removeJob}
            jobs={jobs}
          />
        );
      })}
    </DragDropContext>
  );
};

export default JobBoardRender;
