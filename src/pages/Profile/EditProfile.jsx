import React, {useEffect, useState} from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
// @material-ui/icons

// core components
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import CardHeader from "components/Card/CardHeader.js";
import AccomDialog from "./AccomplishmentDialog";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';

import styles from "assets/jss/material-kit-react/views/profilePage.js";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions/CardActions";
import Card from "@material-ui/core/Card/Card";
import BackgroundDialog from "./BackgroundDialog";
import axios from "axios";
import {useHistory} from "react-router-dom";
import moment from "moment";
import Circular from "../../myComponents/Circular";
const useStyles = makeStyles(styles);


const deleteNewItem = (index, newItems, setNewItems) => {
    const newArr = [...newItems];
    newArr.splice(index, 1);
    setNewItems(newArr);
};

const deleteItem = (item, index, items, setItems, deletedItems, setDeletedItems) => {
    setDeletedItems([...deletedItems, item]);
    let narr = [...items];
    narr.splice(index, 1);
    setItems(narr);
};

export default function EditProfilePage(props) {
    const classes = useStyles();
    const h = useHistory();
    const [loading, setLoading] = React.useState(false);
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");

    const [email, setEmail] = React.useState("meow");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");

    const [about, setAbout] = React.useState("");

    const [skills, setSkills] = React.useState([]);
    const [newSkills, setNewSkills] = React.useState([]);
    const [deletedSkills, setDeletedSkills] = React.useState([]);
    const [newSkill, setNewSkill] = React.useState("");

    const [accomps, setAccomps] = React.useState([]);
    const [addAccomplishment, setAddAccomplishment] = React.useState(false);
    const [newAccomplishments, setNewAccomplishments] = React.useState([]);
    const [deletedAccoms, setDeletedAccoms] = React.useState([]);

    const [backgrounds, setBackgrounds] = React.useState([]);
    const [addBackground, setAddBackground] = React.useState(false);
    const [newBackgrounds, setNewBackgrounds] = React.useState([]);
    const [deletedBackgrounds, setDeletedBackgrounds] = React.useState([])

    const username = localStorage.getItem('username');

    function getData(){
        setNewSkills([]);
        setNewAccomplishments([]);
        setNewBackgrounds([]);
        axios.get('http://localhost:5000/profile', {
            params: {
                username,
            }
        }).then(({data: {backgrounds, skills, accomps,
            user: {username,firstName,lastName,country,city,description}}}) => {
            setEmail(username);
            setFirstName(firstName);
            setLastName(lastName);
            setCountry(country);
            setCity(city);
            setAbout(description);
            setBackgrounds(backgrounds);
            setSkills(skills.map((s) => s.skillTitle));
            setAccomps(accomps);
            setLoading(false)
        }).catch((err) => {
            console.log(err);
        })
    }
    useEffect(() => {
        setLoading(true);
        getData()
    }, []);
    const handleNewSkill = (e) => {
        setNewSkill(e.target.value)

    };

    const handleAbout = (e) => {
        setAbout(e.target.value)
    };

    async function handleSubmit() {
        const data = {
            username: localStorage.getItem('username'),
            firstName,
            lastName,
            about,
            country,
            city,
            newSkills,
            newBackgrounds,
            newAccomplishments,
            deletedSkills,
            deletedAccomplishments: deletedAccoms,
            deletedBackgrounds
        };
        try {
            setLoading(true);
            axios.post('http://localhost:5000/editprofile', data)
                .then(()=>{
                getData()
            })
            //h.push(`profile/${localStorage.getItem('username')}`);

        } catch (e) {
            console.log(e)
        }

    }

    if (loading)
        return <Circular/>
    return (
        <div style={{marginTop: "80px"}}>
            <AccomDialog
                setModalOpen={setAddAccomplishment}
                modalOpen={addAccomplishment}
                accomplishments={newAccomplishments}
                setAccomplishments={setNewAccomplishments}

            />
            <BackgroundDialog
                setModalOpen={setAddBackground}
                modalOpen={addBackground}
                backgrounds={newBackgrounds}
                setBackgrounds={setNewBackgrounds}
            />

            <div className={classNames(classes.main, classes.mainRaised)}>
                <div>
                    <div className={classes.container}>
                        <GridContainer justify="left">
                            <GridItem style={{maxWidth: "300px"}}>
                                <CardHeader color="primary" className={classes.cardHeader}>
                                    <h4>Edit Your Profile</h4>
                                </CardHeader>
                            </GridItem>
                            <GridContainer style={{width: "100%"}}>

                                <GridItem style={{maxWidth: "300px"}} xs={12} sm={12} md={6}>
                                    <CustomInput
                                        labelText="Username"
                                        formControlProps={{
                                            fullWidth: false
                                        }}
                                        inputProps={{
                                            disabled: true,
                                            type: "text",
                                            value: `${email}`
                                        }}
                                    />
                                </GridItem>
                                <GridItem style={{maxWidth: "300px"}} xs={12} sm={12} md={6}>
                                    <CustomInput
                                        labelText="First name"
                                        id="firstname"
                                        formControlProps={{
                                            fullWidth: false
                                        }}
                                        inputProps={{

                                            type: "text",
                                            value: `${firstName}`,
                                            onChange: (e) => {
                                                setFirstName(e.target.value)
                                            },
                                        }}
                                    />
                                </GridItem>
                                <GridItem style={{maxWidth: "300px"}} xs={12} sm={12} md={6}>
                                    <CustomInput
                                        labelText="Last name"
                                        id="lastname"
                                        formControlProps={{
                                            fullWidth: false
                                        }}
                                        inputProps={{

                                            type: "text",
                                            value: `${lastName}`,
                                            onChange: (e) => {
                                                setLastName(e.target.value)
                                            },
                                        }}
                                    />
                                </GridItem>
                                <GridItem style={{maxWidth: "300px"}} xs={12} sm={12} md={6}>
                                    <CustomInput
                                        labelText="Country"
                                        id="sdf"
                                        formControlProps={{
                                            fullWidth: false
                                        }}
                                        inputProps={{

                                            type: "text",
                                            value: `${country}`,
                                            onChange: (e) => {
                                                setCountry(e.target.value)
                                            },
                                        }}
                                    />
                                </GridItem>
                                <GridItem style={{maxWidth: "300px"}} xs={12} sm={12} md={6}>
                                    <CustomInput
                                        labelText="City"
                                        id="asfasdf"
                                        formControlProps={{
                                            fullWidth: false
                                        }}
                                        inputProps={{

                                            type: "text",
                                            value: `${city}`,
                                            onChange: (e) => {
                                                setCity(e.target.value)
                                            },
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridItem style={{width: "60vw"}}>
                                <TextareaAutosize rowsMin={4}
                                                  style={{
                                                      borderColor: "#9c27b0",
                                                      borderRadius: "5px",
                                                      borderWidth: "1px",
                                                      width: "100%",
                                                      marginTop: "3vh",
                                                      height: "20vh"
                                                  }}
                                                  value={about}
                                                  onChange={handleAbout}
                                                  aria-label="maximum height"
                                                  placeholder="About"/>
                            </GridItem>

                        </GridContainer>
                        <h3>Skills</h3>
                        <GridContainer>

                            <CustomInput
                                round
                                labelText="New Skill"
                                id="newskill"
                                inputProps={{
                                    type: "text",
                                    value: `${newSkill}`,
                                    onChange: (e) => {
                                        handleNewSkill(e)
                                    },
                                }}
                            />
                            <IconButton onClick={() => {
                                if (newSkill !== "")
                                    setNewSkills([...newSkills, newSkill])
                            }}>
                                <AddIcon/>
                            </IconButton>

                        </GridContainer>
                        <GridContainer direction={"row"} alignContent={"flex-start"} alignItems={"flex-start"}>
                            {skills.map((skill, index) => <GridItem key={skill} style={{maxWidth: "200px"}}
                                                                    className={classes.navWrapper}>
                                {skill}<Button round
                                               onClick={() => deleteItem(skill, index, skills, setSkills, deletedSkills, setDeletedSkills)}>delete</Button>
                            </GridItem>)}
                            {newSkills.map((skill, index) => <GridItem key={skill} style={{maxWidth: "200px"}}
                                                                       className={classes.navWrapper}>
                                {skill}<Button round
                                               onClick={() => deleteNewItem(index, newSkills, setNewSkills)}>delete</Button>
                            </GridItem>)}
                        </GridContainer>
                        <GridContainer>
                            <h3>Accomplishments</h3>
                            <IconButton onClick={() => {
                                setAddAccomplishment(true)
                            }}>
                                <AddIcon/>
                            </IconButton>
                            <GridContainer style={{width: "97%"}}>
                                {accomps.map((accom, index) => <GridItem key={accom.accomplishmentId}>
                                    <Card>
                                        <CardActionArea>
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {accom.title}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    {accom.description}
                                                    <br/>
                                                    {moment(accom.date).format("MMM Do YY")}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            <Button onClick={() => {
                                                setDeletedAccoms([...deletedAccoms,accom.accomplishmentId]);
                                                deleteNewItem(index, accomps, setAccomps)
                                            }} size="small" color="primary">
                                                Delete
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </GridItem>)}
                                {newAccomplishments.map((accom, index) => <GridItem key={accom.accomplishmentId}>
                                    <Card>
                                        <CardActionArea>
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {accom.title}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    {accom.description}
                                                    <br/>
                                                    {accom.date.format("MMM Do YY")}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            <Button onClick={() => {
                                                deleteNewItem(index, newAccomplishments, setNewAccomplishments)
                                            }} size="small" color="primary">
                                                Delete
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </GridItem>)}

                            </GridContainer>
                        </GridContainer>
                        <GridContainer>
                            <h3>Backgrounds</h3>
                            <IconButton onClick={() => {
                                // eslint-disable-next-line eqeqeq
                                setAddBackground(true)
                            }}>
                                <AddIcon/>
                            </IconButton>
                            <GridContainer style={{width: "97%"}}>
                                {backgrounds.map((backg, index) => <GridItem key={backg.backgroundId}>
                                    <Card>
                                        <CardActionArea>
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {backg.title}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    {backg.type}
                                                    <br/>
                                                    {backg.description}
                                                    <br/>
                                                    {moment(backg.startDate).format("MMM Do YY")}-{backg.endDate ? moment(backg.endDate).format("MMM Do YY"):"Till Present"}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            <Button onClick={() => {
                                                setDeletedBackgrounds([...deletedBackgrounds,backg.backgroundId])
                                                deleteNewItem(index, backgrounds, setBackgrounds)
                                            }} size="small" color="primary">
                                                Delete
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </GridItem>)}
                                {newBackgrounds.map((backg, index) => <GridItem key={backg.backgroundId} >
                                    <Card>
                                        <CardActionArea>
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {backg.title}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    {backg.type}
                                                    <br/>
                                                    {backg.description}
                                                    <br/>
                                                    {backg.sdate.format("MMM Do YY")}-{backg.endDate ? moment(backg.endDate).format("MMM Do YY"):"Till Present"}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            <Button onClick={() => {
                                                deleteNewItem(index, newBackgrounds, setNewBackgrounds)
                                            }} size="small" color="primary">
                                                Delete
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </GridItem>)}

                            </GridContainer>
                            <GridItem>
                                <Button color={'success'} type={"submit"} onClick={handleSubmit}>Submit
                                    Changes</Button>
                            </GridItem>
                        </GridContainer>

                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
