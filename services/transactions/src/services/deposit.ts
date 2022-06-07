//Função que simula comnicação com correspondente bancário final.
const deposit = (amount: number, account: string, agency: string) => {
    console.log(account)
    try {
        if (account === 'T1111') { //Simulando conta de teste inválida.
            throw new Error('inválid account.');
        } else {
            // Simulando batida em sistema bancário
                return {
                    data: {
                        account,
                        agency,
                        amount,
                        status: 'success',
                        code: 200
                    }
                }
        }
    } catch (err) {
        return {
            data: {
                account,
                agency,
                amount,
                status: 'failed',
                code: 500,
                message: err.message,
            }
        }
    }
};

export default deposit;