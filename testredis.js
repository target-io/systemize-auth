var redis = require("redis");
var sub = redis.createClient(), pub = redis.createClient();
var msg_count = 0;
 
sub.on("subscribe", function (channel, count) {
  console.log('sub on subscribe');
  console.log(channel);
  console.log(count);
    pub.publish("a nice channel", "I am sending a message.");
    pub.publish("a nice channel", "I am sending a second message.");
    pub.publish("a nice channel", "I am sending my last message.");
  console.log('sub on subscribe published 3 messages');
});
 
sub.on("message", function (channel, message) {
  console.log('sub on message');
  console.log(channel);
  console.log(message);
    console.log("sub channel " + channel + ": " + message);
    msg_count += 1;
    if (msg_count === 3) {
        sub.unsubscribe();
        sub.quit();
        pub.quit();
    }
});
 
sub.subscribe("a nice channel");