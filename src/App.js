import React, { Component } from 'react';
import './App.css';
import Layout from './components/Layout/Layout';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <p>testing Layout</p>
        </Layout>
      </div>
    );
  }
}

export default App;
