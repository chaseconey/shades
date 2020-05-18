'use strict'

const Cluster = use('App/Services/Cluster');
const ECSService = use('App/Services/Service');
const isEmpty = require('lodash.isempty');

class ClusterController {

  async index ({ view }) {
    // // Get list of clusters for each region
    const regions = await Cluster.getRegions();

    let payload = {};

    await Promise.all(
      regions.map(async r => {
        let clusters = await Cluster.getClusters(r)
        if (!isEmpty(clusters)) {
          payload[r] = clusters;
        }
      })
    );

    return view.render('cluster.index', { payload });
  }

  async show ({ request, response, view }) {
    // TODO: If not given, redirect to first cluster
    if (!request.params.cluster) {
      return response.redirect('/');
    }

    const { region, cluster } = request.params;

    // Get all services for specified cluster
    let services = await ECSService.getServices(region, cluster);

    // Return view to show them
    return view.render('cluster.show', { services });
  }
}



module.exports = ClusterController
