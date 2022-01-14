import React from 'react';
import Header from '../components/Header';
import Table from '../components/Table';
import Form from '../components/Form';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Form />
        <Table />
      </>
    );
  }
}

export default Wallet;
