import React from 'react';
import { makeStyles } from  '@material-ui/core/styles';

import { Grid, Box } from "@material-ui/core";
import { Input, IconButton } from "@material-ui/core";

import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%'
    },
}))

export default function LabelInput(props) {
    
    const classes = useStyles();

    const { setLabel, handleClickAddCallback, handleClickDelCallback } = props

    return (
        <div className={classes.root}>
            <Grid container direction="row" justifyContent="center" alignItems="center">
                <Box width={"50%"}>
                    <form noValidate autoComplete="off">
                        <Input autoFocus type="text" placeholder="라벨제목입력" onChange={(e) => setLabel(e.target.value)}/>
                    </form>
                </Box>
                <Box width={"20%"}>
                    <IconButton aria-label="add" onClick={handleClickAddCallback}>
                        <AddBoxIcon />
                    </IconButton>
                </Box> 
                <Box width={"20%"}>
                    <IconButton aria-label="delete" onClick={handleClickDelCallback}>
                        <DeleteIcon />
                    </IconButton>
                </Box> 
            </Grid>
        </div>
    );
}