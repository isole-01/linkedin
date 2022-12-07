import React, {useState} from "react";
import GridContainer from "../components/Grid/GridContainer";
import InputAdornment from "@material-ui/core/InputAdornment";
import CustomInput from "../components/CustomInput/CustomInput";
import SearchIcon from '@material-ui/icons/Search';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LanguageIcon from '@material-ui/icons/Language';
import GridItem from "../components/Grid/GridItem";
import Button from "components/CustomButtons/Button.js";
import Divider from "@material-ui/core/Divider";
import PeopleCard from "../myComponents/PeopleCard";
import {Grid} from "@material-ui/core";
import axios from "axios";
import Circular from "../myComponents/Circular";

export default function SearchUser() {
    const [loading,setLoading]=useState(false);
    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("");
    const [position, setPosition] = useState("");
    const [persons, setPersons] = useState([]);
    const username = localStorage.getItem('username');


    function getData(){
        setLoading(true);
        axios.get('http://localhost:5000/searchuser', {
            params: {
                username,
                query: search,
                position,
                location
            }
        }).then(({data: {users}}) => {
            setPersons(users);
            setLoading(false)
        }).catch((err) => {
            console.log(err);
        })
    }

    if (loading)
        return <Circular/>;

    return <GridContainer direction={'column'} style={{margin: "3vh"}}>
        <GridItem>
            <GridContainer style={{width: "100%"}} direction={'row'}>
                <GridItem style={{maxWidth: "300px"}}>
                    <CustomInput
                        labelText="Search"
                        id="srch"
                        formControlProps={{
                            fullWidth: false,

                        }}
                        inputProps={{
                            type: "text",
                            required: true,
                            value: `${search}`,
                            onChange: (e) => {
                                setSearch(e.target.value)
                            },
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon/>
                                </InputAdornment>
                            ),
                            autoComplete: "off"
                        }}
                    />
                </GridItem>
                <GridItem style={{maxWidth: "300px"}}>
                    <CustomInput
                        labelText="Location"
                        id="lction"
                        formControlProps={{
                            fullWidth: false,

                        }}
                        inputProps={{
                            type: "text",
                            required: true,
                            value: `${location}`,
                            onChange: (e) => {
                                setLocation(e.target.value)
                            },
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LocationOnIcon/>
                                </InputAdornment>
                            ),
                            autoComplete: "off"
                        }}
                    />
                </GridItem>
                <GridItem style={{maxWidth: "300px"}}>
                    <CustomInput
                        labelText="Position"
                        id="lnge"
                        formControlProps={{
                            fullWidth: false,
                        }}
                        inputProps={{
                            type: "text",
                            required: false,
                            value: `${position}`,
                            onChange: (e) => {
                                setPosition(e.target.value)
                            },
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LanguageIcon/>
                                </InputAdornment>
                            ),
                            autoComplete: "off"
                        }}
                    />
                </GridItem>

                <Button onClick={getData} type={"submit"} simple color="primary" size="lg">
                    <SearchIcon/>
                    Search
                </Button>
            </GridContainer>
        </GridItem>
        <GridItem>
            <Divider orientation={"horizontal"} style={{color: "red", width: "99%"}}/>
            <br/>

        </GridItem>
        <GridItem>
            <h4>Results</h4>
        </GridItem>
        <GridItem>
            <GridContainer>
                <Grid item container direction={"row"}>
                    {persons.map((person) => <PeopleCard setLoading={setLoading} getData={getData} key={person.username} username={person.username} status={person.status} name={`${person.firstName} ${person.lastName}`} count={person.count}
                                                         job={person.username}/>)}

                </Grid>
            </GridContainer>
        </GridItem>
    </GridContainer>
}
