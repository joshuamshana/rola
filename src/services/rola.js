async function validateData(data) {
  if (data === undefined) {
    throw { message: "data required" };
  }
  if (typeof data === "function") {
    throw { message: "data required" };
  }
  if (!JSON.stringify(data).startsWith("{")) {
    throw { message: "data required" };
  }
  if (typeof data.divider !== "number") {
    throw { message: "divider must be number" };
  }
  if (!Array.isArray(data.items)) {
    throw { message: "items required" };
  }
  data.items.forEach((element) => {
    if (typeof element.name !== "string") {
      throw { message: "name must be string in items element" };
    }
    if (typeof element.quantity !== "number") {
      throw { message: "quantity must be number in items element" };
    }
  });
}

/**
 *
 * @param {{
 *   divider: number,
 *   items: Array<{
 *    name: string,
 *    quantity: number
 * }>
 * }} data
 */
export async function calu(data) {
  await validateData(data);
  return data.items.map((x) => {
    return {
      name: x.name,
      value: x.quantity / data.divider
    };
  });
}
