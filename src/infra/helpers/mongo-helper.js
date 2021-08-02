const { MongoClient } = require('mongodb')

module.exports = {

  async connectDb (uri, dbName) {
    this.uri = uri
    this.dbName = dbName
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    this.db = await this.client.db(dbName)
  },

  async disconnect () {
    await this.client.close()
    this.client = null
    this.db = null
  },

  async getDb () {
    if (!this.client || !this.client.isConnected) {
      await this.connectDb(this.uri, this.dbName)
    }
    return this.db
  }
}
