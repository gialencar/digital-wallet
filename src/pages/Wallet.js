import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  addExpenseAction, fetchCurrencies, updateTotal as updateTotalAction } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();

    this.initialState = {
      totalExpenses: 0,
      currencies: [],
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };

    this.state = this.initialState;
  }

    componentDidMount = () => {
      this.fetchData();
    }

  fetchData = async () => {
    const { fetchData } = this.props;
    await fetchData();
    const { currencies } = this.props;
    // console.log(currencies);
    this.setState({
      currencies: currencies
        .filter((cur) => cur !== 'USDT'),
      // .map((cur) => cur.code),
    });
  }

  getTotalExpenses = () => {
    const { total } = this.props;
    console.log('total:', total);
    // return total || 0;
    this.setState({ totalExpenses: total });
  }

  updateTotalExpense = async () => {
    const { expenses, updateTotal } = this.props;
    // console.log('updateTotal runnig ', expenses);

    const total = expenses
      .reduce((acc, expense) => (
        acc + +expense.value * expense.exchangeRates[expense.currency].ask),
      0)
    // .filter((xr) => xr.code === expense.currency).ask), 0)
      .toFixed(2);

    // console.log(total);
    // const total = expenses.reduce((acc, expense) => (
    //   acc + +expense.value * expense.exchangeRates[expense.currency].ask
    // ), 0);

    // console.log(total);
    await updateTotal(total);
    // this.getTotalExpenses();
    this.setState({ totalExpenses: total });
  }

  addExpense = async () => {
    const { addExpense, expenses } = this.props;
    const { value, description, currency, method, tag } = this.state;

    // await this.fetchData();
    // const { currencies } = this.props;
    // console.log('cur:', currencies);
    // const exchangeRates = currencies
    // .filter((cur) => cur.codein !== 'BRLT')
    // .reduce((acc, cur) => ({ ...acc, [cur.code]: cur }), {});

    await addExpense({
      id: expenses.length ? expenses.length : 0,
      value,
      currency,
      method,
      tag,
      description,
      // exchangeRates,
    });

    this.setState(this.initialState, () => this.updateTotalExpense());
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { email } = this.props;
    const {
      currencies, value, description, currency, method, tag, totalExpenses } = this.state;
      // console.log(expenses);
    const gambi2 = 'BRL';

    return (
      <>
        <header>
          <span data-testid="email-field">{ `Email: ${email}` }</span>

          <span data-testid="total-field">{totalExpenses}</span>
          <span data-testid="header-currency-field">{gambi2}</span>
        </header>

        <form>

          <label htmlFor="value">
            Valor:
            <input
              type="text"
              name="value"
              id="value"
              data-testid="value-input"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="description">
            Descrição:
            <input
              type="text"
              name="description"
              id="description"
              data-testid="description-input"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="currency">
            Moeda
            <select
              name="currency"
              id="currency"
              data-testid="currency-input"
              value={ currency }
              onChange={ this.handleChange }
            >
              {currencies.map((cur) => (
                <option key={ cur } value={ cur } data-testid={ cur }>{cur}</option>
              )) }
            </select>
          </label>

          <label htmlFor="method">
            Método de pagamento:
            <select
              name="method"
              id="method"
              data-testid="method-input"
              value={ method }
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tag">
            Tag:
            <select
              name="tag"
              id="tag"
              data-testid="tag-input"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>

          <button type="button" onClick={ this.addExpense }>Adicionar despesa</button>

        </form>
      </>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  addExpense: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
  updateTotal: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addExpense: (expense) => dispatch(addExpenseAction(expense)),
  fetchData: () => dispatch(fetchCurrencies()),
  updateTotal: (total) => dispatch(updateTotalAction(total)),
});

const mapStateToProps = (state) => ({
  email: state.user.email,
  wallet: state.wallet,
  expenses: state.wallet.expenses,
  total: state.wallet.total,
  currencies: state.wallet.currencies,

});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
