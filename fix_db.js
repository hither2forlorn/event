const { Client } = require('pg');

async function main() {
    const client = new Client({
        connectionString: "postgresql://postgres:postgres@localhost:5435/postgres",
        ssl: { rejectUnauthorized: false }
    });

    try {
        await client.connect();
        console.log("Connected to database");

        const sql = `
      ALTER TABLE "event_guest" 
        ALTER COLUMN "user_id" SET DATA TYPE uuid USING user_id::text::uuid,
        ALTER COLUMN "event_id" SET DATA TYPE uuid USING event_id::text::uuid;

      ALTER TABLE "user_event" 
        ALTER COLUMN "user_id" SET DATA TYPE uuid USING user_id::text::uuid,
        ALTER COLUMN "event_id" SET DATA TYPE uuid USING event_id::text::uuid;

      ALTER TABLE "event_vendor" 
        ALTER COLUMN "event_id" SET DATA TYPE uuid USING event_id::text::uuid;
    `;

        console.log("Executing SQL...");
        await client.query(sql);
        console.log("SQL executed successfully!");
    } catch (err) {
        console.error("Error executing SQL:", err);
    } finally {
        await client.end();
    }
}

main();
