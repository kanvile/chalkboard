const genCrudService = (model, modelName) => {
  return {
    [`get${modelName}s`]: async () => {
      const data = await model.find({})
      return data
    },
    [`get${modelName}ById`]: async (id) => {
      const data = await model.findById(id)
      return data
    },
    [`get${modelName}ByQuery`]: async (query) => {
      const data = await model.findOne(query)
      return data
    },
    [`create${modelName}`]: async (params) => {
      const data = await model.create(params)
      return data
    },
    [`update${modelName}ById`]: async (id, data) => {
      await model.findByIdAndUpdate(id, data)
    },
    [`delete${modelName}ById`]: async (id) => {
      await model.findByIdAndDelete(id)
    },
    [`delete${modelName}s`]: async () => {
      await model.deleteMany({})
    },
  }
}

module.exports = genCrudService
