import factory from '@adonisjs/lucid/factories'
import User from '#models/user'

export const UserFactory = factory
  .define(User, ({ faker }) => {
    return {
      pseudo: faker.internet.username(),
      email: faker.internet.email(),
      password: 'password', // Default password
      isAdmin: false,
    }
  })
  .state('admin', (user) => {
    user.isAdmin = true
  })
  .build()
