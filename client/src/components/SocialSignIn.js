import React from 'react';
import { doSocialSignIn } from '../firebase/FirebaseFunctions';
import '../App.css';

const SocialSignIn = () => {
    const socialSignOn = async (provider) => {
        try {
            await doSocialSignIn(provider);
        } catch (e) {
            alert(e);
        }
    };

    return (
        <div>
            <img
                onClick={() => socialSignOn('google')}
                alt="google sign in"
                src="/imgs/btn_google_signin.png"
            />
            <img
                onClick={() => socialSignOn('facebook')}
                alt="facebook sign in"
                src="/imgs/facebook_signin.png"
            />
        </div>
    );
};

export default SocialSignIn;
