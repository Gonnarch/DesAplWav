import authService
    from '../services/AuthService.js';

import userRepository
    from '../repositories/UserRepository.js';

export default async function seedUsers() {

    const email = 'admin@admin.com';

    const existing =
        await userRepository.findByEmail(email);

    if (existing) {
        return;
    }

    await authService.signUp({

        name: 'Administrador',

        lastName: 'Sistema',

        email: 'admin@admin.com',

        password: 'Admin@123',

        phoneNumber: '999999999',

        birthdate: '2000-01-01',

        address: 'Lima',

        url_profile:
            'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500',

        roles: ['admin']
    });

    console.log(
        'Administrador creado: admin@admin.com'
    );
}