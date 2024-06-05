import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";

function BudgetTracker() {
    const { dispatch, remainingBudget, state, totalExpenses } = useBudget();
    const percentage = +(totalExpenses / state.budget * 100).toFixed(2);
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gp-5">
            <div className="flex justifi-center">
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor: percentage >= 100 ? '#dc2626' : '#3b82f6',
                        textColor: percentage >= 100 ? '#dc2626' : '#3b82f6',
                        textSize: 10,
                        trailColor: '#f5f5f5'
                    })}
                    text={`${percentage}% gastado`}
                    value={percentage} />
            </div>
            <div className="flex flex-col justify-center items-center gap-8">
                <button className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg" type="button" onClick={() => dispatch({ type: 'reset-app' })}>
                    Resetear App
                </button>
                <AmountDisplay amount={state.budget} label="Presupuesto" />
                <AmountDisplay amount={remainingBudget} label="Disponible" />
                <AmountDisplay amount={totalExpenses} label="Gastado" />
            </div>
        </div>
    );
}

export default BudgetTracker;