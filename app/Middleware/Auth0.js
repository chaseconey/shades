'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

// const { ioc } = require('@adonisjs/fold');
const client = use('Auth0/Client');

class Auth0 {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ response, session }, next) {

    if (!session.get('authenticated')) {
      // console.log("Not authenticated");

      let uri = client.code.getUri();

      return response.redirect(uri);
    }

    // console.log("Authenticated");

    // call next to advance the request
    await next()
  }
}

module.exports = Auth0
