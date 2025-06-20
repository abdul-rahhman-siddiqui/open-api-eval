import axios from "axios";
import { parseOAS } from "../services/oasService.js";
import { hitEndpoints } from "../services/executeService.js";
import Summary from "../models/Summary.js";

export const uploadOAS = async (req, res) => {
  try {
    let rawOas;
    if (req.file) {
      rawOas = req.file.buffer.toString();
    } else if (req.body.oasUrl) {
      const response = await axios.get(req.body.oasUrl);
      rawOas = JSON.stringify(response.data);
    } else {
      return res.status(400).json({ error: "No OAS provided" });
    }

    const { api, endpoints } = await parseOAS(Buffer.from(rawOas));
    const baseURL = req.body.baseURL || api.servers?.[0]?.url;

    const stats = await hitEndpoints(baseURL, endpoints);

    const summary = await Summary.create({
      specName: api.info.title,
      total: stats.total,
      successes: stats.success,
      failures: stats.failure,
      breakdown: stats.breakdown,
      swagger: rawOas
    });

    res.json({ summaryId: summary._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
