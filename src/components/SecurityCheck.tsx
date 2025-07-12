import React, { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

interface SecurityResults {
  canReadParentDir: boolean;
  canListAppDir: boolean;
  filesInApp: string[];
  canReadServerCode: boolean;
  serverCode: string | null;
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
      const { checkSecurity } = await import("/test-from-vite-server.mjs");
      const result = await checkSecurity();
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
          <Icon name="Shield" className="text-blue-600" size={28} />
          Проверка безопасности системы
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
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                {getStatusIcon(results.canListAppDir)}
                <h3 className="font-semibold text-gray-900">
                  Доступ к директории /app
                </h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Проверка возможности чтения содержимого основной директории
                приложения
              </p>
              {results.canListAppDir && results.filesInApp.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Найдено файлов: {results.filesInApp.length}
                  </p>
                  <div className="max-h-32 overflow-y-auto bg-white rounded border p-2">
                    {results.filesInApp.map((file, index) => (
                      <div
                        key={index}
                        className="text-xs text-gray-600 py-1 flex items-center gap-2"
                      >
                        <Icon name="File" size={14} />
                        {file}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                {getStatusIcon(results.canReadServerCode)}
                <h3 className="font-semibold text-gray-900">
                  Чтение серверного кода
                </h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Проверка возможности чтения файла main.py сервера
              </p>
              {results.canReadServerCode && results.serverCode && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Размер кода: {results.serverCode.length} символов
                  </p>
                  <div className="max-h-32 overflow-y-auto bg-white rounded border p-2">
                    <pre className="text-xs text-gray-600 whitespace-pre-wrap">
                      {results.serverCode.substring(0, 200)}
                      {results.serverCode.length > 200 && "..."}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Icon name="Info" className="text-blue-600" size={20} />
              <h4 className="font-semibold text-blue-900">
                Сводка результатов
              </h4>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                {getStatusIcon(results.canListAppDir)}
                <span className="text-gray-700">Доступ к директории</span>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(results.canReadServerCode)}
                <span className="text-gray-700">Чтение серверного кода</span>
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
            Нажмите "Запустить проверку" для анализа безопасности системы
          </p>
        </div>
      )}
    </div>
  );
};

export default SecurityCheck;
