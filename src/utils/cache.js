const cache = new Map();

function getCache(key) {
  return cache.get(key);
}

function setCache(key, data) {
  cache.set(key, data);
}

module.exports = { getCache, setCache };
