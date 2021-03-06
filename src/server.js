import app from './app';
import config from './config';

app.listen(config.PORT, () => {
  Object.keys(config).map((key) => console.info(`${key}: ${config[key]}`));

  console.info(`Server running on http://localhost:${config.PORT}`);
});
