// server-directory-test.mjs
import fs from 'fs';
import path from 'path';

export async function testServerDirectoryAccess() {
  const results = {
    canAccessParentDir: false,
    accessiblePaths: {},
    sensitiveFiles: {},
    currentWorkingDir: '',
    processInfo: {},
    timestamp: new Date().toISOString(),
    errors: {}
  };

  try {
    // Получаем текущую рабочую директорию
    results.currentWorkingDir = process.cwd();
    
    // Информация о процессе
    results.processInfo = {
      pid: process.pid,
      platform: process.platform,
      arch: process.arch,
      nodeVersion: process.version,
      execPath: process.execPath,
      argv: process.argv
    };
  } catch (e) {
    results.errors.processInfo = e.message;
  }

  // Пути для проверки
  const pathsToTry = [
    // Родительские директории
    '../',
    '../../',
    '../../../',
    '../../../../',
    
    // Попытки выйти из webapp
    '../app/',
    '../../app/',
    '../app/main.py',
    '../../app/main.py',
    
    // Абсолютные пути
    '/app/',
    '/app/main.py',
    '/etc/passwd',
    '/proc/version',
    '/proc/self/environ',
    '/proc/self/cmdline',
    
    // Системные файлы
    '/etc/hosts',
    '/etc/resolv.conf',
    '/root/',
    '/home/',
    
    // Относительные с обходом
    './../../',
    'webapp/../',
    'src/../../',
    'node_modules/../../',
    
    // Конфиги проекта
    '../package.json',
    '../../package.json',
    '../vite.config.ts',
    '../.env',
    '../.env.local',
    '../.git/config'
  ];

  for (const testPath of pathsToTry) {
    try {
      // Попытка прочитать как директорию
      if (fs.existsSync(testPath)) {
        const stats = fs.statSync(testPath);
        
        if (stats.isDirectory()) {
          try {
            const files = fs.readdirSync(testPath);
            results.canAccessParentDir = true;
            results.accessiblePaths[testPath] = {
              type: 'directory',
              files: files.slice(0, 10), // Первые 10 файлов
              totalFiles: files.length,
              success: true
            };
          } catch (e) {
            results.errors[`readdir_${testPath}`] = e.message;
          }
        } else if (stats.isFile()) {
          try {
            const content = fs.readFileSync(testPath, 'utf8');
            results.canAccessParentDir = true;
            results.accessiblePaths[testPath] = {
              type: 'file',
              size: stats.size,
              content: content.substring(0, 500), // Первые 500 символов
              success: true
            };
            
            // Проверяем, является ли файл чувствительным
            const sensitivePatterns = [
              'password', 'secret', 'key', 'token', 'api',
              'config', 'env', 'passwd', 'shadow', 'private'
            ];
            
            const fileName = path.basename(testPath).toLowerCase();
            const isInSentitive = sensitivePatterns.some(pattern => 
              fileName.includes(pattern) || content.toLowerCase().includes(pattern)
            );
            
            if (isInSentitive) {
              results.sensitiveFiles[testPath] = {
                reason: 'Contains sensitive patterns',
                preview: content.substring(0, 200),
                size: stats.size
              };
            }
          } catch (e) {
            results.errors[`readfile_${testPath}`] = e.message;
          }
        }
      }
    } catch (error) {
      results.errors[testPath] = error.message;
    }
  }

  return results;
}