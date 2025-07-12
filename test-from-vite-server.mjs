// Этот файл будет доступен через Vite dev server
import fs from "fs";

export async function checkSecurity() {
    const results = {
        canReadParentDir: false,
        canListAppDir: false,
        filesInApp: [],
        canReadServerCode: false,
        serverCode: null
    };
    
    try {
        const files = fs.readdirSync("/app");
        results.canListAppDir = true;
        results.filesInApp = files;
        
        try {
            const content = fs.readFileSync("/app/main.py", "utf8");
            results.canReadServerCode = true;
            results.serverCode = content;
        } catch (e) {}
    } catch (e) {}
    
    return results;
}
