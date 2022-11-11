const knex = require('./knex');
//const { validProps, requiredProps } = require('../util/validation');

/*const validateProps = validProps([
    'id',
    'email',
    'first_name',
    'last_name',
    'address',
    'city',
    'region',
    'country',
    'postal_code',
]);
*/

//const validateRequired = requiredProps(['email', 'last_name', 'postal_code']);

const CUSTOMER_TABLE = 'customer';

module.exports = {
    CUSTOMER_TABLE,

    /**
     * @param {number} limit - The max number of customers to return.
     * @return {Promise<Array>} A promise that resolves to an array of customers.
     */
    getAll(limit = 100) {
        return knex
            .select({
                id: 'id',
                lastName: 'last_name',
                firstName: 'first_name',
                country: 'country',
            })
            .from(CUSTOMER_TABLE)
            .limit(limit);
    },

    /**
     * @param {number} id - The customer's id.
     * @return {Promise<Object>} A promise that resolves to the customer that matches the id.
     */
    getById(id) {
        return knex
            .select({
                id: 'id',
                lastName: 'last_name',
                firstName: 'first_name',
                email: 'email',
                address: 'address',
                region: 'region',
                postalCode: 'postal_code',
                country: 'country',
            })
            .from(CUSTOMER_TABLE)
            .where({
                id: id,
            })
            .first();
    },

    /**
     * @param {Object} customer - The new customer data to add.
     * @return {Promise<number>} A promise that resolves to the id of created customer.
     */
    create(customer) {
        // YOUR CODE HERE
        return knex(CUSTOMER_TABLE).insert({
            id: customer.id,
            email: customer.email,
            first_name: customer.first_name,
            last_name: customer.last_name,
            address: customer.address,
            region: customer.region,
            postal_code: customer.postal_code,
            country: customer.country,
        });
    },

    /**
     * @param {number} id - The unique id of the existing customer.
     * @param {Object} customer - The customer data to change.
     * @return {Promise<number>} A promise that resolves to the id of the updated customer.
     */
    update(id, customer) {
        //validateProps(customer);

        // YOU CODE HERE
        //TODO:該当するカラムのみupdate⇒よしなにやってくれる
        //TODO-2:updateの処理が終わった後にidを返す⇒thenで実装
        console.log('===================');
        console.log(id);
        console.log(customer);
        return knex(CUSTOMER_TABLE)
            .where({ id: id })
            .update({
                email: customer.email,
                first_name: customer.first_name,
                last_name: customer.last_name,
                address: customer.address,
                city: customer.city,
                region: customer.region,
                postal_code: customer.postal_code,
                country: customer.country,
            })
            .then(() => {
                return id;
            });
    },

    delete(id, customer) {
        //validateProps(customer);

        // YOU CODE HERE
        //TODO:該当するカラムのみupdate
        //TODO-2:updateの処理が終わった後にidを返す⇒thenで実装
        return knex(CUSTOMER_TABLE)
            .where({ id: id })
            .del()
            .then(() => {
                return id;
            });
    },
};
