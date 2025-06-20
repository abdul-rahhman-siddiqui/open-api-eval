import SwaggerParser from "@apidevtools/swagger-parser";
export async function parseOAS(fileBuffer) {
  // SwaggerParser can handle raw JSON buffers
  const api = await SwaggerParser.parse(JSON.parse(fileBuffer.toString()));
  const getPost = {};
  Object.entries(api.paths).forEach(([path, methods]) => {
    Object.entries(methods).forEach(([method, meta]) => {
      if (["get", "post"].includes(method)) {
        getPost[`${path}::${method}`] = meta;
      }
    });
  });
  return { api, endpoints: getPost };
}
