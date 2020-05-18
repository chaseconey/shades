'use strict'

const Redis = use('Redis');

class Cache {
  /**
  * Sometimes you may wish to retrieve an item from the cache, but also store a default value
  * if the requested item doesn't exist. For example, you may wish to retrieve all users from
  * the cache or, if they don't exist, retrieve them from the database and add them to the cache.
  *
  * @param {string} key Key for the cache value
  * @param {int} ttl Time to live in seconds
  * @param {function} fn Callback to grab the data you wish to cache
  */
  static async remember (key, ttl, fn) {

    let cache = await Redis.get(key)
    if (cache) {
      // console.log(`${key} cache hit`);

      return JSON.parse(cache);
    }

    // console.log(`${key} cache miss`);

    let value = await fn();

    // Cache
    // console.log(`Setting value for ${key}`);
    Redis.set(key, JSON.stringify(value), 'ex', ttl)

    return value;
  }
}

module.exports = Cache;
