/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('./index');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Routes', () => {
    describe('/', () => {
        it('should send back a 200 status', done => {
            chai.request(server)
                .get('/')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.be.status(200);
                    done();
                });
        });
    });
});

describe('Routes', () => {
    describe('/home', () => {
        it('should send back a 200 status', done => {
            chai.request(server)
                .get('/home')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.be.status(200);
                    done();
                });
        });
    });
});

describe('Routes', () => {
    describe('/inventory-list', () => {
        it('should send back a 200 status', done => {
            chai.request(server)
                .get('/inventory-list')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.be.status(200);
                    done();
                });
        });
    });
});

describe('Routes', () => {
    describe('/client-list', () => {
        it('should send back a 200 status', done => {
            chai.request(server)
                .get('/client-list')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.be.status(200);
                    done();
                });
        });
    });
});

describe('Routes', () => {
    describe('/appointment-list', () => {
        it('should send back a 200 status', done => {
            chai.request(server)
                .get('/appointment-list')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.be.status(200);
                    done();
                });
        });
    });
});
