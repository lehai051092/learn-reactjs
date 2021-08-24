import React from 'react';
import PropTypes from 'prop-types';
import {Box, Grid, Typography} from "@material-ui/core";
import {Skeleton} from "@material-ui/lab";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2)
    },
    menu: {
        padding: '0',
        margin: '0',
        listStyle: 'none',

        '& > li': {
            marginTop: theme.spacing(1),
            transition: 'all .25s',
        }
    }
}));

FiltersSkeletonList.propTypes = {
    length: PropTypes.number,
};

FiltersSkeletonList.defaultProps = {
    length: 5
};

function FiltersSkeletonList({length}) {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Skeleton variant="rect" width="72%"/>
            <ul className={classes.menu}>
                {
                    Array.from(new Array(length)).map((x, index) => (
                        <li>
                            <Skeleton variant="rect" width="36%"/>
                        </li>
                    ))
                }
            </ul>
        </Box>
    );
}

export default FiltersSkeletonList;