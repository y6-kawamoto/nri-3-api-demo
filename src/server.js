const express = require('express');
const participantModel = require('./models/participant.model');
const participantRouter = require('./routes/participants');

const setupServer = () => {
    const app = express();
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    //'/participants'へのアクセスはrouterで処理
    app.use('/participants', participantRouter);

    //  ヘルスチェック用エンドポイント
    app.get('/hello', async (_, res) => {
        res.status(200).json({ greeting: 'hello' });
    });

    return app;
};

module.exports = { setupServer };
