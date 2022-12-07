import {Grid} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import PeopleCard from "../../myComponents/PeopleCard";
import axios from "axios";
import Circular from "../../myComponents/Circular";

export default function Suggestions() {
    const [persons,setPersons]=useState([]);
    const [loading,setLoading]=useState(false);
    const username=localStorage.getItem('username');
    function getData(){
        setLoading(true)
        axios.get('http://localhost:5000/suggestions', {
            params: {
                username,
            }
        }).then(({data: {users}}) => {
            setLoading(false)
            setPersons(users)
        }).catch((err) => {
            console.log(err);
        })
    }
    useEffect(()=>{
        getData()
    },[username]);

    if (loading)
        return <Circular/>;
    return <Grid item container direction={"row"}>
        {persons.map((person) => <PeopleCard setLoading={setLoading} getData={getData} status={person.status} username={person.username}  name={`${person.firstName} ${person.lastName}`} count={person.count}
                                             job={person.username}/>)}

    </Grid>

}
