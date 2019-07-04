export default app => {
  app.get('/api/test', (req, res) => {
    try {
      console.log('Hello there');
      res.send({ Hello: 'There' });
    } catch (err) {}
  });
};
