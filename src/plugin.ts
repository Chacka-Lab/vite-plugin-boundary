import type { Plugin } from 'vite';

/**
 * Creates a Vite plugin that enforces server/client module boundaries.
 *
 * Intercepts imports of `server-only` and `client-only` and throws a build
 * error when a boundary is violated.
 *
 * @returns A Vite plugin object.
 */
export default function boundary(): Plugin {
  return {
    name: 'vite-plugin-boundary',
    enforce: 'pre',
    resolveId(id, importer, { ssr }) {
      if (id === 'server-only') {
        if (!ssr)
          this.error(`Attempt to import 'server-only' in a client module: ${importer}`);
      } else if (id === 'client-only') {
        if (ssr)
          this.error(`Attempt to import 'client-only' in a server module: ${importer}`);
      } else {
        return null;
      }
      return '\0vite-plugin-boundary:id';
    },
    load(id) {
      if (id === '\0vite-plugin-boundary:id') return 'export {}';
    },
  };
}
