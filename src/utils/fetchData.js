import axios from "axios";

function fetchData(url) {
  return axios.get(`http://localhost:4000${url}`).then(({data}) => data);
}

export default fetchData;
