import { $authHost } from ".";
import { parseXML } from "../utils/parser";

export const getEpisodes = (season_id) => {
  const { data } = $authHost().get("/tvmiddleware/api/video/episode/list/", {
    params: {
      season_id,
    },
  });
  return data;
};

export const getEpisodeDetail = (episode_id) => {
  const { data } = $authHost().get("/tvmiddleware/api/video/episode/detail/", {
    params: { episode_id },
  });
  return parseXML(data);
};
