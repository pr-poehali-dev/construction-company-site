import fs from "fs";

console.log("=== Detailed Security Test ===\n");

// Попытка прочитать список файлов в /app
try {
    const files = fs.readdirSync("/app");
    console.log("❌ CRITICAL: Successfully listed /app directory\!");
    console.log("Total files found:", files.length);
    console.log("\nAll files in /app:");
    files.forEach(file => console.log("  -", file));
    
    // Попытка прочитать содержимое файла
    console.log("\n=== Attempting to read /app/main.py ===");
    try {
        const content = fs.readFileSync("/app/main.py", "utf8");
        console.log("❌ CRITICAL: Successfully read /app/main.py\!");
        console.log("File content:");
        console.log(content);
    } catch (err) {
        console.log("✅ Cannot read /app/main.py:", err.message);
    }
    
} catch (err) {
    console.log("✅ Cannot list /app directory:", err.message);
}
