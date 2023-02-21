const CourseModel = require("../../../src/modules/course/course.model")
const { faker } = require('@faker-js/faker')

describe.skip('Course Model', () => {

    it('Should create new course', async () => {
        const course = {
            title: faker.lorem.word(),
            description: faker.lorem.paragraph(),
            createdById: faker.random.numeric({ min: 1, max: 10 })
        }
        const result = await CourseModel.create(course)
        expect(result).toHaveProperty('courseId')
    })

    it('Should create courses in bulk', async () => {
        try {
            let limit = 55;
            const courses = []
            while (limit) {
                courses.push({
                    title: faker.lorem.words(),
                    description: faker.lorem.paragraph(),
                    createdById: faker.random.numeric({ min: 1, max: 10 }),
                    url: faker.image.business()
                })
                limit -= 1;
            }
            const result = await CourseModel.bulkCreate(courses, { returning: true })
            // console.log(result)
            expect(result).toBeInstanceOf(Array)
            result.forEach(item => {
                expect(item).toHaveProperty('courseId')
            })
        } catch (error) {
            console.log(error)
        }
    })



})