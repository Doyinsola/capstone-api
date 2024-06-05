const usersData = require('../seed-data/user');
const commentsData = require('../seed-data/comments');
const contentData = require('../seed-data/content');
const categoryData = require('../seed-data/categories');
const contentCategoryData = require('../seed-data/content_category');


exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('content_category').del();
  await knex('comment').del();
  await knex('content').del();
  await knex('user').del();
  await knex('category').del();
  await knex('content').insert(contentData);
  await knex('user').insert(usersData);
  await knex('category').insert(categoryData);
  await knex('content_category').insert(contentCategoryData);
  await knex('comment').insert(commentsData);
};
