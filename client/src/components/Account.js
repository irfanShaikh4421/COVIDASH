import React from 'react';
import SignOutButton from './SignOut';
import ChangePassword from './ChangePassword';
import '../App.css';

function Account() {
    return (
        <div className="Account">
            <p>Account</p>
            <ChangePassword />
            <SignOutButton />
        </div>
    );
}

export default Account;
