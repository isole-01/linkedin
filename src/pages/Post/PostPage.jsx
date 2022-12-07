import React, {useEffect, useState} from "react";
import {
    useParams
} from "react-router-dom";
import GridContainer from "../../components/Grid/GridContainer";
import Avatar from "@material-ui/core/Avatar";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {red} from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import CommentIcon from '@material-ui/icons/Comment';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {makeStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/core/SvgIcon/SvgIcon";
import axios from "axios";
import moment from "moment";
import Circular from "../../myComponents/Circular";


const format = "DD MM YYYY hh:mm";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "97%",
    },
    media: {
        height: 0,
        paddingTop: '1%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));
export {
    useStyles,
    format
}

function Comment(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [liked, setLiked] = useState(false);
    const [newReply, setNewReply] = useState("");
    const {comment,setLoading,getData} = props;


    const likeunlike = () => {
        if (!liked) {
            setLiked(true);
            axios.post('http://localhost:5000/likecomment', {
                username: localStorage.getItem('username'),
                commentId:comment.commentId,
            }).then((r) => console.log(r))
                .catch((e) => setLiked(false))
        } else {
            setLiked(false);
            axios.post('http://localhost:5000/unlikecomment', {
                username: localStorage.getItem('username'),
                commentId:comment.commentId,
            }).then((r) => console.log(r))
                .catch((e) => setLiked(true))
        }
    };

    function addCm(txt, repliedToCommentId) {
        setLoading(true);
        axios.post('http://localhost:5000/addcomment', {
            text: txt,
            username: localStorage.getItem('username'),
            postId: comment.postId,
            repliedToCommentId
        }).then((r) => getData())
            .catch((e) => console.log(e))
    }

    useEffect(() => {
        setLiked(props.comment.liked)
    }, [props.comment.liked]);

    if (comment === undefined)
        return null
    if (comment.replies === undefined || comment.replies === [])
        return <Card style={{marginTop: "10px"}} className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        J
                    </Avatar>
                }
                action={
                    <div>
                        <Grid container style={{maxWidth: "200px", marginRight: "40x"}}>
                            <Grid item xs={11}>
                                <TextField value={newReply} onChange={(e) => setNewReply(e.target.value)}
                                           id="outlined-basic-email"
                                           label=" " fullWidth/>
                            </Grid>
                            <Grid xs={1} align="right">
                                <Fab onClick={() => addCm(newReply, comment.commentId)} color="primary"
                                     aria-label="add"><SendIcon/></Fab>
                            </Grid>
                        </Grid>
                        <IconButton onClick={() => {
                            likeunlike();

                        }} aria-label="settings">
                            {liked ? <FavoriteIcon htmlColor={"red"}/> : <FavoriteIcon/>}
                        </IconButton>
                    </div>
                }
                title={comment.username}
                subheader={moment(comment.dateAndTime).format(format)}
            />
            <CardContent style={{marginLeft: "56px"}}>
                <Typography>
                    {comment.text}
                </Typography>
            </CardContent>
        </Card>;
    return <Card style={{marginTop: "10px"}} className={classes.root}>
        <CardHeader
            avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                    J
                </Avatar>
            }
            action={
                <div>
                    <Grid container style={{maxWidth: "200px", marginRight: "40x"}}>
                        <Grid item xs={11}>
                            <TextField value={newReply} onChange={(e) => setNewReply(e.target.value)}
                                       id="outlined-basic-email"
                                       label=" " fullWidth/>
                        </Grid>
                        <Grid xs={1} align="right">
                            <Fab onClick={() => addCm(newReply, comment.commentId)} color="primary"
                                 aria-label="add"><SendIcon/></Fab>
                        </Grid>
                    </Grid>
                    <IconButton onClick={() => {
                        likeunlike();
                    }} aria-label="settings">
                        {liked ? <FavoriteIcon htmlColor={"red"}/> : <FavoriteIcon/>}
                    </IconButton>
                    <IconButton onClick={() => setExpanded(!expanded)}>
                        replies
                    </IconButton>
                </div>
            }
            title={comment.username}
            subheader={moment(comment.dateAndTime).format(format)}
        />
        <CardContent style={{marginLeft: "56px"}}>
            <Typography>
                {comment.text}
            </Typography>
        </CardContent>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
                {comment.replies.map((cm) => <Comment getData={getData} setLoading={setLoading} key={cm.commentId} comment={cm}/>)}
            </CardContent>
        </Collapse>
    </Card>;


}

