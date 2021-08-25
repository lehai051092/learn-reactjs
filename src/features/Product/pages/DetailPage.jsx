import React from 'react';
import {Box, Container, Grid, Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import ProductThumbnail from "../components/ProductThumbnail";

const useStyles = makeStyles(theme => ({
    root:{},
    left: {
        width: '400px',
        padding: theme.spacing(1.5)
    },
    right: {
        flex: '1 1 0',
        borderLeft: `1px solid ${theme.palette.grey[300]}`,
        padding: theme.spacing(1.5)
    }
}));

function DetailPage() {
    const classes = useStyles();

    return (
        <Box>
            <Container>
                <Paper elevation={0}>
                    <Grid container>
                        <Grid item className={classes.left}>
                            <ProductThumbnail product={{}}/>
                        </Grid>
                        <Grid item className={classes.right}>
                            Product Info
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Box>
    );
}

export default DetailPage;