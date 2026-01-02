import factory from '@adonisjs/lucid/factories'
import Flashcard from '#models/flashcard'

export const FlashcardFactory = factory
  .define(Flashcard, ({ faker }) => {
    return {
      question: faker.lorem.sentence(),
      answer: faker.lorem.sentence(),
    }
  })
  .build()
