import React, {useEffect, useState} from 'react';
import {Box, Container, Grid, Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import productApi from "../../../api/productApi";
import ProductSkeletonList from "../components/ProductSkeletonList";
import ProductList from "../components/ProductList";
import {Pagination} from "@material-ui/lab";

const useStyles = makeStyles(theme => ({
    root: {},
    left: {
        width: '250px'
    },
    right: {
        flex: '1 1 0'
    },
    pagination: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        marginTop: '16px',
        paddingBottom: '16px'
    }
}));

function ListPage(props) {
    const classes = useStyles();
    const [productList, setProductList] = useState([]);
    const [pagination, setPagination] = useState({
        limit: 9,
        total: 10,
        page: 1
    });
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        _page: 1,
        _limit: 9
    });

    useEffect(() => {
        (async () => {
            try {
                const {data, pagination} = await productApi.getAll(filters);
                setProductList(data);
                setPagination(pagination);
                console.log(data, pagination);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        })();
    }, [filters]);

    const handlePageChange = (e, page) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            _page: page
        }));
    }

    return (
        <Box>
            <Container>
                <Grid container spacing={1}>
                    <Grid item className={classes.left}>
                        <Paper elevation={0}>
                            Left Column
                        </Paper>
                    </Grid>
                    <Grid item className={classes.right}>
                        <Paper elevation={0}>
                            {loading ? <ProductSkeletonList/> : <ProductList productList={productList}/>}
                            <Box className={classes.pagination}>
                                <Pagination
                                    color="primary"
                                    count={Math.ceil(pagination.total / pagination.limit)}
                                    page={pagination.page}
                                    onChange={handlePageChange}
                                />
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default ListPage;