import React from 'react';
import PropTypes from 'prop-types';
import InputField from "../../../components/form-controls/InputField";
import PasswordField from "../../../components/form-controls/PasswordField";
import {Button} from "@material-ui/core";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

AddToCartForm.propTypes = {
    onSubmit: PropTypes.func,
};

function AddToCartForm({onSubmit = null}) {
    const schema = yup.object().shape({
        qty: yup.number().required('Please enter quantity!').min(1, 'Please enter smallest equal 1!')
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
            <InputField name="qty" form={form}/>
            <Button type="submit"
                    variant="contained"
                    color="secondary"
                    size={"small"}
            >
               Add To Cart
            </Button>
        </form>
    );
}

export default AddToCartForm;