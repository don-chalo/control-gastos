import { formatAmount } from "../helpers";

type AmountDisplayProps = {
    amount: number
    label: string
}

function AmountDisplay({ amount, label }: AmountDisplayProps) {
    return (
        <p className="text-2xl text-blue-600 font-bold">
            {label && `${label}: `}
            <span className="font-black text-black">{formatAmount(amount)}</span>
        </p>
    );
}

export default AmountDisplay;