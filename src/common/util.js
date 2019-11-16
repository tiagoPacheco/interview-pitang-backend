import * as bcrypt from "bcrypt-nodejs";

export const encryptString = (value) => {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(value, salt);
}

export const isPasswordMatch = (encodedPassword, password) => {
    return bcrypt.compareSync(password, encodedPassword);
}