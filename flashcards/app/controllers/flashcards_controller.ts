// import type { HttpContext } from '@adonisjs/core/http'
import Flashcard from '#models/flashcard'
import { HttpContext } from '@adonisjs/core/http'

export default class FlashcardsController {
  // SHOW LATEST FLASHCARDS
  async index({ view }: HttpContext) {
    const flashcards = await Flashcard.query().orderBy('updated_at', 'asc')

    return view.render('pages/home', { flashcards })
  }

  // CREATE A FLASHCARD
  async store({ request, view }: HttpContext) {
    const data = request.only(['question', 'answer', 'deck_id'])

    const flashcard = await Flashcard.create(data)
    return view.render('flashcard/create', { flashcard })
  }

  // UPDATE A FLASHCARD
  async update({ params, request, view }: HttpContext) {
    // Récupération des données
    const data = request.only(['question', 'reponse'])
    // Vérification de l'existence de
    const flashcard = await Flashcard.findOrFail(params.id)
    // Mise à jour des données de l'élève
    flashcard.merge(data)
    // Sauvegarde des modifications
    await flashcard.save()
    // Retourne le json de l'élève mis à jour
    return view.render('flashcard/create', { flashcard })
  }

  // DELETE A FLASHCARD
  async destroy({ params, request }) {}
}
