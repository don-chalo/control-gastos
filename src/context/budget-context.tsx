import { Dispatch, ReactNode, createContext, useMemo, useReducer } from 'react';

import { BudgetActions, BudgetState, budgetReducer, initialState } from '../reducers/budget-reducer';

type BudgetContextProps = {
    state: BudgetState,
    dispatch: Dispatch<BudgetActions>,
    remainingBudget: number,
    totalExpenses: number
}

type NudgetProviderProps = {
    children: ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>({} as BudgetContextProps);

export const BudgetProvider = ({children}: NudgetProviderProps) => {
    const [state, dispatch] = useReducer(budgetReducer, initialState);
    const totalExpenses = useMemo(() => state.expenses.reduce((total, expense) => total + expense.amount, 0), [state.expenses]);
    const remainingBudget = state.budget - totalExpenses;
    return (
        <BudgetContext.Provider value={{state, dispatch, remainingBudget, totalExpenses}}>
            {children}
        </BudgetContext.Provider>
    );
};
