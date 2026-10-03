import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import userRepository from '../repositories/UserRepository.js';
import roleRepository from '../repositories/RoleRepository.js';

class AuthService {

    async signUp({
        email,
        password,
        name,
        lastName,
        phoneNumber,
        birthdate,
        url_profile = '',
        address = '',
        roles = ['user']
    }) {

        if (
            !email ||
            !password ||
            !name ||
            !lastName ||
            !phoneNumber ||
            !birthdate
        ) {

            const err = new Error(
                'Complete todos los campos obligatorios'
            );

            err.status = 400;

            throw err;
        }

        const existing =
            await userRepository.findByEmail(email);

        if (existing) {

            const err =
                new Error('El email ya se encuentra en uso');

            err.status = 400;

            throw err;
        }

        const passwordRegex =
            /^(?=.*[A-Z])(?=.*\d)(?=.*[#$%&*@]).{8,}$/;

        if (!passwordRegex.test(password)) {

            const err = new Error(
                'La contraseña debe tener mínimo 8 caracteres, una mayúscula, un número y un carácter especial (# $ % & * @)'
            );

            err.status = 400;

            throw err;
        }

        const saltRounds =
            parseInt(
                process.env.BCRYPT_SALT_ROUNDS || '10',
                10
            );

        const hashed =
            await bcrypt.hash(password, saltRounds);

        const roleIds = [];

        for (const roleName of roles) {

            let role =
                await roleRepository.findByName(roleName);

            if (!role) {

                role =
                    await roleRepository.create({
                        name: roleName
                    });
            }

            roleIds.push(role._id);
        }

        const user =
            await userRepository.create({

                email,
                password: hashed,
                name,
                lastName,
                phoneNumber,
                birthdate,
                url_profile,
                address,

                roles: roleIds
            });

        return {

            id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email
        };
    }


    async signIn({ email, password }) {

        const user =
            await userRepository.findByEmail(email);

        if (!user) {

            const err =
                new Error('Credenciales inválidas');

            err.status = 401;

            throw err;
        }

        const ok =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!ok) {

            const err =
                new Error('Credenciales inválidas');

            err.status = 401;

            throw err;
        }

        const roles =
            user.roles.map(r => r.name);

        const token = jwt.sign(

            {
                sub: user._id,
                roles
            },

            process.env.JWT_SECRET,

            {
                expiresIn:
                    process.env.JWT_EXPIRES_IN || '1h'
            }
        );

        return {
            token,
            roles
        };
    }
}

export default new AuthService();