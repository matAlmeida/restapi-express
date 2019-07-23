const body_parser = require('body-parser');
const express = require('express');
const swagger_ui = require('swagger-ui-express');
const swagger_inline = require('swagger-inline');
const app = express();

(async () => {
    try {
        // Creating swagger docs
        await swagger_inline(['./src/controllers/*.js'], {
            base: './src/helpers/swagger-base.json',
            out: './src/helpers/swagger.json'
        });

        // Starting swagger
        const swagger_document = require('./helpers/swagger.json');
        app.use(
            '/api/v1/docs',
            swagger_ui.serve,
            swagger_ui.setup(swagger_document)
        );

        // Adding middlewares
        app.use(body_parser.json());

        // Setting base URL
        app.use('/api/v1', require('./controllers'));

        console.info('All services were started');

        // Setting server configuration
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.info(`Server running on ${PORT} port.`);
        });
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
})();
