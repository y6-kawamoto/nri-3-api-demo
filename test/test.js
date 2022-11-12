const chai = require('chai');
const chaiHttp = require('chai-http');
const { setupServer } = require('../src/server');
chai.use(chaiHttp);
chai.should();

const server = setupServer();

describe('demo API Server', () => {
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
                id: 1,
                first_name: 'Yoshiaki',
                last_name: 'Kawamoto',
                origin: '兵庫県尼崎市',
                interesting_1:
                    '今もなお将来の夢を模索し続けています。変遷としては、ドッジボール選手(〜幼稚園)⇨漫画家(〜小1)⇨野球選手(〜小4)です。',
                interesting_2:
                    '昔から胃腸が弱いです。テレワークでも会議中よく途中で抜けて:トイレ::目が回る:行ってます。辛いです。',
                warnings: 0,
            });
        });
    });

    describe('GET /participants', () => {
        it('全てのparticipantsの情報を返す', async () => {
            const res = await request.get('/participants');
            res.should.have.status(200);
            res.body.length.should.equal(4);
        });
    });

    describe('POST /participants', () => {
        it('participantの情報を登録する', async () => {
            //const newId = 9999;
            const expected = {
                id: 9999,
                first_name: 'test',
                last_name: 'test',
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
            res.body.should.to.deep.equal('');
        });
    });

    describe('PUT /participants/:id', () => {
        it('participantの情報を更新する', async () => {
            const update = { last_name: 'd' };
            await request.put('/participants/1').send(update);
            const res = await request.get('/participants/1');
            res.body.last_name.should.to.deep.equal('d');
            //await request
            //    .put('/participants/1')
            //    .send({ last_name: 'Kawamoto' });
        });
    });

    describe('PUT /participants/:id/warnings', () => {
        it('participantに警告回数1を記録する', async () => {
            const res = await request.put('/participants/2/warnings');
            res.body.should.to.deep.equal({
                id: '1',
                warnings: 1,
                message: '警告1回目です。',
            });
        });
    });
});
