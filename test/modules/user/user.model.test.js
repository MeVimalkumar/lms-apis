const UserModel = require("../../../src/modules/user/user.model")
const { faker } = require('@faker-js/faker')

describe('User Model', () => {

    it('Should create new user', async () => {
        const user = {
            name: faker.name.fullName(),
            email: faker.internet.email(),
            password: "Login@123"
        }
        const result = await UserModel.create(user)
        expect(result).toHaveProperty('userId')
    })

    it.only('Should get the rows and count', async () => {
        const result = await UserModel.findAndCountAll({ offset: 0, limit: 10 })
        expect(result).toHaveProperty('rows')
        expect(result).toHaveProperty('count')
    })


})