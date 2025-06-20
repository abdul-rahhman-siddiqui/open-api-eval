import axios from "axios";
import { makeDummy } from "./dummyService.js";
import Log from "../models/Log.js";

export async function hitEndpoints(baseURL, endpoints) {
  const stats = { total: 0, success: 0, failure: 0, breakdown: {} };

  await Promise.all(
    Object.entries(endpoints).map(async ([key, meta]) => {
      const [path, method] = key.split("::");
      const url = `${baseURL}${path}`;
      const payload =
        method === "post" ? makeDummy(meta.requestBody?.content?.["application/json"]?.schema) : null;

      try {
        const res = await axios({
          url,
          method,
          data: payload,
          timeout: 8000,
        });

        await Log.create({
          path,
          method,
          status: res.status,
          success: res.status >= 200 && res.status < 300,
          requestBody: payload,
          responseBody: res.data,
        });
        stats.success++;
      } catch (err) {
        await Log.create({
          path,
          method,
          status: err.response?.status || 0,
          success: false,
          requestBody: payload,
          error: err.message,
        });
        stats.failure++;
      }

      stats.total++;
      stats.breakdown[`${path} ${method.toUpperCase()}`] =
        (stats.breakdown[`${path} ${method.toUpperCase()}`] || 0) + 1;
    })
  );
  return stats;
}
