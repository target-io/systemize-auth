const RedisSessions = require('redis-sessions');
const Promise = require('bluebird');

const rs = new RedisSessions({
    host: '127.0.0.1',
    port: 6379,
});

Promise.promisifyAll(rs);
 
const rsapp = 'systemize-auth';
/*
rs.create({
  app: rsapp,
  id: "user1001",
  ip: "192.168.22.58",
  ttl: 3600,
  d: { 
    foo: "bar",
    unread_msgs: 34
  }
}, (err, resp) => {
  console.log(err);
  console.log(resp);

  rs.get({
    app: rsapp,
    token: resp.token
  }, (err1, resp1) => {
      console.log(err1);
      console.log(resp1);
  });
});

*/

async function test() {
  try {
    const res = await rs.createAsync({
      app: rsapp,
      id: "user1001",
      ip: "192.168.22.58",
      ttl: 3600,
      d: { 
        foo: "bar",
        unread_msgs: 34
      }
    });
    console.log('get the token');
    console.log(res);

    const data = await rs.getAsync({
      app: rsapp,
      token: res.token
    });
    console.log('got the token data here');
    console.log(data);
  } catch (err) {
    console.log('---some error----');
    console.log(err);
  } 
}

test();
