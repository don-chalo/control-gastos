export function formatAmount(amount: number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
}

export function formatDate(dateStrg: string) {
    const date = new Date(dateStrg);
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    };
    return new Intl.DateTimeFormat('es-ES', options).format(date);
}