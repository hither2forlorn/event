import env from "./src/config/env";
type PgConfig = {
  schema: string;
  out: string;
  dialect: "postgresql";
  dbCredentials: {
    url: string;
    ssl?: boolean | object;
  };
};

const config: PgConfig = {
  schema: "./src/config/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL as string,
    ssl: {
      rejectUnauthorized: false,
    },
  },
};

export default config;