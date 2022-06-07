import send from "../services/sendEmail";
import UserModel from './../models/user';

const withdrawSuccess = async (id: string, amount: number) => {
    try {
        const user = await UserModel.findById(id);
        const mailOptions = {
            from: 'bank@gmail.com',
            to: user.email,
            subject: 'Saque realizado!',
            text: `Olá ${user.name}, Foi realizado um saque de sua conta, no valor de R$ ${amount}.`,
        };

        await send(mailOptions);
        return
    } catch (err) {
        console.log(err);
    }
};

export default withdrawSuccess;