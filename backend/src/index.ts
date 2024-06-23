import { IMessage } from '../../shared/models/message';
import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import basicAuth from 'basic-auth';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());


// Mock users
const users: any = {
  user1: { password: 'password1' },
  user2: { password: 'password2' }
};

// Authentication middleware
const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const user = basicAuth(req);

  if (user && users[user.name] && users[user.name].password === user.pass) {
    next();
  } else {
    res.setHeader('WWW-Authenticate', 'Basic realm="example"');
    res.status(401).json({ success: false, message: 'Authentication required' });
  }
};

const messages: IMessage[] = [
{text: 'aga laga', status: 'pending'}
];

app.post('/messages', authenticate, (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  try {
    const message = req.body;
    if (!message) {
      throw new Error('Message is required');
    }
    messages.push(message);
    res.status(201).json({ success: true, message: 'Message received' });
  } catch (error) {
    next(error);
  }
});

app.get('/messages', authenticate, (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({ success: true, messages });
  } catch (error) {
    next(error);
  }
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ success: false, message: error.message });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});