import express from 'express';
import errorHandler from './middlewares/errorHandler.js';
import Database from './utils/dbUtils.js';
import blogRoutes from './routes/blogRoutes.js';

const app = express();
const port = process.env.PORT;

app.use('/blog', blogRoutes);

app.use(errorHandler);

Database.initialize();

app.listen(port, () => {
  console.log(`Server is running at ${port} port`);
});

export default app;
