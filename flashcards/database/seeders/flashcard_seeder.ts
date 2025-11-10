import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { FlashcardFactory } from '#database/factories/flashcard_factory'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
     await FlashcardFactory.createMany(10)
  }
}