/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_DEVELOPMENT_SERVER: string;
  // add other environment variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
