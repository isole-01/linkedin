import {Grid} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import RequestCard from './RequestCard';
import axios from "axios";
import Circular from "../../myComponents/Circular";


const Requests = () => {
    const [loading,setLoading]=useState(false);
    const [requests, setRequests] = useState([]);
    const username = localStorage.getItem('username');


    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:5000/getConnectionRequests', {
            params: {
                username,
            }
        }).then(({data: {requests}}) => {
            setRequests(requests);
            setLoading(false)
        }).catch((err) => {
            console.log(err);
        })
    }, [username]);

    if (loading)
        return <Circular/>;
    return (
        <Grid item container spacing={1} xs={12}>
            {requests.map(request => {
                return <RequestCard key={request.username} id={request.username} avatar={request.avatar}
                                    name={`${request.firstName} ${request.lastName} (${request.username})`}
                                    text={`You have ${request.count} mutual connections.`}
                                    date={"Jul 06 2020 01:30:51"} />
            })}

        </Grid>
    )

};

export default Requests;
