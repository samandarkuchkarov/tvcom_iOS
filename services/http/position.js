import { $authHost } from ".";
import { parseXML } from "../utils/parser";

export const setVideoPosition = async ({
  content_type = "video",
  content_id,
  position,
  asset_id = null,
}) => {
  const { data } = await $authHost().get(
    "/tvmiddleware/api/content/position/set/",
    {
      params: {
        device: "android_stb",
        content_type,
        content_id,
        position,
        asset_id,
      },
    }
  );
  return parseXML(data);
};

export const deleteVideoPosition = async ({
  content_type = "video",
  content_id,
  position,
  asset_id = null,
}) => {
  const { data } = await $authHost().get(
    "/tvmiddleware/api/content/position/delete/",
    {
      params: {
        device: "android_stb",
        content_type,
        content_id,
        position,
        asset_id,
      },
    }
  );
  return parseXML(data);
};
