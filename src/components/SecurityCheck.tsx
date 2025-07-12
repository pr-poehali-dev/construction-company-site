import React, { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

interface SecurityResults {
  canAccessProcessEnv: boolean;
  envVariables: Record<string, string>;
  sensitiveKeys: string[];
  viteEnvAccess: Record<string, any>;
  timestamp: string;
  totalEnvVars: number;
  processError?: string;
  viteError?: string;
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
      const { testEnvironmentAccess } = await import("/env-test.mjs");
      const result = await testEnvironmentAccess();
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
          <Icon name="Key" className="text-orange-600" size={28} />
          🔐 Тест переменных окружения
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
          {results.canAccessProcessEnv && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <Icon name="AlertTriangle" className="text-red-600" size={24} />
                <h3 className="font-semibold text-red-900 text-lg">
                  🚨 ДОСТУП К ПЕРЕМЕННЫМ ОКРУЖЕНИЯ!
                </h3>
              </div>
              <p className="text-red-800 font-medium">
                Время теста: {results.timestamp} | Переменных:{" "}
                {results.totalEnvVars}
              </p>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                {getStatusIcon(results.canAccessProcessEnv)}
                <h3 className="font-semibold text-gray-900">
                  🔐 Доступ к process.env
                </h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Может ли JS код читать переменные окружения сервера?
              </p>
              {results.canAccessProcessEnv && (
                <div className="bg-red-100 border border-red-300 rounded p-3">
                  <p className="text-sm font-medium text-red-800 mb-2">
                    ⚠️ ДОСТУП ПОЛУЧЕН! Всего переменных: {results.totalEnvVars}
                  </p>
                  <div className="max-h-64 overflow-y-auto bg-white rounded border p-2">
                    <div className="text-xs text-gray-800 space-y-1">
                      {Object.keys(results.envVariables).map((key) => (
                        <div
                          key={key}
                          className="flex border-b border-gray-100 pb-1 mb-1"
                        >
                          <span className="font-mono font-bold text-blue-600 min-w-[150px] break-words">
                            {key}:
                          </span>
                          <span className="font-mono text-gray-700 break-all text-xs">
                            {results.envVariables[key]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {results.processError && (
                <div className="bg-green-100 border border-green-300 rounded p-3">
                  <p className="text-sm text-green-800">
                    ✅ Защищено: {results.processError}
                  </p>
                </div>
              )}
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                {getStatusIcon(results.sensitiveKeys.length > 0)}
                <h3 className="font-semibold text-gray-900">
                  🔑 Чувствительные данные
                </h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Найдены ли секретные ключи, пароли, токены?
              </p>
              {results.sensitiveKeys.length > 0 && (
                <div className="bg-red-100 border border-red-300 rounded p-3">
                  <p className="text-sm font-medium text-red-800 mb-2">
                    🚨 НАЙДЕНО {results.sensitiveKeys.length} СЕКРЕТНЫХ КЛЮЧЕЙ!
                  </p>
                  <div className="max-h-32 overflow-y-auto bg-white rounded border p-2">
                    {results.sensitiveKeys.map((key) => (
                      <div
                        key={key}
                        className="text-xs text-red-700 py-1 font-mono"
                      >
                        🔑 {key}: {results.envVariables[key]?.substring(0, 30)}
                        ...
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {results.sensitiveKeys.length === 0 &&
                results.canAccessProcessEnv && (
                  <div className="bg-yellow-100 border border-yellow-300 rounded p-3">
                    <p className="text-sm text-yellow-800">
                      ⚠️ Секретных ключей не обнаружено
                    </p>
                  </div>
                )}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <Icon name="Info" className="text-blue-600" size={20} />
              <h4 className="font-semibold text-blue-900">Vite Environment</h4>
            </div>
            {Object.keys(results.viteEnvAccess).length > 0 && (
              <div className="text-sm">
                <p className="text-blue-800 mb-2">
                  Доступно переменных через import.meta.env:{" "}
                  {Object.keys(results.viteEnvAccess).length}
                </p>
                <div className="max-h-24 overflow-y-auto bg-white rounded border p-2">
                  {Object.entries(results.viteEnvAccess).map(([key, value]) => (
                    <div key={key} className="text-xs text-blue-700 flex">
                      <span className="font-mono font-bold min-w-[120px]">
                        {key}:
                      </span>
                      <span className="font-mono">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Icon name="Shield" className="text-amber-600" size={20} />
              <h4 className="font-semibold text-amber-900">
                Результаты ENV-атаки
              </h4>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                {getStatusIcon(results.canAccessProcessEnv)}
                <span className="text-gray-700">Доступ к process.env</span>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(results.sensitiveKeys.length > 0)}
                <span className="text-gray-700">Утечка секретных данных</span>
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
            Нажмите "Запустить проверку" для тестирования переменных окружения
          </p>
        </div>
      )}
    </div>
  );
};

export default SecurityCheck;
