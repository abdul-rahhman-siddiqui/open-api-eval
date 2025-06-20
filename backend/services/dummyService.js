import jsf from "json-schema-faker";
import { faker } from "@faker-js/faker";

jsf.extend("faker", () => faker);

export function makeDummy(schema) {
  if (!schema || typeof schema !== "object") return {};

  try {
    if (!schema.type && schema.properties) {
      schema.type = "object";
    }

    if (schema.type === "array" && schema.items) {
      return [jsf.generate(schema.items)];
    }

    return jsf.generate(schema);
  } catch (error) {
    console.warn("Failed to generate dummy data:", error.message);
    return {};
  }
}
