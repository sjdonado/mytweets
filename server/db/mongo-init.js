// eslint-disable-next-line no-undef
db.createUser({
  user: 'mytweets_user',
  pwd: 'root_12345',
  roles: [
    {
      role: 'readWrite',
      db: 'mytweets',
    },
  ],
});
