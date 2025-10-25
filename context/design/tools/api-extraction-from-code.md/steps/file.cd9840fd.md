---
timestamp: 'Fri Oct 24 2025 15:36:09 GMT-0400 (Eastern Daylight Time)'
parent: '[[..\20251024_153609.0917b28c.md]]'
content_id: cd9840fdd4c8707aca70571c75d94095919fdf951101a7eddbaeb54c53285157
---

# file: deno.json

```json
{
  "imports": {
    "@concepts/": "./src/concepts/",
    "@utils/": "./src/utils/"
  },
  "tasks": {
    "concepts": "deno run --allow-net --allow-read --allow-sys --allow-env src/concept_server.ts --port 8000 --baseUrl /api"
  },
  "lint": {
    "rules": {
      "exclude": ["no-import-prefix", "no-unversioned-import"]
    }
  },
  "nodeModulesDir": "auto"
}
```
