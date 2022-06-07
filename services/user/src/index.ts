import server from './server';
import database from './config/database';

try {
  const { PORT } = process.env;
  database.connection.on('Error', console.error.bind(console, 'Database connection error'));

  server.listen(PORT, () => {
    console.log(`[SERVER] Running at port ${PORT}`);
  });
} catch (err) {
  console.error(`Erro ao rodar o sistema. Erro: ${JSON.stringify(err)}`);
}