import React, {useState} from 'react';
import {createMuiTheme, makeStyles, ThemeProvider} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from '@material-ui/icons/Clear';
import {green, red} from "@material-ui/core/colors";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

const buttonsTheme = createMuiTheme({
    palette: {
        primary: green,
        secondary: red,
    },
});

export default function PeopleCard({getData,setLoading,username, name, job, count, status}) {
    const classes = useStyles();
    const h=useHistory();
    const [addDecline, setAddDecline] = useState(null);

    const request = () => {
        setLoading(true);
        axios.post('http://localhost:5000/connectrequest', {
            username2: username,
            username1: localStorage.getItem('username')
        }).then((r) => {
            getData();
        })
            .catch((e) => console.log(e))

    };

    const accept = () => {
        setLoading(true);
        axios.post('http://localhost:5000/connectaccept', {
            username2: localStorage.getItem('username'),
            username1: username
        }).then((r) => {
            setAddDecline(true);
            // setMessage("Request Accepted");
            getData()
        })
            .catch((e) => console.log(e))

    };
    const decline = () => {
        setLoading(true);
        axios.post('http://localhost:5000/connectdecline', {
            username2: localStorage.getItem('username'),
            username1: username
        }).then((r) => {
            setAddDecline(false);
            // setMessage("Request Declined");
            getData();
        })
            .catch((e) => console.log(e))

    };


    return (
        <Card style={{margin: "4px", width: "21vw"}} className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image="/static/images/cards/contemplative-reptile.jpg"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {job}
                        <br/>
                        {count} mutual connections
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                {status === "not related" ? <Button onClick={request} size="small" color="primary">Connect</Button> : null}
                {status === "request pending" ? <Button disabled size="small" color="primary">Pending</Button> : null}
                {status === "acc rej" ? (addDecline === null && <ThemeProvider theme={buttonsTheme}>
                    <ButtonGroup aria-label="settings">
                        <Button onClick={accept} variant="outlined" color='primary'><CheckIcon/></Button>
                        <Button onClick={decline} variant="outlined" color='secondary'><ClearIcon/></Button>
                    </ButtonGroup>
                </ThemeProvider>) : null}
                {status === "connected" ? <Button disabled size="small" color="primary">Connected</Button> : null}

                {/*<ConnectStatus status={status}/>*/}
                <Button onClick={()=>{
                    h.push(`/profile/${username}`)
                }} size={'small'} color={'secondary'}>
                    Profile
                </Button>
            </CardActions>
        </Card>
    );
}
