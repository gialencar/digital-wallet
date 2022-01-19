import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Table from '../components/Table';
import Form from '../components/Form';
import EditForm from '../components/EditForm';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      isEditing: false,
    };
  }

  componentDidUpdate(prevProps) {
    const { isEditingExpense } = this.props;
    if (prevProps.isEditingExpense !== isEditingExpense) {
      this.checkIfEditing();
    }
  }

  checkIfEditing = () => {
    const { isEditingExpense } = this.props;
    this.setState({ isEditing: isEditingExpense });
  }

  render() {
    const { isEditing } = this.state;
    return (
      <>
        <Header />
        { isEditing ? <EditForm /> : <Form />}
        <Table />
      </>
    );
  }
}

Wallet.propTypes = {
  isEditingExpense: PropTypes.bool,
};

Wallet.defaultProps = {
  isEditingExpense: false,
};

const mapStateToProps = (state) => ({
  isEditingExpense: state.wallet.isEditingExpense,
});

export default connect(mapStateToProps)(Wallet);
