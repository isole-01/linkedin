import React, {useEffect, useState} from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
// core components
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";

import profile from "assets/img/faces/christian.jpg";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
// import Badge from "../../components/Badge/Badge";
import styles from "assets/jss/material-kit-react/views/profilePage.js";
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";
import Card from "@material-ui/core/Card/Card";
import moment from "moment";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Circular from "../../myComponents/Circular";
import {Post} from "../Home";
import Link from "@material-ui/core/Link";
import Collapse from "@material-ui/core/Collapse";

const useStyles = makeStyles(styles);
const Posts = ({username}) => {
    const [posts, setPosts] = React.useState([]);
    const h = useHistory();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:5000/userPosts', {
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
    return <GridContainer direction={"column"} style={{margin: "0vw"}}>
        <GridItem style={{marginDown: "3vh"}}>
            <h4>Posts</h4>
        </GridItem>
        <GridItem>
            {posts.map((post) => (<Post
                key={post.postId}
                liked={false}
                commentId={null}
                commentText={null}
                postId={post.postId}/>))}
        </GridItem>
    </GridContainer>

};
export default function ProfilePage() {
    const h = useHistory();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});
    const [backgrounds, setBackgrounds] = useState([]);
    const [accomps, setAccomps] = useState([]);
    const [open, setOpen] = useState([]);
    const {username} = useParams();
    const myusername = localStorage.getItem('username');
    const [skills,setSkills]=useState([{
        skillTitle:"abc",
        endorsers:[{
            username:"asdf"
        }]
    }]);
    function getData() {
        setLoading(true);
        axios.get('http://localhost:5000/profile', {
            params: {
                username,
                seener:myusername,
            }
        }).then(({data}) => {
            setUser(data.user);
            setBackgrounds(data.backgrounds);
            setSkills(data.skills);
            setOpen(skills.map(() => false));
            setAccomps(data.accomps);
            setLoading(false)
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        getData()
    }, [username]);


    const endorse = (skill) => {
        setLoading(true);
        axios.post('http://localhost:5000/endorse', {
            endorser: myusername,
            endorsee: username,
            skillTitle: skill
        }).then((r) => {
            getData();
        })
            .catch((e) => console.log(e))
    };
    const classes = useStyles();
    let history = useHistory();
    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    );


    const handleCollapse = (index) => {
        setOpen(open.map((item, i) => index === i ? !item : item))
    };
    if (loading)
        return <Circular/>;
    return (
        <div>

            <Parallax
                small
                filter
                image={require("assets/img/profile-bg.jpg").default}
            />

            <div className={classNames(classes.main, classes.mainRaised)}>
                <div>
                    <div className={classes.container}>
                        <GridContainer justify="center">


                            <GridItem xs={12} sm={12} md={6}>
                                <div className={classes.profile}>
                                    <div>
                                        <GridContainer>
                                            <img src={profile} alt="..." className={imageClasses}/>
                                            <GridItem style={{width: "100%"}}>
                                                {username === myusername ?
                                                    <Button onClick={() => history.push('/editprofile')} type={"submit"}
                                                            simple
                                                            color="primary" size="lg">
                                                        Edit Profile
                                                    </Button>
                                                    :
                                                    null
                                                }
                                            </GridItem>
                                        </GridContainer>
                                    </div>
                                    <div className={classes.name}>
                                        <h3 className={classes.title}>{user.firstName} {user.lastName}</h3>
                                        <h6 color={"white"}>DESIGNER</h6>
                                        <Button justIcon link className={classes.margin5}>
                                            <i className={"fab fa-twitter"}/>
                                        </Button>
                                        <Button justIcon link className={classes.margin5}>
                                            <i className={"fab fa-instagram"}/>
                                        </Button>
                                        <Button justIcon link className={classes.margin5}>
                                            <i className={"fab fa-facebook"}/>
                                        </Button>
                                    </div>
                                </div>
                            </GridItem>
                        </GridContainer>
                        <div className={classes.description}>
                            <p>
                                {user.description}{" "}
                            </p>
                        </div>
                        <GridContainer justify={"center"}>
                            <GridItem style={{width: "100%", textAlign: "center"}} justify={"center"}>
                                <h5>Skills</h5>
                            </GridItem>

                            {/*{skills.map((skill) => <Badge>{skill.skillTitle}</Badge>)}*/}
                            <List>
                                {skills.map((skill, index) => <ListItem button onClick={() => handleCollapse(index)}>
                                    <ListItemText>
                                        {skill.skillTitle}
                                        <Button onClick={() => endorse(skill.skillTitle)}>Endorse</Button>

                                        <Collapse in={open[index]}>
                                            <List>
                                                {skill.endorsers.map((user) => <ListItem>
                                                    <Link onClick={() => h.push(`/profile/${user.username}`)}>
                                                        {user.username}
                                                    </Link>
                                                </ListItem>)}
                                            </List>
                                        </Collapse>
                                    </ListItemText>
                                </ListItem>)}
                            </List>
                        </GridContainer>
                        <GridContainer style={{width: "75vw"}} justify="center">
                            <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                                <NavPills
                                    alignCenter
                                    color="primary"
                                    tabs={[
                                        {
                                            tabButton: "Accomplishments",
                                            tabIcon: Camera,
                                            tabContent: (
                                                <GridContainer style={{width: "97%"}}>
                                                    {accomps.map((accom, index) => <GridItem>
                                                        <Card>
                                                            <CardActionArea>
                                                                <CardContent>
                                                                    <Typography gutterBottom variant="h5"
                                                                                component="h2">
                                                                        {accom.title}
                                                                    </Typography>
                                                                    <Typography variant="body2" color="textSecondary"
                                                                                component="p">
                                                                        {accom.description}
                                                                        <br/>
                                                                        {moment(accom.date).format("MMM Do YY")}
                                                                    </Typography>
                                                                </CardContent>
                                                            </CardActionArea>
                                                        </Card>
                                                    </GridItem>)}

                                                </GridContainer>

                                            ),
                                        },
                                        {
                                            tabButton: "Background",
                                            tabIcon: Palette,
                                            tabContent: (
                                                <GridContainer style={{width: "97%"}}>
                                                    {backgrounds.map((backg, index) => <GridItem>
                                                        <Card>
                                                            <CardActionArea>
                                                                <CardContent>
                                                                    <Typography gutterBottom variant="h5"
                                                                                component="h2">
                                                                        {backg.title}
                                                                    </Typography>
                                                                    <Typography variant="body2" color="textSecondary"
                                                                                component="p">
                                                                        {backg.backgroundType}
                                                                        <br/>
                                                                        {backg.description}
                                                                        <br/>
                                                                        {moment(backg.startDate).format("MMM Do YY")}-{moment(backg.endDate).format("MMM Do YY")}
                                                                    </Typography>
                                                                </CardContent>
                                                            </CardActionArea>
                                                        </Card>
                                                    </GridItem>)}

                                                </GridContainer>
                                            ),
                                        },

                                    ]}
                                />
                            </GridItem>
                        </GridContainer>
                        <Posts username={username}/>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
