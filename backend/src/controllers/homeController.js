async function get(req, res, next) {
    try {
        res.json({'message': 'ok'});
    } catch (error) {
        console.error(`Erro ao obter os produtos`, error.message);
        next(error);
    }
  }
  
  
  module.exports = {
      get,
};