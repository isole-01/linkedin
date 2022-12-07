import React from "react";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// core components
import Header from "components/Header/Header.js";
import Button from "components/CustomButtons/Button.js";
import IconButton from "@material-ui/core/IconButton";
import styles from "assets/jss/material-kit-react/views/componentsSections/navbarsStyle.js";
import ChatIcon from '@material-ui/icons/Chat';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {useHistory} from "react-router-dom";
const useStyles = makeStyles(styles);

export default function Navbar() {
    const h=useHistory();
    const classes = useStyles();
    return (
            <div id="navbar" className={classes.navbar}>
                <Header
                    brand="LinkedIn"
                    onClick={()=>h.push('/home')}
                    color="info"
                    rightLinks={
                        <List className={classes.list}>
                            <ListItem className={classes.listItem}>
                                <Button
                                    className={classes.navLink}
                                    onClick={(e) => h.push('/mynetwork')}
                                    color="transparent"
                                >
                                    My Network
                                </Button>
                            </ListItem>
                            <ListItem className={classes.listItem}>
                                <Button
                                    className={classes.navLink}
                                    onClick={(e) => h.push('/searchuser')}
                                    color="transparent"
                                >
                                    Search User
                                </Button>
                            </ListItem>
                            <ListItem className={classes.listItem}>
                                <Button
                                    className={classes.navLink}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        localStorage.removeItem('username');
                                        h.push('/login');

                                    }}
                                    color="transparent"
                                >
                                    Sign Out
                                </Button>
                            </ListItem>
                            <ListItem className={classes.listItem}>
                                <IconButton
                                    justIcon
                                    round
                                    className={classes.notificationNavLink}
                                    onClick={(e) => h.push('/direct')}
                                >
                                    <ChatIcon className={classes.icons} />
                                </IconButton>
                            </ListItem>
                            <ListItem className={classes.listItem}>
                                <IconButton
                                    justIcon
                                    round
                                    className={classes.notificationNavLink}
                                    onClick={(e) => h.push(`/profile/${localStorage.getItem('username')}`)}
                                >
                                    <AccountBoxIcon className={classes.icons} />
                                </IconButton>
                            </ListItem>
                            <ListItem className={classes.listItem}>
                                <IconButton
                                    justIcon
                                    round
                                    className={classes.notificationNavLink}
                                    onClick={(e) => h.push(`/notifications`)}
                                >
                                    <NotificationsIcon className={classes.icons} />
                                </IconButton>
                            </ListItem>
                        </List>
                    }
                />


            </div>
    );
}
