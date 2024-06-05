import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import DatePicker from 'react-date-picker';
import 'react-calendar/dist/Calendar.css';
import 'react-date-picker/dist/DatePicker.css';

import { categories } from "../data/categories";
import { DraftExpense, Value } from '../types';
import ErrorMessage from './ErrorMessage';
import { useBudget } from '../hooks/useBudget';

function ExpenseForm() {

    const [ expense, setExpense ] = useState<DraftExpense>({
        amount: 0, 
        category: '',
        date: new Date(),
        expenseName: ''
    });
    const [error, setError] = useState('');
    const { dispatch, remainingBudget, state } = useBudget();

    useEffect(() => {
        if (state.editingId) {
            const expense = state.expenses.filter((expense) => expense.id === state.editingId)[0];
            setExpense(expense);
        }
    }, [state.editingId]);

    const handleChangeDate = (value: Value) => {
        setExpense({
            ...expense,
            date: value
        });
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const isAmountField = ['amount'].includes(name);
        setExpense({
            ...expense,
            [name]: isAmountField ? Number(value) : value
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (Object.values(expense).includes('')) {
            setError('Todos los campos son obligatorios');
            return;
        }
        let cantAfford = false;
        if (state.editingId) {
            const originalExpense = state.expenses.find((expense) => expense.id === state.editingId);
            cantAfford = (expense.amount - originalExpense!.amount) > remainingBudget;
        } else {
            cantAfford = expense.amount > remainingBudget;
        }
        if (cantAfford) {
            setError('Gasto se sale del presupuesto');
            return;
        }
        if (state.editingId) {
            dispatch({
                type: 'update-expense',
                payload: {
                    expense: { ...expense, id: state.editingId }
                }
            });
        } else {
            dispatch({ type: 'add-expense', payload: { expense } });
        }
        setExpense({
            amount: 0,
            category: '',
            date: new Date(),
            expenseName: ''
        });
    };

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
                {state.editingId ? 'Actualizar gasto' : 'Añade un gasto'}
            </legend>
            {
                error && <ErrorMessage>{ error }</ErrorMessage>
            }
            <div className="flex flex-col gap-2">
                <label className="text-xl" htmlFor="expenseName">Nombre gasto:</label>
                <input className="bg-slate-100 py-2"
                    id="expenseName"
                    name="expenseName"
                    placeholder="Añade el nombre del gasto"
                    type="text"
                    value={expense.expenseName}
                    onChange={handleChange} />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-xl" htmlFor="amount">Cantidad:</label>
                <input className="bg-slate-100 py-2"
                    id="amount"
                    name="amount"
                    placeholder="Añade la cantidaddel gasto"
                    type="number"
                    value={expense.amount}
                    onChange={handleChange} />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-xl" htmlFor="category">Categor&iacute;a:</label>
                <select className="bg-slate-100 py-2" id="category" name="category" value={expense.category} onChange={handleChange}>
                    <option value="">-- Seleccione --</option>
                    {
                        categories.map(
                            category => <option key={category.id} value={category.id}>{category.name}</option>
                        )
                    }
                </select>
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-xl" htmlFor="date">Fecha gasto:</label>
                <DatePicker className="bg-slate-100 p-2 border-0" value={expense.date} onChange={handleChangeDate} />
            </div>
            <input className="bg-blue-600 cursor-ointer w-full p-2 text-white uppercase font-bold rounded-lg"
                type="submit"
                value={state.editingId ? 'Guardar cambios' : 'Registrar gasto'} />
        </form>
    );
}

export default ExpenseForm;