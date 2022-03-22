import React, { useEffect, useState } from 'react';
import { makeStyles } from  '@material-ui/core/styles';

import { Grid, Box, Typography } from "@material-ui/core";
import { TextareaAutosize, Button, Divider } from '@material-ui/core';

import moment from 'moment';
import LabelChips from '../../components/LabelChips';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%'
    },
    titleTextarea: {
        width: '90%',
        outline: 'none',
        border: 'none',
        resize: "none",
        fontSize: 'x-large'
    },
    contentTextarea: {
        width: '90%',
        outline: 'none',
        border: 'none',
        resize: "none",
        fontSize: 'large'
    }
}))

export default function Notepad(props) {
    const classes = useStyles();

    const { memo, setMemo, labels, saveMemo, updateMemo, deleteMemo } = props;

    const [ edit, setEdit ] = useState(false);

    useEffect(() => {
        setEdit(!memo);
    }, [memo])

    const handleClickSave = () => {
        setEdit(false)
        if (memo && memo.id) updateMemo(memo)
        else                 saveMemo(memo)
    }
    const handleClickDelete = () => {
        setMemo()
        deleteMemo(memo)
    }
    const handleClickEdit = () => {
        setEdit(true)
    }

    const handleChangeTitle = (e) => {
        setMemo(Object.assign({}, memo, { title: e.target.value }));
    }
    const handleChangeContent = (e) => {
        const value = e.target.value
        if (validateText(value)) {
            setMemo(Object.assign({}, memo, { content: e.target.value }));
        }
    }

    function validateText(text) {
        const regex =  new RegExp('^[a-zA-zㄱ-ㅎㅏ-ㅣ가-힣\n ]*$', 'g')
        return regex.test(text)
    }

    return (
        <div className={classes.root}>
            <Grid container direction="column" spacing={3}>
                <Grid container item direction='row'>
                    <Grid item container xs={8}>
                        <Box width={1}>
                            <TextareaAutosize
                                className={classes.titleTextarea}
                                maxRows={2}
                                aria-label="maximum height"
                                placeholder="새로운 메모의 제목"
                                value={memo ? memo.title : ''} 
                                disabled={!edit}
                                onChange={handleChangeTitle} />
                        </Box>
                    </Grid>
                    <Grid item container xs={4} direction="row">
                        <Box component={Button} onClick={handleClickSave}>
                            저장
                        </Box>
                        <Box component={Button} onClick={handleClickDelete}>
                            삭제
                        </Box>
                        <Box component={Button} onClick={handleClickEdit}>
                            수정
                        </Box>
                    </Grid>
                    <Box width={1}><Divider /></Box>

                </Grid>
                <Grid item container direction='row'>
                    <Grid item xs={8}>
                        <LabelChips labels={memo && memo.id ? labels : []} />
                    </Grid>
                    <Grid item xs={4}>
                        <Box>
                            <Typography variant='caption'>
                                메모 생성일 : {memo && moment(memo.createdAt).format('yyyy.MM.DD')}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant='caption'>
                                메모 수정일 : {memo && moment(memo.updatedAt).format('yyyy.MM.DD')}
                            </Typography>
                        </Box>
                    </Grid>
                    <Box width={1} mt={1}><Divider /></Box>
                </Grid>
                <Grid item>
                    <Box width={1}>
                        <TextareaAutosize
                            className={classes.contentTextarea}
                            maxRows={30}
                            minRows={15}
                            aria-label="maximum height"
                            placeholder="새로운 내용을 적어주세요."
                            value={memo ? memo.content : ""}
                            disabled={!edit}
                            onChange={handleChangeContent} />
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
}