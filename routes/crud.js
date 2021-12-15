const genCrudRoute = (router, modelName, filter = []) => {
  const service = require(`../services/${modelName.toLowerCase()}.js`)

  if (!filter.includes('readAll')) {
    router.get('/', async (req, res, next) => {
      const query = req.query

      try {
        let result

        if (Object.keys(query).length > 0) {
          result = await service[`get${modelName}ByQuery`](query)
        } else {
          result = await service[`get${modelName}s`]()
        }
        res.json(result)
      } catch (e) {
        next(e)
      }
    })
  }

  if (!filter.includes('read')) {
    router.get('/:id', async (req, res, next) => {
      const id = req.params.id

      try {
        const result = await service[`get${modelName}ById`](id)
        res.json(result)
      } catch (e) {
        next(e)
      }
    })
  }

  if (!filter.includes('create')) {
    router.post('/', async (req, res, next) => {
      const data = req.body

      try {
        const result = await service[`create${modelName}`](data, req.user)
        res.json(result)
      } catch (e) {
        next(e)
      }
    })
  }

  if (!filter.includes('update')) {
    router.patch('/:id', async (req, res, next) => {
      const id = req.params.id
      const data = req.body

      try {
        const result = await service[`update${modelName}ById`](
          id,
          data,
          req.user
        )
        res.json(result)
      } catch (e) {
        next(e)
      }
    })
  }

  if (!filter.includes('delete')) {
    router.delete('/:id', async (req, res, next) => {
      const id = req.params.id

      try {
        await service[`delete${modelName}ById`](id)
        res.json(true)
      } catch (e) {
        next(e)
      }
    })
  }

  if (!filter.includes('deleteAll')) {
    router.delete('/', async (req, res, next) => {
      try {
        await service[`delete${modelName}s`]()
        res.json(true)
      } catch (e) {
        next(e)
      }
    })
  }
}

module.exports = genCrudRoute
