import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'express-cors';
import swaggerUI from 'swagger-ui-express';
import swaggerInline from 'swagger-inline';

const app = express();

swaggerInline(['./src/controllers/*.js'], {
  base: './src/helpers/swagger-base.json',
  out: './src/helpers/swagger.json'
});

// Starting swagger
const swagger_document = require('./helpers/swagger.json');
app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swagger_document));

// Adding middlewares
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);

// Setting base URL
app.use('/api/v1', require('./controllers').default);

export default app;
