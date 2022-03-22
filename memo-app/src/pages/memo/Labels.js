import React, { useState, useMemo } from 'react';
import { makeStyles } from  '@material-ui/core/styles';

import { useDispatch } from 'react-redux';

import { Grid, Box, Divider } from "@material-ui/core";
import { Button, Typography } from "@material-ui/core";

import LabelInput from '../../components/LabelInput';
import LabelList from '../../components/LabelList';

import { saveLabel } from '../../state/reducers/labelReducer';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '100%'
    },
    
}))

   

export default function Labels(props) {
    const classes = useStyles();
    
    const { totalCount, labels, selectLabel } = props;

    const dispatch = useDispatch();
    
    const [ addLabel,  setAddLabel ] = useState("");
    const [ showLabel, setShowLabel ] = useState(false);

    const handleSelectTotal = () => selectLabel()
    const handleSelectLabel = (label) => selectLabel(label)
    
    const handleShowAddLabel = (e) => setShowLabel(true)
    const handleDeleteLabel = () => {
        setAddLabel("")
        setShowLabel(false)
    }
    const handleAddLabel = (e) => {
        setShowLabel(false)
        saveLabel(dispatch, Object.assign({}, { title: addLabel }))
    }
    return (
        <div className={classes.root}>
            <Grid container direction="column">
                <Grid item>
                    <Box width={1} component={Button} onClick={handleSelectTotal}>
                        전체메모({totalCount?totalCount:0})
                    </Box>
                    <Box width={1}><Divider /></Box>
                </Grid>
                <Grid item>
                    {labels.length===0 && 
                        <Box component={Typography}>
                            새로운 라벨을 추가해주세요.
                        </Box>
                    }
                    <LabelList labels={labels} handleClickItem={handleSelectLabel} />
                </Grid>
                <Grid item>
                    {showLabel && <LabelInput setLabel={setAddLabel} handleClickAddCallback={handleAddLabel} handleClickDelCallback={handleDeleteLabel}/>}
                </Grid>
                <Grid item>
                    <Box width={1} component={Button} onClick={handleShowAddLabel}>
                        라벨 추가하기
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
}