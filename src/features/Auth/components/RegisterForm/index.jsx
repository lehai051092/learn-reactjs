import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../../../../components/form-controls/InputField';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import {Avatar, Button, Typography} from "@material-ui/core";
import {LockOutlined} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import PasswordField from "../../../../components/form-controls/PasswordField";

const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: theme.spacing(4),
    },
    avatar: {
        margin: '0 auto',
        backgroundColor: theme.palette.secondary.main,
    },
    title: {
        margin: theme.spacing(2, 0, 3, 0),
        textAlign: 'center'
    },
    submit: {
        margin: theme.spacing(3, 0, 2, 0),
    }
}));

RegisterForm.propTypes = {
    onSubmit: PropTypes.func,
};

function RegisterForm(props) {
    const classes = useStyles();
    const schema = yup.object().shape({
        fullName: yup
            .string()
            .required('Please enter your full name.')
            .test(
                'should has at least two words',
                'Please enter at least two words.',
                (value) => {return value.split(' ').length >= 2;}),
        email: yup
            .string()
            .required('Please enter your email.')
            .email('Please enter is valid email.'),
        password: yup
            .string()
            .required('Please enter your password.')
            .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
                , 'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'),
        retypePassword: yup
            .string()
            .required('Please retype your password.')
            .oneOf([yup.ref('password')], 'Password does not match.'),
    });
    const form = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            retypePassword: '',
        },
        resolver: yupResolver(schema)
    });

    const handleSubmit = (values) => {
        const {onSubmit} = props;
        if (onSubmit) {
            onSubmit(values);
        }
        form.reset();
    };

    return (
        <div className={classes.root}>
            <Avatar className={classes.avatar}>
                <LockOutlined/>
            </Avatar>
            <Typography className={classes.title} component="h3" variant="h5">
                Create An Account
            </Typography>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <InputField name="fullName" label="Full Name" form={form}/>
                <InputField name="email" label="Email" form={form}/>
                <PasswordField name="password" label="Password" form={form}/>
                <PasswordField name="retypePassword" label="Retype Password" form={form}/>
                <Button type="submit" className={classes.submit} variant="contained" color="primary" fullWidth>
                    Create An Account
                </Button>
            </form>
        </div>
    );
}

export default RegisterForm;
