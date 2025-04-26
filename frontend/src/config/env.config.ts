const env = import.meta.env

export const envConfig = {
  apiBaseUrl: env.VITE_BACKEND_URL,
  apiFlaskUrl: env.VITE_BACKEND_FLASK_URL,
}


