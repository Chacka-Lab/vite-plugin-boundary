# vite-plugin-boundary

Build-time `server-only` and `client-only` module boundaries for Vite.

Prevents server-side modules (secrets, DB credentials, Node-only APIs) from accidentally leaking into the client
bundle — with a clear build error, not a silent runtime failure.

## Install

```bash
pnpm add -D vite-plugin-boundary
```

## Usage

### 1. Add the Vite plugin

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import boundary from "vite-plugin-boundary";

export default defineConfig({
  plugins: [
    boundary(),
  ],
});
```

### 2. Add type declarations

```typescript
// src/global.d.ts
/// <reference types="vite-plugin-boundary/env" />
```

Or add in `tsconfig.json`

```json
{
  "compilerOptions": {
    "types": ["vite-plugin-boundary/env"],
  }
}
```

### 3. Guard your modules

```typescript
// src/lib/db.ts
import "server-only"; // build error if imported from client code

export const db = drizzle(pool);
```

```typescript
// src/components/Canvas.tsx
import "client-only"; // build error if imported from server code
```

## How it works

The Vite plugin intercepts `server-only` and `client-only` imports via `resolveId`. If the wrong environment tries to
import them, the build fails immediately with a descriptive error — no runtime surprises.

## License

MIT