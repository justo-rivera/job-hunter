import React, { useState, useEffect } from "react";
import { FloatingLabelContainer } from "../styles/styled-components/StyledElements";
import DatePicker from "react-datepicker";

const InputComp = (
  label,
  type,
  id,
  name,
  hasBackground,
  smallText,
  value,
  onChange,
  auth,
  addDate,
  editJobDates,
  challenge,
  putButton,
  removeEdits,
  
) => {
  const [datePickerIsOpen, setDatePicker] = useState(false);

  return (
    <>
      <FloatingLabelContainer
        hasBackground={hasBackground}
        smallText={smallText}
        addDate={addDate}
        challenge={challenge}
      >
        <input
          type={type}
          id={id}
          name={name}
          required
          value={value}
          onChange={!auth ? (e) => onChange(e, id) : null}
          onClick={addDate ? () => setDatePicker(!datePickerIsOpen) : null}
        />
        {putButton && value && !challenge ? (
            <button onClick={(e)=>removeEdits(e,name, id)} style={{ position: "relative", left: "360px", top: challenge ? "-33px":"" }}>x</button>
          ) : null}
        <span className="highlight">
          {" "}
          
        </span>
        <span className="bar"></span>
        <label>{label}</label>
      </FloatingLabelContainer>
  
      
      {addDate && label !== "Challenge" ? (
        <DatePicker
          selected={new Date()}
          onChange={(e) => {
            editJobDates(e, id, name);
            setDatePicker(!datePickerIsOpen);
          }}
          open={datePickerIsOpen}
          shouldCloseOnSelect={true}
          className="date-picker"
        />
      ) : null}
    
    </>
  );
};

export default InputComp;