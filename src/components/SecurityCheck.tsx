import React, { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

interface SecurityResults {
  canAccessParentDir: boolean;
  accessiblePaths: Record<string, any>;
  sensitiveFiles: Record<string, any>;
  viteStaticFiles: Record<string, any>;
  timestamp: string;
  errors: Record<string, string>;
}

const SecurityCheck: React.FC = () => {
  const [results, setResults] = useState<SecurityResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runSecurityCheck = async () => {
    setLoading(true);
    setError(null);

    try {
      // Импортируем и вызываем функцию из файла
      const { testServerDirectoryAccess } = await import(
        "/server-directory-test.mjs"
      );
      const result = await testServerDirectoryAccess();
      setResults(result);
    } catch (err) {
      setError(
        `Ошибка выполнения: ${err instanceof Error ? err.message : "Неизвестная ошибка"}`,
      );
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: boolean) => {
    return status ? (
      <Icon name="CheckCircle" className="text-green-500" size={20} />
    ) : (
      <Icon name="XCircle" className="text-red-500" size={20} />
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <Icon name="FolderOpen" className="text-red-600" size={28} />
          📂 Directory Traversal тест
        </h2>
        <button
          onClick={runSecurityCheck}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
        >
          {loading ? (
            <>
              <Icon name="Loader2" className="animate-spin" size={18} />
              Проверка...
            </>
          ) : (
            <>
              <Icon name="Play" size={18} />
              Запустить проверку
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-3">
          <Icon name="AlertCircle" className="text-red-500" size={20} />
          <span className="text-red-700">{error}</span>
        </div>
      )}

      {results && (
        <div className="space-y-6">
          {results.canAccessParentDir && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <Icon name="AlertTriangle" className="text-red-600" size={24} />
                <h3 className="font-semibold text-red-900 text-lg">
                  🚨 DIRECTORY TRAVERSAL УСПЕШЕН!
                </h3>
              </div>
              <p className="text-red-800 font-medium">
                Время теста: {results.timestamp} | Доступных путей:{" "}
                {
                  Object.keys(results.accessiblePaths).filter(
                    (path) => results.accessiblePaths[path].success,
                  ).length
                }
              </p>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                {getStatusIcon(results.canAccessParentDir)}
                <h3 className="font-semibold text-gray-900">
                  📁 Доступ к директориям
                </h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Можно ли читать файлы вне песочницы через ../ пути?
              </p>
              {Object.keys(results.accessiblePaths).filter(
                (path) => results.accessiblePaths[path].success,
              ).length > 0 && (
                <div className="bg-red-100 border border-red-300 rounded p-3">
                  <p className="text-sm font-medium text-red-800 mb-2">
                    ⚠️ НАЙДЕНЫ ДОСТУПНЫЕ ПУТИ!
                  </p>
                  <div className="max-h-64 overflow-y-auto bg-white rounded border p-2">
                    <div className="text-xs text-gray-800 space-y-1">
                      {Object.entries(results.accessiblePaths)
                        .filter(([_, data]) => data.success)
                        .map(([path, data]) => (
                          <div
                            key={path}
                            className="border-b border-gray-100 pb-2 mb-2"
                          >
                            <div className="font-mono font-bold text-red-600">
                              🚨 {path}
                            </div>
                            <div className="text-xs text-gray-600 mt-1">
                              Status: {data.status} | Size: {data.contentLength}{" "}
                              bytes
                            </div>
                            <div className="bg-gray-50 p-1 rounded mt-1 font-mono text-xs">
                              {data.preview}...
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}
              {Object.keys(results.accessiblePaths).filter(
                (path) => results.accessiblePaths[path].success,
              ).length === 0 && (
                <div className="bg-green-100 border border-green-300 rounded p-3">
                  <p className="text-sm text-green-800">
                    ✅ Все пути заблокированы
                  </p>
                </div>
              )}
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                {getStatusIcon(Object.keys(results.sensitiveFiles).length > 0)}
                <h3 className="font-semibold text-gray-900">
                  🗂️ Чувствительные файлы
                </h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Найдены ли конфиги, секреты, системные файлы?
              </p>
              {Object.keys(results.sensitiveFiles).length > 0 && (
                <div className="bg-red-100 border border-red-300 rounded p-3">
                  <p className="text-sm font-medium text-red-800 mb-2">
                    🚨 НАЙДЕНЫ ЧУВСТВИТЕЛЬНЫЕ ФАЙЛЫ!
                  </p>
                  <div className="max-h-32 overflow-y-auto bg-white rounded border p-2">
                    {Object.entries(results.sensitiveFiles).map(
                      ([path, data]) => (
                        <div
                          key={path}
                          className="border-b border-gray-100 pb-2 mb-2"
                        >
                          <div className="font-mono font-bold text-red-600 text-xs">
                            📄 {path}
                          </div>
                          <div className="bg-gray-50 p-1 rounded mt-1 font-mono text-xs">
                            {data.content?.substring(0, 100)}...
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}
              {Object.keys(results.sensitiveFiles).length === 0 && (
                <div className="bg-green-100 border border-green-300 rounded p-3">
                  <p className="text-sm text-green-800">
                    ✅ Чувствительные файлы защищены
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <Icon name="Info" className="text-blue-600" size={20} />
              <h4 className="font-semibold text-blue-900">
                Статические файлы Vite
              </h4>
            </div>
            {Object.keys(results.viteStaticFiles).length > 0 && (
              <div className="text-sm">
                <p className="text-blue-800 mb-2">
                  Найдено доступных статических файлов:{" "}
                  {Object.keys(results.viteStaticFiles).length}
                </p>
                <div className="max-h-32 overflow-y-auto bg-white rounded border p-2">
                  {Object.entries(results.viteStaticFiles).map(
                    ([key, data]) => (
                      <div
                        key={key}
                        className="border-b border-gray-100 pb-2 mb-2"
                      >
                        <div className="font-mono font-bold text-blue-600 text-xs">
                          📁 {key}: {data.url}
                        </div>
                        <div className="bg-gray-50 p-1 rounded mt-1 font-mono text-xs">
                          {data.content?.substring(0, 100)}...
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}
            {Object.keys(results.viteStaticFiles).length === 0 && (
              <div className="text-blue-800 text-sm">
                ✅ Статические файлы недоступны
              </div>
            )}
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Icon name="Shield" className="text-amber-600" size={20} />
              <h4 className="font-semibold text-amber-900">
                Результаты Directory Traversal
              </h4>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                {getStatusIcon(results.canAccessParentDir)}
                <span className="text-gray-700">
                  Доступ к родительским директориям
                </span>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(Object.keys(results.sensitiveFiles).length > 0)}
                <span className="text-gray-700">
                  Утечка чувствительных файлов
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {!results && !loading && (
        <div className="text-center py-12">
          <Icon
            name="Shield"
            className="mx-auto text-gray-400 mb-4"
            size={48}
          />
          <p className="text-gray-500 text-lg">
            Нажмите "Запустить проверку" для Directory Traversal теста
          </p>
        </div>
      )}
    </div>
  );
};

export default SecurityCheck;
