import React, {useEffect, useMemo, useState} from 'react';
import {Box, Container, Grid, Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import productApi from "../../../api/productApi";
import ProductSkeletonList from "../components/Skeletons/ProductSkeletonList";
import ProductList from "../components/ProductList";
import {Pagination} from "@material-ui/lab";
import ProductSort from "../components/ProductSort";
import ProductFilters from "../components/ProductFilters";
import FiltersSkeletonList from "../components/Skeletons/FiltersSkeletonList";
import FiltersViewer from "../components/FiltersViewer";
import {useHistory, useLocation} from "react-router-dom";
import queryString from "query-string";

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
    const history = useHistory();
    const location = useLocation();
    const queryParams = useMemo(() => {
        // true -> "true"
        // { isPromotion: "true" }
        const params = queryString.parse(location.search);
        return {
            ...params,
            _page: Number.parseInt(params._page) || 1,
            _limit: Number.parseInt(params.limit) || 12,
            _sort: params._sort || 'salePrice:ASC',
            isPromotion: params.isPromotion === 'true',
            isFreeShip: params.isFreeShip === 'true',
        }
    }, [location.search]);
    const [productList, setProductList] = useState([]);
    const [pagination, setPagination] = useState({
        limit: 12,
        total: 10,
        page: 1
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const {data, pagination} = await productApi.getAll(queryParams);
                setProductList(data);
                setPagination(pagination);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        })();
    }, [queryParams]);

    const handlePageChange = (e, page) => {
        const filters = {
            ...queryParams,
            _page: page
        }

        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filters)
        });
    }

    const handleSortChange = (newSortValue) => {
        const filters = {
            ...queryParams,
            _sort: newSortValue
        }

        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filters)
        });
    }

    const handleFiltersChange = (newFilters) => {
        const filters = {
            ...queryParams,
            ...newFilters
        }

        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filters)
        });
    }

    const handleFiltersViewer = (newFilters) => {
        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(newFilters)
        });
    }

    return (
        <Box>
            <Container>
                <Grid container spacing={1}>
                    <Grid item className={classes.left}>
                        <Paper elevation={0}>
                            {
                                loading
                                    ? <FiltersSkeletonList/>
                                    : <ProductFilters filters={queryParams} onChange={handleFiltersChange}/>
                            }
                        </Paper>
                    </Grid>
                    <Grid item className={classes.right}>
                        <Paper elevation={0}>
                            <ProductSort currentSort={queryParams._sort} onChange={handleSortChange}/>
                            <FiltersViewer filters={queryParams} onChange={handleFiltersViewer}/>
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