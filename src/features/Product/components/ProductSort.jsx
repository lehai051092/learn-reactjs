import React from 'react';
import PropTypes from 'prop-types';
import {Tab, Tabs} from "@material-ui/core";

ProductSort.propTypes = {
    currentSort: PropTypes.string.isRequired,
    onChange: PropTypes.func,
};

function ProductSort({currentSort, onChange}) {

    const handleSortChange = (event, newValue) => {
        if (onChange) onChange(newValue);
    }

    return (
        <Tabs
            value={currentSort}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleSortChange}
            aria-label="disabled tabs example"
        >
            <Tab label="Lowest Price" value="salePrice:ASC"/>
            <Tab label="Highest Price" value="salePrice:DESC"/>
        </Tabs>
    );
}

export default ProductSort;