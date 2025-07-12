import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useState } from "react";

const Index = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
      <header className="bg-white py-4 px-4 md:px-6 border-b border-gray-200 relative z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-lg md:text-2xl font-bold text-black">
            DOMGAZOBETON2
          </div>

          <nav className="hidden md:flex space-x-8">
            <div className="relative group">
              <button className="flex items-center space-x-1 text-sm text-gray-700 hover:text-black">
                <span>Проекты</span>
                <Icon name="ChevronDown" size={16} />
              </button>
            </div>
            <div className="relative group">
              <button className="flex items-center space-x-1 text-sm text-gray-700 hover:text-black">
                <span>Услуги</span>
                <Icon name="ChevronDown" size={16} />
              </button>
            </div>
            <a href="#" className="text-sm text-gray-700 hover:text-black">
              Построено
            </a>
            <a href="#" className="text-sm text-gray-700 hover:text-black">
              Ипотека
            </a>
            <div className="relative group">
              <button className="flex items-center space-x-1 text-sm text-gray-700 hover:text-black">
                <span>Компания</span>
                <Icon name="ChevronDown" size={16} />
              </button>
            </div>
            <a href="#" className="text-sm text-gray-700 hover:text-black">
              Контакты
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 relative z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>

          <div className="hidden md:flex items-center space-x-4">
            <button className="bg-gray-200 px-4 py-2 rounded text-gray-700 hover:bg-gray-300">
              Заказать звонок
            </button>
            <span className="text-gray-700 font-medium">8 800 550-28-34</span>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-40 md:hidden transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 pt-20">
          <div className="flex flex-col space-y-6">
            <a
              href="#"
              className="text-lg text-gray-700 hover:text-black transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Проекты
            </a>
            <a
              href="#"
              className="text-lg text-gray-700 hover:text-black transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Услуги
            </a>
            <a
              href="#"
              className="text-lg text-gray-700 hover:text-black transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Построено
            </a>
            <a
              href="#"
              className="text-lg text-gray-700 hover:text-black transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Ипотека
            </a>
            <a
              href="#"
              className="text-lg text-gray-700 hover:text-black transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Компания
            </a>
            <a
              href="#"
              className="text-lg text-gray-700 hover:text-black transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Контакты
            </a>
            <div className="pt-6 border-t border-gray-200">
              <button
                className="w-full bg-gray-200 px-4 py-3 rounded text-gray-700 hover:bg-gray-300 mb-4 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Заказать звонок
              </button>
              <div className="text-center text-gray-700 font-medium text-lg">
                8 800 550-28-34
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-white py-12 md:py-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-8 md:space-y-16">
            {/* Main heading */}
            <h1 className="text-3xl md:text-6xl leading-[1.1] text-black font-semibold animate-fade-in opacity-0 [animation-delay:0.2s] [animation-fill-mode:forwards]">
              Проектируем и строим
              <br />
              <span className="text-gray-400 font-normal">
                современные дома
              </span>
            </h1>

            {/* Image and text section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-2 animate-slide-in-left opacity-0 [animation-delay:0.6s] [animation-fill-mode:forwards]">
                <img
                  src="/img/0c89c709-4436-47dc-8e3d-cf3f98127512.jpg"
                  alt="Современный дом"
                  className="w-full h-64 md:h-96 object-cover rounded-lg"
                />
              </div>

              {/* Text positioned to the right of the image */}
              <div className="flex flex-col justify-between h-auto md:h-96 space-y-6 md:space-y-0 animate-slide-in-right opacity-0 [animation-delay:1s] [animation-fill-mode:forwards]">
                <div className="text-left">
                  <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-light">
                    в Санкт-Петербурге
                    <br />и Москве
                  </p>
                </div>

                <div className="text-left">
                  <p className="text-gray-600 leading-relaxed font-light">
                    Строим дома «под ключ»:
                    <br />
                    от проектирования
                    <br />
                    до сдачи готового объекта помещений
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid Section */}
      <section className="relative">
        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-6 md:grid-rows-2 h-auto md:h-screen">
          {/* Top Left - Minimalist */}
          <div className="relative group overflow-hidden cursor-pointer h-64 md:h-full">
            <img
              src="/img/459b4baa-32bd-4044-85ef-02513dfda7a0.jpg"
              alt="Современный минималистичный дом"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-white drop-shadow-2xl tracking-wider">
                МИНИМАЛИЗМ
              </h3>
            </div>
          </div>

          {/* Top Center - Scandinavian */}
          <div className="relative group overflow-hidden cursor-pointer h-64 md:h-full">
            <img
              src="/img/219c1c61-09f5-4e26-a291-089c9267f0ce.jpg"
              alt="Скандинавский стиль дома"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-white drop-shadow-2xl tracking-wider">
                СКАНДИНАВСКИЙ
              </h3>
            </div>
          </div>

          {/* Top Right - Eco-friendly */}
          <div className="relative group overflow-hidden cursor-pointer h-64 md:h-full">
            <img
              src="/img/2e633326-1320-489e-a42b-aaf4ab0ade0c.jpg"
              alt="Эко-дом с солнечными панелями"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-white drop-shadow-2xl tracking-wider">
                ЭКО-ДОМ
              </h3>
            </div>
          </div>

          {/* Bottom Left - Smart Home */}
          <div className="relative group overflow-hidden cursor-pointer h-64 md:h-full">
            <img
              src="/img/9c9fd4cb-b59b-4f7a-a8ef-41825c70a409.jpg"
              alt="Умный дом с высокими технологиями"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-white drop-shadow-2xl tracking-wider">
                УМНЫЙ ДОM
              </h3>
            </div>
          </div>

          {/* Bottom Center - Brutalist */}
          <div className="relative group overflow-hidden cursor-pointer h-64 md:h-full">
            <img
              src="/img/d17690dd-ff66-4895-97b8-5cdf276b8672.jpg"
              alt="Брутализм архитектура"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-white drop-shadow-2xl tracking-wider">
                БРУТАЛИЗМ
              </h3>
            </div>
          </div>

          {/* Bottom Right - Stalinist */}
          <div className="relative group overflow-hidden cursor-pointer h-64 md:h-full">
            <img
              src="/img/5e3a6340-ea32-4d0c-9321-67cb588c2e61.jpg"
              alt="Сталинский ампир архитектура"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-white drop-shadow-2xl tracking-wider">
                СТАЛИНСКИЙ
              </h3>
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
                <img
                  src="/img/6336af1f-d1c5-4380-808d-2be2d2be70d5.jpg"
                  alt="Проектирование"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-medium text-black mb-4">
                📐 Проектирование
              </h3>
              <p className="text-gray-600">
                Индивидуальное архитектурное проектирование с учетом ваших
                потребностей
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="mb-6">
                <img
                  src="/img/51cb1043-4188-465d-a41b-820711f7691f.jpg"
                  alt="Строительство"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-medium text-black mb-4">
                🏗️ Строительство
              </h3>
              <p className="text-gray-600">
                Полный цикл строительства от фундамента до сдачи под ключ
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="mb-6">
                <img
                  src="/img/f51537ed-b911-4db1-bda1-ab5bd6de9e5c.jpg"
                  alt="Отделка"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-medium text-black mb-4">
                🎨 Отделка
              </h3>
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
                src="/img/b136a11d-de2a-4be3-bedb-05bafc14d1a8.jpg"
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
