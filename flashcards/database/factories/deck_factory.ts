import factory from '@adonisjs/lucid/factories'
import Deck from '#models/deck'
import User from '#models/user'
import { DateTime } from 'luxon'

export const DeckFactory = factory
  .define(Deck, async ({ faker }) => {
    // Try to get a random user
    const user = await User.query().orderByRaw('RAND()').first()

    return {
      name: faker.commerce.department() + ' Deck',
      userId: user ? user.id : 1, // Fallback to 1 if no users found (though seeder order should prevent this)
      publishedDate: DateTime.fromJSDate(faker.date.past()),
    }
  })
  .build()
