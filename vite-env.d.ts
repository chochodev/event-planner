/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_APP_BACKEND_API_URL: string;
  VITE_APP_CLOUDINARY_CLOUD_NAME: string;
  VITE_APP_DEVELOPMENT_SERVER: string;
}

interface ImportMeta {
  env: ImportMetaEnv;
}