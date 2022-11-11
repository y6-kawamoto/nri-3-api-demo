const chai = require('chai');
const chaiHttp = require('chai-http');
// const expect = require('chai').expect;
const { setupServer } = require('../src/server');

chai.use(chaiHttp);
chai.should();

const server = setupServer();

describe('Solo API Server', () => {
    let request;
    beforeEach(() => {
        request = chai.request(server).keepOpen();
    });
    afterEach(() => {
        request.close();
    });
    describe('GET /hello', () => {
        it('{greeting: hello} を返却する', async () => {
            const res = await request.get('/hello');
            res.should.have.status(200);
            res.body.should.to.deep.equal({ greeting: 'hello' });
        });
    });

    describe('GET /participants', () => {
        it('指定されたIDのparticipantsの情報を返す', async () => {
            const res = await request.get('/participants/1');
            res.should.have.status(200);
            res.body.should.to.deep.equal({
                address: '154 Hopper ave.',
                country: 'United States',
                email: 'fenxen@example.com',
                firstName: 'Henry',
                id: 1,
                lastName: 'Krinkle',
                postalCode: '60245',
                region: 'New Jersey',
            });
        });
    });

    describe('GET /participants', () => {
        it('全てのparticipantsの情報を返す', async () => {
            const res = await request.get('/participants');
            res.should.have.status(200);
            res.body.length.should.equal(7);
        });
    });

    describe('POST /participants', () => {
        it('participantの情報を登録する', async () => {
            const newId = 999;
            const expected = {
                id: newId,
                email: 'test99@example.com',
                last_name: 'Parker',
                postal_code: '55443',
            };
            await request.post('/participants').send(expected);
            const res = await request.get('/participants/999');
            res.body.id.should.to.deep.equal(expected.id);
        });
    });

    describe('DELETE /participants/:id', () => {
        it('participantの情報を削除する', async () => {
            await request.delete('/participants/999');
            const res = await request.get('/participants/999');
            res.body.should.to.deep.equal('');
        });
    });

    describe('PUT /participants/:id', () => {
        it('participantの情報を更新する', async () => {
            const update = { last_name: 'a' };
            await request.put('/participants/1').send(update);
            const res = await request.get('/participants/1');
            res.body.lastName.should.to.deep.equal('a');
        });
    });
});
