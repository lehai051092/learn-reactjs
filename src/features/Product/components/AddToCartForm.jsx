import React from 'react';
import PropTypes from 'prop-types';
import {Box, Button} from "@material-ui/core";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import QuantityField from "../../../components/form-controls/QuantityField";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2)
    }
}));

AddToCartForm.propTypes = {
    onSubmit: PropTypes.func,
};

function AddToCartForm({onSubmit = null}) {
    const classes = useStyles();
    const schema = yup.object().shape({
        quantity: yup.number().required('Please enter quantity!').min(1, 'Please enter smallest equal 1!').typeError('Please enter a number!')
    });
    const form = useForm({
        defaultValues: {
            quantity: 1,
        },
        resolver: yupResolver(schema)
    });

    const handleSubmit = async (values) => {
        if (onSubmit) {
            await onSubmit(values);
        }
    };

    return (
        <Box className={classes.root}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <Box>
                    <QuantityField name="quantity" label="Qty" form={form} onChangeRHF={() => null}/>
                </Box>
                <Box>
                    <Button type="submit"
                            variant="contained"
                            color="secondary"
                            size={"medium"}
                    >
                        Add To Cart
                    </Button>
                </Box>
            </form>
        </Box>
    );
}

export default AddToCartForm;