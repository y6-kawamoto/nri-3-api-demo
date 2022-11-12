const chai = require('chai');
const chaiHttp = require('chai-http');
const testParticipant = require('./testParticipant');
const { setupServer } = require('../src/server');
//const { default: knex } = require('knex');
const config = require('../knexfile');
const knex = require('knex')(config);
const participantModel = require('../src/models/participant.model');
const PARTICIPANT_TABLE = participantModel.PARTICIPANT_TABLE;

chai.use(chaiHttp);
chai.should();

const server = setupServer();

describe('demo API', () => {
    let request;
    let testData;
    beforeEach(async () => {
        request = chai.request(server).keepOpen();
        //テストデータを挿入
        testData = testParticipant.getParticipant();
        await knex(PARTICIPANT_TABLE)
            .insert(testData)
            .then((res) => {
                console.log('inserted test participant');
            });
    });
    afterEach(async () => {
        //テストデータを削除
        await knex(PARTICIPANT_TABLE)
            .where('id', testData.id)
            .returning('id')
            .del()
            .then((result) => {
                console.log('removed test customer');
            });
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
            const res = await request.get('/participants/1111');
            res.should.have.status(200);
            res.body.should.to.deep.equal({
                id: 1111,
                first_name: 'テスト太郎',
                last_name: '山田',
                origin: '東京都',
                interesting_1: 'テストデータです。',
                interesting_2: null,
                warnings: 0,
            });
        });
    });

    describe('GET /participants', () => {
        it('全てのparticipantsの情報を返す', async () => {
            const res = await request.get('/participants');
            res.should.have.status(200);
            res.body.length.should.equal(5);
        });
    });

    describe('POST /participants', () => {
        it('participantの情報を登録する', async () => {
            const expected = {
                id: 9999,
                first_name: 'ftest',
                last_name: 'ltest',
                origin: 'test',
                interesting_1: 'テスト1',
                interesting_2: 'テスト2',
                warnings: 0,
            };
            await request.post('/participants').send(expected);
            const res = await request.get('/participants/9999');
            res.body.id.should.to.deep.equal(9999);
        });
    });

    describe('DELETE /participants/:id', () => {
        it('participantの情報を削除する', async () => {
            await request.delete('/participants/9999');
            const res = await request.get('/participants/9999');
            res.body.should.to.deep.equal({
                message: 'id:9999の参加者は未登録、または除籍されています。',
            });
        });
    });

    describe('PUT /participants/:id', () => {
        it('participantの情報を更新する', async () => {
            const update = { last_name: '更新済' };
            await request.put('/participants/1111').send(update);
            const res = await request.get('/participants/1111');
            res.body.last_name.should.to.deep.equal('更新済');
        });
    });

    describe('PUT /participants/:id/warnings', () => {
        it('participantに1回目の警告を記録する', async () => {
            const res = await request.put('/participants/1111/warnings');
            res.body.should.to.deep.equal({
                id: 1111,
                warnings: 1,
                message: '警告1回目です。',
            });
        });

        it('participantに2回目の警告を記録する', async () => {
            await request.put('/participants/1111/warnings');
            const res = await request.put('/participants/1111/warnings');
            res.body.should.to.deep.equal({
                id: 1111,
                warnings: 2,
                message: '警告2回目です。',
            });
        });

        it('participantに3回目の警告を記録する', async () => {
            await request.put('/participants/1111/warnings');
            await request.put('/participants/1111/warnings');
            const res = await request.put('/participants/1111/warnings');
            res.body.should.to.deep.equal({
                id: 1111,
                warnings: 3,
                message: '警告回数が上限に達したので、除籍しました。',
            });
        });
    });
});
