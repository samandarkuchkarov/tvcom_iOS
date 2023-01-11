import axios from "axios";
import { $host } from ".";

export const getGenres = async () => {
  const { data } = await axios.post(
    "http://play.tvcom.uz:8008/apis/genres?pass=@j9@LKLKK29782LLL)"
  );
  return data;
};
