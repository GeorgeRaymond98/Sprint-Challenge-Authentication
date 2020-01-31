const request = require('supertest');
const server = require('./server')

describe('server', function() {
    it('it runs with test', function() {  //test
        expect(true).toBe(true)
    }) 

    describe('GET /', function() {
        it('It should return 200 OK', function() {
            return request(server).get('/')
            .then(res => {
                expect(res.status).toBe(200);
            })
        })
        it('It should return JSON', function() {
            return request(server).get('/')
            .then(res => {
                expect(res.type).toMatch(/json/i);
            })
        })
        it('It should return JSON', function() {
            return request(server).get('/')
            .then(res => {
                expect(res.body.working).toBe("Its wroking, its working ");
            })
        })
    })
})