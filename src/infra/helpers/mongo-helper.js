const { MongoClient } = require('mongodb')

module.exports = {

  async connectDb (uri) {
    this.uri = uri
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    this.db = await this.client.db()
  },

  async disconnect () {
    await this.client.close()
    this.client = null
    this.db = null
  },

  async getCollection (name) {
    if (!this.client || !this.client.isConnected) {
      await this.connectDb(this.uri)
    }
    return this.db.collection(name)
  }
}
