import React from 'react';
import SignOutButton from './SignOut';
import ChangePassword from './ChangePassword';
import ChangeCountry from './ChangeUserCountry';
import '../App.css';

function Account() {
    return (
        <div className="Account">
            <p>Account</p>
            <ChangeCountry />
            <ChangePassword />
            <SignOutButton />
        </div>
    );
}

export default Account;
