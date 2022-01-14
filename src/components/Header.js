import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  updateTotalExpense = () => {
    const { expenses } = this.props;
    const total = expenses
      .reduce((acc, expense) => (
        acc + +expense.value * expense.exchangeRates[expense.currency].ask),
      0).toFixed(2);
    return total;
  }

  render() {
    const { email } = this.props;

    return (
      <header>
        <span data-testid="email-field">{ `Email: ${email}` }</span>
        <span data-testid="total-field">{this.updateTotalExpense()}</span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
