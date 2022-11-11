/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('participant', function (table) {
        table.increments('id').primary(); // Set this column as the primary key
        table.string('first_name', 32);
        table.string('last_name', 32);
        table.string('origin', 32);
        table.text('interesting_1');
        table.text('interesting_2');
        table.integer('warnings').defaultTo(0);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    knex.schema.dropTable('participant');
};
