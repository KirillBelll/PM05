-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Июл 03 2026 г., 20:33
-- Версия сервера: 8.0.30
-- Версия PHP: 8.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `kvartal_realty`
--

-- --------------------------------------------------------

--
-- Структура таблицы `Agent`
--

CREATE TABLE `Agent` (
  `id` int NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `photo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bio` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `dealsCount` int NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `Agent`
--

INSERT INTO `Agent` (`id`, `slug`, `name`, `role`, `phone`, `email`, `photo`, `bio`, `dealsCount`, `createdAt`) VALUES
(9, 'sokolova', 'Ирина Соколова', 'Ведущий эксперт по продажам', '+7 (495) 212-40-11', 'sokolova@kvartal.ru', 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1400&q=80', 'В недвижимости с 2011 года. Специализируется на квартирах бизнес-класса в центральных районах. Знает историю почти каждого дома, который продаёт.', 214, '2026-07-03 17:20:46.140'),
(10, 'kovalev', 'Дмитрий Ковалёв', 'Специалист по аренде', '+7 (495) 212-40-12', 'kovalev@kvartal.ru', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1400&q=80', 'Закрывает сделки по аренде за 3–5 дней. Ведёт собственную базу проверенных собственников и следит, чтобы в договоре не осталось серых зон.', 356, '2026-07-03 17:20:46.144'),
(11, 'litvinova', 'Анна Литвинова', 'Эксперт по загородной недвижимости', '+7 (495) 212-40-13', 'litvinova@kvartal.ru', 'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=1400&q=80', 'Разбирается в фундаментах не хуже, чем в ценах. Перед показом всегда лично проверяет коммуникации и состояние кровли.', 128, '2026-07-03 17:20:46.147'),
(12, 'orlov', 'Максим Орлов', 'Коммерческая недвижимость', '+7 (495) 212-40-14', 'orlov@kvartal.ru', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1400&q=80', 'Считает окупаемость помещения быстрее, чем большинство калькуляторов. Работает с арендаторами и инвесторами с 2015 года.', 97, '2026-07-03 17:20:46.163');

-- --------------------------------------------------------

--
-- Структура таблицы `Lead`
--

CREATE TABLE `Lead` (
  `id` int NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci,
  `source` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'contact',
  `propertyId` int DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `Property`
--

CREATE TABLE `Property` (
  `id` int NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dealType` enum('SALE','RENT') COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('APARTMENT','STUDIO','HOUSE','COMMERCIAL') COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('ACTIVE','RESERVED','SOLD') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ACTIVE',
  `city` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `district` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` int NOT NULL,
  `areaTotal` double NOT NULL,
  `areaLiving` double DEFAULT NULL,
  `areaKitchen` double DEFAULT NULL,
  `rooms` int NOT NULL,
  `floor` int DEFAULT NULL,
  `floorsTotal` int DEFAULT NULL,
  `yearBuilt` int DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `featured` tinyint(1) NOT NULL DEFAULT '0',
  `lat` double DEFAULT NULL,
  `lng` double DEFAULT NULL,
  `agentId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `Property`
--

INSERT INTO `Property` (`id`, `code`, `title`, `dealType`, `type`, `status`, `city`, `district`, `address`, `price`, `areaTotal`, `areaLiving`, `areaKitchen`, `rooms`, `floor`, `floorsTotal`, `yearBuilt`, `description`, `featured`, `lat`, `lng`, `agentId`, `createdAt`) VALUES
(29, 'KV-014', 'Светлая квартира с видом на парк', 'SALE', 'APARTMENT', 'ACTIVE', 'Москва', 'Хамовники', 'ул. Тимура Фрунзе, 11с2', 34900000, 64.2, 38.5, 12.4, 2, 7, 9, 2016, 'Угловая квартира на два фасада: окна выходят на парк Тимирязева и тихий двор. Панорамное остекление, потолки 3,1 м, кухня-гостиная перепланирована по проекту и узаконена. Дом кирпично-монолитный, закрытая территория с консьержем.', 1, NULL, NULL, 9, '2026-07-03 17:20:46.211'),
(30, 'KV-021', 'Студия для первой сделки', 'SALE', 'STUDIO', 'ACTIVE', 'Москва', 'Даниловский', 'Duxовской пер., 17', 8900000, 26.8, NULL, 8.1, 1, 12, 17, 2021, 'Готова к заселению: чистовая отделка, встроенная кухня, санузел под ключ. Дом сдан, документы на руках у собственника — сделка возможна без ожидания ключей. Рядом станция МЦК и сквер.', 0, NULL, NULL, 9, '2026-07-03 17:20:46.224'),
(31, 'KV-032', 'Четырёхкомнатная в сталинском доме', 'SALE', 'APARTMENT', 'ACTIVE', 'Москва', 'Пресненский', 'Кудринская площадь, 1', 68500000, 118.6, 76.2, 16, 4, 5, 8, 1954, 'Историческая квартира с сохранённой лепниной и паркетом из дуба, отреставрированным вручную. Потолки 3,4 м, две изолированные спальни, отдельный кабинет. Вид на высотку на Кудринской площади.', 1, NULL, NULL, 9, '2026-07-03 17:20:46.236'),
(32, 'KV-045', 'Дом с мастерской на участке', 'SALE', 'HOUSE', 'ACTIVE', 'Москва', 'п. Барвиха', 'Барвихинское ш., 24', 89000000, 240, 160, NULL, 5, NULL, 2, 2018, 'Двухэтажный дом из клееного бруса на участке 12 соток. Отдельно стоящая мастерская с электричеством и отоплением — можно переоборудовать под гостевой дом. Скважина, септик, газовое отопление.', 1, NULL, NULL, 11, '2026-07-03 17:20:46.249'),
(33, 'KV-051', 'Таунхаус в закрытом посёлке', 'SALE', 'HOUSE', 'ACTIVE', 'Москва', 'п. Жуковка', 'Рублёво-Успенское ш., 8', 52000000, 178, 120, NULL, 4, NULL, 3, 2019, 'Крайняя секция таунхауса с отдельным входом и небольшим садом. Охраняемый посёлок, до города 25 минут по новой развязке. Чистовая отделка, тёплый пол на первом этаже.', 0, NULL, NULL, 11, '2026-07-03 17:20:46.259'),
(34, 'AR-108', 'Однокомнатная у метро', 'RENT', 'APARTMENT', 'ACTIVE', 'Москва', 'Аэропорт', 'Ленинградский просп., 75', 62000, 41, NULL, 9.5, 1, 4, 14, 2009, 'Полностью меблирована, техника новая. Депозит один месяц, комиссия агентству со стороны собственника. Пешком 6 минут до метро, во дворе детская площадка.', 0, NULL, NULL, 10, '2026-07-03 17:20:46.269'),
(35, 'AR-112', 'Двухкомнатная с террасой', 'RENT', 'APARTMENT', 'ACTIVE', 'Москва', 'Раменки', 'Мичуринский просп., 27', 98000, 72, 44, 14, 2, 16, 25, 2020, 'Собственная терраса 18 м² с выходом из гостиной. Панорамные окна, вид на МГУ и лес. Сдаётся впервые после ремонта, есть парковочное место в подземном паркинге.', 1, NULL, NULL, 10, '2026-07-03 17:20:46.277'),
(36, 'AR-119', 'Студия рядом с кампусом', 'RENT', 'STUDIO', 'ACTIVE', 'Санкт-Петербург', 'Петроградский', 'Каменноостровский просп., 40', 41000, 24, NULL, NULL, 1, 3, 6, 1913, 'Дореволюционный дом с высокими потолками и лепниной на потолке. Студия после ремонта, стеклопакеты сохраняют историческую расстекловку. Рядом парки и набережная.', 0, NULL, NULL, 10, '2026-07-03 17:20:46.284'),
(37, 'KV-063', 'Пентхаус с приватной крышей', 'SALE', 'APARTMENT', 'ACTIVE', 'Санкт-Петербург', 'Центральный', 'наб. реки Фонтанки, 55', 112000000, 156, 98, 22, 3, 6, 6, 2015, 'Последний этаж клубного дома с эксплуатируемой кровлей 80 м² в личном пользовании. Вид на купола и крыши исторического центра. Индивидуальный проект отделки, приточная вентиляция.', 1, NULL, NULL, 9, '2026-07-03 17:20:46.295'),
(38, 'KV-071', 'Квартира с историческими окнами', 'SALE', 'APARTMENT', 'ACTIVE', 'Санкт-Петербург', 'Адмиралтейский', 'ул. Декабристов, 19', 21500000, 58, 34, 10, 2, 2, 5, 1898, 'Квартира в доме под охраной КГИОП: сохранены оконные рамы и паркет из массива. Требует бережного ремонта инженерных систем, стены и планировка в хорошем состоянии.', 0, NULL, NULL, 9, '2026-07-03 17:20:46.303'),
(39, 'AR-124', 'Дом для аренды на сезон', 'RENT', 'HOUSE', 'ACTIVE', 'Санкт-Петербург', 'Курортный район', 'Приморское ш., 312', 180000, 140, NULL, NULL, 4, NULL, 2, 2017, 'Дом в 300 метрах от залива, сдаётся с мебелью и техникой. Своя баня и терраса с мангальной зоной. Возможна аренда от месяца, минимальный срок — три месяца.', 0, NULL, NULL, 11, '2026-07-03 17:20:46.311'),
(40, 'CM-201', 'Помещение под шоурум на первой линии', 'RENT', 'COMMERCIAL', 'ACTIVE', 'Москва', 'Тверской', 'ул. Малая Дмитровка, 5', 420000, 96, NULL, NULL, 1, 1, 6, 2005, 'Отдельный вход с улицы, витринное остекление 12 погонных метров. Ранее занимал шоурум мебельного бренда — сохранена система освещения и вентиляция. Высокий пешеходный трафик.', 0, NULL, NULL, 12, '2026-07-03 17:20:46.317'),
(41, 'CM-208', 'Офис класса А в бизнес-центре', 'SALE', 'COMMERCIAL', 'ACTIVE', 'Москва', 'Пресненский', 'Пресненская наб., 12', 156000000, 310, NULL, NULL, 6, 18, 34, 2013, 'Готовое пространство с переговорными и открытой зоной на 40 рабочих мест. Панорамные окна на Москву-реку, отдельный лифтовой холл. Продаётся с частью мебели.', 1, NULL, NULL, 12, '2026-07-03 17:20:46.326'),
(42, 'AR-133', 'Трёхкомнатная для семьи с детьми', 'RENT', 'APARTMENT', 'ACTIVE', 'Москва', 'Тропарёво-Никулино', 'просп. Вернадского, 101', 115000, 84, 52, 15, 3, 8, 17, 2011, 'Рядом две школы и детский сад, во дворе закрытая площадка. Комнаты изолированные, кухня объединена с лоджией. Сдаётся семье на длительный срок, с животными по согласованию.', 0, NULL, NULL, 10, '2026-07-03 17:20:46.333');

-- --------------------------------------------------------

--
-- Структура таблицы `PropertyImage`
--

CREATE TABLE `PropertyImage` (
  `id` int NOT NULL,
  `url` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alt` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `order` int NOT NULL DEFAULT '0',
  `propertyId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `PropertyImage`
--

INSERT INTO `PropertyImage` (`id`, `url`, `alt`, `order`, `propertyId`) VALUES
(68, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80', 'Светлая квартира с видом на парк', 0, 29),
(69, 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80', 'Светлая квартира с видом на парк', 1, 29),
(70, 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1400&q=80', 'Светлая квартира с видом на парк', 2, 29),
(71, 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1400&q=80', 'Студия для первой сделки', 0, 30),
(72, 'https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&w=1400&q=80', 'Студия для первой сделки', 1, 30),
(73, 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=80', 'Четырёхкомнатная в сталинском доме', 0, 31),
(74, 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1400&q=80', 'Четырёхкомнатная в сталинском доме', 1, 31),
(75, 'https://images.unsplash.com/photo-1591825729269-caeb344f6df2?auto=format&fit=crop&w=1400&q=80', 'Четырёхкомнатная в сталинском доме', 2, 31),
(76, 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80', 'Дом с мастерской на участке', 0, 32),
(77, 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1400&q=80', 'Дом с мастерской на участке', 1, 32),
(78, 'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1400&q=80', 'Дом с мастерской на участке', 2, 32),
(79, 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1400&q=80', 'Таунхаус в закрытом посёлке', 0, 33),
(80, 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1400&q=80', 'Таунхаус в закрытом посёлке', 1, 33),
(81, 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80', 'Однокомнатная у метро', 0, 34),
(82, 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=80', 'Однокомнатная у метро', 1, 34),
(83, 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80', 'Двухкомнатная с террасой', 0, 35),
(84, 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1400&q=80', 'Двухкомнатная с террасой', 1, 35),
(85, 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1400&q=80', 'Двухкомнатная с террасой', 2, 35),
(86, 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1400&q=80', 'Студия рядом с кампусом', 0, 36),
(87, 'https://images.unsplash.com/photo-1571939228382-b2f2b585ce15?auto=format&fit=crop&w=1400&q=80', 'Студия рядом с кампусом', 1, 36),
(88, 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1400&q=80', 'Пентхаус с приватной крышей', 0, 37),
(89, 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80', 'Пентхаус с приватной крышей', 1, 37),
(90, 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1400&q=80', 'Пентхаус с приватной крышей', 2, 37),
(91, 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1400&q=80', 'Квартира с историческими окнами', 0, 38),
(92, 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80', 'Квартира с историческими окнами', 1, 38),
(93, 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1400&q=80', 'Дом для аренды на сезон', 0, 39),
(94, 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1400&q=80', 'Дом для аренды на сезон', 1, 39),
(95, 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80', 'Помещение под шоурум на первой линии', 0, 40),
(96, 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=80', 'Помещение под шоурум на первой линии', 1, 40),
(97, 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1400&q=80', 'Офис класса А в бизнес-центре', 0, 41),
(98, 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=80', 'Офис класса А в бизнес-центре', 1, 41),
(99, 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80', 'Трёхкомнатная для семьи с детьми', 0, 42),
(100, 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1400&q=80', 'Трёхкомнатная для семьи с детьми', 1, 42);

-- --------------------------------------------------------

--
-- Структура таблицы `Testimonial`
--

CREATE TABLE `Testimonial` (
  `id` int NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quote` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `rating` int NOT NULL DEFAULT '5',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `Testimonial`
--

INSERT INTO `Testimonial` (`id`, `name`, `role`, `quote`, `rating`, `createdAt`) VALUES
(12, 'Ольга Мартынова', 'купила квартиру в Хамовниках', 'Ирина показала историю дома до последней справки — кто строил, когда меняли кровлю, почему стоит именно такая цена. Впервые сделка не вызывала тревоги.', 5, '2026-07-03 17:20:46.339'),
(13, 'Сергей Волков', 'снял офис на Пресненской набережной', 'Максим сразу посчитал окупаемость по трём сценариям и не стал уговаривать на объект, который нам не подходил по метражу. Сэкономили около месяца поисков.', 5, '2026-07-03 17:20:46.339'),
(14, 'Наталья и Игорь Коваль', 'купили дом в Барвихе', 'Анна лично лазила на крышу проверять кровлю перед тем, как мы вышли на сделку. Такого внимания к деталям не было ни в одном другом агентстве.', 5, '2026-07-03 17:20:46.339'),
(15, 'Виктория Ким', 'сдала квартиру в Раменках', 'Нашли арендатора за четыре дня, договор составили с пунктами, о которых я даже не подумала бы сама. Дмитрий держал в курсе на каждом шаге.', 5, '2026-07-03 17:20:46.339'),
(16, 'Артём Беляков', 'купил студию на старте карьеры', 'Не самая крупная сделка для агентства, но отнеслись серьёзно: разобрали ипотечные программы, нашли вариант с меньшей переплатой.', 4, '2026-07-03 17:20:46.339');

-- --------------------------------------------------------

--
-- Структура таблицы `User`
--

CREATE TABLE `User` (
  `id` int NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `passwordHash` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `User`
--

INSERT INTO `User` (`id`, `email`, `passwordHash`, `name`, `createdAt`) VALUES
(1, 'admin@kvartal.ru', '$2b$10$5Vdlrrd1lVzfGQrF8kSYYOY7N2rWrE985qitDpL2yY5x5m7rzAchS', 'Администратор', '2026-07-03 17:20:46.534');

-- --------------------------------------------------------

--
-- Структура таблицы `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('476c3595-33dc-4d6a-b14c-1ef9ef5dc199', '52fbc6e29638e364c6bcbaaa851dd1c1f53ebcd97b873e40b201651101865589', '2026-07-03 13:52:57.869', '20260703135257_init', NULL, NULL, '2026-07-03 13:52:57.611', 1),
('86a3ec1e-4a49-439d-a98f-587756f13c30', '12ed56442c8e051130be1eeb5af0c278b85da712656f9e2e369e2c7d27850acc', '2026-07-03 17:16:14.103', '20260703171614_add_user', NULL, NULL, '2026-07-03 17:16:14.071', 1);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `Agent`
--
ALTER TABLE `Agent`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Agent_slug_key` (`slug`);

--
-- Индексы таблицы `Lead`
--
ALTER TABLE `Lead`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Lead_propertyId_fkey` (`propertyId`);

--
-- Индексы таблицы `Property`
--
ALTER TABLE `Property`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Property_code_key` (`code`),
  ADD KEY `Property_city_idx` (`city`),
  ADD KEY `Property_dealType_idx` (`dealType`),
  ADD KEY `Property_type_idx` (`type`),
  ADD KEY `Property_agentId_fkey` (`agentId`);

--
-- Индексы таблицы `PropertyImage`
--
ALTER TABLE `PropertyImage`
  ADD PRIMARY KEY (`id`),
  ADD KEY `PropertyImage_propertyId_fkey` (`propertyId`);

--
-- Индексы таблицы `Testimonial`
--
ALTER TABLE `Testimonial`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- Индексы таблицы `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `Agent`
--
ALTER TABLE `Agent`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT для таблицы `Lead`
--
ALTER TABLE `Lead`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `Property`
--
ALTER TABLE `Property`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT для таблицы `PropertyImage`
--
ALTER TABLE `PropertyImage`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT для таблицы `Testimonial`
--
ALTER TABLE `Testimonial`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT для таблицы `User`
--
ALTER TABLE `User`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `Lead`
--
ALTER TABLE `Lead`
  ADD CONSTRAINT `Lead_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `Property` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `Property`
--
ALTER TABLE `Property`
  ADD CONSTRAINT `Property_agentId_fkey` FOREIGN KEY (`agentId`) REFERENCES `Agent` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `PropertyImage`
--
ALTER TABLE `PropertyImage`
  ADD CONSTRAINT `PropertyImage_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `Property` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
