// env-test.mjs
export async function testEnvironmentAccess() {
  const results = {
    canAccessProcessEnv: false,
    envVariables: {},
    sensitiveKeys: [],
    viteEnvAccess: {},
    timestamp: new Date().toISOString(),
    totalEnvVars: 0
  };

  try {
    // Попытка доступа к process.env
    if (typeof process \!== "undefined" && process.env) {
      results.canAccessProcessEnv = true;
      results.envVariables = { ...process.env };
      results.totalEnvVars = Object.keys(process.env).length;
      
      // Поиск чувствительных переменных
      const sensitivePatterns = [
        "PASSWORD", "SECRET", "KEY", "TOKEN", "API_KEY", 
        "DATABASE", "DB_", "MONGO", "REDIS", "AWS_", 
        "OPENAI", "ANTHROPIC", "GOOGLE", "STRIPE"
      ];
      
      results.sensitiveKeys = Object.keys(process.env)
        .filter(key => sensitivePatterns.some(pattern => 
          key.toUpperCase().includes(pattern)
        ));
    }
  } catch (e) {
    results.processError = e.message;
  }

  try {
    // Проверка Vite env переменных
    if (typeof import.meta \!== "undefined" && import.meta.env) {
      results.viteEnvAccess = { ...import.meta.env };
    }
  } catch (e) {
    results.viteError = e.message;
  }

  return results;
}
