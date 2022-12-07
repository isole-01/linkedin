import GridContainer from "../../components/Grid/GridContainer";
import React from "react";
import Requests from "./Requests";
import Suggestions from "./Suggestions";


export default function MyNetwork() {
    return <GridContainer style={{margin:"3vh"}}>
        <Requests/>
        <h4> People You May Know</h4>
        <Suggestions/>

    </GridContainer>

}
