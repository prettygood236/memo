import React from 'react';
import { makeStyles } from  '@material-ui/core/styles';

import { Grid, Box } from "@material-ui/core";
import { List, ListItem, ListItemIcon, Typography, Checkbox, Divider } from "@material-ui/core";

import moment from 'moment';

const useStyles = makeStyles(theme => ({
    container: {
        width: '100%'
    },
    titleEllipsis: {
        maxWidth: "7rem",
        display: "inline-block",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    contentEllipsis: {
        maxWidth: "13rem",
        display: "inline-block",
        overflow: "hidden",
        textOverflow: "ellipsis",
    }
}))

export default function MemoList(props) {
    const classes = useStyles();

    const { memos, checked, handleChecked, handleSelect } = props

    return (
        <List component="nav" aria-label="labels">
            {memos && memos.map((memo, idx) => {
                const memoid = `checkbox-list-label-${idx}`;
                const date = moment(memo.updatedAt).format('yyyy.MM.DD')
                
                return <Grid key={memoid} className={classes.container} container item direction='row'>
                    <Grid item xs={2} >
                        <Box ml={2}>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={checked.indexOf(memo) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': memoid }}
                                    onClick={() => handleChecked(memo)}
                                />
                            </ListItemIcon>
                        </Box>
                    </Grid>
                    <Grid item xs={10}>
                        <ListItem role={undefined} dense button onClick={() => handleSelect(memo)}>
                            <Grid container direction="column" spacing={2}>
                                <Grid item container direction='row'>
                                    <Grid item xs={8}>
                                        <Box component="div">
                                            <Typography className={classes.titleEllipsis} noWrap>
                                                {memo.title}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Box>
                                            <Typography variant="caption">
                                                {date}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Box component="div">
                                        <Typography className={classes.contentEllipsis} variant="caption" noWrap>
                                            {memo.content && 0<memo.content.length ? memo.content:"컨텐츠 없음."}
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </ListItem>
                    </Grid>
                    <Box width={1}><Divider /></Box>
                </Grid>
            })}
        </List>
    );
}