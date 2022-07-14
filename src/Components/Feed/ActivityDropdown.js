import React, { useState } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import { activities } from "../../Helpers/ActivityData";

const ActivityDropdown = ({
  activity,
  setActivity,
  handleClose,
  setFeeling,
  act,setAct
}) => {
  const [show, setShow] = useState(false);
  
  const handleChange = (event) => {
    setActivity(event.target.value);
    setFeeling("");
    setShow(true);
  };
  return (
    <>
      <h6>Activity:</h6>
      <FormControl
        variant="standard"
        sx={{ m: 1, minWidth: 120, width: "100%" }}
      >
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={activity}
          onChange={handleChange}
          className="emoji-select"
        >
          {activities.map((val, index) => {
            return (
              <MenuItem key={index} value={`${val.emoji} ${val.value}`}>
                {val.emoji} {val.value}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      {show ? (
        <div>
          <input
            type="text"
            placeholder="write your activity"
            className="show_act"
            value={act}
            onChange={(e) => setAct(e.target.value)}
          />
          <button className="done" onClick={handleClose}>
            Done
          </button>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ActivityDropdown;
