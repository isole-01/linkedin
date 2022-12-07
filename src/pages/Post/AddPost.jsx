import TextareaAutosize from "@material-ui/core/TextareaAutosize/TextareaAutosize";
import React, {useState} from "react";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Button from "components/CustomButtons/Button.js";
import axios from "axios";
import Circular from "../../myComponents/Circular";


export default function AddPost() {
    const [text, setText] = React.useState("");
    const [posted,setPosted]=useState(false)
    const [loading,setLoading]=useState(false);
    const handleSubmit = () => {
        setLoading(true)
        axios.post('http://localhost:5000/addpost', {
            text,
            username: localStorage.getItem('username')
        }).then((r) => setPosted(true))
            .catch((e) => console.log(e))
    };
    if (posted)
        return <h5>Post was added Successfully!</h5>
    if (loading)
        return <Circular/>;
    return <div style={{margin: "3vw"}}>
        <GridContainer>

            <GridItem><h5>Add Post</h5></GridItem>
            <GridItem>
                <TextareaAutosize rowsMin={4}
                                  style={{
                                      borderColor: "#9c27b0",
                                      borderRadius: "5px",
                                      borderWidth: "1px",
                                      width: "100%",
                                      marginTop: "3vh",
                                      height: "20vh"
                                  }}
                                  value={text}
                                  onChange={(e) => setText(e.target.value)}
                                  aria-label="maximum height"
                                  placeholder="add post..."/>
            </GridItem>
        </GridContainer>
        <GridItem>
            <Button onClick={handleSubmit} type={"submit"} simple color="primary" size="lg">
                Submit
            </Button>
        </GridItem>

    </div>

}
