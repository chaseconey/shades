'use strict'

const ECSService = use('App/Services/Service');

class ServiceController {

  async show ({ request, view }) {

    let { service: serviceName, cluster, region } = request.params;

    let service = await ECSService.getService(region, cluster, serviceName);
    let def = await ECSService.getTaskDef(region, service.taskDefinition);

    return view.render('service.show', { service, def });
  }
}

module.exports = ServiceController
