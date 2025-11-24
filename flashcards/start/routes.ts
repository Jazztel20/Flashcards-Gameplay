import decks_controller from '#controllers/decks_controller'
import users_controller from '#controllers/users_controller'
import { errors } from '@adonisjs/core'
/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.get('/', async ({ view }) => {
  try {
    const homePage = await view.render('home')
    return homePage
  } catch (error) {
    if (error instanceof errors.E_ROUTE_NOT_FOUND) {
      console.log(`${error?.name || 'Row'} not found`)
    }
    throw error
  }
})

router.resource('decks', decks_controller).only(['show', 'create', 'update'])

router.on('/').render('/decks')

router.get('/users', [users_controller, 'create'])

// users to show up on the router
router.on('/').render('/users/show')

/*router.get('/users/:id', async ({ view, params }) => {
  // Renders a view and passes dynamic data from the route parameters
  return view.render('users/show', { userId: params.id })
})*/
