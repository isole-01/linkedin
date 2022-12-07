import React from "react";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import LockIcon from '@material-ui/icons/Lock';
// core components
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import ErrorDialog from "myComponents/ErrorDialog";

import axios from "axios";
import image from "assets/img/bg7.jpg";
import {Link as Rlink} from "react-router-dom";
import {Link} from "@material-ui/core";


import {useHistory} from 'react-router-dom'
import CircularProgress from "@material-ui/core/CircularProgress";


const useStyles = makeStyles(styles);

export default function LoginPage(props) {
    const h = useHistory()
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");


    const [modalOpen, setModalOpen] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('Wrong Information');


    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        axios.post('http://localhost:5000/signIn', {
            email: email, password: password
        }).then(async (res) => {
            localStorage.setItem('username', res.data.username);
            h.push('/home');
        }).catch((res) => setModalOpen(true))

    };
    const handleEmail = (e) => {
        setEmail(e.target.value)
    };
    const handlePassword = (e) => {
        setPassword(e.target.value)
    };

    setTimeout(function () {
        setCardAnimation("");
    }, 700);

    const {...rest} = props;
    return (
        <div>
            <div
                className={classes.pageHeader}
                style={{
                    backgroundImage: "url(" + image + ")",
                    backgroundSize: "cover",
                    backgroundPosition: "top center"
                }}
            >
                <div className={classes.container}>

                    <ErrorDialog modalOpen={modalOpen}
                                 setModalOpen={setModalOpen}
                                 setErrorMessage={setErrorMessage}
                                 errorMessage={errorMessage}/>

                    <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={4}>
                            <Card className={classes[cardAnimaton]}>
                                <form className={classes.form} onSubmit={() => null}>
                                    <CardHeader color="primary" className={classes.cardHeader}>
                                        <h4>Login</h4>
                                        <div className={classes.socialLine}>

                                        </div>
                                    </CardHeader>
                                    <CardBody>
                                        <CustomInput
                                            labelText="Username..."
                                            id="usrnamm"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: "text",
                                                required: true,
                                                value: `${email}`,
                                                onChange: (e) => {
                                                    handleEmail(e)
                                                },
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <Email className={classes.inputIconsColor}/>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                        <CustomInput
                                            labelText="Password"
                                            id="pass"
                                            formControlProps={{
                                                fullWidth: true,

                                            }}
                                            inputProps={{
                                                type: "password",
                                                required: true,
                                                value: `${password}`,
                                                onChange: (e) => {
                                                    handlePassword(e)
                                                },
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <LockIcon/>
                                                    </InputAdornment>
                                                ),
                                                autoComplete: "off"
                                            }}
                                        />
                                    </CardBody>
                                    <CardFooter className={classes.cardFooter}>
                                        <GridContainer direction={"column"}>

                                            <Button onClick={handleSubmit} type={"submit"} simple color="primary"
                                                    size="lg">
                                                Login
                                            </Button>
                                            {loading ? <GridContainer justify={"center"} style={{
                                                alignContent: "center",
                                                marginDown: "4px"
                                            }}><CircularProgress/>
                                            </GridContainer> : null}
                                            <Rlink to={'/signup'}>
                                                <Link fullWidth style={{display: "block"}}>
                                                    Don't have an account? Sign Up
                                                </Link>
                                            </Rlink>
                                        </GridContainer>
                                    </CardFooter>
                                </form>
                            </Card>
                        </GridItem>
                    </GridContainer>
                </div>
                <Footer whiteFont/>
            </div>
        </div>
    );
};

