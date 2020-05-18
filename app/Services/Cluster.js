'use strict'

const AWS = require('aws-sdk');
const ec2 = new AWS.EC2({ region: 'us-west-2' });
const Cache = use('App/Utils/Cache');

class Cluster {

  static getRegions() {
    let regions = Cache.remember('regions', 60 * 60 * 24, async () => {
      let regions = await ec2
        .describeRegions()
        .promise();

      return regions.Regions.map(r => r.RegionName)
    });

    return regions;
  }

  static getClusters(region = "us-west-2") {

    const key = `clusters-${region}`

    let clusters = Cache.remember(key, 60 * 30, async () => {

      const ecs = new AWS.ECS({ region });

      let clusters = await ecs
        .listClusters({ maxResults: 100 })
        .promise();

      return clusters.clusterArns.map(s => s.split('/').pop())
    });

    return clusters;
  }

}

module.exports = Cluster
