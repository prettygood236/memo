import React from 'react';
import { makeStyles } from  '@material-ui/core/styles';

import { Chip } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%'
    },
    chip: {
        margin: '5px',
        height: '100%',
        maxWidth: "5rem",
        display: "inline-block",
        overflow: "hidden",
        textOverflow: "ellipsis",

    }
}))

export default function LabelChips(props) {
    const classes = useStyles();

    const { labels } = props

    return (
        <div className={classes.root}>
            {labels && labels.map((label, idx) => (
                <Chip key={idx} className={classes.chip} label={label.title} variant="outlined" />
            ))}
        </div>
    );
}