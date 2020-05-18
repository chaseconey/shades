'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/auth/callback', 'AuthController.callback');
Route.get('/auth/logout', 'AuthController.logout');

Route.get('/health', 'HealthController.index');

// Route.get('/', 'ClusterController.index').middleware(['auth0']);
Route.get('/', 'ClusterController.index');

// Get list of services for cluster
// Route.get('/:region/:cluster', 'ClusterController.show').middleware(['auth0']);
Route.get('/:region/:cluster', 'ClusterController.show');

// Show a specific service's env
// Route.get('/:region/:cluster/:service', 'ServiceController.show').middleware(['auth0']);
Route.get('/:region/:cluster/:service', 'ServiceController.show');
