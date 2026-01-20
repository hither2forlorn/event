import env from "../config/env";
const validApiKey = env.API_KEY;
const apiKeyCache = new Map();

const checkApiKey = async (request: any) => {
  const apiKey = request.headers.get("Api-Key");
  if (request.url.includes("/health")) {
    return true;
  }
  if (!apiKey) {
    throw new Error("API Key is required");
  }
  if (apiKeyCache.has(apiKey)) {
    return apiKeyCache.get(apiKey);
  }
  const isValid = apiKey === validApiKey;

  if (isValid) {
    apiKeyCache.set(apiKey, true);
    if (apiKeyCache.size > 100) {
      apiKeyCache.clear();
    }
  }

  if (!isValid) {
    throw new Error("Invalid API Key");
  }

  return true;
};

export default checkApiKey;
