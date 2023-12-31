import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { UserRoutes } from './app/modules/user.route';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

app.use('/api', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send("Running CarHub Project")
});

export default app;
