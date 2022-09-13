import axios from "axios";
import { $host } from ".";

export const getUserInfo = async (token) => {
  const { data } = await axios({
    method: "POST",
    url: `http://play.tvcom.uz/api/auth/customer/info`,
    data: {
      token: token,
    },
  });

  return data.message;
};
