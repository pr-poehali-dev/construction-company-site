import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Тест безопасности: попытка чтения файлов из родительской директории
console.log("=== Security Test: Directory Traversal ===");

// Попытка 1: Прямой путь
try {
    const content = fs.readFileSync("/app/package.json", "utf8");
    console.log("❌ VULNERABILITY: Direct path access successful\!");
    console.log("File content preview:", content.substring(0, 100) + "...");
} catch (err) {
    console.log("✅ Direct path access blocked:", err.message);
}

// Попытка 2: Относительный путь
try {
    const content = fs.readFileSync("../package.json", "utf8");
    console.log("❌ VULNERABILITY: Relative path traversal successful\!");
    console.log("File content preview:", content.substring(0, 100) + "...");
} catch (err) {
    console.log("✅ Relative path traversal blocked:", err.message);
}

// Попытка 3: Path.join с traversal
try {
    const maliciousPath = path.join(__dirname, "../..", "package.json");
    const content = fs.readFileSync(maliciousPath, "utf8");
    console.log("❌ VULNERABILITY: Path.join traversal successful\!");
    console.log("Resolved path:", maliciousPath);
} catch (err) {
    console.log("✅ Path.join traversal blocked:", err.message);
}

// Попытка 4: Список файлов в /app
try {
    const files = fs.readdirSync("/app");
    console.log("❌ VULNERABILITY: Can list /app directory\!");
    console.log("Files in /app:", files.slice(0, 5).join(", "), "...");
} catch (err) {
    console.log("✅ Directory listing blocked:", err.message);
}

// Проверка текущих привилегий
console.log("\n=== Current Process Info ===");
console.log("Current directory:", process.cwd());
console.log("User ID:", process.getuid());
console.log("Group ID:", process.getgid());
