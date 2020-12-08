import React from 'react';
import { doSignOut } from '../firebase/FirebaseFunctions';
import '../App.css';

const SignOutButton = () => {
    return (
        <button type="button" onClick={doSignOut} className="marvel">
            Sign out
        </button>
    );
};

export default SignOutButton;
