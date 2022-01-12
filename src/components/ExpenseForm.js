import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpenseAction, fetchCurrencies, updateTotal } from '../actions';

class ExpenseForm extends Component {
  constructor() {
    super();

    this.state = {
      currencies: [],
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
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

  updateTotal = () => {
    const { expenses, updateTotal } = this.props;
    console.log('updateTotal runnig ', expenses);

    const total = expenses.reduce((acc, expense) => (
      acc + +expense.value * expense.exchangeRates[expense.currency].ask
    ), 0);

    console.log(total);
    updateTotal(total);
  }

  addExpense = async () => {
    const { addExpense, expenses } = this.props;
    const { value, description, currency, method, tag } = this.state;

    await this.fetchData();
    const { currencies } = this.props;

    addExpense({
      id: expenses.length ? expenses.length : 0,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: currencies,
    });

    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    }, () => this.updateTotal());
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { currencies, value, description, currency, method, tag } = this.state;
    // const { expenses } = this.props;

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
    );
  }
}

ExpenseForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  addExpense: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addExpense: (expense) => dispatch(addExpenseAction(expense)),
  fetchData: () => dispatch(fetchCurrencies()),
  updateTotal: (total) => dispatch(updateTotal(total)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
