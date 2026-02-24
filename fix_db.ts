import { pool } from "./src/config/db/index";

async function runFix() {
    try {
        console.log("Running SQL: ALTER TABLE event_guest ALTER COLUMN invited_by TYPE integer USING invited_by::integer;");
        const res = await pool.query("ALTER TABLE event_guest ALTER COLUMN invited_by TYPE integer USING invited_by::integer;");
        console.log("SQL executed successfully:", res);
    } catch (err) {
        console.error("Error executing SQL:", err);
    } finally {
        await pool.end();
    }
}

runFix();
