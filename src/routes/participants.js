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
    if (participant) {
        res.status(200).json(participant);
    } else {
        res.json({
            message: `id:${req.params.id}の参加者は未登録、または除籍されています。`,
        });
    }
});

//登録
router.post('/', async (req, res) => {
    const participant = req.body;
    try {
        await participantModel.create(participant);
        res.status(201).json({ message: '参加者登録が完了しました。' });
    } catch (err) {
        res.status(409).json({ message: err });
    }
});

//削除
router.delete('/:id', async (req, res) => {
    const participant = await participantModel.delete(req.params.id);
    res.status(200).json({
        message: `id:${req.params.id}の参加者を削除しました。`,
    });
});

//更新
router.put('/:id', async (req, res) => {
    try {
        await participantModel.update(req.params.id, req.body);
        res.status(201).json({ message: '参加者情報の更新が完了しました。' });
    } catch (err) {
        console.log(err);
    }
});

//警告回数の登録
router.put('/:id/warnings', async (req, res) => {
    const participant = await participantModel.getById(req.params.id);
    const numOfWarnings = participant.warnings + 1;
    let result = {};
    let response = [];
    if (numOfWarnings < 3) {
        const update = { warnings: numOfWarnings };
        response = await participantModel.update(req.params.id, update);
        result = {
            id: response[0].id,
            warnings: numOfWarnings,
            message: `警告${numOfWarnings}回目です。`,
        };
    } else {
        response = await participantModel.delete(req.params.id);
        result = {
            id: response[0].id,
            warnings: numOfWarnings,
            message: `警告回数が上限に達したので、除籍しました。`,
        };
    }
    res.status(201).send(result);
});

module.exports = router;
