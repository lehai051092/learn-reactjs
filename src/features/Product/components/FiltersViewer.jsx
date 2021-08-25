import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {Box, Chip} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexFlow: 'row wrap',
        alignItems: 'center',

        padding: 0,
        margin: theme.spacing(2, 0),
        listStyleType: 'none',

        '& > li': {
            margin: 0,
            padding: theme.spacing(1)
        }
    }
}));

FiltersViewer.propTypes = {
    filters: PropTypes.object,
    onChange: PropTypes.func,
    categoryName: PropTypes.string,
};

const FILTER_LIST = [
    {
        id: 1,
        getLabel: () => 'Free Ship',
        isVisible: () => true,
        isActive: (filters) => filters.isFreeShip,
        isRemovable: false,
        onRemove: null,
        onToggle: (filters) => {
            const newFilters = {...filters};
            if (newFilters.isFreeShip) {
                delete newFilters.isFreeShip;
            } else {
                newFilters.isFreeShip = true;
            }

            return newFilters;
        }
    },
    {
        id: 2,
        getLabel: () => 'Promotion',
        isVisible: (filters) => filters.isPromotion,
        isActive: () => true,
        isRemovable: true,
        onRemove: (filters) => {
            const newFilters = {...filters};
            delete newFilters.isPromotion;
            return newFilters;
        },
        onToggle: null
    },
    {
        id: 3,
        getLabel: (filters) => `Price Range from ${filters.salePrice_gte} to ${filters.salePrice_lte}`,
        isVisible: (filters) => Object.keys(filters).includes('salePrice_gte') && Object.keys(filters).includes('salePrice_lte'),
        isActive: () => true,
        isRemovable: true,
        onRemove: (filters) => {
            const newFilters = {...filters};
            delete newFilters.salePrice_gte;
            delete newFilters.salePrice_lte;
            return newFilters;
        },
        onToggle: null
    },
    {
        id: 4,
        getLabel: (categoryName) => `Category - ${categoryName}`,
        isVisible: (filters) => Object.keys(filters).includes('category.id'),
        isActive: () => true,
        isRemovable: true,
        onRemove: (filters) => {
            const newFilters = {...filters};
            delete newFilters['category.id'];
            return newFilters;
        },
        onToggle: null
    },
];

function FiltersViewer({filters = {}, onChange = null, categoryName = ''}) {
    const classes = useStyles();
    const visibleFilters = useMemo(() => {
        return FILTER_LIST.filter(filter => filter.isVisible(filters));
    }, [filters]);

    return (
        <Box component={"ul"} className={classes.root}>
            {visibleFilters.map(filter => (
                <li key={filter.id}>
                    <Chip
                        label={(filter.id === 4) ? filter.getLabel(categoryName) : filter.getLabel(filters)}
                        color={filter.isActive(filters) ? 'primary' : 'default'}
                        clickable={!filter.isRemovable}
                        onClick={filter.isRemovable ? null : () => {
                            if (!onChange) return;
                            const newFilters = filter.onToggle(filters);
                            onChange(newFilters);
                        }}
                        onDelete={filter.isRemovable ? () => {
                            if (!onChange) return;
                            const newFilters = filter.onRemove(filters);
                            onChange(newFilters);
                        } : null}
                        size={"small"}
                    />
                </li>
            ))}
        </Box>
    );
}

export default FiltersViewer;