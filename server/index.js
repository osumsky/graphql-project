const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    schema,
  })
);

app.listen(PORT, () => {
  console.log(`Server started on PORT=${PORT}`);
});