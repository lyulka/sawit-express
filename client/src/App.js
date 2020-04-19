import React from 'react';

import 'antd/dist/antd.css';
import './App.css';

import { Route, Switch, Link } from 'react-router-dom' 
import OARBeli from './components/OARBeli';
// import OARBeliAdd from './components/OARBeliAdd';
// import OARBeliEdit from './components/OARBeliEdit';
import OARBeliInputForm from './components/OARBeliInputForm'
import { Menu } from 'antd';

function App() {

  const Home = () => {
    return (
      <div>
        <Menu mode="horizontal">
          <Menu.Item>
            <Link to="/OARBeli">OAR Beli</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/OARLab">OAR Lab</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/Olah">Olah</Link>
          </Menu.Item>
        </Menu>  
      
        <Switch>
          <Route exact path='/OARBeli/add' component={() => <OARBeliInputForm action="add" /> } />
          <Route exact path='/OARBeli/edit/:id' component={() => <OARBeliInputForm action="edit" />} />
          <Route exact path='/OARBeli' component={OARBeli}/>
        </Switch>
      </div>
    );
  }

  return (
    <div className="App">
      <Switch>
        <Route path='/' component={Home}/>
      </Switch>
    </div>
  );
}


export default App;
