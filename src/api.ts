import axios from "axios";

const BASE_URL = ``;

const headers = {
  // accessToken: `${getCookie("accessToken")}`,
  // refreshToken: `${getCookie("refreshToken")}`,
};

export const campSTH = async () => {
  //get DATA
  const response = await axios
    .get(`${BASE_URL}/users/`, { headers })
    .catch((error) => console.log(error));

  return response;
  //response.data

  // axios.get(`${BASE_URL}/`).then((res) => console.log(res.data));
  // return await axios.get(`${BASE_URL}/coins`).then((res) => res.data);
};
