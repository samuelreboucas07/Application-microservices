import server from './server';
require('dotenv').config()

try {
  const { PORT } = process.env;

  server.listen(PORT, () => {
    console.log(`[SERVER] Running at port ${PORT}`);
  });

} catch (err) {
  console.error(`Erro ao rodar o sistema. Erro: ${JSON.stringify(err)}`);
}