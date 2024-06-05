export type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

export type Expense = {
    amount: number;
    category: string;
    date: Value;
    expenseName: string;
    id: string;
}

export type DraftExpense = Omit<Expense, 'id'>;

export type Category = {
    id: string;
    name: string;
    icon: string
}