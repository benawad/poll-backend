export default {
  Query: {
    fields: {
      poll: {
        where: (table, empty, args) => `${table}.id = ${args.id}`,
      },
    },
  },
  Poll: {
    sqlTable: 'polls',
    uniqueKey: 'id',
    fields: {
      options: {
        sqlJoin: (pollTable, pollOptionsTable) => `${pollTable}.id = ${pollOptionsTable}."pollId"`,
      },
    },
  },
  PollOption: {
    sqlTable: 'poll_options',
    uniqueKey: 'id',
  },
};
