const userRoutes = require('./user');

const constructorMethod = (app) => {
  app.use('/', userRoutes);
  app.use('/login', userRoutes);
  app.use('/signup', userRoutes);
  app.use('/profile', userRoutes);
//   app.use('/flashcards', someRoute);
//   app.use('/game', someRoute);

  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;