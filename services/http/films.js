import axios from "axios";
import { $authHost, $host, $hostWithParams } from ".";
import { getUniqueListBy } from "../utils/data";
import { parseXML } from "../utils/parser";

export const getFilms = async (limit = 10, page = 1, filter = {}) => {
  const url = filter.genre
    ? "http://play.tvcom.uz:8008/api/genre/list"
    : localStorage.getItem("token")
    ? "/tvmiddleware/api/video/list/"
    : "/tvmiddleware/api/noauth/video/list/";

  const { data } = !filter.genre
    ? await $authHost(true).get(url, {
        params: {
          limit,
          page,
          ...filter,
        },
      })
    : await axios({
        method: "POST",
        url: `http://play.tvcom.uz:8008/api/genre/list`,
        data: {
          ...filter,
          token: localStorage.getItem("token"),
          limit,
          page,
        },
      });

  if (filter.genre) {
    const filmsTemp = data.data;
    let filtered = [];
    for (let i = 0; i < filmsTemp.length; i++) {
      if (Array.isArray(filmsTemp[i])) {
        filtered = [...filmsTemp[i], ...filtered];
      } else {
        filtered.push(filmsTemp[i]);
      }
    }
    filtered = getUniqueListBy(filtered, "id");

    return {
      videos: filtered,
    };
  }

  const result = parseXML(data);
  return {
    count: result.count ?? result.data[0].length,
    videos: result?.videos?.item ?? result.videos ?? result.data[0],
  };
};

export const getFilmDetailById = async (id, auth = false) => {
  const { data } = await $authHost(true).get(
    auth
      ? "/tvmiddleware/api/video/detail/"
      : "/tvmiddleware/api/noauth/video/detail/",
    {
      params: {
        vid: id,
      },
    }
  );

  return data;
};

export const getFilmById = async (id) => {
  const { data } = await $authHost().get("/tvmiddleware/api/video/url/", {
    params: {
      vid: id,
      redirect: 0,
      device: "android_stb",
    },
  });

  return parseXML(data);
};

export const getFilmByVfid = async (id) => {
  // GET episode url
  const { data } = await $authHost().get("/tvmiddleware/api/video/url/", {
    params: {
      vfid: id,
      redirect: 0,
      device: "android_stb",
    },
  });

  return parseXML(data);
};

export const getCinema = async () => {
  const { data } = await axios.post(
    "http://play.tvcom.uz:8008/api/cinema?pass=@j9@LKLKK29782LLL)"
  );
  return data;
};
