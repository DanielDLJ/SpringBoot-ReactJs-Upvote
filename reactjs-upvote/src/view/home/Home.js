import React, { useState, useContext, useEffect } from "react";

import { Button, makeStyles, Container } from "@material-ui/core";
import TextEditor from "../../components/textEditor/TextEditor.js";
import Card from "../../components/card/Card.js";
import PostContext from "../../context/post";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Home() {
  const classes = useStyles();
  const { posts, getPosts } = useContext(PostContext);
  const [openPost, setOpenPost] = useState(false);

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Container component="main">
      {openPost ? (
        <TextEditor openPost={openPost} setOpenPost={setOpenPost} />
      ) : null}
      <Container
        component="content"
        style={{ justifyContent: "center", marginTop: 15 }}
        maxWidth="xs"
      >
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => setOpenPost(true)}
        >
          Postar
        </Button>
        {posts
          ? posts.map((item, key) => {
              return <Card key={key} dados={item} />;
            })
          : null}
      </Container>
    </Container>
  );
}
