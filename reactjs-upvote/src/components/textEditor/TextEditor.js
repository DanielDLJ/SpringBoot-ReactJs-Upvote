import React, { useEffect, useState, useContext } from "react";
import { makeStyles, Modal, Button, Grid, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import PostContext from "../../context/post";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";

function getModalStyle() {
  return {
    position: "absolute",
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  rowBtn: {
    justifyContent: "center",
    flexDirection: "row",
  },
  root: {
    flexGrow: 1,
  },
}));

const converter = new Showdown.Converter({
  tables: false,
  simplifiedAutoLink: false,
  strikethrough: false,
  tasklists: false,
});

export default function SimpleModal(props) {
  const classes = useStyles();
  const { createPost } = useContext(PostContext);
  const [modalStyle] = useState(getModalStyle);
  const [value, setValue] = useState("");
  const [selectedTab, setSelectedTab] = useState("write");
  const [customSnackbar, setCustomSnackbar] = useState({
    open: false,
    message: "",
    type: "error",
  });

  const handleClose = () => {
    props.setOpenPost(false);
  };

  const handleCloseError = () => {
    setCustomSnackbar({
      open: false,
      message: "",
      type: "error",
    });
  };
  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  useEffect(() => {
    console.log(value);
  }, [value]);

  const submitPost = async () => {
    if(value === ""){
      setCustomSnackbar({
        open: true,
        message: "Conteúdo vazio.",
        type: "error",
      });
      return
    }
    let response = await createPost(value);
    if (response.error) {
      setCustomSnackbar({
        open: true,
        message: response.error,
        type: "error",
      });
      return;
    }
    window.location.reload();
    props.setOpenPost(false);
  };

  return (
    <Modal
      open={props.openPost}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div style={modalStyle} className={classes.paper}>
        <Snackbar
          open={customSnackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseError}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
        >
          <Alert onClose={handleCloseError} severity={customSnackbar.type}>
            {customSnackbar.message}
          </Alert>
        </Snackbar>
        <ReactMde
          value={value}
          onChange={setValue}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          generateMarkdownPreview={(markdown) =>
            Promise.resolve(converter.makeHtml(markdown))
          }
          toolbarCommands={[
            ["header", "bold", "italic", "strikethrough"],
            ["quote", "code"],
            ["unordered-list", "ordered-list", "checked-list"],
          ]}
          childProps={{
            writeButton: {
              tabIndex: -1,
            },
          }}
        />

        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={5}
          style={{ justifyContent: "space-around", paddingTop: 20 }}
        >
          <Grid item>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => submitPost()}
            >
              Postar
            </Button>
          </Grid>
          <Grid item>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => props.setOpenPost(false)}
            >
              Cancelar
            </Button>
          </Grid>
        </Grid>
      </div>
    </Modal>
  );
}
