'use strict'

class HealthController {

  index() {
    return { status: "ok" };
  }
}

module.exports = HealthController
