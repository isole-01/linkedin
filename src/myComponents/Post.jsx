import Card from "../components/Card/Card";
import RegularButton from "../components/CustomButtons/Button";
import GridContainer from "../components/Grid/GridContainer";
import React from "react";

export default function Post({post}) {
    console.log(post.text)
    return <Card>
        {post.text}
        <br/>
        likes:{post.likes}
        comments:{post.comments}
        <GridContainer direction={"row"}>
            <RegularButton>
                like
            </RegularButton>
            <RegularButton>
                add comment
            </RegularButton>
            <RegularButton>
                share
            </RegularButton>
        </GridContainer>
    </Card>

}
