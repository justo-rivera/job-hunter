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
  editJobDates
) => {
  const [datePickerIsOpen, setDatePicker] = useState(false);

  return (
    <>
      <FloatingLabelContainer
        hasBackground={hasBackground}
        smallText={smallText}
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
        <span className="highlight"></span>
        <span className="bar"></span>
        <label>{label}</label>
      </FloatingLabelContainer>
      {addDate && label !== "Challenge" ? (
        <DatePicker
          customInput={
            <FloatingLabelContainer
              hasBackground={hasBackground}
              smallText={smallText}
            >
              <input
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={!auth ? (e) => onChange(e, id) : null}
                onClick={
                  addDate ? () => setDatePicker(!datePickerIsOpen) : null
                }
              />
            </FloatingLabelContainer>
          }
          selected={new Date()}
          onChange={(e) => {
            editJobDates(e, id, name);
            setDatePicker(!datePickerIsOpen);
          }}
          open={datePickerIsOpen}
          className="date-picker"
          shouldCloseOnSelect={true}
        />
      ) : null}
    </>
  );
};

export default InputComp;
