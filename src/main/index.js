const MongoHelper = require('../infra/helpers/mongo-helper')
const env = require('./config/env')

MongoHelper.connectDb(env.mongoUrl)
  .then(() => {
    const app = require('./config/app')
    app.listen(8000, () => console.log('Server Running'))
  })
  .catch(console.error)
