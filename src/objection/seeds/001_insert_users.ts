import { Knex } from 'knex';
import { generateUserData } from '../helpers/generateUserData';

exports.seed = async (knex: Knex): Promise<any> => {
  const amountToExecuteInParallel = 1000;
  const numberOfRowsArray = [...new Array(amountToExecuteInParallel)];

  let savedRows = 0;
  while (savedRows < 1000100) {
    const usersRows = [];
    // executes in parallel each array item
    numberOfRowsArray.map(() => {
      const { name, username, type, email, bio, avatar } = generateUserData();
      usersRows.push({
        name,
        username,
        type,
        email,
        bio,
        avatar,
        created_at: new Date().toISOString(),
      });
    });

    try {
      await knex('users').insert(usersRows).returning('id');

      savedRows += amountToExecuteInParallel;
    } catch (error) {
      // tslint:disable-next-line: no-console
      console.log(
        `[ERROR]: Error while seeding database due to `,
        error.message
      );
    }
  }
};
