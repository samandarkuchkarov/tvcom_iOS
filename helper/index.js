import { getTime } from '../Api'

export const converter = sec => {
  var d = new Date(sec * 1000 + 5 * 60 * 1000 * 60);
  var time = d;
  let hour =
    `${time.getUTCHours()}`.length == 1
      ? `0${time.getUTCHours()}`
      : time.getUTCHours();
  let minute =
    `${time.getUTCMinutes()}`.length == 1
      ? `0${time.getUTCMinutes()}`
      : time.getUTCMinutes();
  return [`${hour}:${minute}`];
};
export const width = (begin, end, screenWidth) => {
  const currentTime = new Date().getTime() / 1000;
  const position = currentTime - begin;
  const timeProgram = end - begin;
  const width = (position * screenWidth) / timeProgram;
  if (width < screenWidth) {
    return width;
  } else {
    return screenWidth;
  }
};

export const convertToNormal = d => {
  d = Number(d);
  let h = Math.floor(d / 3600);
  let m = Math.floor((d % 3600) / 60);
  let s = Math.floor((d % 3600) % 60);

  
  let hDisplay = h < 10 ? `0${h}:` : `${h}`;
  let mDisplay = m < 10 ? `0${m}:` : `${m}:`
  let sDisplay = s < 10 ? `0${s}` : `${s}`

  // let hDisplay = h > 0 ? `${h}:` : '';
  // let mDisplay = m > 0 ? (`${m}`.length == 1 ? `0${m}:` : `${m}:`) : '';
  // let sDisplay = s > 0 ? (`${s}`.length == 1 ? `0${s}` : `${s}`) : '';
  return hDisplay + mDisplay + sDisplay;
};


export const navData = [
  {
    style: {
      width: 100,
    },
    name: 'Главная',
    activeCat: 1,
    route: 'Main',
  },
  {
    style: {
      width: 135,
    },
    name: 'Телеканалы',
    activeCat: 2,
    route: 'TvList',
  },
  {
    style: {
      width: 105,
    },
    name: 'Фильмы',
    activeCat: 3,
    route: 'Movies',
  },
  {
    style: {
      width: 105,
    },
    name: 'Сериалы',
    activeCat: 4,
    route: 'Serials',
  },
  {
    style: {
      width: 80,
    },
    name: 'Детям',
    activeCat: 5,
    route: 'Kids',
  },
  {
    style: {
      width: 60,
    },
    name: 'Шоу',
    activeCat: 6,
    route: 'Show',
  },
];
export const MainScreenParams = [
  // {limit: 15, season: 0, order: '-imdb_rating'},
  // {limit: 15, season: 0, order: '-kinopoisk_rating'},
  // {limit: 15, season: 1, order: '-imdb_rating'},
  // {limit: 15, season: 1, order: '-kinopoisk_rating'},
  // {limit: 15, genre: '10,104,105', order: '-imdb_rating'},
];
export const MainScreenParamsIfLogin = [
  {limit: 15, favorited_only: 1},
  {limit: 15, viewed_only: 1},
];
export const listCaruselNameIfLogin = [
  {name: 'Избранное', movies: [],id:'q'},
  {name: 'Просмотренное', movies: [],id:'w'},
];
export const listCaruselName = [
  {name: 'Избранное', movies: [], params: {},id:'a',rating:false},
  {name: 'Просмотренное', movies: [], params: {},id:'s',rating:false},
];

export const yearsList = [
  {check: 0, name: '2015-2020'},
  {check: 0, name: '2010-2015'},
  {check: 0, name: '2005-2010'},
  {check: 0, name: '2000-2005'},
  {check: 0, name: '1995-2000'},
  {check: 0, name: '1990-1995'},
  {check: 0, name: '1985-1990'},
  {check: 0, name: '1980-1985'},
  {check: 0, name: 'до 1985'},
]

export const countries = [
  'Узбекистан',
  'Южная Корея',
  'Россия',
  'Китай',
  'Япония',
  'Австралия',
  'Аргентина',
  'Великобритания',
  'Венгрия',
  'Германия',
  'Гонконг',
  'Дания',
  'Индия',
  'Испания',
  'Италия',
  'Канада',  
  'СССР',
  'США',
  'Украина',
  'Франция',
];


