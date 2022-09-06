
export const formatDate = (date: string) => {
    if (date) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let fecha: any = new Date(date);
        const resultado = fecha.toLocaleDateString('es-ES', options);

        return resultado.split(',')[1];
    }
    return '';
};