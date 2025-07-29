const mysql = require('mysql2/promise');
require('dotenv').config(); // ✅ .env is in same folder!

console.log('ENV:', {
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_NAME: process.env.DB_NAME
});

(async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS
    });

    const dbName = process.env.DB_NAME;

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    console.log(`✅ Database '${dbName}' created or already exists.`);

    await connection.query(`USE \`${dbName}\`;`);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        userid INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        hashedPwd VARCHAR(255) NOT NULL,
        emailId VARCHAR(100) NOT NULL UNIQUE
      );
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS worker_profiles (
        workerid INT AUTO_INCREMENT PRIMARY KEY,
        userid INT NOT NULL,
        name VARCHAR(100),
        skill VARCHAR(100),
        location VARCHAR(100),
        profile_image_url VARCHAR(255),
        voice_input_url VARCHAR(255),
        FOREIGN KEY (userid) REFERENCES users(userid)
      );
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS job_postings (
        jobid INT AUTO_INCREMENT PRIMARY KEY,
        userid INT NOT NULL,
        description TEXT,
        pay DECIMAL(10,2),
        location VARCHAR(100),
        image_url VARCHAR(255),
        voice_input_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userid) REFERENCES users(userid)
      );
    `);

    console.log(`✅ Tables created.`);
    await connection.end();
    console.log(`🎉 Done!`);
  } catch (err) {
    console.error(`❌ Error:`, err);
  }
})();
