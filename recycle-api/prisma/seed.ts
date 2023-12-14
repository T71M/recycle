import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  await prisma.material.createMany({
    data: [
      {
        name: 'Медь',
        id: 1,
        color: 'orange',
        icon: 'mingcute:copper-coin-line',
      },
      { name: 'Бронза', id: 2, icon: 'ph:medal-fill' },
      { name: 'Латунь', id: 3, icon: 'mingcute:bowl-line' },
      { name: 'Алюминий', id: 4, icon: 'ant-design:gold-filled' },
      { name: 'Свинец', id: 5, icon: 'ant-design:gold-filled' },
      { name: 'Олово', id: 6, icon: 'lets-icons:ring-fill' },
      { name: 'Никель', id: 7, icon: 'ant-design:gold-filled' },
      { name: 'Нихром', id: 8, icon: 'ant-design:gold-filled' },
      { name: 'Мельхиор', id: 9, icon: 'ant-design:gold-filled' },
      { name: 'Нержавейка', id: 10, icon: 'ant-design:gold-filled' },
      { name: 'Лом Стали', id: 11, icon: 'ant-design:gold-filled' },
      { name: 'Черный Металл', id: 12, icon: 'ant-design:gold-filled' },
      { name: 'Резина', id: 13, icon: 'cil:scrubber' },
      { name: 'Макулатура/ Бумага', id: 14, icon: 'wpf:cut-paper' },
      { name: 'Аккумуляторы', id: 15, icon: 'game-icons:batteries' },
      { name: 'Батарейки', id: 16, icon: 'clarity:battery-line' },
      { name: 'Пластмасса', id: 17, icon: 'guidance:plastic' },
    ],
  });
  const password = await bcrypt.hash('admin', 10);
  await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@mail.com',
      password: password,
    },
  });
  await prisma.city.createMany({
    data: [
      {
        id: 7,
        name: 'Казань',
        north_lat: 55.603477,
        north_long: 48.820583,
        east_lat: 55.938221,
        east_long: 49.381248,
        center_lat: 55.7908,
        center_long: 49.1145,
      },
      {
        id: 8,
        name: 'Москва',
        north_lat: 55.142174,
        north_long: 36.803101,
        east_lat: 56.021225,
        east_long: 37.967426,
        center_lat: 55.751244,
        center_long: 37.618423,
      },
      {
        id: 9,
        name: 'Санкт-Петербург',
        north_lat: 59.633781,
        north_long: 29.42981,
        east_lat: 30.759493,
        east_long: 60.244835,
        center_lat: 59.93863,
        center_long: 30.31413,
      },
      {
        id: 10,
        name: 'Нижний Новгород',
        north_lat: 56.187653,
        north_long: 43.727047,
        east_lat: 56.401981,
        east_long: 44.111958,
        center_lat: 56.3287,
        center_long: 44.002,
      },
      {
        id: 11,
        name: 'Челябинск',
        north_lat: 54.990932,
        north_long: 61.143642,
        east_lat: 55.320812,
        east_long: 61.591557,
        center_lat: 55.16,
        center_long: 61.4,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
