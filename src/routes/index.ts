import Auth from './Auth';
import HealthCheck from './HealthCheck';
import server from '../shared/server';

export default {
  /**
   * Start routes of server
   */
  initRoutes() {
    server.use('/auth', Auth);
    server.use('/health', HealthCheck);
    server.use('/', (req, res) => res.send({ status: 'success', message: 'Welcome to systemize-Auth-api!' }));
  }
}