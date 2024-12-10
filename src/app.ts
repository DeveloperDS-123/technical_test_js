import express from 'express';
import bodyParser from 'body-parser';
import recommendationsRouter from './routes/recommendations';
import usersRouter from './routes/users';
import { connectDB } from '../src/utils/database';
import cors from 'cors';

const app = express();
const PORT = 8000;

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use('/recommendations', recommendationsRouter);
app.use('/users', usersRouter)

// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// })

connectDB().then(() => {  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

export default app;
