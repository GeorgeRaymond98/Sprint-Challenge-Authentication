const request = require('supertest');
const auth = require('./auth-router')

describe('auth-router', function() {
    it('it runs with test', function() {  //test
        expect(true).toBe(true)
    }) 

    describe('POST /register', function() {
        it('It should return 201', function() {
            return request(auth).post('/register')
            .then(res => {
                expect(res.status).toBe(201);
            })
        })
    })
})