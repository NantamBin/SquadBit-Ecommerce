async function get(req, res, next) {
    try {
        res.json({'message': 'API do Express - OK'});
    } catch (error) {
        console.error(`Erro no funcionamento da API do Express`, error.message);
        next(error);
    }
  }
  
  
  module.exports = {
      get,
};