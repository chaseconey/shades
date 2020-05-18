'use strict'

const { ServiceProvider } = require('@adonisjs/fold');
const ClientOAuth2 = require('client-oauth2');

class Auth0Provider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register () {

    this.app.singleton('Auth0/Client', () => {
      return new ClientOAuth2({
        clientId: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        accessTokenUri: process.env.AUTH0_DOMAIN + "/oauth/token",
        authorizationUri: process.env.AUTH0_DOMAIN + "/authorize",
        redirectUri: process.env.AUTH0_CALLBACK_URL
      });
    })


  }

  /**
   * Attach context getter when all providers have
   * been registered
   *
   * @method boot
   *
   * @return {void}
   */
  boot () {
    //
  }
}

module.exports = Auth0Provider
