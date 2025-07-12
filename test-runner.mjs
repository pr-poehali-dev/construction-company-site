import { testFileSystemAccess } from "./security-test.mjs";

console.log("Running security test...");
const results = await testFileSystemAccess();
console.log(JSON.stringify(results, null, 2));
