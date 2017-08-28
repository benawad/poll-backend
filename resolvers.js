import bcrypt from 'bcrypt';
import { PubSub } from 'graphql-subscriptions';
import joinMonster from 'join-monster';

import requireAuth from './permissions';
import { tryLogin } from './auth';

export const pubsub = new PubSub();

const VOTE_HAPPENED = 'VOTE_HAPPENED';

export default {
  Subscription: {
    voteHappened: {
      subscribe: () => pubsub.asyncIterator(VOTE_HAPPENED),
    },
  },
  Query: {
    allPolls: (parent, args, { models }, info) =>
      joinMonster(
        info,
        args,
        sql => models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT }),
        { dialect: 'pg' },
      ),
    poll: (parent, args, { models }, info) =>
      joinMonster(
        info,
        args,
        sql => models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT }),
        { dialect: 'pg' },
      ),
  },

  Mutation: {
    register: async (parent, args, { models }) => {
      const hashedPassword = await bcrypt.hash(args.password, 12);
      try {
        const user = await models.User.create({
          ...args,
          password: hashedPassword,
        });

        return {
          ok: true,
          errors: [],
          user,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          errors: [{ field: 'email', message: 'something went wrong' }],
          user: null,
        };
      }
    },
    login: async (parent, { email, password }, { models, SECRET }) =>
      tryLogin(email, password, models, SECRET),
    createPoll: requireAuth.createResolver(async (parent, { name, options }, { models, user }) => {
      const pollOptions = options.map(x => ({ text: x, votes: 0 }));
      try {
        const poll = await models.Poll.create(
          {
            name,
            pollOptions,
            creator: user.id,
          },
          { include: [models.PollOption] },
        );

        return {
          ok: true,
          errors: [],
          poll,
        };
      } catch (e) {
        return {
          ok: false,
          errors: [{ field: 'name', message: 'something went wrong' }],
          poll: null,
        };
      }
    }),
    vote: async (parent, { pollOptionId }, { models }) => {
      try {
        await models.PollOption.update(
          {
            votes: models.sequelize.literal('votes + 1'),
          },
          { where: { id: pollOptionId } },
        );
        pubsub.publish(VOTE_HAPPENED, { voteHappened: pollOptionId });
        return true;
      } catch (e) {
        return false;
      }
    },
  },
};
