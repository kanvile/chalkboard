const genCrudRoute = (router, model, filter = []) => {
  const genCrudService = require('../services/crud')

  const {
    getCommons,
    getCommonById,
    getCommonByQuery,
    createCommon,
    updateCommonById,
    deleteCommonById,
    deleteCommons,
  } = genCrudService(model, 'Common')

  if (!filter.includes('readAll')) {
    router.get('/', async (req, res, next) => {
      const query = req.query

      try {
        let result

        if (Object.keys(query).length > 0) {
          result = await getCommonByQuery(query)
        } else {
          result = await getCommons()
        }
        res.json(result)
      } catch (e) {
        next(e)
      }
    })
  }

  if (!filter.includes('read')) {
    router.get('/:id', async (req, res, next) => {
      console.log(req)
      const id = req.params.id

      try {
        const result = await getCommonById(id)
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
        const result = await createCommon(data)
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
        const result = await updateCommonById(id, data)
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
        await deleteCommonById(id)
        res.json(true)
      } catch (e) {
        next(e)
      }
    })
  }

  if (!filter.includes('deleteAll')) {
    router.delete('/', async (req, res, next) => {
      try {
        await deleteCommons()
        res.json(true)
      } catch (e) {
        next(e)
      }
    })
  }
}

module.exports = genCrudRoute
