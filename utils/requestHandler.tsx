import axios from "axios";

export default function requestHandler(
  method: "GET" | "POST" | "PATCH" | "DELETE",
  endpoint: string,
  data?: Object,
  token?: string
) {
  const URL = endpoint;
  //process.env.NEXT_PUBLIC_BASE_URL + endpoint;
  const headers = token ? { Authorization: `Bearer ${token}` } : ("" as any);

  if (method === "GET") {
    return axios.get(URL, { headers });
  } else if (method === "POST") {
    return axios.post(URL, data, { headers });
  } else if (method === "PATCH") {
    return axios.patch(URL, data, { headers });
  } else if (method === "DELETE") {
    return axios.delete(URL, { headers });
  }

  return {} as any;
}
