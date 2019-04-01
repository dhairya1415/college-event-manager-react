import React from "react";

import {
    Button,
    TextField,
    Typography,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
} from "@material-ui/core";
import {
    ExpandMore as ExpandMoreIcon,
    Email as EmailIcon,
    Delete as DeleteIcon,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";

import client from "../util/client";
import { ENDPOINT } from "../util/constants";
import { act, useDispatch } from "../store";

// -----

const useStyles = makeStyles((theme) => ({
    reportForm: {
        padding: "1rem",
        paddingTop: "0.5rem",
    },

    submitContainer: {
        padding: "16px",
        display: "flex",
        justifyContent: "flex-end",
    },

    submitButton: {
        position: "absolute",
        right: "1rem",
        bottom: "0",
    },
}));

function EventDetails({ event }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleDelete = () => {
        client.reports
            .delete(event.report)
            .then(() => dispatch(act.CLOSE_DAY_DIALOG()));
    };

    const handleEmail = (e) => {
        if(event.report) {
            client.sendEmailToFaculty(event.report)
            .then(() => alert("Email Sent!"));
        }
    };

    return (
        <ExpansionPanel defaultExpanded>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{event.title}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{ flexDirection: "column" }}>
                <TextField
                    label='Venue'
                    value={event.venue}
                    disabled
                    margin='normal'
                    variant='outlined'
                    fullWidth
                />
                <TextField
                    label='Description'
                    value={event.description}
                    disabled
                    margin='normal'
                    variant='outlined'
                    fullWidth
                />
                <TextField
                    label='Department'
                    value={event.department}
                    disabled
                    margin='normal'
                    variant='outlined'
                    fullWidth
                />
                <TextField
                    label='Organizer'
                    value={event.organizer}
                    disabled
                    margin='normal'
                    variant='outlined'
                    fullWidth
                />

                <div className={classes.submitContainer}>
                    {event.report ? (
                        <span>
                            <Button
                                color='secondary'
                                variant='contained'
                                type='submit'
                                onClick={handleDelete}
                                style={{
                                    marginRight: "1rem",
                                }}>
                                <DeleteIcon /> Delete Report
                            </Button>
                            <Button
                                color='secondary'
                                variant='contained'
                                type='submit'
                                onClick={handleEmail}
                                style={{
                                    marginRight: "1rem",
                                }}>
                                <EmailIcon /> Email to Faculty
                            </Button>
                            <Button
                                color='secondary'
                                variant='contained'
                                type='submit'
                                component='a'
                                href={`${ENDPOINT}/report_pdf_download/${event.report}`}>
                                Download Report PDF
                            </Button>
                        </span>
                    ) : (
                        <Button
                            color='primary'
                            variant='contained'
                            type='submit'
                            onClick={() =>
                                dispatch(act.START_ADD_REPORT(event))
                            }>
                            Fill Report
                        </Button>
                    )}
                </div>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
}

export default EventDetails;
