import React, {useEffect, useState} from "react";
import {useParams, useHistory} from "react-router-dom"
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField/TextField";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/core/SvgIcon/SvgIcon";
import axios from "axios";
import moment from "moment";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Button from "components/CustomButtons/Button.js";
import Circular from "../../myComponents/Circular";


export default function Chat({getData, classes, username}) {
    const {chatId, archive, read} = useParams();
    const h = useHistory();
    const [message, setMessage] = React.useState("");
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = React.useState([]);
    useEffect(() => {
        if (chatId) {
            const interval = setInterval(async () => {
                await getMessages();
            }, 2000);
            return () => clearInterval(interval)
        }
    }, [chatId]);

    useEffect(() => {
        if (chatId) {
            getMessages();
            setMessage("");
        }

    }, [chatId, username]);

    function getMessages() {
        axios.get('http://localhost:5000/getmessages', {
            params: {
                username,
                chatId
            }
        }).then(({data: {messages}}) => {
            setMessages(messages);
            setLoading(false);
        }).catch((err) => {
            console.log(err);
        })
    }

    function sendMessage() {
        axios.post('http://localhost:5000/addmessage', {
            text: message,
            username,
            chatId
        }).then((r) => {
            setMessage("");
        })
            .catch((e) => console.log(e))
    }

    function deleteChat() {
        axios.post('http://localhost:5000/deleteChat', {
            username,
            chatId,
            isDeleted: true
        }).then((r) => {
            getData()
            h.push('/direct')
        })
            .catch((e) => console.log(e))
    }

    function archiveChat() {
        axios.post('http://localhost:5000/archiveChat', {
            username,
            chatId,
            isArchived: true
        }).then((r) => {
            getData();
            h.push('/direct')
        })
            .catch((e) => console.log(e))
    }

    function markUnreadChat() {
        axios.post('http://localhost:5000/unReadChat', {
            username,
            chatId,
            isUnread: true
        }).then((r) => {
            getData();
            h.push('/direct')
        })
            .catch((e) => console.log(e))
    }

    if (chatId === undefined)
        return <h4>Direct</h4>;
    if (loading)
        return <Circular/>;
    return <Grid item xs={9}>
        <List className={classes.messageArea}>
            <GridContainer direction={'row'}>
                {archive === "false" ? <GridItem>
                    <Button onClick={archiveChat}>
                        Archive Chat
                    </Button>
                </GridItem> : null}
                {read === "true" ? <GridItem>
                    <Button onClick={markUnreadChat}>
                        Mark Unread
                    </Button>
                </GridItem> : null}
                <GridItem>
                    <Button onClick={deleteChat}>
                        Delete Chat
                    </Button>
                </GridItem>
            </GridContainer>
            {messages.map((message) => {
                if (message.recieved) {
                    return <ListItem key="1">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="right" primary={message.text}></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="right"
                                              secondary={moment(message.dateAndTime).format("hh:mm")}></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>;
                } else
                    return <ListItem key="3">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="left" primary={message.text}></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="left"
                                              secondary={moment(message.dateAndTime).format("hh:mm")}></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
            })}

        </List>
        <Divider/>
        <Grid container style={{padding: '20px'}}>
            <Grid item xs={11}>
                <TextField value={message} onChange={(e) => setMessage(e.target.value)} id="outlined-basic-email"
                           label="Type Something" fullWidth/>
            </Grid>
            <Grid xs={1} align="right">
                <Fab onClick={sendMessage} color="primary" aria-label="add"><SendIcon/></Fab>
            </Grid>
        </Grid>
    </Grid>
}
