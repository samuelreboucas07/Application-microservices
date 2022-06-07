import send from "../services/sendEmail";

const createUser = async (email: string, name: string) => {
    try {
        const mailOptions = {
            from: 'bank@gmail.com',
            to: email,
            subject: 'Conta criada!',
            text: `Olá ${name}, bem vindo ao nosso banco. O seu teste grátis já está valendo!
            
            O que acontece depois?
            
            Fique de olho na sua caixa de entrada. Vamos enviar dicas e estratégias para melhor usar o nossos serviços.
            
            Se você quiser uma demonstração personalizada, marque um horário com nossos especialistas.
            
            Um abraço,`,
        };

        await send(mailOptions);
        return
    } catch (err) {
        console.log(err);
    }
};

export default createUser;