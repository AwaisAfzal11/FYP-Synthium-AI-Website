// import axios from 'axios';
// import { backend_api_base_url } from "./constants";

// export function checkAuthentication(accessToken, navigate) {
//   return new Promise((resolve, reject) => {
//     if (!accessToken) {
//       reject();
//     } else {
//       axios.get(backend_api_base_url+'/user', {
//         headers: {
//           'Authorization': `Bearer ${accessToken}`,
//           'Content-Type': 'application/json',
//         },
//       })
//       .then(() => {
//         resolve();
//       })
//       .catch(() => {
//         reject();
//       });
//     }
//   });
// }

