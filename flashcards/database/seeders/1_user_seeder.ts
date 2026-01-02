import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        pseudo: 'Albert',
        email: 'albert@test.com',
        password: 'user',
        isAdmin: false,
      },
      {
        pseudo: 'Edouard',
        email: 'edouard@test.com',
        password: 'admin',
        isAdmin: true,
      },
    ])
  }
}
