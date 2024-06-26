import { Plugin } from '../../plugin';

declare global {
  namespace Express {
    interface Request {
      plugins?: Plugin[];
    }
  }
}