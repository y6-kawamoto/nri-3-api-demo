var express = require('express');
var router = express.Router();
const participantModel = require('../models/participant.model');

//取得（全件）
router.get('/', async (req, res, next) => {
    const participant = await participantModel.getAll();
    res.status(200).json(participant);
});

//取得（ID指定）
router.get('/:id', async (req, res) => {
    const participant = await participantModel.getById(req.params.id);
    res.status(200).json(participant);
});

//登録
router.post('/', async (req, res) => {
    const participant = req.body;
    await participantModel.create(participant);
    res.status(201).end();
});

//削除
router.delete('/:id', async (req, res) => {
    const participant = await participantModel.delete(req.params.id);
    res.status(200).end();
});

//更新
router.put('/:id', async (req, res) => {
    const participant = await participantModel.update(req.params.id, req.body);
    res.status(201).end();
});

//警告回数の登録
router.put('/:id/warnings', async (req, res) => {
    const participant = await participantModel.getById(req.params.id);
    const numOfWarnings = participant.warnings + 1;
    let result = {};
    if (numOfWarnings < 3) {
        const update = { warnings: numOfWarnings };
        await participantModel.update(req.params.id, update);
        result = {
            id: req.params.id,
            warnings: numOfWarnings,
            message: `警告${numOfWarnings}回目です。`,
        };
    } else {
        await participantModel.delete(req.params.id);
        result = {
            id: req.params.id,
            warnings: numOfWarnings,
            message: `警告回数が上限に達したので、除籍しました。`,
        };
    }
    res.status(201).send(result);
});

module.exports = router;
