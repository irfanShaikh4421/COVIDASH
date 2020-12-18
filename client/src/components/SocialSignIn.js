import React from 'react';
import { doSocialSignIn } from '../firebase/FirebaseFunctions';
import '../App.css';
import { Button } from 'antd';
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons';

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
            <Button
                onClick={() => socialSignOn('google')}
                alt="google sign in"
                icon={<GoogleOutlined />}
                className="social-signup-btn"
            >
                Sign up with Google
            </Button>
            <Button
                onClick={() => socialSignOn('facebook')}
                alt="facebook sign in"
                icon={<FacebookOutlined />}
                className="social-signup-btn"
            >
                Sign up with Facebook
            </Button>
        </div>
    );
};

export default SocialSignIn;
