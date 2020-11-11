import React from "react";
import { Card, CardContent } from "../../styles/styled-components/StylesCard";

const AddJob = (props) => {
  return (
    <>
      <Card addJob>
        <CardContent addJob>
          <form
            onSubmit={(e) => 
              props.addJob(e)
              
            }
          >
            <div>
              <input
                type="text"
                id="companyName"
                name="companyName"
                placeholder="Company Name"
                required
              />
            </div>
            <div>
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                placeholder="Job Title"
                required
              />
            </div>
            <div>
              <input
                type="text"
                id="jobDescription"
                name="jobDescription"
                placeholder="Description"
              />
            </div>
            <div>
              <input
                type="checkbox"
                id="inputStar"
                onChange={props.handleStar}
              />
              <p>Star Job?</p>
            </div>

            <div>
              <input type="submit" value="Add Job" />
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default AddJob;