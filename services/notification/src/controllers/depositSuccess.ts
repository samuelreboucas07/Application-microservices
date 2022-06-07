import send from "../services/sendEmail";
import UserModel from './../models/user';

const depositSuccess = async (id: string, amount: number) => {
    try {
        const user = await UserModel.findById(id);
        const mailOptions = {
            from: 'bank@gmail.com',
            to: user.email,
            subject: 'Depósito realizado!',
            text: `Olá ${user.name}, Foi realizado um depósito de sua conta, no valor de R$ ${amount}.`,
        };

        await send(mailOptions);
        return
    } catch (err) {
        console.log(err);
    }
};

export default depositSuccess;