const allRoutes = require('./routes');

const constructorMethod = (app) => {
  app.use('/', allRoutes);
  app.use('/login', allRoutes);
  app.use('/signup', allRoutes);
  app.use('/profile', allRoutes);
  app.use('/flashcards', allRoutes);
  app.use('/game', allRoutes);

  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;