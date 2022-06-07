//Função que simula comnicação com correspondente bancário final.
const withdraw = (amount: number, account: string, agency: string, tokenPermission: string) => {
    try {
        if (tokenPermission === 'token_teste') { //Simulando conta de teste inválida.
            throw new Error('not authorized.');
        } else {
            // Simulando batida em sistema bancário
            setTimeout(() => {
                return {
                    data: {
                        account,
                        agency,
                        amount,
                        status: 'success',
                        code: 201,
                    }
                }
            }, 2000);
        }
    } catch (err) {
        return {
            data: {
                account,
                agency,
                amount,
                status: 'failed',
                code: 501,
                message: err.message,
            }
        }
    }
};

export default withdraw;