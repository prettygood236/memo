import React, { useState, useEffect } from 'react';
import { makeStyles } from  '@material-ui/core/styles';

import { useDispatch, useSelector } from 'react-redux';

import { Container, Grid, Paper, Box } from "@material-ui/core";

import { memoCount, getMemosByLabel, memoList, deleteMemo, saveMemo } from '../../state/reducers/memoReducer';
import { labelList, deleteLabel, getLabelsByMemo } from '../../state/reducers/labelReducer';

import Labels from './Labels';
import SummaryList from './SummaryList';
import Notepad from './Notepad';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(5),
    },
    peper: {
        color: theme.palette.text.secondary
    }
}))

// const getSelectedLabel = (label) => {
//     return label;
// };

export default function Memo() {
    const classes = useStyles();

    const dispatch = useDispatch();

    const labelSelector = useSelector(state => state.label);
    const memoSelector = useSelector(state => state.memo);

    const [ totalCount, setTotalCount ] = useState(0);
    const [ selectLabel, setSelectLabel ] = useState();

    // const selectedlabel = useMemo(() => getSelectedLabel(label), [label]);

    const [ totalLabels, setTotalLabels ] = useState([]);
    const [ labels, setLabels ] = useState([]);
    
    const [ selectMemo, setSelectMemo ] = useState();
    const [ memos, setMemos ] = useState([]);
 
    useEffect(() => {
        memoCount(dispatch);
        labelList(dispatch);
    }, [])

    useEffect(() => {
        if (labelSelector && labelSelector.list) {
            setTotalLabels(labelSelector.list.data);
        }
        if (labelSelector && labelSelector.labels) {
            setLabels(labelSelector.labels.data);
        }
    }, [ labelSelector ]);

    useEffect(() => {
        if (memoSelector && memoSelector.count) {
            setTotalCount(memoSelector.count.data)
        }

        if (memoSelector && memoSelector.list) {
            setMemos(memoSelector.list.data);
        }
    }, [ memoSelector ]);

    const handleSelectLabel = (label) => {
        setSelectLabel(label)
        // getSelectedLabel(label)
        if (label) getMemosByLabel(dispatch, label.id)
        else       memoList(dispatch)
    }

    const handleReloadLabels = () => {
        memoCount(dispatch);
        labelList(dispatch);
    }
    
    const handleDeleteLabel = () => {
        setSelectLabel()
        setMemos([])
        deleteLabel(dispatch, selectLabel.id)
    }

    const handelCreateMemo = () => {
        setSelectMemo()
        setLabels([])
    }
    const handleSelectMemo = (memo) => {
        setSelectMemo(memo);
        getLabelsByMemo(dispatch, memo.id);
    }
    const handleSaveMemo = (memo) => {
        saveMemo(dispatch, memo)
        handleReloadLabels()
    }
    const handleUpdateMemo = (memo) => {
        saveMemo(dispatch, memo)
        handleSelectLabel(selectLabel)
    }
    const handleDeleteMemo = (memo) => {
        setSelectMemo();
        setLabels([]);

        if (memo && memo.id) {
            deleteMemo(dispatch, memo.id);
            handleReloadLabels();
            handleSelectLabel(selectLabel);
        }
    }

    return (
        <div className={classes.root}>
            <Container>
                <Grid container direction="row" spacing={1}>
                    <Grid item xs={2}>
                        <Box className={classes.paper} component={Paper}>
                            <Labels totalCount={totalCount} labels={totalLabels} selectLabel={handleSelectLabel} />
                        </Box>
                    </Grid>
                    <Grid item xs={3}>
                        <Box className={classes.paper} component={Paper}>
                            <SummaryList 
                                memos={memos} 
                                createMemo={handelCreateMemo}
                                selectMemo={handleSelectMemo} 
                                totalLabels={totalLabels} 
                                selectLabel={selectLabel} 
                                deleteLabel={handleDeleteLabel} 
                                reloadLabels={handleReloadLabels} />
                        </Box>
                    </Grid>
                    <Grid item xs={7}>
                        <Box mt={1.5} className={classes.paper} component={Paper}>
                            <Notepad 
                                memo={selectMemo}
                                setMemo={setSelectMemo}
                                labels={labels}
                                saveMemo={handleSaveMemo} 
                                updateMemo={handleUpdateMemo} 
                                deleteMemo={handleDeleteMemo} 
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}