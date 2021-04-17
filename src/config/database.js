module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'gobarber',
  define: {
    timestamps: true, //add uma coluna com a data da última alteração
    underscored: true,
    underscoredAll: true // o formato de nome das tabelas é palavra1_palavra2
  },
};