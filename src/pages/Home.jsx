import GridContainer from "../components/Grid/GridContainer";
import GridItem from "../components/Grid/GridItem";
import React, {useEffect, useState} from "react";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/core/SvgIcon/SvgIcon";
import moment from "moment";
import CardMedia from "@material-ui/core/CardMedia";
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import CommentIcon from '@material-ui/icons/Comment';
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions/CardActions";
import axios from "axios";
import Button from "components/CustomButtons/Button.js";
import Card from "@material-ui/core/Card/Card";
import {useStyles, format} from "./Post/PostPage";
import {useHistory} from "react-router-dom"
import Circular from "../myComponents/Circular";

const Post = ({postId, liked, commentId, commentText, actionUsername}) => {
    const classes = useStyles();
    const h = useHistory();
    const [loading, setLoading] = useState(false);
    const [author, setAuthor] = useState("");
    const [date, setDate] = useState("2020-01-01T01:35:05.000Z\n");
    const [text, setText] = React.useState("Ey kaka siahe nadan be mazrae panbeat bazgard!");
    const [likes, setLikes] = React.useState([{username: "123"}]);
    const [commentsCount, setCommentsCount] = React.useState(123);
    const [likePost, setLikePost] = useState(false);

    function handleShare() {
        axios.post('http://localhost:5000/sharepost', {
            username: localStorage.getItem('username'),
            postId,
        }).then((r) => r)
            .catch((e) => alert(e.message))
    }

    function getData() {
        setLoading(true);
        axios.get('http://localhost:5000/getPost', {
            params: {
                postId,
                username: localStorage.getItem('username')
            }
        }).then(({data: {post, comments, likes, commentsCount}}) => {
            setCommentsCount(commentsCount);
            setLikes(likes);
            setLikePost(post.liked);
            setAuthor(post.username);
            setText(post.text);
            setDate(post.dateAndTime);
            setLoading(false)

        }).catch((err) => {
            console.log(err);
            setLoading(false);
            alert(err)
        })
    }

    useEffect(() => {
        getData()
    }, []);
    if (loading)
        return <Circular/>;
    return <Card style={{marginBottom: "3vh"}}
                 className={classes.root}>
        <CardHeader
            avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                    {author[0]}
                </Avatar>
            }
            action={
                <IconButton aria-label="settings">
                    <MoreVertIcon/>
                </IconButton>
            }
            title={author}
            subheader={moment(date).format(format)}

        />

        <CardMedia
            className={classes.media}
            image="/static/images/cards/paella.jpg"
            title="Paella dish"
        />
        <CardContent>
            <Typography variant="h6" color="textSecondary" component="p">
                {text}
            </Typography>

        </CardContent>
        <CardActions disableSpacing>
            <h7>{likes.length}</h7>
            <IconButton onClick={() => {
                if (!likePost) {
                    setLikePost(true);
                    axios.post('http://localhost:5000/likepost', {
                        username: localStorage.getItem('username'),
                        postId,

                    }).then((r) =>getData())
                        .catch((e) => console.log(e))
                } else {
                    setLikePost(false);
                    axios.post('http://localhost:5000/unlikepost', {
                        username: localStorage.getItem('username'),
                        postId,

                    }).then((r) =>{
                        getData();
                    })
                        .catch((e) => console.log(e))
                }
            }} aria-label="add to favorites">
                {likePost ? <FavoriteIcon htmlColor={"red"}/> : <FavoriteIcon/>}
            </IconButton>

            <h7>{commentsCount}</h7>

            <IconButton onClick={() => h.push(`/post/${postId}`)} aria-label="comment">
                <CommentIcon/>
            </IconButton>
            {
                liked === true ? <h5>Liked by {actionUsername} </h5> : null
            }
            {
                commentId !== null ? <h5> {actionUsername} commented {commentText} </h5> : null
            }
            <IconButton
                onClick={handleShare}
                className={classes.expand}
                aria-label="show more"
            >
                <ShareIcon/>
            </IconButton>
        </CardActions>
    </Card>
};
export {Post}
export default function Home() {
    const [posts, setPosts] = React.useState([]);
    const h = useHistory();
    const username = localStorage.getItem('username');
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:5000/timeline', {
            params: {
                username
            }
        }).then(({data: {posts}}) => {
            setPosts(posts);
        }).catch((err) => {
            console.log(err);
        }).finally(() => setLoading(false))
    }, [username]);
    if (loading)
        return <Circular/>;
    return <GridContainer direction={"column"} style={{margin: "3vw"}}>
        <GridItem style={{marginDown: "3vh"}}>
            <h4>Home</h4>
            <Button
                onClick={(e) => h.push('/addpost')}
                color="primary"
            >
                Add Post
            </Button>
        </GridItem>
        <GridItem>
            {posts.map((post) => (<Post
                key={post.postId}
                actionUsername={post.actionUsername}
                liked={post.like}
                commentId={post.commentId}
                commentText={post.commentText}
                postId={post.postId}/>))}
        </GridItem>


    </GridContainer>

}
