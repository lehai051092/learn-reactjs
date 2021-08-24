import React from 'react';
import {Box, Checkbox, FormControlLabel, Typography} from "@material-ui/core";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        borderTop: `1px solid ${theme.palette.grey[300]}`
    },
    service: {
        listStyleType: 'none',
        margin: '0',
        padding: '0'
    }
}));

FilterByService.propTypes = {
    filters: PropTypes.object,
    onChange: PropTypes.func,
};

function FilterByService({filters = {}, onChange}) {
    const classes = useStyles();

    const handleChange = (e) => {
        if (!onChange) return;

        const {name, checked} = e.target;
        onChange({[name]: checked});
    }

    return (
        <Box className={classes.root}>
            <Typography variant={"subtitle2"}>Filter By Service</Typography>
            <ul className={classes.service}>
                {[{value: "isPromotion", label: "Promotion"},
                    {value: "isFreeShip", label: "Free Ship"}
                ].map((service) => (
                    <li key={service.value}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={Boolean(filters[service.value])}
                                    onChange={handleChange}
                                    name={service.value}
                                    color="primary"
                                />
                            }
                            label={service.label}
                        />
                    </li>
                ))}
            </ul>
        </Box>
    );
}

export default FilterByService;