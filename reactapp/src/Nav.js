import React from 'react';
import './App.css';
import {Menu, Icon, Badge} from 'antd'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import { OmitProps } from 'antd/lib/transfer/renderListBody';

function Nav(props) {

  return (
    <nav >
      <Menu style={{textAlign: 'center'}} mode="horizontal" theme="dark">

        <Menu.Item key="mail">
          <Icon type="home" />
          <Link to="/screen-source">Sources</Link>
        </Menu.Item>

        <Menu.Item key="test">
          <Icon type="read" />
          <Link to="/screen-my-articles"><Badge count={props.count} showZero size={'small'} offset={[7, -10]}>My Articles</Badge></Link>
        </Menu.Item>

        <Menu.Item key="app">
          <Icon type="logout" />
          <Link exact to="/">Logout</Link>
        </Menu.Item>

      </Menu>
    </nav>
  );
}

function mapStateToProps(state) {
  return { count: state.likedArticles.length }
 }

 export default connect(mapStateToProps, null)(Nav);
// export default Nav;
