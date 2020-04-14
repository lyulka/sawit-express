import React from 'react';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const RouterTest = () => {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/users">Users</Link>
                    </li>
                </ul>
            </nav>

            <Switch>
                <Route path="/home">
                    <Home />
                </Route>
                <Route path="/users">
                    <About />
                </Route>
                <Route path="/">
                    <Users />
                </Route>
            </Switch>
        </div>
    );
}

const Home = () => {
    return <h2>Home</h2>;
}

const About = () => {
    return <h2>About</h2>;
}

const Users = () => {
    return <h2>Users</h2>;
}

export default RouterTest;