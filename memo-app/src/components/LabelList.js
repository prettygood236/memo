import React from 'react';
import { makeStyles } from  '@material-ui/core/styles';

import { Grid, Box } from "@material-ui/core";
import { List, ListItem, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    ellipsis: {
        maxWidth: "8rem",
        display: "inline-block",
        overflow: "hidden",
        textOverflow: "ellipsis",
    }
}))

export default function LabelListItem(props) {
    const classes = useStyles();

    const { labels, handleClickItem } = props

    return (
        <List component="nav" aria-label="labels">
            {labels && labels.map((label, idx) => (
                <ListItem key={idx} button onClick={() => handleClickItem(label)} divider>
                    <Grid container direction="row" justifyContent="center" alignItems="center">
                        <Box className={classes.ellipsis} component={Typography}>
                            {label.title}
                        </Box>
                        <Box component={Typography}>
                            ({label.memoCount})
                        </Box>
                    </Grid>
                </ListItem>
            ))}
        </List>
    );
}