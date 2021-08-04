const MongoHelper = require('../helpers/mongo-helper')
const LoadUserByEmailRepository = require('./load-user-by-email-repository')
const { MissingParamError } = require('../../utils/errors')

let db

const makeSut = () => {
  return new LoadUserByEmailRepository()
}

describe('LoadUserByEmail Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connectDb(process.env.MONGO_URL)
    db = await MongoHelper.getDb()
  })

  beforeEach(async () => {
    await db.collection('users').deleteMany()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return null if no user is found', async () => {
    const sut = makeSut()
    const user = await sut.load('invalid_email@email.com')
    expect(user).toBeNull()
  })

  test('Should return an user if user is found', async () => {
    const sut = makeSut()
    const fakeUser = await db.collection('users').insertOne({
      email: 'email@email.com',
      password: 'hashed_password'
    })
    const user = await sut.load('email@email.com')
    expect(user._id).toEqual(fakeUser.insertedId)
  })

  test('Should throw if no email is provided', async () => {
    const sut = makeSut()
    const promise = sut.load()
    expect(promise).rejects.toThrow(new MissingParamError('email'))
  })
})
