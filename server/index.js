const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');

const PORT = process.env.PORT || 5000;
const users = [
  { id: 1, username: 'Oleg', age: 46 },
  { id: 2, username: 'Igor', age: 27 },
  { id: 3, username: 'Elena', age: 35 },
];

const app = express();
app.use(cors());

const rootValue = {
  getAllUsers: () => {
    return users;
  },
  getUser: ({ id }) => {
    // id comes as string
    return users.find((user) => user.id == id);
  },
  createUser: ({ input }) => {
    const id = Date.now();
    const createdUser = {
      id,
      ...input,
    };
    users.push(createdUser);
    return createdUser;
  },
};

app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    schema,
    rootValue,
  })
);

app.listen(PORT, () => {
  console.log(`Server started on PORT=${PORT}`);
});