export default function PostPage() {
    const {postId} = useParams();
    const classes = useStyles();
    const [newComment, setNewComment] = React.useState("");
    const [likePost, setLikePost] = useState(false);
    const [loading,setLoading]=useState(false);
    const [author, setAuthor] = useState("Ashkan Sami");
    const [date, setDate] = useState("2020-01-01T01:35:05.000Z\n");
    const [text, setText] = React.useState("Ey kaka siahe nadan be mazrae panbeat bazgard!");
    // const [likes, setLikes] = React.useState([] );
    const [likesCount,setLikesCount]=useState(null)
    const [commentsCount, setCommentsCount] = React.useState(123);
    const [comments, setComments] = React.useState([]);


    function handleShare() {
        axios.post('http://localhost:5000/sharepost', {
            username: localStorage.getItem('username'),
            postId,
        }).then((r) => alert('shared successfully'))
            .catch((e) => console.log(e))
    }

    function addComment(txt, repliedToCommentId) {
        setLoading(true);
        axios.post('http://localhost:5000/addcomment', {
            text: txt,
            username: localStorage.getItem('username'),
            postId,
            repliedToCommentId

        }).then((r) => {
            getData()
        })
            .catch((e) => console.log(e))
    }

    function getData(){
        setLoading(true);
        axios.get('http://localhost:5000/getPost', {
            params: {
                postId,
                username: localStorage.getItem('username')
            }
        }).then(({data: {post, comments, likes, commentsCount}}) => {
            setCommentsCount(commentsCount);
            setComments(comments);
            // setLikes(likes);
            setLikesCount(likes.length);
            setLikePost(post.liked);
            setAuthor(post.username);
            setText(post.text);
            setDate(post.dateAndTime);
            setLoading(false);
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        getData()
    }, [postId, author]);

    if (loading)
        return <Circular/>;
    return (<GridContainer style={{margin: "3vw"}}>
        <Card className={classes.root}>
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
                <h7>{likesCount}</h7>
                <IconButton onClick={() => {
                    if (!likePost) {
                        setLikePost(true);
                        axios.post('http://localhost:5000/likepost', {
                            username: localStorage.getItem('username'),
                            postId,

                        }).then((r) => {
                            setLikesCount(likesCount+1)})
                            .catch((e) => console.log(e))
                    } else {
                        setLikePost(false);
                        axios.post('http://localhost:5000/unlikepost', {
                            username: localStorage.getItem('username'),
                            postId,

                        }).then((r) => setLikesCount(likesCount-1))
                            .catch((e) => console.log(e))
                    }
                }} aria-label="add to favorites">
                    {likePost ? <FavoriteIcon htmlColor={"red"}/> : <FavoriteIcon/>}
                </IconButton>

                <h7>{commentsCount}</h7>

                <IconButton aria-label="comment">
                    <CommentIcon/>
                </IconButton>
                <IconButton
                    onClick={handleShare}
                    className={classes.expand}
                    aria-label="show more"
                >
                    <ShareIcon/>
                </IconButton>
            </CardActions>
        </Card>

        <Grid container style={{padding: '20px'}}>
            <Grid item xs={11}>
                <TextField value={newComment} onChange={(e) => setNewComment(e.target.value)} id="outlined-basic-email"
                           label="Type Something" fullWidth/>
            </Grid>
            <Grid xs={1} align="right">
                <Fab onClick={() => addComment(newComment, null)} color="primary" aria-label="add"><SendIcon/></Fab>
            </Grid>
        </Grid>

        {comments.map((comment) => <Comment getData={getData} setLoading={setLoading} key={comment.commentId} comment={comment}/>)}


    </GridContainer>)

}
