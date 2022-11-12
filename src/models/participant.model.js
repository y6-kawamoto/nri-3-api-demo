const knex = require('../knex');

const PARTICIPANT_TABLE = 'participant';

module.exports = {
    PARTICIPANT_TABLE,

    /**
     * @param {number} limit - The max number of participants to return.
     * @return {Promise<Array>} A promise that resolves to an array of participants.
     */
    getAll(limit = 100) {
        return knex
            .select('*')
            .from(PARTICIPANT_TABLE)
            .orderBy('id')
            .limit(limit);
    },

    /**
     * @param {number} id - The participant's id.
     * @return {Promise<Object>} A promise that resolves to the participant that matches the id.
     */
    getById(id) {
        return knex
            .select('*')
            .from(PARTICIPANT_TABLE)
            .where({
                id: id,
            })
            .first();
    },

    /**
     * @param {Object} participant - The new participant data to add.
     * @return {Promise<number>} A promise that resolves to the id of created participant.
     */
    create(participant) {
        // YOUR CODE HERE
        console.log(participant.last_name);
        return knex(PARTICIPANT_TABLE).insert({
            id: participant.id,
            first_name: participant.first_name,
            last_name: participant.last_name,
            origin: participant.origin,
            interesting_1: participant.interesting_1,
            interesting_2: participant.interesting_2,
            warnings: participant.warnings,
        });
    },

    /**
     * @param {number} id - The unique id of the existing participant.
     * @param {Object} participant - The participant data to change.
     * @return {Promise<number>} A promise that resolves to the id of the updated participant.
     */
    update(id, participant) {
        return knex(PARTICIPANT_TABLE)
            .where({ id: id })
            .update({
                id: participant.id,
                first_name: participant.first_name,
                last_name: participant.last_name,
                origin: participant.origin,
                interesting_1: participant.interesting_1,
                interesting_2: participant.interesting_2,
                warnings: participant.warnings,
            })
            .returning('id');
    },

    delete(id) {
        return knex(PARTICIPANT_TABLE).where({ id: id }).del().returning('id');
    },
};
