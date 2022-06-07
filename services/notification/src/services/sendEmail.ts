import nodemailer from 'nodemailer';

const send = async (mailOptions: any) => {
    //Usando serviço de email para realizar testes, ao em vez de entregar os emails para o destino, ele apenas registra essas mensagens (Não permitindo spam).
    let testAccount = await nodemailer.createTestAccount();

    const transport = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        }
    });



    transport.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
            console.log('Preview URL de email: ' + nodemailer.getTestMessageUrl(info));
        }
    });

    return;
};

export default send;