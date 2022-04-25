const router = require('express').Router();
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');
const { createMovieCheck, movieIdCheck } = require('../middlewares/JoiCheck');

router.get('/api/movies', getMovies);
router.delete('/api/movies/:movieId', movieIdCheck, deleteMovie);
router.post('/api/movies', createMovieCheck, createMovie);

module.exports = router;
