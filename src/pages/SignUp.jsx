import React, {useState} from "react";
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

import image from "assets/img/bg7.jpg";
import {Link as Rlink, Redirect} from "react-router-dom";
import {Link} from "@material-ui/core";


import CircularProgress from "@material-ui/core/CircularProgress";
import ErrorDialog from "../myComponents/ErrorDialog";
import SuccessDialog from "../myComponents/SuccessDialog";
import axios from "axios";

const useStyles = makeStyles(styles);


function Page(props) {
    const [firstName, setFirstName] = React.useState("");
    const [lastName,setLastName]=useState("");
    const [loading, setLoading] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [errorModal, setErrorModal] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('Something Went Wrong');
    const [enrollModal, setEnrollModal] = React.useState(false);


    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        axios.post('http://localhost:5000/signUp', {
            email: email, password: password,firstName,lastName
        }).then((res) => {
            setLoading(false)
            setEnrollModal(true)
        }).catch((res) => setErrorModal(true))
    };


    const [password, setPassword] = React.useState("");
    const handleEmail = (e) => {
        setEmail(e.target.value)
    };
    const handlePassword = (e) => {
        setPassword(e.target.value)
    };
    const handleFirstName = (e) => {
        setFirstName(e.target.value)
    };
    const handleLastName = (e) => {
        setLastName(e.target.value)
    };


    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function () {
        setCardAnimation("");
    }, 700);
    const classes = useStyles();
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
                    <GridContainer justify="center">

                        <SuccessDialog
                            message={'Account Was Created Successfully'}
                            modalOpen={enrollModal}
                            setModalOpen={setEnrollModal}
                        />

                        <ErrorDialog modalOpen={errorModal}
                                     setModalOpen={setErrorModal}
                                     errorMessage={errorMessage}
                                     setErrorMessage={setErrorMessage}
                        />

                        <GridItem xs={12} sm={12} md={4}>
                            <Card className={classes[cardAnimaton]}>
                                <form className={classes.form}>
                                    <CardHeader color="primary" className={classes.cardHeader}>
                                        <h4>Register</h4>
                                        <div className={classes.socialLine}>

                                        </div>
                                    </CardHeader>
                                    <CardBody>
                                        <CustomInput
                                            labelText="FirstName"
                                            id="namefsa"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: "text",
                                                required: true,
                                                value: `${firstName}`,
                                                onChange: (e) => {
                                                    handleFirstName(e)
                                                },
                                            }}
                                        />
                                        <CustomInput
                                            labelText="LastName"
                                            id="nasfmefsa"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: "text",
                                                required: true,
                                                value: `${lastName}`,
                                                onChange: (e) => {
                                                    handleLastName(e)
                                                },
                                            }}
                                        />

                                        <CustomInput

                                            labelText="Username..."
                                            id="usfsnae"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                required: true,
                                                type: "text",
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
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                required: true,
                                                type: "password",
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
                                                Register
                                            </Button>

                                            {loading ? <GridContainer justify={"center"} style={{
                                                alignContent: "center",
                                                marginDown: "4px"
                                            }}><CircularProgress/>
                                            </GridContainer> : null}

                                            <Rlink to={'/login'}>
                                                <Link fullWidth style={{display: "block"}}>
                                                    Login To Your Account
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
}

export default function SignUp(probs) {
    const [toLogin, setToLogin] = React.useState(false);

    if (toLogin)
        return <Redirect to={'/login'}/>;
    return <Page setToLogin={setToLogin}/>

}

