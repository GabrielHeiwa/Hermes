/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_HASURA_HTTP_URL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
