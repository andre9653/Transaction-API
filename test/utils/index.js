const clearDatabase = (dbConnection, models = []) => new Promise((resolve, reject) => {
  Object
    .values(models.length ? models : dbConnection.models)
    .map((model) => resolve(model.destroy({ truncate: { cascade: true } })));
});

module.exports = { clearDatabase };
