import { IMessage } from '../../shared/models/message';
import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { getPlugins, loadPlugins } from './plugin-loader';
import path from 'path';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

const JWT_SECRET = '3suzZyVFkdNVJFMJweV6RPjeDiAzW0XFX59nXr77UeA=y';
interface User {
  username: string;
  password: string;
}

const users: User[] = [
  { username: 'user1', password: bcrypt.hashSync('password1', 8) },
  { username: 'user2', password: bcrypt.hashSync('password2', 8) }
];

loadPlugins(path.join(__dirname, 'plugins'));

app.use((req, res, next) => {
  const plugins = getPlugins();
  //@ts-ignore
  req.plugins = plugins;
  next();
});


const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];
  
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      //@ts-ignore
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

const messages: IMessage[] = [];

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: user.username });
  } else {
    res.status(401).send('Username or password is incorrect');
  }
});

app.post('/messages', authenticateJWT, (req: Request, res: Response, next: NextFunction) => {
  try {
    const message = req.body;
    if (!message) {
      throw new Error('Message is required');
    }
    message.status = 'delivered';
    messages.push(message);

    res.status(201).json({ success: true, message: 'Message received' });
  } catch (error) {
    next(error);
  }
});

app.get('/messages', authenticateJWT, (req: Request, res: Response, next: NextFunction) => {
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