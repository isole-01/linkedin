import React, {useEffect, useState} from "react";
import GridContainer from "../components/Grid/GridContainer";

import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {Link} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import axios from "axios";
import Circular from "../myComponents/Circular";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '800px',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));


export default function Notifications() {
    const classes = useStyles();
    const h = useHistory();
    const [loading, setLoading] = useState(true)
    const [notifs, setNotifs] = useState([
        {
            person: {
                name: "Kaka siah",
                id: 34
            },
            type: "Birthday",
            content: "Its Kaka siah's birthday",
            date: "85 jul 2020",
            time: "78:32"
        }
    ])
    const username = localStorage.getItem('username');


    function getData() {
        setLoading(true);
        axios.get('http://localhost:5000/notifications', {
            params: {
                username
            }
        }).then(({data: {notifs}}) => {
            setNotifs(notifs);
            setLoading(false)

        }).catch((err) => {
            console.log(err);
            setLoading(false);
            alert(err)
        })
    }

    useEffect(() => {
        getData()
    }, [username]);

    if (loading)
        return <Circular/>;

    return <GridContainer justify={"center"} style={{margin: "3vh"}}>
        <List className={classes.root}>
            {notifs.map((notif) => <React.Fragment>
                <ListItem onClick={() => {
                    if (notif.postId !== undefined)
                        h.push(`/post/${notif.postId}`)
                }} button alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"> {notif.username[0]}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={notif.type}
                        secondary={
                            <React.Fragment>
                                <Link onClick={() => h.push(`/profile/${notif.username}`)}>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                        {notif.username}
                                    </Typography>
                                </Link>
                                {" — "}{notif.message}
                                {/*<Link onClick={() => h.push(`/post/${notif.postId}`)}>*/}
                                {/*    <Typography*/}
                                {/*        component="span"*/}
                                {/*        variant="body2"*/}
                                {/*        className={classes.inline}*/}
                                {/*        color="textPrimary"*/}
                                {/*    >*/}
                                {/*        Post*/}
                                {/*    </Typography>*/}
                                {/*</Link>*/}
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li"/>
            </React.Fragment>)}


        </List>
    </GridContainer>
}
