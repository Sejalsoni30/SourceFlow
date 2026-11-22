/**
 * Validation utilities for SourceFlow procurement orders and optimizer parameters.
 */

/**
 * Validates the order parameters and priority weights for the Pareto Optimizer.
 * @param {Object} params
 * @param {number|string} params.quantity - Total batch units requested
 * @param {number|string} params.deadlineDays - Maximum allowed transit/fulfillment days
 * @param {Object} params.weights - Object containing numeric priorities (price, delivery, quality, reliability, risk)
 * @returns {{ isValid: boolean, errors: Record<string, string> }}
 */
export function validateOptimizationInput({ quantity, deadlineDays, weights }) {
  const errors = {};

  // Validate Quantity
  if (quantity === '' || quantity === null || quantity === undefined) {
    errors.quantity = 'Order quantity is required.';
  } else {
    const numQty = Number(quantity);
    if (isNaN(numQty)) {
      errors.quantity = 'Order quantity must be a valid number.';
    } else if (!Number.isFinite(numQty)) {
      errors.quantity = 'Order quantity must be finite.';
    } else if (numQty < 1) {
      errors.quantity = 'Order quantity must be at least 1 unit.';
    } else if (numQty > 1000000) {
      errors.quantity = 'Order quantity cannot exceed 1,000,000 units per PO batch.';
    }
  }

  // Validate Delivery Deadline
  if (deadlineDays === '' || deadlineDays === null || deadlineDays === undefined) {
    errors.deadlineDays = 'Target deadline is required.';
  } else {
    const numDays = Number(deadlineDays);
    if (isNaN(numDays)) {
      errors.deadlineDays = 'Target deadline must be a valid number.';
    } else if (!Number.isFinite(numDays)) {
      errors.deadlineDays = 'Target deadline must be finite.';
    } else if (numDays < 1) {
      errors.deadlineDays = 'Target deadline must be at least 1 day.';
    } else if (numDays > 365) {
      errors.deadlineDays = 'Target deadline cannot exceed 365 days.';
    }
  }

  // Validate Trade-off Weights
  const weightValues = Object.values(weights || {}).map(v => Number(v) || 0);
  const totalWeight = weightValues.reduce((sum, w) => sum + Math.max(0, w), 0);
  if (totalWeight <= 0) {
    errors.weights = 'At least one trade-off priority weight must be greater than 0%.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Computes safe, normalized weights ensuring sum > 0 to prevent division by zero in scoring solvers.
 * @param {Object} weights
 * @returns {Object}
 */
export function normalizeWeights(weights = {}) {
  const safeWeights = {
    price: Math.max(0, Number(weights?.price) || 0),
    delivery: Math.max(0, Number(weights?.delivery) || 0),
    quality: Math.max(0, Number(weights?.quality) || 0),
    reliability: Math.max(0, Number(weights?.reliability) || 0),
    risk: Math.max(0, Number(weights?.risk) || 0),
  };

  const total = Object.values(safeWeights).reduce((a, b) => a + b, 0);
  if (total === 0) {
    return { price: 40, delivery: 25, quality: 15, reliability: 10, risk: 10, total: 100 };
  }

  return { ...safeWeights, total };
}
