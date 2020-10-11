const users = require('./users');

const dataBase = {
  users,
  boards: [],
  tasks: []
};

const getAll = nameSpace => dataBase[nameSpace];

const get = (nameSpace, id) => {
  const foundEntities = dataBase[nameSpace].filter(entity => entity.id === id);

  if (foundEntities.length > 1) {
    throw new Error('Database is wrong. Duplicate ID data detected');
  }

  return foundEntities[0];
};

const create = (nameSpace, newEntity) => {
  dataBase[nameSpace] = [...dataBase[nameSpace], newEntity];

  return get(nameSpace, newEntity.id);
};

const remove = (nameSpace, id) => {
  const index = dataBase[nameSpace].findIndex(entity => entity.id === id);

  if (index === -1) {
    return false;
  }

  dataBase[nameSpace] = [
    ...dataBase[nameSpace].slice(0, index),
    ...dataBase[nameSpace].slice(index + 1)
  ];
  return true;
};

const update = (nameSpace, id, newEntity) => {
  const index = dataBase[nameSpace].findIndex(entity => entity.id === id);

  if (index === -1) {
    return false;
  }

  dataBase[nameSpace] = [
    ...dataBase[nameSpace].slice(0, index),
    newEntity,
    ...dataBase[nameSpace].slice(index + 1)
  ];
  return get(nameSpace, newEntity.id);
};

module.exports = {
  getAll,
  get,
  create,
  remove,
  update
};
