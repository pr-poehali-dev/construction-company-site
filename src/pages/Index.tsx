import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";

const Index = () => {
  const services = [
    {
      title: "Проектирование домов",
      description:
        "Индивидуальное архитектурное проектирование частных домов и коттеджей с учетом всех ваших пожеланий",
      icon: "Home",
    },
    {
      title: "Строительство коттеджей",
      description:
        "Полный цикл строительства от фундамента до сдачи под ключ с использованием современных материалов",
      icon: "Building",
    },
    {
      title: "Отделочные работы",
      description:
        "Внутренняя и внешняя отделка помещений, дизайн интерьеров и благоустройство территории",
      icon: "Paintbrush",
    },
    {
      title: "Реконструкция",
      description:
        "Модернизация и реконструкция существующих зданий с расширением функциональности",
      icon: "Wrench",
    },
  ];

  const advantages = [
    {
      title: "15 лет опыта",
      description: "Успешно завершили более 200 проектов жилого строительства",
      icon: "Award",
    },
    {
      title: "Собственное производство",
      description: "Контролируем качество материалов и сроки выполнения работ",
      icon: "Factory",
    },
    {
      title: "Гарантия 5 лет",
      description: "Предоставляем расширенную гарантию на все виды работ",
      icon: "Shield",
    },
    {
      title: "Фиксированная цена",
      description: "Стоимость фиксируется в договоре без скрытых доплат",
      icon: "Calculator",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Building2" size={32} className="text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-800">СтройДом</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a
                href="#main"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Главная
              </a>
              <a
                href="#services"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Услуги
              </a>
              <a
                href="#about"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                О компании
              </a>
              <a
                href="#contact"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Контакты
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 font-medium">
                +7 (800) 123-45-67
              </span>
              <Button>Заказать звонок</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="main"
        className="py-20 bg-gradient-to-r from-blue-50 to-gray-50"
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl font-bold text-gray-800 leading-tight">
                Проектируем и строим
                <span className="text-blue-600 block">современные дома</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Строим дома "под ключ" от проектирования до сдачи готового
                объекта помещений в Санкт-Петербурге и Москве
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Icon name="Phone" size={20} className="mr-2" />
                  Записаться на экскурсию объекта
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  Заказать звонок
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="/img/0c89c709-4436-47dc-8e3d-cf3f98127512.jpg"
                alt="Современный дом"
                className="rounded-lg shadow-2xl w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Наши услуги
            </h2>
            <p className="text-xl text-gray-600">
              Полный спектр услуг для строительства вашего дома
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow border-0 shadow-md"
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-4 bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center">
                    <Icon
                      name={service.icon}
                      size={24}
                      className="text-blue-600"
                    />
                  </div>
                  <CardTitle className="text-xl text-gray-800">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/img/047025a7-1cfe-4149-8c85-5a0be9b9030d.jpg"
                alt="Планы строительства"
                className="rounded-lg shadow-xl w-full h-96 object-cover"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-800">
                О компании СтройДом
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Мы специализируемся на строительстве жилых домов и коттеджей уже
                более 15 лет. Наша команда профессиональных архитекторов,
                инженеров и строителей создает качественные и надежные дома для
                комфортной жизни.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {advantages.map((advantage, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="p-2 bg-blue-50 rounded-lg flex-shrink-0">
                      <Icon
                        name={advantage.icon}
                        size={20}
                        className="text-blue-600"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">
                        {advantage.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {advantage.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Свяжитесь с нами
            </h2>
            <p className="text-xl text-gray-600">
              Готовы обсудить ваш проект? Оставьте заявку и мы свяжемся с вами
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Icon name="MapPin" size={24} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Адрес</h3>
                  <p className="text-gray-600">
                    г. Санкт-Петербург, ул. Строителей, 15
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Icon name="Phone" size={24} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Телефон</h3>
                  <p className="text-gray-600">+7 (800) 123-45-67</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Icon name="Mail" size={24} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Email</h3>
                  <p className="text-gray-600">info@stroydom.ru</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Icon name="Clock" size={24} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Время работы</h3>
                  <p className="text-gray-600">
                    Пн-Пт: 9:00-18:00, Сб: 10:00-16:00
                  </p>
                </div>
              </div>
            </div>
            <Card className="p-6 shadow-lg">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-2xl text-gray-800">
                  Оставить заявку
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <form className="space-y-4">
                  <div>
                    <Input placeholder="Ваше имя" />
                  </div>
                  <div>
                    <Input placeholder="Телефон" />
                  </div>
                  <div>
                    <Input placeholder="Email" />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Опишите ваш проект"
                      className="min-h-[120px]"
                    />
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Отправить заявку
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Building2" size={24} className="text-blue-400" />
                <h3 className="text-xl font-bold">СтройДом</h3>
              </div>
              <p className="text-gray-400">
                Строим дома вашей мечты с 2009 года
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Услуги</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Проектирование</li>
                <li>Строительство</li>
                <li>Отделка</li>
                <li>Реконструкция</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-gray-400">
                <li>+7 (800) 123-45-67</li>
                <li>info@stroydom.ru</li>
                <li>г. Санкт-Петербург</li>
                <li>ул. Строителей, 15</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Мы в соцсетях</h4>
              <div className="flex space-x-4">
                <Icon
                  name="Facebook"
                  size={20}
                  className="text-gray-400 hover:text-blue-400 cursor-pointer"
                />
                <Icon
                  name="Instagram"
                  size={20}
                  className="text-gray-400 hover:text-blue-400 cursor-pointer"
                />
                <Icon
                  name="Youtube"
                  size={20}
                  className="text-gray-400 hover:text-blue-400 cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 СтройДом. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
