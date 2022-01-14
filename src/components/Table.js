import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editExpenseAction, removeExpense } from '../actions';

class Table extends Component {
  render() {
    const { expenses, expenseRemove, expenseEdit } = this.props;

    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp) => (
            <tr key={ exp.id }>
              <td>{exp.description}</td>
              <td>{exp.tag}</td>
              <td>{exp.method}</td>
              <td>{exp.value}</td>
              <td>Real</td>
              <td>{(+exp.exchangeRates[exp.currency].ask).toFixed(2)}</td>
              <td>{(exp.exchangeRates[exp.currency].ask * exp.value).toFixed(2)}</td>
              <td>{exp.exchangeRates[exp.currency].name.split('/')[0]}</td>
              <td>
                <button
                  type="button"
                  onClick={ () => expenseEdit(exp.id) }
                  data-testid="edit-btn"
                >
                  Editar
                </button>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => expenseRemove(exp.id) }
                >
                  Remover

                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  expenseRemove: PropTypes.func.isRequired,
  expenseEdit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  expenseRemove: (id) => dispatch(removeExpense(id)),
  expenseEdit: (id) => dispatch(editExpenseAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
