import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Banner */}
      <div className="bg-gray-100 py-2 px-4 text-center">
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
          <Icon name="ArrowLeft" size={16} />
          <span>
            Подпишитесь на наш Телеграм-канал и будьте в курсе последних
            новостей
          </span>
          <Icon name="ArrowRight" size={16} />
        </div>
      </div>

      {/* Header */}
      <header className="bg-white py-4 px-6 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold text-black">DOMGAZOBETON</div>

          <nav className="hidden md:flex space-x-8">
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-black">
                <span>Проекты</span>
                <Icon name="ChevronDown" size={16} />
              </button>
            </div>
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-black">
                <span>Услуги</span>
                <Icon name="ChevronDown" size={16} />
              </button>
            </div>
            <a href="#" className="text-gray-700 hover:text-black">
              Построено
            </a>
            <a href="#" className="text-gray-700 hover:text-black">
              Ипотека
            </a>
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-black">
                <span>Компания</span>
                <Icon name="ChevronDown" size={16} />
              </button>
            </div>
            <a href="#" className="text-gray-700 hover:text-black">
              Контакты
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="bg-gray-200 px-4 py-2 rounded text-gray-700 hover:bg-gray-300">
              Заказать звонок
            </button>
            <span className="text-gray-700 font-medium">8 800 550-28-34</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-16">
            {/* Main heading */}
            <h1 className="text-6xl leading-[1.1] text-black font-light">
              Проектируем и строим
              <br />
              <span className="text-gray-400">современные дома</span>
            </h1>

            {/* Image and text section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-2">
                <img
                  src="/img/0c89c709-4436-47dc-8e3d-cf3f98127512.jpg"
                  alt="Современный дом"
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>

              {/* Text positioned to the right of the image */}
              <div className="flex flex-col justify-center h-96">
                <div className="text-right">
                  <p className="text-xl text-gray-400 leading-relaxed">
                    в Санкт-Петербурге
                    <br />и Москве
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom text section */}
            <div className="max-w-md">
              <p className="text-gray-600 leading-relaxed">
                Строим дома «под ключ»:
                <br />
                от проектирования
                <br />
                до сдачи готового объекта помещений
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fixed Contact Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <div className="relative">
          <button className="bg-gray-800 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-700 transition-colors">
            <Icon name="MessageCircle" size={24} />
          </button>
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
            3
          </div>
        </div>
      </div>

      {/* Secondary Contact Button */}
      <div className="fixed bottom-8 right-28 z-50">
        <button className="bg-gray-800 text-white px-6 py-3 rounded-full shadow-lg hover:bg-gray-700 transition-colors">
          <div className="text-center">
            <div className="text-xs text-gray-300">Записаться</div>
            <div className="text-sm">на экскурсию объекта</div>
          </div>
        </button>
      </div>

      {/* Services Section */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-black mb-4">Наши услуги</h2>
            <p className="text-xl text-gray-600">
              Полный цикл строительства частных домов
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="mb-6">
                <Icon name="Home" size={32} className="text-gray-600" />
              </div>
              <h3 className="text-xl font-medium text-black mb-4">
                Проектирование
              </h3>
              <p className="text-gray-600">
                Индивидуальное архитектурное проектирование с учетом ваших
                потребностей
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="mb-6">
                <Icon name="Building" size={32} className="text-gray-600" />
              </div>
              <h3 className="text-xl font-medium text-black mb-4">
                Строительство
              </h3>
              <p className="text-gray-600">
                Полный цикл строительства от фундамента до сдачи под ключ
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="mb-6">
                <Icon name="Wrench" size={32} className="text-gray-600" />
              </div>
              <h3 className="text-xl font-medium text-black mb-4">Отделка</h3>
              <p className="text-gray-600">
                Внутренняя и внешняя отделка с применением качественных
                материалов
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-light text-black mb-6">
                О компании
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Мы — команда профессионалов с более чем 15-летним опытом в
                строительстве частных домов и коттеджей. Специализируемся на
                создании современных, энергоэффективных и комфортных домов.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-2xl font-light text-black mb-2">
                    200+
                  </div>
                  <div className="text-sm text-gray-600">Построенных домов</div>
                </div>
                <div>
                  <div className="text-2xl font-light text-black mb-2">15</div>
                  <div className="text-sm text-gray-600">Лет опыта</div>
                </div>
                <div>
                  <div className="text-2xl font-light text-black mb-2">5</div>
                  <div className="text-sm text-gray-600">Лет гарантии</div>
                </div>
                <div>
                  <div className="text-2xl font-light text-black mb-2">
                    100%
                  </div>
                  <div className="text-sm text-gray-600">
                    Довольных клиентов
                  </div>
                </div>
              </div>
            </div>

            <div>
              <img
                src="/img/047025a7-1cfe-4149-8c85-5a0be9b9030d.jpg"
                alt="Строительство дома"
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-xl font-bold mb-4">DOMGAZOBETON</div>
              <p className="text-gray-400 text-sm">
                Строительство домов из газобетона в Санкт-Петербурге и Москве
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-4">Услуги</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Проектирование</li>
                <li>Строительство</li>
                <li>Отделка</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>8 800 550-28-34</li>
                <li>info@domgazobeton.ru</li>
                <li>Санкт-Петербург, Москва</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-4">Документы</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Лицензии</li>
                <li>Сертификаты</li>
                <li>Политика конфиденциальности</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 DOMGAZOBETON. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
