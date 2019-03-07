import server from './app';

const PORT = process.env.PORT || 8080;

server.listen(PORT, err => {
  if (err) return console.log(`\u274C  Encountered a an error: ${err}`);
  console.log(`\n\u2705  Server is running on port: ${PORT}\n`);
});
