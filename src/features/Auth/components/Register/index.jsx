import React from 'react';
import RegisterForm from "../RegisterForm";
import {useDispatch} from "react-redux";
import {register} from "../../userSlice";
import {unwrapResult} from "@reduxjs/toolkit";

Register.propTypes = {};

function Register(props) {
    const dispatch = useDispatch();

    const handleSubmit = async (values) => {
        try {
            // auto set username = email
            values.username = values.email;

            const action = register(values);
            const resultAction = await dispatch(action);
            const user = unwrapResult(resultAction);

            // do something here on register successfully
            console.log('New user', user)
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            <RegisterForm onSubmit={handleSubmit}/>
        </div>
    );
}

export default Register;