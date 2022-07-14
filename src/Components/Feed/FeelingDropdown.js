import { FormControl, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import { feelingData } from "../../Helpers/FeelingData";
import "./feed.css";

const FeelingDropdown = ({ feeling, setFeeling, handleClose, setActivity }) => {
  const [result, setResult] = useState(feelingData);

  const onSearch = (e) => {
    if (e.target.value === "") {
      setResult(feelingData);
    } else {
      const filterData = result.filter((val) => {
        return val.value.toLowerCase().includes(e.target.value.toLowerCase());
      });
      setResult(filterData);
    }
  };

  const handleChange = (event) => {
    setFeeling(event.target.value);
    handleClose();
    setActivity("");
  };

  return (
    <>
      <h6>Feeling:</h6>
      <FormControl
        variant="standard"
        sx={{ m: 1, minWidth: 120, width: "100%" }}
      >
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={feeling}
          onChange={handleChange}
          className="emoji-select"
        >
          <MenuItem>
            <input
              type="text"
              className="search_feeling form-control"
              placeholder="search"
              onChange={(e) => {
                onSearch(e);
              }}
            />
          </MenuItem>
          {result.map((val, index) => {
            return (
              <MenuItem key={index} value={`${val.emoji} ${val.value}`}>
                {val.emoji} {val.value}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </>
  );
};

export default FeelingDropdown;
