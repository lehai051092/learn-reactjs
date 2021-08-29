import React from 'react';
import PropTypes from 'prop-types';
import {Controller} from 'react-hook-form';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import {Box, FormHelperText, IconButton, Typography} from "@material-ui/core";
import {AddCircleOutline, RemoveCircleOutline} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    qtyBox: {
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
        maxWidth: '200px'
    }
}));

QuantityField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    onChangeRHF: PropTypes.func,
};

function QuantityField({form = {}, name = '', label = '', disabled = false, onChangeRHF = null}) {
    const classes = useStyles();
    const {errors, setValue} = form;
    const hasError = !!errors[name];

    const handleChange = (value) => {
        return onChangeRHF(value)
    }

    return (
        <FormControl error={hasError} variant="outlined" margin="normal" size="small">
            <Controller
                name={name}
                onChangeRHF={onChangeRHF}
                control={form.control}
                render={({onBlur, value, name}) => (
                    <Box className={classes.qtyBox}>
                        <Typography component="span">{label}</Typography>
                        <IconButton
                            onClick={() => setValue(name, Number.parseInt(value) ? Number.parseInt(value) - 1 : 1)}>
                            <RemoveCircleOutline/>
                        </IconButton>
                        <OutlinedInput
                            id={name}
                            type="number"
                            disabled={disabled}
                            onChange={handleChange(value)}
                            onBlur={onBlur}
                            value={value}
                            name={name}
                        />
                        <IconButton
                            onClick={() => setValue(name, Number.parseInt(value) ? Number.parseInt(value) + 1 : 1)}>
                            <AddCircleOutline/>
                        </IconButton>
                    </Box>
                )}
            />
            <FormHelperText>{errors[name]?.message}</FormHelperText>
        </FormControl>
    );
}

export default QuantityField;
