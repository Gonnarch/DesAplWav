import userRepository from '../repositories/UserRepository.js';

function calcularEdad(fechaNacimiento) {

    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);

    let edad = hoy.getFullYear() - nacimiento.getFullYear();

    const mes = hoy.getMonth() - nacimiento.getMonth();

    if (
        mes < 0 ||
        (mes === 0 && hoy.getDate() < nacimiento.getDate())
    ) {
        edad--;
    }

    return edad;
}

function limpiarUsuario(user) {

    return {
        id: user._id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        birthdate: user.birthdate,
        age: calcularEdad(user.birthdate),
        url_profile: user.url_profile,
        address: user.address,
        roles: user.roles.map(r => r.name),
        createdAt: user.createdAt
    };
}

class UserService {

    async getAll() {

        const users = await userRepository.getAll();

        return users.map(limpiarUsuario);
    }

    async getById(id) {

        const user = await userRepository.findById(id);

        if (!user) {

            const err = new Error('Usuario no encontrado');

            err.status = 404;

            throw err;
        }

        return limpiarUsuario(user);
    }

    async update(id, data) {

        delete data.password;
        delete data.roles;
        delete data.email;

        const user = await userRepository.updateById(id, data);

        if (!user) {

            const err = new Error('Usuario no encontrado');

            err.status = 404;

            throw err;
        }

        return limpiarUsuario(user);
    }
}

export default new UserService();