import React from 'react';
import RegisterForm from "../RegisterForm";
import {useDispatch} from "react-redux";
import {register} from "../../userSlice";
import {unwrapResult} from "@reduxjs/toolkit";
import {useSnackbar} from "notistack";
import PropTypes from "prop-types";

Register.propTypes = {
    closeDialog: PropTypes.func,
};

function Register(props) {
    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar();

    const handleSubmit = async (values) => {
        try {
            // auto set username = email
            values.username = values.email;

            const action = register(values);
            const resultAction = await dispatch(action);
            const user = unwrapResult(resultAction);
            // do something here on register successfully
            // close dialog
            const {closeDialog} = props;
            if (closeDialog) {
                closeDialog();
            }
            enqueueSnackbar('Register successfully!!!', {variant: 'success'});
        } catch (error) {
            enqueueSnackbar('Register failed.', {variant: 'error'});
        }
    }

    return (
        <div>
            <RegisterForm onSubmit={handleSubmit}/>
        </div>
    );
}

export default Register;