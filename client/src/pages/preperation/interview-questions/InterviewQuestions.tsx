import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import config from "../../../config";
import { PreperationContext } from "../../../context/PreperationContext";
import PrepNav from "../PrepNav";
import AddQuestions from "./AddQuestion";
import Modal from "../../../components/Modal";
import { StyledTextArea } from "../../../styles/styled-components/StylesMain";

import {
  PageContainer,
  Card,
} from "../../../styles/styled-components/StyledContainers";
import { HeaderMain } from "../../../styles/styled-components/StyledText";

const InterviewQuestions = () => {
  const preperationContext = useContext(PreperationContext);
  const { preperationState, getPreperation } = preperationContext;
  const [editing, setEditing] = useState(false);
  const [getIndex, setIndex] = useState(null);
  const [questionAdded, setQuestionAdded] = useState(false);

  useEffect(() => {
    setQuestionAdded(false);
  });

  const addQuestion = (e) => {
    e.preventDefault();
    const question = e.target.question.value;
    console.log(question);

    axios
      .post(
        `${config.API_URL}/preperation/interview-questions/add-question`,
        {
          question,
        },
        { withCredentials: true }
      )
      .then((result) => {
        getPreperation();
        Array.from(document.querySelectorAll("input")).forEach(
          (input) => (input.value = "")
        );
        setQuestionAdded(true);
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  };
  console.log(preperationState);

  const addAnswer = (e, question, index) => {
    e.preventDefault();
    const answer = e.target.answer.value;
    console.log(answer);
    setEditing(false);
    axios
      .post(
        `${config.API_URL}/preperation/interview-questions/add-answer`,
        {
          answer,
          question,
          index,
        },
        { withCredentials: true }
      )
      .then((result) => {
        getPreperation();
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  };

  const removeQuestion = (index) => {
    console.log(index);
    axios
      .post(
        `${config.API_URL}/preperation/interview-questions/delete-question`,
        {
          index,
        },
        { withCredentials: true }
      )
      .then((result) => {
        getPreperation();
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <PrepNav />
      <PageContainer withSecondNav >
        <Modal
          content={<AddQuestions addQuestion={addQuestion} />}
          toggleOn={questionAdded}
        />
        <HeaderMain>Interview Questions</HeaderMain>

        
          {preperationState.interview_questions
            ? preperationState.interview_questions.map((question, index) => {
                return (
                  <Card key={index}>
                    <p>
                      <strong>Q:&nbsp;</strong> {question.question}
                    </p>

                    {!question.answer ? (
                      <form
                        onSubmit={(e) => addAnswer(e, question.question, index)}
                      >
                        <StyledTextArea
                          id="answer1"
                          name="answer"
                          placeholder="Answer"
                          required
                        />
                        <input type="submit" value="Add Answer" />
                      </form>
                    ) : editing && getIndex === index ? (
                      <form
                        onSubmit={(e) => addAnswer(e, question.question, index)}
                      >
                        <StyledTextArea
                          id="answer2"
                          name="answer"
                          placeholder={
                            question.answer ? question.answer : "Edit answer"
                          }
                        >
                          {question.answer}
                        </StyledTextArea>
                        <input type="submit" value="Save Answer" />
                      </form>
                    ) : (
                      <div>
                        <p>
                          <strong>A:&nbsp;</strong>
                          <p>{question.answer}</p>
                        </p>
                        <button
                          onClick={(e) => {
                            setEditing(true);
                            setIndex(index);
                          }}
                        >
                          Edit Answer
                        </button>
                        <button onClick={() => removeQuestion(index)}>
                          Delete Question
                        </button>
                      </div>
                    )}
                  </Card>
                );
              })
            : null}
        
      </PageContainer>
    </>
  );
};

export default InterviewQuestions;