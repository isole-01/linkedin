import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/core/SvgIcon/SvgIcon";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import React, {useState} from "react";
import {makeStyles} from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Datetime from "react-datetime";
import TextareaAutosize from "@material-ui/core/TextareaAutosize/TextareaAutosize";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import CustomDropdown from "../../components/CustomDropdown/CustomDropdown";
const modalStyle = {
    modal: {
        borderRadius: "6px",
        width: "50vw"
    },
    modalHeader: {
        borderBottom: "none",
        paddingTop: "24px",
        paddingRight: "24px",
        paddingBottom: "0",
        paddingLeft: "24px",
        minHeight: "16.43px"
    },
    modalTitle: {
        margin: "0",
        lineHeight: "1.42857143"
    },
    modalCloseButton: {
        color: "#999999",
        marginTop: "-12px",
        WebkitAppearance: "none",
        padding: "0",
        cursor: "pointer",
        background: "0 0",
        border: "0",
        fontSize: "inherit",
        opacity: ".9",
        textShadow: "none",
        fontWeight: "700",
        lineHeight: "1",
        float: "right"
    },
    modalClose: {
        width: "16px",
        height: "16px"
    },
    modalBody: {
        paddingTop: "24px",
        paddingRight: "24px",
        paddingBottom: "16px",
        paddingLeft: "24px",
        position: "relative"
    },
    modalFooter: {
        padding: "15px",
        textAlign: "right",
        paddingTop: "0",
        margin: "0"
    },
    modalFooterCenter: {
        marginLeft: "auto",
        marginRight: "auto"
    }
};


const useStylesModal = makeStyles(modalStyle);
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});


export default function BackgroundDialog({modalOpen, setModalOpen, backgrounds, setBackgrounds, ...props}) {
    const [sdate, setsDate] = React.useState("");
    const [edate, seteDate] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [type,setType]=React.useState("Type");
    const [description, setDescription] = React.useState("");
    const [sdateValid, setsDateValid] = React.useState(true);
    const [edateValid, seteDateValid] = React.useState(true);
    const [addEndDate,setAddEndDate]=useState(false);

    const handlesDate = (e) => {
        if (typeof e === "string") {
            setsDateValid(false);
        }
        setsDate(e)
    };
    const handleeDate = (e) => {
        if (typeof e === "string") {
            seteDateValid(false);
        }
        seteDate(e)
    };
    const modalClasses = useStylesModal();
    return (
        <div>
            <Dialog

                classes={{
                    root: modalClasses.center,
                    paper: modalClasses.modal
                }}
                open={modalOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setModalOpen(false)}
                aria-labelledby="modal-slide-title"
                aria-describedby="modal-slide-description"
            >
                <DialogTitle
                    id="classic-modal-slide-title"
                    disableTypography
                    className={modalClasses.modalHeader}
                >
                    <IconButton
                        className={modalClasses.modalCloseButton}
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={() => setModalOpen(false)}
                    >
                        <Close className={modalClasses.modalClose}/>
                    </IconButton>
                    <h4 className={modalClasses.modalTitle}>Add Accomplishment</h4>
                </DialogTitle>
                <DialogContent
                    id="modal-slide-description"
                    className={modalClasses.modalBody}
                >
                    <GridContainer direction={"row"}>
                        <GridItem>
                            <CustomDropdown
                                onClick={(val)=>setType(val)}
                                dropup
                                dropdownHeader="Dropdown header"
                                buttonText={type}
                                buttonProps={{
                                    round: true,
                                    color: "info"
                                }}
                                dropdownList={[
                                    "work",
                                    "education",
                                    "license",
                                    "volunteer"
                                ]}
                            />
                        </GridItem>
                        <GridItem>
                            <CustomInput
                                labelText="Title"
                                id="accotype"
                                formControlProps={{
                                    fullWidth: false
                                }}
                                inputProps={{
                                    type: "text",
                                    value: `${title}`,
                                    onChange: (e) => {
                                        setTitle(e.target.value);
                                    },
                                }}
                            />
                        </GridItem>
                        <GridItem>
                            <Datetime
                                timeFormat={false}
                                onChange={(e) => handlesDate(e)}
                                value={sdate}
                                inputProps={{
                                    required: true,
                                    placeholder: "start date"
                                }}
                            />
                        </GridItem>
                        {
                            addEndDate ? <Button onClick={()=>setAddEndDate(false)}>Till present </Button>:null
                        }

                        {addEndDate ? <GridItem>
                            <Datetime
                                timeFormat={false}
                                onChange={(e) => handleeDate(e)}
                                value={edate}
                                inputProps={{
                                    required: true,
                                    placeholder: "end date"
                                }}
                            />
                        </GridItem> : <Button onClick={()=>setAddEndDate(true)}> Add end date</Button>}
                    </GridContainer>
                    <TextareaAutosize rowsMin={4}
                                      style={{
                                          borderColor: "#9c27b0",
                                          borderRadius: "5px",
                                          borderWidth: "1px",
                                          width: "100%",
                                          marginTop: "3vh",
                                          height: "20vh"
                                      }}
                                      value={description}
                                      onChange={(e) => setDescription(e.target.value)}
                                      aria-label="maximum height"
                                      placeholder="Description"/>
                </DialogContent>
                <DialogActions
                    className={modalClasses.modalFooter + " " + modalClasses.modalFooterCenter}
                >
                    <Button onClick={() => {
                        const acc = [...backgrounds, {title,type ,description, sdate,edate: addEndDate ? edate : null}];
                        setBackgrounds(acc);
                        setModalOpen(false);
                    }
                    }>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
