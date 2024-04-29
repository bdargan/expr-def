import { runPermissionChecks } from "./figma/demo";

console.log('Hello, world, lets run the figma examples!');

(async () => {
  await runPermissionChecks()
})();