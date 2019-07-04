export default app => {
  app.get('/api/test', (req, res) => {
    try {
      res.send({ Hello: `There ${Math.random().toFixed(3)}` });
    } catch (err) {}
  });
};
