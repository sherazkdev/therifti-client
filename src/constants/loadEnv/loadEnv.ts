const getEnvVariable = (key: string): string => {
  const value = import.meta.env[key];

  if (!value) {
    throw new Error(`Environment variable "${key}" is required but was not provided.`);
  }

  return value;
};

const env = {
    SERVER_URL:getEnvVariable("VITE_SERVER_URL"),
    CLOUD_NAME:getEnvVariable("VITE_CLOUD_NAME"),
    CLOUD_API_KEY:getEnvVariable("VITE_CLOUD_API_KEY"),
    CLOUD_API_SECRET:getEnvVariable("VITE_CLOUD_API_SECRET"),
    CLOUD_UPLOAD_PRESET:getEnvVariable("VITE_CLOUD_UPLOAD_PRESET"),
};

export default env;