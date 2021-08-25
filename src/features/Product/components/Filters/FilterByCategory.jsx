import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Box, Typography} from "@material-ui/core";
import categoryApi from "../../../../api/categoryApi";
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

            '&:hover': {
                color: theme.palette.primary.dark,
                cursor: 'pointer'
            }
        }
    }
}));

FilterByCategory.propTypes = {
    onChange: PropTypes.func,
};

function FilterByCategory({onChange}) {
    const classes = useStyles();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const categoriesApi = await categoryApi.getAll();
                setCategories(
                    categoriesApi.map((category) => ({
                        id: category.id,
                        name: category.name
                    }))
                );
            } catch (error) {
                console.log(error);
            }
        })()
    }, []);

    const handleCategoryClick = (category) => {
        if (onChange) {
            onChange(category);
        }
    }

    return (
        <Box className={classes.root}>
            <Typography variant={"subtitle2"} className={classes.title}>
                Filter By Category
            </Typography>
            <ul className={classes.menu}>
                {
                    categories.map((category) => (
                        <li
                            key={category.id}
                            onClick={() => handleCategoryClick(category)}
                        >
                            <Typography variant={"body2"}>
                                {category.name}
                            </Typography>
                        </li>
                    ))
                }
            </ul>
        </Box>
    );
}

export default FilterByCategory;