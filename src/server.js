const express = require('express');
const customerModel = require('./customer.model');

const setupServer = () => {
    const app = express();
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    //  ヘルスチェック用エンドポイント
    app.get('/hello', async (_, res) => {
        res.status(200).json({ greeting: 'hello' });
    });

    //取得（全件）
    app.get('/participants', async (req, res) => {
        const customer = await customerModel.getAll();
        res.status(200).json(customer);
    });

    //取得（ID指定）
    app.get('/participants/:id', async (req, res) => {
        const customer = await customerModel.getById(req.params.id);
        res.status(200).json(customer);
    });

    //登録
    app.post('/participants', async (req, res) => {
        const participant = req.body;
        await customerModel.create(participant);
        res.status(201).end();
    });

    //削除
    app.delete('/participants/:id', async (req, res) => {
        const customer = await customerModel.delete(req.params.id);
        res.status(201).end();
    });

    //更新
    app.put('/participants/:id', async (req, res) => {
        const customer = await customerModel.update(req.params.id, req.body);
        res.status(201).end();
    });

    return app;
};

module.exports = { setupServer };
