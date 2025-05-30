const resolvers = {
  Query: {
    me: async (_: any, __: any, context: any) => {
      return context.user;
    },
  },
  Mutation: {
    login: async (_: any, args: any, context: any) => {
      // Your login logic here
      return 'token';
    },
    signup: async (_: any, args: any, context: any) => {
      // Your signup logic here
      return 'token';
    },
  },
};

export default resolvers;