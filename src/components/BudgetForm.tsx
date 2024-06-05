import { FormEvent, useMemo, useState } from 'react';

import { useBudget } from '../hooks/useBudget';

function BudgetForm() {
    
    const [budget, setBudget] = useState(0);
    const { dispatch } = useBudget();
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBudget(e.target.valueAsNumber);
    };

    const isValid = useMemo(
        () => !isNaN(budget) && budget > 0,
        [budget]
    );

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({type: 'add-budget', payload: {budget}});
    }
    
    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-5">
                <label htmlFor="budget" className="text-4xl text-blue-600 font-bold text-center">
                    Definir Presupuesto
                </label>
                <input className="w-full bg-white border border-gray-200 p-2"
                    id="budget"
                    name="budget"
                    placeholder="Define tu presupuesto"
                    type="number"
                    onChange={handleChange} />
            </div>
            <input className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-black uppercase disabled:opacity-50"
                type="submit"
                value="Definir presupuesto"
                disabled={!isValid} />
        </form>
    );
}

export default BudgetForm;