import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ExpenseForm from '../components/ExpenseForm';
import { addExpenseAction, fetchCurrencies, updateTotal } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      totalExpenses: 0,
      currencies: [],
    };
  }

    componentDidMount = () => {
      this.fetchData();
    }

  fetchData = async () => {
    const { fetchData } = this.props;
    await fetchData();
    const { currencies } = this.props;
    this.setState({
      currencies: Object.keys(currencies).filter((key) => key !== 'USDT'),
    });
  }

  getTotalExpenses = () => {
    const { total } = this.props;
    // console.log('total:', total);
    return total || 0;
  }

  render() {
    const { email } = this.props;
    const { expenses } = this.state;
    // console.log(expenses);
    const gambi2 = 'BRL';

    return (
      <>
        <header>
          <span data-testid="email-field">{ `Email: ${email}` }</span>

          <span data-testid="total-field">{`Despesa Total: ${this.getTotalExpenses()}`}</span>
          <span data-testid="header-currency-field">{gambi2}</span>
        </header>

        <main>
          <ExpenseForm />
        </main>
      </>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchData: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addExpense: (expense) => dispatch(addExpenseAction(expense)),
  fetchData: () => dispatch(fetchCurrencies()),
  updateTotal: (total) => dispatch(updateTotal(total)),
});

const mapStateToProps = (state) => ({
  email: state.user.email,
  wallet: state.wallet,
  expenses: state.wallet.expenses,
  total: state.wallet.total,
  currencies: state.wallet.currencies,

});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
