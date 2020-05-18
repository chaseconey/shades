'use strict'

const client = use('Auth0/Client');

class AuthController {

  async callback ({ request, session, response }) {

    let user = await client.code.getToken(request.request.url);

    // At this point, token is valid and they are a real user...we gucci
    session.put('authenticated', 1);

    return response.redirect('/');
  }

  logout ({ session, response }) {
    session.forget('authenticated');

    return response.redirect('/');
  }

}

module.exports = AuthController
