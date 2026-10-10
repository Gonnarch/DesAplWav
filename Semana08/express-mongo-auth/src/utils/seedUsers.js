import authService
    from '../services/AuthService.js';

import userRepository
    from '../repositories/UserRepository.js';

export default async function seedUsers() {

    const email = process.env.SEED_ADMIN_EMAIL;
    const password = process.env.SEED_ADMIN_PASSWORD;
    if (!email || !password) return;

    const existing =
        await userRepository.findByEmail(email);

    if (existing) {
        return;
    }

    await authService.signUp({

        name: 'Administrador',

        lastName: 'Sistema',

        email,

        password,

        phoneNumber: '999999999',

        birthdate: '2000-01-01',

        address: 'Lima',

        url_profile:
            'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500',

        roles: ['admin']
    });

    console.log(
        'Administrador inicial creado'
    );
}
