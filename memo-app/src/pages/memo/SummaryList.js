import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from  '@material-ui/core/styles';

import { useDispatch } from 'react-redux';

import { Grid, Box, Divider } from "@material-ui/core";
import { Button, Input, Typography } from "@material-ui/core";

import { ClickAwayListener, Paper, Popper, MenuItem, MenuList } from "@material-ui/core";

import { saveLabel } from '../../state/reducers/labelReducer';
import { addMemosToLabel } from '../../state/reducers/memoReducer';

import MemoList from '../../components/MemoList';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '100%'
    },
    container: {
        width: '100%'
    },
    ellipsis: {
        maxWidth: "13rem",
        display: "inline-block",
        overflow: "hidden",
        textOverflow: "ellipsis",
    }
}))

export default function SummaryList(props) {
    const classes = useStyles();

    const { memos, createMemo, selectMemo, totalLabels, selectLabel, deleteLabel, reloadLabels } = props;

    const dispatch = useDispatch();

    const [ labelsOpen, setLabelsOpen ] = useState(false);
    const [ labelEdit,  setLabelEdit ] = useState(false);
    const [ labelTitle, setLabelTitle ] = useState("");

    const [ memoChecked, setMemoChecked ] = useState([]);

    const anchorRef = useRef(null);
    const prevOpen = useRef(labelsOpen);

    useEffect(() => {
        if (selectLabel) setLabelTitle(selectLabel.title)
    }, [selectLabel])

    useEffect(() => {
        if (prevOpen.current === true && labelsOpen === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = labelsOpen;
    }, [ labelsOpen ]);

    const handleChangeLabel = (value) => setLabelTitle(value)
    const handleClickDeleteLabel = () => deleteLabel()
    const handleClickEditName = () => {
        setLabelEdit(false)
        saveLabel(dispatch, Object.assign({}, selectLabel, { title: labelTitle }))
        reloadLabels()
    }

    const handleCheckedMemo = (memo) => {
        const currentIndex = memoChecked.indexOf(memo);
        const newChecked = [...memoChecked];
    
        if (currentIndex === -1) {
          newChecked.push(memo);
        } else {
          newChecked.splice(currentIndex, 1);
        }
        setMemoChecked(newChecked);
    }
    const handleSelectMemo = (memo) => selectMemo(memo)

    const handleCloseLabels = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setLabelsOpen(false);
    };
    const handleClickOpenLabels = () => setLabelsOpen(true)

    const handleCreateMemo = () => createMemo()

    const handleClickSelectLabel = (label) => {
        addMemosToLabel(dispatch, label.id, memoChecked.map(memo => memo.id))
        reloadLabels()

        setMemoChecked([])
        setLabelsOpen(false)
        setLabelEdit(false)
    }

    return (
        <div className={classes.root}>
            <Grid container direction="column">
                {!selectLabel && memos.length === 0 &&
                    <Grid item>
                        <Box component={Typography}>
                            새로운 메모를 추가하거나 좌측 라벨을 선택해주세요.
                        </Box>
                    </Grid>
                }
                {selectLabel && 
                    <Grid container item direction="column">
                        <Grid item>
                            {labelEdit ?
                                <form noValidate autoComplete="off">
                                    <Input autoFocus type="text" value={labelTitle} placeholder="라벨이름입력" onChange={(e) => handleChangeLabel(e.target.value)}/>
                                </form>
                                :
                                <Box className={classes.ellipsis} component={Typography}>
                                    {labelTitle}
                                </Box>
                            }
                        </Grid>
                        <Grid container item direction="row" justifyContent="center" alignItems="center">
                            <Grid item>
                                <Box component={Button} onClick={() => setLabelEdit(true)}>
                                    이름변경
                                </Box>    
                            </Grid>
                            <Grid item>
                                <Box component={Button} onClick={handleClickEditName}>
                                    설정
                                </Box>    
                            </Grid>
                            <Grid item>
                                <Box component={Button} onClick={handleClickDeleteLabel}>
                                    삭제
                                </Box>    
                            </Grid>
                            <Box width={1}><Divider /></Box>
                        </Grid>
                    </Grid>
                }
                <Grid item>
                    <MemoList memos={memos} checked={memoChecked} handleChecked={handleCheckedMemo} handleSelect={handleSelectMemo}/>
                </Grid>
                <Grid container item direction="row" justifyContent="center" alignItems="center">
                    <Grid item>
                        <Box component={Button} onClick={handleCreateMemo}>
                            새로운 메모
                        </Box>
                    </Grid>
                    <Grid item>
                        <div>
                            <Box component={Button} onClick={handleClickOpenLabels}
                                ref={anchorRef}
                                aria-controls={labelsOpen ? 'menu-list-grow' : undefined}
                                aria-haspopup="true"
                                disabled={memoChecked.length===0}
                            >
                                선택메모 라벨추가
                            </Box>
                            <Popper open={labelsOpen} anchorEl={anchorRef.current} role={undefined} placement={'top'}>
                                <Paper>
                                    <ClickAwayListener mouseEvent="onMouseDown" onClickAway={handleCloseLabels}>
                                        <MenuList autoFocusItem={labelsOpen} id="menu-list-grow" onKeyDown={handleCloseLabels}>
                                            {totalLabels && totalLabels.map((label, idx) => (
                                                <MenuItem key={idx} onClick={(event) => handleClickSelectLabel(label)}>
                                                    {label.title}
                                                </MenuItem>
                                            ))}
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Popper>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}