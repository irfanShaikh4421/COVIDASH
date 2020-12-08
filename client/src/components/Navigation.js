import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../firebase/Auth';
import placeholder from '../img/virusPictureFromStatisticsAPI.png';
import SignOutButton from './SignOut';
import '../App.css';

const Navigation = () => {
    const { currentUser } = useContext(AuthContext);
    return <div>{currentUser ? <NavigationAuth /> : <NavigationUnauth />}</div>;
};

const NavigationAuth = () => {
    return (
        <nav className="navigation">
            {' '}
            <NavLink exact to="/" activeClassName="active" className="marvel">
                Home
                {/* <img
                    src={placeholder}
                    height="100"
                    width="100"
                    alt="Covidash logo placeholder"
                    title="From the statistics API website"
                /> */}
            </NavLink>{' '}
            <NavLink
                exact
                to="/news"
                activeClassName="active"
                className="marvel"
            >
                News
            </NavLink>{' '}
            <NavLink
                exact
                to="/map"
                activeClassName="active"
                className="marvel"
            >
                Outbreak Map
            </NavLink>{' '}
            <NavLink
                exact
                to="/symptoms"
                activeClassName="active"
                className="marvel"
            >
                Self Checker
            </NavLink>{' '}
            <NavLink
                exact
                to="/testing"
                activeClassName="active"
                className="marvel"
            >
                Testing Locations
            </NavLink>{' '}
            <NavLink
                exact
                to="/travel"
                activeClassName="active"
                className="marvel"
            >
                Travel Regulations
            </NavLink>{' '}
            <NavLink
                exact
                to="/vaccine"
                activeClassName="active"
                className="marvel"
            >
                Vaccine
            </NavLink>{' '}
            <NavLink
                exact
                to="/bed-utilization"
                activeClassName="active"
                className="marvel"
            >
                Hospital Capacity
            </NavLink>{' '}
            <NavLink
                exact
                to="/guidelines"
                activeClassName="active"
                className="marvel"
            >
                Safety Guidelines
            </NavLink>{' '}
            <NavLink
                exact
                to="/account"
                activeClassName="active"
                className="marvel"
            >
                Account
            </NavLink>{' '}
            <SignOutButton />
        </nav>
    );
};

const NavigationUnauth = () => {
    return (
        <nav className="navigation">
            {' '}
            <NavLink exact to="/" activeClassName="active" className="marvel">
                Home
                {/* <img
                    src={placeholder}
                    height="100"
                    width="100"
                    alt="Covidash logo placeholder"
                    title="From the statistics API website"
                /> */}
            </NavLink>{' '}
            <NavLink
                exact
                to="/news"
                activeClassName="active"
                className="marvel"
            >
                News
            </NavLink>{' '}
            <NavLink
                exact
                to="/map"
                activeClassName="active"
                className="marvel"
            >
                Outbreak Map
            </NavLink>{' '}
            <NavLink
                exact
                to="/symptoms"
                activeClassName="active"
                className="marvel"
            >
                Self Checker
            </NavLink>{' '}
            <NavLink
                exact
                to="/vaccine"
                activeClassName="active"
                className="marvel"
            >
                Vaccine
            </NavLink>{' '}
            <NavLink
                exact
                to="/guidelines"
                activeClassName="active"
                className="marvel"
            >
                Safety Guidelines
            </NavLink>{' '}
            <NavLink
                exact
                to="/signup"
                activeClassName="active"
                className="marvel"
            >
                Register
            </NavLink>{' '}
            <NavLink
                exact
                to="/signin"
                activeClassName="active"
                className="marvel"
            >
                Log In
            </NavLink>{' '}
        </nav>
    );
};

export default Navigation;
