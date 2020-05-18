'use strict'

const AWS = require('aws-sdk');
const Redis = use('Redis');
const Cache = use('App/Utils/Cache');

class ECSService {

  /**
   *
   * @param {string} cluster
   */
  static getServices(region, cluster) {

    const key = `services-${region}-${cluster}`;

    let services = Cache.remember(key, 60 * 5, async () => {
      const ecs = new AWS.ECS({ region });

      let services = await ecs
        .listServices({ cluster, maxResults: 100 })
        .promise();

      return services.serviceArns.map(s => s.split('/').pop());
    });

    return services;
  }

  static getService(region, cluster, serviceName) {

    const key = `service-${region}-${cluster}-${serviceName}`;

    let service = Cache.remember(key, 60 * 5, async () => {
      const ecs = new AWS.ECS({ region });

      let services = await ecs
        .describeServices({ cluster, services: [serviceName] })
        .promise();

      return services.services.pop();
    });

    return service;
  }

  static getTaskDef(region, taskDefinition) {

    const key = `taskdef-${region}-${taskDefinition}`;

    let taskDef = Cache.remember(key, 60 * 1, async () => {
      const ecs = new AWS.ECS({ region });

      return await ecs
        .describeTaskDefinition({ taskDefinition })
        .promise();
    });

    return taskDef;
  }

}

module.exports = ECSService
