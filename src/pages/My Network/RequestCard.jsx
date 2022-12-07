import React, {useState} from 'react';
import {Grid} from '@material-ui/core';
import {makeStyles, createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import {green, red} from '@material-ui/core/colors';
import axios from "axios";

const useStyles = makeStyles({
    root: {
        boxShadow: "none",
        borderRadius: "10px",
        border: "1px solid #e8e8e8"
    }
});

const buttonsTheme = createMuiTheme({
    palette: {
        primary: green,
        secondary: red,
    },
});

const RequestCard = (props) => {
    const classes = useStyles();

    const [addDecline, setAddDecline] = useState(null);

    const [message, setMessage] = useState("");

    const accept = () => {
        axios.post('http://localhost:5000/connectaccept', {
            username2: localStorage.getItem('username'),
            username1: props.id
        }).then((r) => {
            setAddDecline(true);
            setMessage("Request Accepted");
        })
            .catch((e) => console.log(e))

    };
    const decline = () => {
        axios.post('http://localhost:5000/connectdecline', {
            username2: localStorage.getItem('username'),
            username1: props.id
        }).then((r) => {
            setAddDecline(false);
            setMessage("Request Declined");
        })
            .catch((e) => console.log(e))

    };



    return (
        <Grid item xs={12}>
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar src={props.avatar} aria-label="recipe" className={classes.avatar}>
                            {props.name.substring(0, 1)}
                        </Avatar>
                    }
                    action={
                        addDecline === null && <ThemeProvider theme={buttonsTheme}>
                            <ButtonGroup aria-label="settings">
                                <Button onClick={accept} variant="outlined" color='primary'><CheckIcon/></Button>
                                <Button onClick={decline} variant="outlined" color='secondary'><ClearIcon/></Button>
                            </ButtonGroup>
                        </ThemeProvider>
                    }
                    title={addDecline === null ? props.name : message}
                    subheader={addDecline === null && "Requested on " + props.date}
                />
                {addDecline === null && <CardContent>
                    <Typography className={classes.pos} variant="body2" component="p">
                        {props.text}
                    </Typography>
                </CardContent>}
            </Card>
        </Grid>
    );
};


export default RequestCard;
