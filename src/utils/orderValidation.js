const VALID_STATUSES = new Set([
  "pending",
  "confirmed",
  "preparing",
  "out_for_delivery",
  "delivered",
  "cancelled"
]);

const toNumber = value => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : NaN;
};

export const getOrderValidationErrors = order => {
  const reasons = [];

  if (!order || typeof order !== "object") {
    return ["Order is not a valid object"];
  }

  if (!order.orderID) reasons.push("Missing orderID");
  if (!order.customerName) reasons.push("Missing customerName");
  if (!order.restaurant) reasons.push("Missing restaurant");
  if (!order.status) reasons.push("Missing status");
  if (!order.deliveryTime) reasons.push("Missing deliveryTime");

  if (order.status && !VALID_STATUSES.has(String(order.status).toLowerCase())) {
    reasons.push(`Invalid status: ${order.status}`);
  }

  if (!Array.isArray(order.items) || order.items.length === 0) {
    reasons.push("items must be a non-empty array");
  }

  const itemsTotal = Array.isArray(order.items)
    ? order.items.reduce((sum, item, index) => {
        const quantity = toNumber(item?.quantity);
        const price = toNumber(item?.price);

        if (!item?.name) reasons.push(`Item ${index + 1} is missing name`);
        if (!Number.isFinite(quantity) || quantity <= 0) {
          reasons.push(`Item ${index + 1} has invalid quantity`);
        }
        if (!Number.isFinite(price) || price < 0) {
          reasons.push(`Item ${index + 1} has invalid price`);
        }

        if (!Number.isFinite(quantity) || !Number.isFinite(price)) return sum;
        return sum + quantity * price;
      }, 0)
    : NaN;

  const totalAmount = toNumber(order.totalAmount);
  if (!Number.isFinite(totalAmount)) {
    reasons.push("Invalid totalAmount");
  } else if (Number.isFinite(itemsTotal)) {
    const roundedDiff = Math.abs(itemsTotal - totalAmount);
    if (roundedDiff > 0.01) {
      reasons.push(
        `totalAmount mismatch: expected ${itemsTotal.toFixed(2)}, got ${totalAmount.toFixed(2)}`
      );
    }
  }

  if (order.rating !== undefined && order.rating !== null && order.rating !== "") {
    const rating = toNumber(order.rating);
    if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
      reasons.push("rating must be between 1 and 5");
    }
  }

  return reasons;
};

export const isValidOrder = order => getOrderValidationErrors(order).length === 0;

export const getInconsistentOrders = (orders = []) =>
  orders
    .map(order => ({
      order,
      reasons: getOrderValidationErrors(order)
    }))
    .filter(entry => entry.reasons.length > 0);
