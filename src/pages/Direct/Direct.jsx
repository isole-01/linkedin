import React, {useEffect, useState} from "react";
import {useParams,useHistory} from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SendIcon from '@material-ui/icons/Send';
import axios from "axios";
import Chat from "./Chat";
import Circular from "../../myComponents/Circular";


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}
const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: "white"
    },
    table: {
        minWidth: 650,
    },
    chatSection: {
        width: '100%',
        height: '95vh'
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
        height: '70vh',
        overflowY: 'auto'
    }
});

export default function Direct() {
    const classes = useStyles();
    const h=useHistory();
    const [selected,setSelected]=useState("");
    const username=localStorage.getItem('username');
    const [chats, setChats] = React.useState([]);
    const [archived,setArchived]=useState([]);
    const [notArchived,setNotArchived]=useState([]);
    const [read,setRead]=useState([]);
    const [notRead,setNotRead]=useState([]);
    const [value, setValue] = React.useState(0);
    const [connections,setConnections]=useState([]);
    const [loading,setLoading]=useState(false);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function getData(){
        setLoading(true);
        axios.get('http://localhost:5000/getchats', {
            params: {
                username,
            }
        }).then(({data:{connections,chats,archived,notArchived,read,notRead}}) => {
            setChats(chats);
            setArchived(archived);
            setNotArchived(notArchived);
            setRead(read);
            setNotRead(notRead);
            setConnections(connections);
            setLoading(false)
        }).catch((err) => {
            console.log(err);
        })
    }
    function addChat(username2){
        setLoading(true)
        axios.post('http://localhost:5000/addChat', {
            username2,
            username
        }).then((r) => {
            getData();
        })
            .catch((e) => console.log(e))
    }
    useEffect(()=>{
        getData();
    }, [username]);


    if (loading)
        return <Circular/>;
    return (<div>
        <Grid container component={Paper} className={classes.chatSection}>
            <Grid item xs={3} className={classes.borderRight500}>

                <Divider/>

                <div className={classes.root}>
                    <AppBar position="static" color="default">
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="scrollable"
                            scrollButtons="auto"
                            aria-label="scrollable auto tabs example"
                        >
                            <Tab label="All" {...a11yProps(0)} />
                            <Tab label="UnRead" {...a11yProps(1)} />
                            <Tab label="Read" {...a11yProps(2)} />
                            <Tab label="Archived" {...a11yProps(3)} />
                            <Tab label="Not Archived" {...a11yProps(4)} />
                            <Tab label="New Chat" {...a11yProps(5)} />
                        </Tabs>
                    </AppBar>
                    <ListItem  >
                        <ListItemIcon>
                            <Avatar src="https://material-ui.com/static/images/avatar/3.jpg"/>
                        </ListItemIcon>
                        <ListItemText primary={selected}>{selected}</ListItemText>
                    </ListItem>
                    <Divider/>
                    <Divider/>
                    <TabPanel value={value} index={0}>
                        <List>
                            {chats.map((contact)=><ListItem key={contact.chatId} button
                                                            onClick={(e)=>{
                                                                h.push(`/direct/${contact.isArchived}/${contact.isRead}/${contact.chatId}`)
                                                                setSelected(contact.username)
                                                            }} >
                                <ListItemIcon>
                                    <Avatar alt="Cindy Baker" src="https://material-ui.com/static/images/avatar/2.jpg"/>
                                </ListItemIcon>
                                <ListItemText primary={contact.name}>{contact.name}</ListItemText>
                            </ListItem>)}

                        </List>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <List>
                            {notRead.map((contact)=><ListItem key={contact.chatId} button onClick={(e)=>{
                                h.push(`/direct/${contact.isArchived}/${contact.isRead}/${contact.chatId}`)
                                setSelected(contact.username)
                            }} >
                                <ListItemIcon>
                                    <Avatar alt="Cindy Baker" src="https://material-ui.com/static/images/avatar/2.jpg"/>
                                </ListItemIcon>
                                <ListItemText primary={contact.name}>{contact.name}</ListItemText>
                            </ListItem>)}

                        </List>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <List>
                            {read.map((contact)=><ListItem key={contact.chatId} button onClick={(e)=>{
                                h.push(`/direct/${contact.isArchived}/${contact.isRead}/${contact.chatId}`)
                                setSelected(contact.username)
                            }} >
                                <ListItemIcon>
                                    <Avatar alt="Cindy Baker" src="https://material-ui.com/static/images/avatar/2.jpg"/>
                                </ListItemIcon>
                                <ListItemText primary={contact.name}>{contact.name}</ListItemText>
                            </ListItem>)}

                        </List>
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <List>
                            {archived.map((contact)=><ListItem key={contact.chatId} button onClick={(e)=>{
                                h.push(`/direct/${contact.isArchived}/${contact.isRead}/${contact.chatId}`)
                                setSelected(contact.username)
                            }}>
                                <ListItemIcon>
                                    <Avatar alt="Cindy Baker" src="https://material-ui.com/static/images/avatar/2.jpg"/>
                                </ListItemIcon>
                                <ListItemText primary={contact.name}>{contact.name}</ListItemText>
                            </ListItem>)}

                        </List>
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        <List>
                            {notArchived.map((contact)=><ListItem button key={contact.chatId} onClick={(e)=>{
                                h.push(`/direct/${contact.isArchived}/${contact.isRead}/${contact.chatId}`)
                                setSelected(contact.username)
                            }} >
                                <ListItemIcon>
                                    <Avatar alt="Cindy Baker" src="https://material-ui.com/static/images/avatar/2.jpg"/>
                                </ListItemIcon>
                                <ListItemText primary={contact.name}>{contact.name}</ListItemText>
                            </ListItem>)}

                        </List>
                    </TabPanel>
                    <TabPanel value={value} index={5}>
                        <List>
                            {connections.map((contact)=><ListItem button key={contact.chatId} onClick={(e)=>addChat(contact.username)} >
                                <ListItemIcon>
                                    <Avatar alt="Cindy Baker" src="https://material-ui.com/static/images/avatar/2.jpg"/>
                                </ListItemIcon>
                                <ListItemText primary={contact.name}>{contact.name}</ListItemText>
                            </ListItem>)}

                        </List>
                    </TabPanel>
                </div>

            </Grid>
            <Chat getData={getData} username={username} classes={classes}/>
        </Grid>
    </div>)

}
