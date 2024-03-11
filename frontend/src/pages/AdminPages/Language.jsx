import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Fade,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import LanguageForm from "../../components/Admin/LanguageForm";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,

  p: 4,
};

const Language = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [reload, setReload] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
 
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/language/languages")
      .then(({ data }) => {
        setLanguages(data);
      });
  }, [reload]);

  const Activate = (id) => {
    axios
      .put("http://localhost:5000/api/language/status/activate/" + id)
      .then((data) => {
        alert(data.data.message);
        setReload((prevReload) => !prevReload);
      });
  };

  const DeActivate = (id) => {
    axios
      .put("http://localhost:5000/api/language//status/inactivate/" + id)
      .then((data) => {
        console.log(data);
        alert(data.data.message);
        setReload((prevReload) => !prevReload);
      });
  };

  return (
    <div>
      <Toolbar />
      <Typography variant="h3">Languages</Typography>
      <Toolbar>
        <Button
          variant="contained"
          onClick={() => {
            setData(null);
            handleOpen();
          }}
        >
          New Language
        </Button>
      </Toolbar>
      <TableContainer>
        <Table>
          <TableHead
            style={{
              backgroundColor: "gray",
            }}
          >
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {languages.map((value, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{value.language}</TableCell>
                  <TableCell>
                    {value.status === "InActive" ? (
                      <p style={{ color: "red" }}>{value.status}</p>
                    ) : (
                      <p style={{ color: "green" }}>{value.status}</p>
                    )}
                  </TableCell>
                  <TableCell style={{ display: "flex", gap: "10px" }}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => {
                        setData(value);
                        handleOpen();
                      }}
                    >
                      Edit
                    </Button>
                    {value.status === "InActive" ? (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => Activate(value._id)}
                      >
                        Activate
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => DeActivate(value._id)}
                      >
                        InActivate
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={open} onClose={handleClose}>
        <Fade in={open}>
          <Box sx={style}>
            <LanguageForm data={data} />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default Language;
