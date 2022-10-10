/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_HASURA_HTTP_URL: string;
  readonly VITE_APP_BACKEND_URL_WS: string;
  readonly VITE_APP_BACKEND_URL_HTTP: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
