import React from 'react';
import PropTypes from 'prop-types';
import {Box, Button} from "@material-ui/core";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import QuantityField from "../../../components/form-controls/QuantityField";

AddToCartForm.propTypes = {
    onSubmit: PropTypes.func,
};

function AddToCartForm({onSubmit = null}) {
    const schema = yup.object().shape({
        qty: yup.number().required('Please enter quantity!').min(1, 'Please enter smallest equal 1!').typeError('Please enter a number!')
    });
    const form = useForm({
        defaultValues: {
            qty: 1,
        },
        resolver: yupResolver(schema)
    });

    const handleSubmit = async (values) => {
        if (onSubmit) {
            await onSubmit(values);
        }
    };

    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <Box>
                <QuantityField name="qty" label="Qty" form={form}/>
            </Box>
            <Box>
                <Button type="submit"
                        variant="contained"
                        color="secondary"
                        size={"small"}
                >
                    Add To Cart
                </Button>
            </Box>
        </form>
    );
}

export default AddToCartForm;