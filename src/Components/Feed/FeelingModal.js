import {
  Backdrop,
  Box,
  Fade,
  Modal,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import FeelingDropdown from "./FeelingDropdown";
import ActivityDropdown from "./ActivityDropdown";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const FeelingModal = ({
  handleClose,
  open,
  feeling,
  setFeeling,
  activity,
  setActivity,
  act, setAct
}) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "7px",
    height: 400,
  };
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Feeling" {...a11yProps(0)} />
                  <Tab label="Activity" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <FeelingDropdown
                  feeling={feeling}
                  setFeeling={setFeeling}
                  setActivity={setActivity}
                  handleClose={handleClose}
                />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <ActivityDropdown
                  activity={activity}
                  setActivity={setActivity}
                  setFeeling={setFeeling}
                  handleClose={handleClose}
                  act={act}
                  setAct={setAct}
                />
              </TabPanel>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default FeelingModal;
