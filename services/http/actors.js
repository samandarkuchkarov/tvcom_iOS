import { $authHost } from ".";

export const getActorsByVideo = async (vid) => {
  const { data } = await $authHost(true).get(
    "/tvmiddleware/api/noauth/actor/list/",
    {
      params: {
        vid,
      },
    }
  );

  return data;
};
