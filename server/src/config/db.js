import { Sequelize }  from 'sequelize';
import { execSync } from 'child_process'; 
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL connected');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }

  await checkAndRunMigrations();
};

// Function to run migrations if tables don't exist
async function checkAndRunMigrations() {
  try {
    const tables = await sequelize.getQueryInterface().showAllTables();
    if (tables.length === 0) {
      console.log('No tables found, running migrations...');
      execSync('npx sequelize-cli db:migrate', { stdio: 'inherit' });
      console.log('Migrations completed.');
    } else {
      console.log('Tables already exist, skipping migrations.');
    }
  } catch (error) {
    console.error('Error checking tables:', error);
    try {
      console.log('Attempting to drop all tables...');
      await sequelize.query(`
        DO $$ DECLARE
          drop_command TEXT;
        BEGIN
          FOR drop_command IN
            SELECT 'DROP TABLE IF EXISTS "' || table_schema || '"."' || table_name || '" CASCADE;' AS drop_command
            FROM information_schema.tables
            WHERE table_schema NOT IN ('pg_catalog', 'information_schema')
              AND table_type = 'BASE TABLE'
          LOOP
            EXECUTE drop_command;
          END LOOP;
        END $$;
      `);
      console.log('All tables dropped successfully.');
      process.exit(1);
    } catch (dropError) {
      console.error('Error dropping tables:', dropError);
      process.exit(1);
    }
  }
}


export { sequelize, connectDB };
