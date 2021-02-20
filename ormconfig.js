module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'database_test',
  entities: ['/dist/**/*.entity.js'],
//   migrations: [path.join(rootDir, '/migration/**/*.js')],
//   subscribers: [path.join(rootDir, '/subscriber/**/*.js')],
  synchronize: false,
  logging: false,
  cli: {
    // migrationsDir: path.join(rootDir, '/migration'),
    entitiesDir: '/dist/**/*.entity.js',
    // subscribersDir: path.join(rootDir, '/subscriber'),
  },
}