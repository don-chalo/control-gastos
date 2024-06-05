import { useMemo } from "react";
import {
    LeadingActions,
    SwipeAction,
    SwipeableList,
    SwipeableListItem,
    TrailingActions
} from 'react-swipeable-list';

import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";
import { formatDate } from "../helpers";
import { Expense } from "../types";
import AmountDisplay from "./AmountDisplay";

type ExpenseDetailProps = {
    expense: Expense
};

function ExpenseDetail({ expense }: ExpenseDetailProps) {

    const { dispatch } = useBudget();

    const categoryInfo = useMemo(() => categories.filter((category) => category.id === expense.category)[0], [expense]);
    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => dispatch({ type: 'get-expense-by-id', payload: { id: expense.id } })}>
                Actualizar
            </SwipeAction>
        </LeadingActions>
    );
    
    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction destructive={true} onClick={() => dispatch({ type: 'remove-expense', payload: { id: expense.id } })}>
                Eliminar
            </SwipeAction>
        </TrailingActions>
    );

    return (
        <SwipeableList>
            <SwipeableListItem leadingActions={leadingActions()} maxSwipe={1} trailingActions={trailingActions()}>
                <div className="bg-white shadow-lg p-5 w-full border-b border-gray-200 flex gap-5 items-center">
                    <div>
                        <img src={`/icono_${categoryInfo.icon}.svg`} alt={categoryInfo.name} className="w-20" />
                    </div>
                    <div className="flex-1 space-y-2">
                        <p className="text-sm font-bold uppercase text-slate-500">{categoryInfo.name}</p>
                        <p>{expense.expenseName}</p>
                        <p className="text-slate-600 text-sm">{formatDate(expense.date!.toString())}</p>
                    </div>
                    <AmountDisplay amount={expense.amount} label="Gasto" />
                </div>
            </SwipeableListItem>
        </SwipeableList>
    );
}

export default ExpenseDetail;