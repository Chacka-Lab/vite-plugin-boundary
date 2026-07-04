/** Marks a module as server-only.
 * Importing it in a client module triggers a build error.
 */
declare module 'server-only' {}

/** Marks a module as client-only.
 * Importing it in an SSR module triggers a build error.
 */
declare module 'client-only' {}
