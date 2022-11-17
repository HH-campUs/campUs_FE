import axios from "axios";

const BASE_URL = ``;

//react-cookie
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
};

export const postApi = axios.create({
  //baseUrl,
  headers: {
    //Autorization: mytoken,
    "Content-Type": "multipart/form-data",
    "Cache-Control": "no-cache",
    withCredentails: true,
  },
});

// export default instance;

// //토큰 만료시 인터셉터

// instance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     if (error.response.status === 401) {
//       try {
//         const { data } = await instance.get(`/validate`);
//         if (data.data.validate === 1) {
//           // window.location.href = '/login'
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   }
// );
