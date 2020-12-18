import React from 'react';
import { doSignOut } from '../firebase/FirebaseFunctions';
import '../App.css';
import { Button } from 'antd';

const SignOutButton = () => {
    return (
        <Button onClick={doSignOut} className="btn-right-margin">
            Sign out
        </Button>
    );
};

export default SignOutButton;
