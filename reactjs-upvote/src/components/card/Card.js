import React, { useState, useContext } from "react";
import {
  makeStyles,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Typography,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/FavoriteTwoTone";
import ReactMarkdown from "react-markdown";
import PostContext from "../../context/post";

import moment from "moment";
import "moment/locale/pt-br"; // without this line it didn't work
// moment.locale('es')
moment.locale("pt-br");

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 395,
    alignItems: "center",
    marginTop: 15,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeReviewCard(props) {
  // const { dados } = props;

  const classes = useStyles();
  const [requestInProgressLike, setRequestInProgressLike] = useState(false);
  const { likePost, disLikePost } = useContext(PostContext);
  const [dados, setDados] = useState(props.dados);

  const sendLikeRequest = async () => {
    if (requestInProgressLike) return;
    let response;
    if (dados.loggedUserLiked) {
      response = await disLikePost(dados.id);
    } else {
      response = await likePost(dados.id);
    }
    setRequestInProgressLike(false);
    if (response.error) {
      return
    }
    setDados({
      ...dados,
      loggedUserLiked: response.loggedUserLiked,
    });
    console.log(response)
    
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        title={dados.wrote_user.username}
        subheader={moment(dados.date, "YYYY-MM-DD HH-mm-ss").format("LLL")}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          <ReactMarkdown>{dados.content}</ReactMarkdown>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={() => sendLikeRequest()}
        >
          {dados?.loggedUserLiked ? <FavoriteIcon style={{ color: "red" }} /> : <FavoriteIcon />}
        </IconButton>
        {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
      </CardActions>
    </Card>
  );
}
