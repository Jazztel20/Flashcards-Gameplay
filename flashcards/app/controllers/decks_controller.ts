// import type { HttpContext } from '@adonisjs/core/http'
import Deck from '#models/deck'
import { HttpContext } from '@adonisjs/core/http'
import { deckValidator } from '#validators/deck'

export default class DecksController {
  // Affichage d'un deck unique
  public async showSingleDeck({ params, view }: HttpContext) {
    // Récupère le deck avec toutes ses flashcards

    const deck = await Deck.query()
      .preload('flashcards', (flashcardQuery) => {
        flashcardQuery.orderBy('created_at', 'asc')
      })
      .where('id', params.id)
      .firstOrFail()

    // Passe l'objet deck avec ses flashcards à la vue
    return view.render('components/decks/detail', { deck })
  }

  // Affichage de tous les decks (Publics + Mes decks)
  public async index({ view, auth }: HttpContext) {
    const user = auth.user

    const query = Deck.query()

    if (user) {
      if (user.isAdmin) {
        // Admin voit tout
      } else {
        // User voit les publics OU les siens
        query.where((q) => {
          q.where('is_public', true).orWhere('user_id', user.id)
        })
      }
    } else {
      // Guest voit uniquement les publics
      query.where('is_public', true)
    }

    const decks = await query.orderBy('updated_at', 'desc')

    return view.render('home', { decks })
  }

  // Formulaire de création
  async create({ view }: HttpContext) {
    return view.render('decks/create')
  }

  // Sauvegarde du deck created
  async store({ request, response, auth, session }: HttpContext) {
    const data = await request.validateUsing(deckValidator)

    await Deck.create({
      name: data.name,
      userId: auth.user!.id,
    })

    session.flash('success', 'Le deck a été ajouté avec succès !')
    return response.redirect().toRoute('home')
  }

  // Formulaire d'édition
  async edit({ params, view, auth, response, session }: HttpContext) {
    const deck = await Deck.findOrFail(params.id)

    if (auth.user?.id !== deck.userId && !auth.user?.isAdmin) {
      session.flash('error', "Vous n'avez pas la permission de modifier ce deck.")
      return response.redirect().toRoute('home')
    }

    return view.render('decks/edit', { deck })
  }

  // Mise à jour
  async update({ params, request, response, session, auth }: HttpContext) {
    const deck = await Deck.findOrFail(params.id)

    if (auth.user?.id !== deck.userId && !auth.user?.isAdmin) {
      session.flash('error', "Vous n'avez pas la permission de modifier ce deck.")
      return response.redirect().toRoute('home')
    }

    const data = await request.validateUsing(deckValidator)

    deck.merge(data)
    await deck.save()

    session.flash('success', 'Le deck a été mis à jour avec succès !')
    return response.redirect().toRoute('home')
  }

  // Suppression
  async destroy({ params, response, session, auth }: HttpContext) {
    const deck = await Deck.findOrFail(params.id)

    if (auth.user?.id !== deck.userId && !auth.user?.isAdmin) {
      session.flash('error', "Vous n'avez pas la permission de supprimer ce deck.")
      return response.redirect().toRoute('home')
    }

    await deck.delete()
    session.flash('success', 'Le deck a été supprimé avec succès !')
    return response.redirect().toRoute('home')
  }

  // Publication
  async publish({ params, response, session, auth }: HttpContext) {
    const deck = await Deck.query().where('id', params.id).preload('flashcards').firstOrFail()

    if (auth.user?.id !== deck.userId && !auth.user?.isAdmin) {
      session.flash('error', "Vous n'avez pas la permission de publier ce deck.")
      return response.redirect().toRoute('home')
    }

    if (deck.flashcards.length === 0) {
      session.flash('error', 'Impossible de publier un deck sans flashcards.')
      return response.redirect().back()
    }

    deck.isPublic = true
    deck.publishedDate = DateTime.now()
    await deck.save()

    session.flash('success', 'Le deck a été publié avec succès !')
    return response.redirect().back()
  }

  // Game Mode
  async play({ params, view, auth, response, session }: HttpContext) {
    const deck = await Deck.query().where('id', params.id).preload('flashcards').firstOrFail()

    // Access Check: Public OR Owner OR Admin
    const canPlay =
      deck.isPublic || (auth.user && (auth.user.id === deck.userId || auth.user.isAdmin))

    if (!canPlay) {
      session.flash('error', "Vous n'avez pas accès à ce deck.")
      return response.redirect().toRoute('home')
    }

    if (deck.flashcards.length === 0) {
      session.flash('error', 'Ce deck ne contient aucune flashcard.')
      return response.redirect().back()
    }

    return view.render('decks/play', {
      deck,
      flashcardsJson: JSON.stringify(deck.flashcards),
    })
  }
}
import { DateTime } from 'luxon'
