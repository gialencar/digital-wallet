import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpenseAction, fetchCurrenciesAction, updateTotal as updateTotalAction }
from '../actions';

class Form extends Component {
  constructor() {
    super();

    this.formState = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };

    this.state = {
      currencies: [],
      ...this.formState,
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
      currencies: currencies
        .filter((cur) => cur !== 'USDT'),
    });
  }

  updateTotalExpense = async () => {
    const { expenses, updateTotal } = this.props;
    const total = expenses
      .reduce((acc, expense) => (
        acc + +expense.value * expense.exchangeRates[expense.currency].ask),
      0).toFixed(2);

    await updateTotal(total);
    this.setState({ totalExpenses: total });
  }

  addExpense = async () => {
    const { addExpense, expenses } = this.props;
    const { value, description, currency, method, tag } = this.state;

    await addExpense({
      id: expenses.length ? expenses.length : 0,
      value,
      currency,
      method,
      tag,
      description,
    });

    this.setState((state) => ({
      ...state,
      ...this.formState,
    }));
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const {
      currencies, value, description, currency, method, tag } = this.state;

    return (
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
              <option key={ cur } value={ cur } data-testid={ cur }>
                {cur}
              </option>
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
    );
  }
}

Form.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  addExpense: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
  updateTotal: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addExpense: (expense) => dispatch(addExpenseAction(expense)),
  fetchData: () => dispatch(fetchCurrenciesAction()),
  updateTotal: (total) => dispatch(updateTotalAction(total)),
});

const mapStateToProps = (state) => ({
  wallet: state.wallet,
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
