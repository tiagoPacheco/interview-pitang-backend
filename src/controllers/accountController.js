import { encryptString, isPasswordMatch } from 'common/util'

const User = require('../models/user');

export default {
    list: async (req, res) => {
        try {
            const users = await User.find();

            const resMsg = users.length > 0 ? { message: 'Accounts found', users } : { message: "No accounts" };

            res.json(resMsg);
        } catch (e) {
            console.error(e);
            res.json({ message: `Something went wrong`, error: e });
        }
    },
    create: async (req, res) => {
        try {
            const { body: { name, email, password } } = req;

            const newUser = new User({
                name,
                email,
                password: encryptString(password),
            });

            await newUser.save();

            res.json({ message: 'Account Created!' });
        } catch (e) {
            console.error(e);
            res.json({ message: `Something went wrong`, error: e });
        }
    },
    delete: async (req, res) => {
        try {
            const { params: { id } } = req;

            let user = await User.findByIdAndDelete(id);

            const resMsg = user ? { message: 'Account deleted!', username: user.name } : { message: 'User not found!' };

            res.json(resMsg);
        } catch (e) {
            console.error(e);
            res.json({ message: `Something went wrong`, error: e });
        }
    },
    update: async (req, res) => {
        try {
            const { params: { id }, body: { name, email, password } } = req;

            const userToBeUpdated = {
                name,
                email,
                password: encryptString(password)
            };

            const user = await User.findByIdAndUpdate(id, userToBeUpdated);

            const resMsg = user ? { message: 'Account updated!', username: user.name } : { message: 'User not found!' };

            res.json(resMsg);
        } catch (e) {
            console.error(e);
            res.json({ message: `Something went wrong`, error: e });
        }
    }
};