import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Box, List, ListItem, ListItemText, ListSubheader} from "@material-ui/core";
import categoryApi from "../../../../api/categoryApi";

FilterByCategory.propTypes = {
    onChange: PropTypes.func,
};

function FilterByCategory({onChange}) {
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
            onChange(category.id);
        }
    }

    return (
        <Box>
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Filter By Category
                    </ListSubheader>
                }
            >
                {
                    categories.map((category) => (
                        <ListItem button key={category.id} onClick={() => handleCategoryClick(category)}>
                            <ListItemText primary={category.name}/>
                        </ListItem>
                    ))
                }

            </List>
        </Box>
    );
}

export default FilterByCategory;