export const countriesList = [
  { name: "Австралия" },
  { name: "Аргентина" },
  { name: "Великобритания" },
  { name: "Венгрия" },
  { name: "Германия" },
  { name: "Гонконг" },
  { name: "Дания" },
  { name: "Индия" },
  { name: "Испания" },
  { name: "Италия" },
  { name: "Канада" },
  { name: "Китай" },
  { name: "Россия" },
  { name: "СССР" },
  { name: "США" },
  { name: "Украина" },
  { name: "Франция" },
  { name: "Швеция" },
  { name: "Южная Корея" },
  { name: "Япония" },
];

export const yearsList = () => {
  const currentYear = new Date().getFullYear();
  let years = [];
  for (let i = currentYear; i > currentYear - 20; i--) {
    years.push({ name: i });
  }

  return years;
};

export const sortList = [
  { name: "По дате премьеры", params: { order: "-premiere_date" } },
  {
    name: "По рейтингу абонентов",
    params: { order: "-average_customers_rating" },
  },
  { name: "По рейтингу Кинопоиска", params: { order: "-kinopoisk_rating" } },
  { name: "По рейтингу IMDB", params: { order: "-imdb_rating" } },
];

export const getStorageUrl = (url) => {
  return "http://play.tvcom.uz:8008/storage/" + url;
};

export const checkSubscribesVideo = (data, cinema, subTariffs) => {
  const subVideos = data.videos.map((video) => {
    let hasSub = video.video_provider_id;
    if (hasSub && hasSub !== "None" && hasSub != 3) {
      const modified = cinema.filter(
        (c) =>
          subTariffs &&
          subTariffs.find((tariff) => tariff.tariff_id == c.provider)
      );
      hasSub = modified.find((bought) => bought.provider_id == hasSub) ? 1 : 0;
    } else hasSub = 1;

    return {
      ...video,
      has_subscription: hasSub,
    };
  });
  return subVideos;
};

export function getUniqueListBy(arr, key) {
  return [...new Map(arr.map(item => [item[key], item])).values()]
}