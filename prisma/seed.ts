import "dotenv/config";
import { PrismaClient, DealType, PropertyType } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import bcrypt from "bcryptjs";

const adapter = new PrismaMariaDb({
  host: "localhost",
  port: 3306,
  user: "root",
  database: "kvartal_realty",
});

const prisma = new PrismaClient({ adapter });

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=80`;

async function main() {
  await prisma.lead.deleteMany();
  await prisma.propertyImage.deleteMany();
  await prisma.property.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.agent.deleteMany();

  const agents = await Promise.all([
    prisma.agent.create({
      data: {
        slug: "sokolova",
        name: "Ирина Соколова",
        role: "Ведущий эксперт по продажам",
        phone: "+7 (495) 212-40-11",
        email: "sokolova@kvartal.ru",
        photo: img("photo-1573497019940-1c28c88b4f3e"),
        bio: "В недвижимости с 2011 года. Специализируется на квартирах бизнес-класса в центральных районах. Знает историю почти каждого дома, который продаёт.",
        dealsCount: 214,
      },
    }),
    prisma.agent.create({
      data: {
        slug: "kovalev",
        name: "Дмитрий Ковалёв",
        role: "Специалист по аренде",
        phone: "+7 (495) 212-40-12",
        email: "kovalev@kvartal.ru",
        photo: img("photo-1560250097-0b93528c311a"),
        bio: "Закрывает сделки по аренде за 3–5 дней. Ведёт собственную базу проверенных собственников и следит, чтобы в договоре не осталось серых зон.",
        dealsCount: 356,
      },
    }),
    prisma.agent.create({
      data: {
        slug: "litvinova",
        name: "Анна Литвинова",
        role: "Эксперт по загородной недвижимости",
        phone: "+7 (495) 212-40-13",
        email: "litvinova@kvartal.ru",
        photo: img("photo-1554151228-14d9def656e4"),
        bio: "Разбирается в фундаментах не хуже, чем в ценах. Перед показом всегда лично проверяет коммуникации и состояние кровли.",
        dealsCount: 128,
      },
    }),
    prisma.agent.create({
      data: {
        slug: "orlov",
        name: "Максим Орлов",
        role: "Коммерческая недвижимость",
        phone: "+7 (495) 212-40-14",
        email: "orlov@kvartal.ru",
        photo: img("photo-1519085360753-af0119f7cbe7"),
        bio: "Считает окупаемость помещения быстрее, чем большинство калькуляторов. Работает с арендаторами и инвесторами с 2015 года.",
        dealsCount: 97,
      },
    }),
  ]);

  const [sokolova, kovalev, litvinova, orlov] = agents;

  type Seed = {
    code: string;
    title: string;
    dealType: DealType;
    type: PropertyType;
    city: string;
    district: string;
    address: string;
    price: number;
    areaTotal: number;
    areaLiving?: number;
    areaKitchen?: number;
    rooms: number;
    floor?: number;
    floorsTotal?: number;
    yearBuilt?: number;
    description: string;
    featured?: boolean;
    agentId: number;
    images: string[];
  };

  const properties: Seed[] = [
    {
      code: "KV-014",
      title: "Светлая квартира с видом на парк",
      dealType: DealType.SALE,
      type: PropertyType.APARTMENT,
      city: "Москва",
      district: "Хамовники",
      address: "ул. Тимура Фрунзе, 11с2",
      price: 34900000,
      areaTotal: 64.2,
      areaLiving: 38.5,
      areaKitchen: 12.4,
      rooms: 2,
      floor: 7,
      floorsTotal: 9,
      yearBuilt: 2016,
      description:
        "Угловая квартира на два фасада: окна выходят на парк Тимирязева и тихий двор. Панорамное остекление, потолки 3,1 м, кухня-гостиная перепланирована по проекту и узаконена. Дом кирпично-монолитный, закрытая территория с консьержем.",
      featured: true,
      agentId: sokolova.id,
      images: [
        "photo-1600585154340-be6161a56a0c",
        "photo-1600607687939-ce8a6c25118c",
        "photo-1600121848594-d8644e57abab",
      ],
    },
    {
      code: "KV-021",
      title: "Студия для первой сделки",
      dealType: DealType.SALE,
      type: PropertyType.STUDIO,
      city: "Москва",
      district: "Даниловский",
      address: "Duxовской пер., 17",
      price: 8900000,
      areaTotal: 26.8,
      areaKitchen: 8.1,
      rooms: 1,
      floor: 12,
      floorsTotal: 17,
      yearBuilt: 2021,
      description:
        "Готова к заселению: чистовая отделка, встроенная кухня, санузел под ключ. Дом сдан, документы на руках у собственника — сделка возможна без ожидания ключей. Рядом станция МЦК и сквер.",
      agentId: sokolova.id,
      images: ["photo-1522708323590-d24dbb6b0267", "photo-1560184897-ae75f418493e"],
    },
    {
      code: "KV-032",
      title: "Четырёхкомнатная в сталинском доме",
      dealType: DealType.SALE,
      type: PropertyType.APARTMENT,
      city: "Москва",
      district: "Пресненский",
      address: "Кудринская площадь, 1",
      price: 68500000,
      areaTotal: 118.6,
      areaLiving: 76.2,
      areaKitchen: 16.0,
      rooms: 4,
      floor: 5,
      floorsTotal: 8,
      yearBuilt: 1954,
      description:
        "Историческая квартира с сохранённой лепниной и паркетом из дуба, отреставрированным вручную. Потолки 3,4 м, две изолированные спальни, отдельный кабинет. Вид на высотку на Кудринской площади.",
      featured: true,
      agentId: sokolova.id,
      images: [
        "photo-1600566753086-00f18fb6b3ea",
        "photo-1600566752355-35792bedcfea",
        "photo-1591825729269-caeb344f6df2",
      ],
    },
    {
      code: "KV-045",
      title: "Дом с мастерской на участке",
      dealType: DealType.SALE,
      type: PropertyType.HOUSE,
      city: "Москва",
      district: "п. Барвиха",
      address: "Барвихинское ш., 24",
      price: 89000000,
      areaTotal: 240,
      areaLiving: 160,
      rooms: 5,
      floorsTotal: 2,
      yearBuilt: 2018,
      description:
        "Двухэтажный дом из клееного бруса на участке 12 соток. Отдельно стоящая мастерская с электричеством и отоплением — можно переоборудовать под гостевой дом. Скважина, септик, газовое отопление.",
      featured: true,
      agentId: litvinova.id,
      images: [
        "photo-1512917774080-9991f1c4c750",
        "photo-1502672260266-1c1ef2d93688",
        "photo-1449844908441-8829872d2607",
      ],
    },
    {
      code: "KV-051",
      title: "Таунхаус в закрытом посёлке",
      dealType: DealType.SALE,
      type: PropertyType.HOUSE,
      city: "Москва",
      district: "п. Жуковка",
      address: "Рублёво-Успенское ш., 8",
      price: 52000000,
      areaTotal: 178,
      areaLiving: 120,
      rooms: 4,
      floorsTotal: 3,
      yearBuilt: 2019,
      description:
        "Крайняя секция таунхауса с отдельным входом и небольшим садом. Охраняемый посёлок, до города 25 минут по новой развязке. Чистовая отделка, тёплый пол на первом этаже.",
      agentId: litvinova.id,
      images: ["photo-1502005229762-cf1b2da7c5d6", "photo-1570129477492-45c003edd2be"],
    },
    {
      code: "AR-108",
      title: "Однокомнатная у метро",
      dealType: DealType.RENT,
      type: PropertyType.APARTMENT,
      city: "Москва",
      district: "Аэропорт",
      address: "Ленинградский просп., 75",
      price: 62000,
      areaTotal: 41.0,
      areaKitchen: 9.5,
      rooms: 1,
      floor: 4,
      floorsTotal: 14,
      yearBuilt: 2009,
      description:
        "Полностью меблирована, техника новая. Депозит один месяц, комиссия агентству со стороны собственника. Пешком 6 минут до метро, во дворе детская площадка.",
      agentId: kovalev.id,
      images: ["photo-1600210492486-724fe5c67fb0", "photo-1484154218962-a197022b5858"],
    },
    {
      code: "AR-112",
      title: "Двухкомнатная с террасой",
      dealType: DealType.RENT,
      type: PropertyType.APARTMENT,
      city: "Москва",
      district: "Раменки",
      address: "Мичуринский просп., 27",
      price: 98000,
      areaTotal: 72.0,
      areaLiving: 44.0,
      areaKitchen: 14.0,
      rooms: 2,
      floor: 16,
      floorsTotal: 25,
      yearBuilt: 2020,
      description:
        "Собственная терраса 18 м² с выходом из гостиной. Панорамные окна, вид на МГУ и лес. Сдаётся впервые после ремонта, есть парковочное место в подземном паркинге.",
      featured: true,
      agentId: kovalev.id,
      images: [
        "photo-1600596542815-ffad4c1539a9",
        "photo-1568605114967-8130f3a36994",
        "photo-1580587771525-78b9dba3b914",
      ],
    },
    {
      code: "AR-119",
      title: "Студия рядом с кампусом",
      dealType: DealType.RENT,
      type: PropertyType.STUDIO,
      city: "Санкт-Петербург",
      district: "Петроградский",
      address: "Каменноостровский просп., 40",
      price: 41000,
      areaTotal: 24.0,
      rooms: 1,
      floor: 3,
      floorsTotal: 6,
      yearBuilt: 1913,
      description:
        "Дореволюционный дом с высокими потолками и лепниной на потолке. Студия после ремонта, стеклопакеты сохраняют историческую расстекловку. Рядом парки и набережная.",
      agentId: kovalev.id,
      images: ["photo-1493809842364-78817add7ffb", "photo-1571939228382-b2f2b585ce15"],
    },
    {
      code: "KV-063",
      title: "Пентхаус с приватной крышей",
      dealType: DealType.SALE,
      type: PropertyType.APARTMENT,
      city: "Санкт-Петербург",
      district: "Центральный",
      address: "наб. реки Фонтанки, 55",
      price: 112000000,
      areaTotal: 156.0,
      areaLiving: 98.0,
      areaKitchen: 22.0,
      rooms: 3,
      floor: 6,
      floorsTotal: 6,
      yearBuilt: 2015,
      description:
        "Последний этаж клубного дома с эксплуатируемой кровлей 80 м² в личном пользовании. Вид на купола и крыши исторического центра. Индивидуальный проект отделки, приточная вентиляция.",
      featured: true,
      agentId: sokolova.id,
      images: [
        "photo-1512918728675-ed5a9ecdebfd",
        "photo-1600585154526-990dced4db0d",
        "photo-1523217582562-09d0def993a6",
      ],
    },
    {
      code: "KV-071",
      title: "Квартира с историческими окнами",
      dealType: DealType.SALE,
      type: PropertyType.APARTMENT,
      city: "Санкт-Петербург",
      district: "Адмиралтейский",
      address: "ул. Декабристов, 19",
      price: 21500000,
      areaTotal: 58.0,
      areaLiving: 34.0,
      areaKitchen: 10.0,
      rooms: 2,
      floor: 2,
      floorsTotal: 5,
      yearBuilt: 1898,
      description:
        "Квартира в доме под охраной КГИОП: сохранены оконные рамы и паркет из массива. Требует бережного ремонта инженерных систем, стены и планировка в хорошем состоянии.",
      agentId: sokolova.id,
      images: ["photo-1554995207-c18c203602cb", "photo-1600607687939-ce8a6c25118c"],
    },
    {
      code: "AR-124",
      title: "Дом для аренды на сезон",
      dealType: DealType.RENT,
      type: PropertyType.HOUSE,
      city: "Санкт-Петербург",
      district: "Курортный район",
      address: "Приморское ш., 312",
      price: 180000,
      areaTotal: 140.0,
      rooms: 4,
      floorsTotal: 2,
      yearBuilt: 2017,
      description:
        "Дом в 300 метрах от залива, сдаётся с мебелью и техникой. Своя баня и терраса с мангальной зоной. Возможна аренда от месяца, минимальный срок — три месяца.",
      agentId: litvinova.id,
      images: ["photo-1522708323590-d24dbb6b0267", "photo-1570129477492-45c003edd2be"],
    },
    {
      code: "CM-201",
      title: "Помещение под шоурум на первой линии",
      dealType: DealType.RENT,
      type: PropertyType.COMMERCIAL,
      city: "Москва",
      district: "Тверской",
      address: "ул. Малая Дмитровка, 5",
      price: 420000,
      areaTotal: 96.0,
      rooms: 1,
      floor: 1,
      floorsTotal: 6,
      yearBuilt: 2005,
      description:
        "Отдельный вход с улицы, витринное остекление 12 погонных метров. Ранее занимал шоурум мебельного бренда — сохранена система освещения и вентиляция. Высокий пешеходный трафик.",
      agentId: orlov.id,
      images: ["photo-1497366216548-37526070297c", "photo-1497366811353-6870744d04b2"],
    },
    {
      code: "CM-208",
      title: "Офис класса А в бизнес-центре",
      dealType: DealType.SALE,
      type: PropertyType.COMMERCIAL,
      city: "Москва",
      district: "Пресненский",
      address: "Пресненская наб., 12",
      price: 156000000,
      areaTotal: 310.0,
      floor: 18,
      floorsTotal: 34,
      yearBuilt: 2013,
      rooms: 6,
      description:
        "Готовое пространство с переговорными и открытой зоной на 40 рабочих мест. Панорамные окна на Москву-реку, отдельный лифтовой холл. Продаётся с частью мебели.",
      featured: true,
      agentId: orlov.id,
      images: ["photo-1497215728101-856f4ea42174", "photo-1497366811353-6870744d04b2"],
    },
    {
      code: "AR-133",
      title: "Трёхкомнатная для семьи с детьми",
      dealType: DealType.RENT,
      type: PropertyType.APARTMENT,
      city: "Москва",
      district: "Тропарёво-Никулино",
      address: "просп. Вернадского, 101",
      price: 115000,
      areaTotal: 84.0,
      areaLiving: 52.0,
      areaKitchen: 15.0,
      rooms: 3,
      floor: 8,
      floorsTotal: 17,
      yearBuilt: 2011,
      description:
        "Рядом две школы и детский сад, во дворе закрытая площадка. Комнаты изолированные, кухня объединена с лоджией. Сдаётся семье на длительный срок, с животными по согласованию.",
      agentId: kovalev.id,
      images: ["photo-1600596542815-ffad4c1539a9", "photo-1600121848594-d8644e57abab"],
    },
  ];

  for (const p of properties) {
    const { images, ...data } = p;
    await prisma.property.create({
      data: {
        ...data,
        images: {
          create: images.map((id, order) => ({
            url: img(id),
            alt: p.title,
            order,
          })),
        },
      },
    });
  }

  await prisma.testimonial.createMany({
    data: [
      {
        name: "Ольга Мартынова",
        role: "купила квартиру в Хамовниках",
        quote:
          "Ирина показала историю дома до последней справки — кто строил, когда меняли кровлю, почему стоит именно такая цена. Впервые сделка не вызывала тревоги.",
        rating: 5,
      },
      {
        name: "Сергей Волков",
        role: "снял офис на Пресненской набережной",
        quote:
          "Максим сразу посчитал окупаемость по трём сценариям и не стал уговаривать на объект, который нам не подходил по метражу. Сэкономили около месяца поисков.",
        rating: 5,
      },
      {
        name: "Наталья и Игорь Коваль",
        role: "купили дом в Барвихе",
        quote:
          "Анна лично лазила на крышу проверять кровлю перед тем, как мы вышли на сделку. Такого внимания к деталям не было ни в одном другом агентстве.",
        rating: 5,
      },
      {
        name: "Виктория Ким",
        role: "сдала квартиру в Раменках",
        quote:
          "Нашли арендатора за четыре дня, договор составили с пунктами, о которых я даже не подумала бы сама. Дмитрий держал в курсе на каждом шаге.",
        rating: 5,
      },
      {
        name: "Артём Беляков",
        role: "купил студию на старте карьеры",
        quote:
          "Не самая крупная сделка для агентства, но отнеслись серьёзно: разобрали ипотечные программы, нашли вариант с меньшей переплатой.",
        rating: 4,
      },
    ],
  });

  const adminEmail = "admin@kvartal.ru";
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: "Администратор",
      passwordHash: await bcrypt.hash("P1yaSapf2lc4", 10),
    },
  });

  console.log(`Готово: ${agents.length} агента(ов), ${properties.length} объектов.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
