import type { IAlbum } from '@/models/IAlbum';

export const albums: IAlbum[] = [
  {
    id: 1,
    title: 'Sadness',
    author: 'IlyaB',
    releaseYear: 2023,
    cover: '../src/assets/images/covers/cover1.jpg',
    songs: [
      {
        id: 1,
        title: 'Sadness',
        author: 'IlyaB',
        url: '../src/audio/ilyab-sadness.mp3',
        cover: '../src/assets/images/covers/cover1.jpg',
        duration: '4:12',
      },
      {
        id: 2,
        title: 'Rain',
        author: 'IlyaB',
        url: '../src/audio/ilyab-rain.mp3',
        cover: '../src/assets/images/covers/cover1.jpg',
        duration: '3:36',
      },
      {
        id: 3,
        title: 'March',
        author: 'IlyaB',
        url: '../src/audio/ilyab-march.mp3',
        cover: '../src/assets/images/covers/cover1.jpg',
        duration: '3:08',
      },
      {
        id: 4,
        title: 'April',
        author: 'IlyaB',
        url: '../src/audio/ilyab-april.mp3',
        cover: '../src/assets/images/covers/cover1.jpg',
        duration: '4:22',
      },
      {
        id: 5,
        title: 'Until Post-Punk Tears Us Apart',
        author: 'IlyaB',
        url: '../src/audio/ilyab-until_post-punk_tears_us_apart.mp3',
        cover: '../src/assets/images/covers/cover1.jpg',
        duration: '2:07',
      },
      {
        id: 6,
        title: 'Dawn',
        author: 'IlyaB',
        url: '../src/audio/ilyab-dawn.mp3',
        cover: '../src/assets/images/covers/cover1.jpg',
        duration: '2:36',
      },
      {
        id: 7,
        title: 'Panic Attack',
        author: 'IlyaB',
        url: '../src/audio/ilyab-panic_attack.mp3',
        cover: '../src/assets/images/covers/cover1.jpg',
        duration: '1:32',
      },
      {
        id: 8,
        title: 'Tears of Autumn',
        author: 'IlyaB',
        url: '../src/audio/ilyab-tears_of_autumn.mp3',
        cover: '../src/assets/images/covers/cover1.jpg',
        duration: '2:20',
      },
      {
        id: 9,
        title: 'Mountains',
        author: 'IlyaB',
        url: '../src/audio/ilyab-mountains.mp3',
        cover: '../src/assets/images/covers/cover1.jpg',
        duration: '1:27',
      },
      {
        id: 10,
        title: 'Good Bye',
        author: 'IlyaB',
        url: '../src/audio/ilyab-good_bye.mp3',
        cover: '../src/assets/images/covers/cover1.jpg',
        duration: '1:52',
      },
    ],
    description:
      'Альбом Sadness, выпущенный в 2023 году. Первая его часть по своей атмосфере напоминает зимнее время в России, которое особенно отличается своей меланхоличностью и депересивностью. Вторая же его часть даёт надежду, что в этой жизни ещё не всё так плохо, когда приходит весна. Оживает природа, оживают и мертвые, тоскливые, унылые зимние души.',
  },
  {
    id: 2,
    title: 'Sadness 2',
    author: 'IlyaB',
    releaseYear: 2023,
    cover: '../src/assets/images/covers/cover2.jpg',
    songs: [],
    description: 'Sadness 2 - альбом, который был выпущен в 2024 году. Песни, состоящие в нем, несут в себе макисмальное спокойствие. Слушая их можно вспомнить старые моменты из дества.',
  },
];
