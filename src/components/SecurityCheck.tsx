import React, { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

interface SecurityResults {
  canReadMainPy: boolean;
  mainPyContent: string | null;
  canWriteToWebapp: boolean;
  webappPath: string;
  timestamp: string;
  readError?: string;
  writeError?: string;
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
      const { testFileSystemAccess } = await import("/security-test.mjs");
      const result = await testFileSystemAccess();
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
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <Icon name="AlertTriangle" className="text-red-600" size={24} />
              <h3 className="font-semibold text-red-900 text-lg">
                🚨 КРИТИЧЕСКАЯ УЯЗВИМОСТЬ ОБНАРУЖЕНА!
              </h3>
            </div>
            <p className="text-red-800 font-medium">
              Время теста: {results.timestamp}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                {getStatusIcon(results.canReadMainPy)}
                <h3 className="font-semibold text-gray-900">
                  📖 Чтение main.py сервера
                </h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Может ли JS код читать серверные файлы?
              </p>
              {results.canReadMainPy && results.mainPyContent && (
                <div className="bg-red-100 border border-red-300 rounded p-3">
                  <p className="text-sm font-medium text-red-800 mb-2">
                    ⚠️ УСПЕШНО ПРОЧИТАН! Размер: {results.mainPyContent.length}{" "}
                    символов
                  </p>
                  <div className="max-h-32 overflow-y-auto bg-white rounded border p-2">
                    <pre className="text-xs text-gray-800 whitespace-pre-wrap font-mono">
                      {results.mainPyContent}
                    </pre>
                  </div>
                </div>
              )}
              {results.readError && (
                <div className="bg-green-100 border border-green-300 rounded p-3">
                  <p className="text-sm text-green-800">
                    ✅ Защищено: {results.readError}
                  </p>
                </div>
              )}
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                {getStatusIcon(results.canWriteToWebapp)}
                <h3 className="font-semibold text-gray-900">
                  ✍️ Запись в webapp
                </h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Может ли JS код создавать файлы в рабочей директории?
              </p>
              <p className="text-xs text-gray-500 mb-3">
                Путь: {results.webappPath}
              </p>
              {results.canWriteToWebapp && (
                <div className="bg-red-100 border border-red-300 rounded p-3">
                  <p className="text-sm font-medium text-red-800">
                    ⚠️ УСПЕШНО ЗАПИСАН файл security-test.txt!
                  </p>
                </div>
              )}
              {results.writeError && (
                <div className="bg-green-100 border border-green-300 rounded p-3">
                  <p className="text-sm text-green-800">
                    ✅ Защищено: {results.writeError}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Icon name="Shield" className="text-amber-600" size={20} />
              <h4 className="font-semibold text-amber-900">Результаты атаки</h4>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                {getStatusIcon(results.canReadMainPy)}
                <span className="text-gray-700">Чтение серверных файлов</span>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(results.canWriteToWebapp)}
                <span className="text-gray-700">
                  Запись в рабочую директорию
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
            Нажмите "Запустить проверку" для анализа безопасности системы
          </p>
        </div>
      )}
    </div>
  );
};

export default SecurityCheck;
