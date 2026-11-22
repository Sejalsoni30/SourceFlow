// Clean API layer for SourceFlow frontend
// Designed to seamlessly swap with Node/Express + MongoDB + FastAPI optimizer backend later

import {
  MOCK_SUPPLIERS,
  MOCK_PRODUCTS,
  MOCK_RECENT_ORDERS,
  MOCK_RISK_ALERTS,
  MOCK_HISTORICAL_SPEND
} from '../data/mockData';
import { normalizeWeights } from '../utils/validation';

// Simulated realistic network latency helper
const sleep = (ms = 400) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // --- SUPPLIERS ---
  async getSuppliers(query = {}) {
    await sleep(250);
    let list = [...MOCK_SUPPLIERS];
    if (query.category && query.category !== 'All') {
      list = list.filter(s => s.category.toLowerCase() === query.category.toLowerCase());
    }
    if (query.search) {
      const q = query.search.toLowerCase();
      list = list.filter(s => 
        s.name.toLowerCase().includes(q) ||
        s.city.toLowerCase().includes(q) ||
        s.country.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
      );
    }
    if (query.riskLevel && query.riskLevel !== 'All') {
      list = list.filter(s => s.riskLevel === query.riskLevel.toLowerCase());
    }
    if (query.sortBy) {
      if (query.sortBy === 'score') list.sort((a, b) => b.overallScore - a.overallScore);
      if (query.sortBy === 'price') list.sort((a, b) => b.priceScore - a.priceScore);
      if (query.sortBy === 'speed') list.sort((a, b) => b.speedScore - a.speedScore);
      if (query.sortBy === 'reliability') list.sort((a, b) => b.reliabilityScore - a.reliabilityScore);
    }
    return list;
  },

  async getSupplierById(id) {
    await sleep(150);
    return MOCK_SUPPLIERS.find(s => s.id === id) || null;
  },

  // --- PRODUCTS ---
  async getProducts() {
    await sleep(150);
    return [...MOCK_PRODUCTS];
  },

  // --- ORDERS ---
  async getOrders() {
    await sleep(200);
    return [...MOCK_RECENT_ORDERS];
  },

  async createOrder(orderPayload) {
    await sleep(400);
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Production',
      ...orderPayload,
    };
    return newOrder;
  },

  // --- RISK ALERTS ---
  async getRiskAlerts() {
    await sleep(200);
    return [...MOCK_RISK_ALERTS];
  },

  // --- SPEND & HISTORICAL METRICS ---
  async getSpendMetrics() {
    await sleep(200);
    return {
      history: MOCK_HISTORICAL_SPEND,
      kpis: {
        totalSavingsYTD: 284500,
        avgCostReductionPercent: 23.4,
        activeSuppliersCount: 18,
        ordersInProgressCount: 7,
        highRiskAlertsCount: 2,
        onTimeDeliveryRate: 98.4,
      }
    };
  },

  // --- AI MULTI-SUPPLIER OPTIMIZER (FastAPI emulator) ---
  async optimizeOrder({
    productId,
    units = 2500,
    deadlineDays = 10,
    weights = {
      price: 40,
      delivery: 25,
      quality: 15,
      reliability: 10,
      risk: 10,
    },
    splitCount = 2,
  }) {
    // Simulate real AI optimization calculation delay
    await sleep(800);

    const product = MOCK_PRODUCTS.find(p => p.id === productId) || MOCK_PRODUCTS[0];
    const candidateSuppliers = MOCK_SUPPLIERS.filter(s => 
      product.eligibleSupplierIds.includes(s.id)
    );

    const safeWeights = normalizeWeights(weights);
    const safeUnits = Math.max(1, Number(units) || 100);

    // Compute dynamic fit score based on client-configured weights
    const scoredCandidates = candidateSuppliers.map(s => {
      const normScore = (
        (s.priceScore * safeWeights.price) +
        (s.speedScore * safeWeights.delivery) +
        (s.qualityScore * safeWeights.quality) +
        (s.reliabilityScore * safeWeights.reliability) +
        (s.riskScore * safeWeights.risk)
      ) / safeWeights.total;

      return {
        ...s,
        calculatedFitScore: Math.round(normScore),
      };
    });

    // Sort candidates by custom fit score
    scoredCandidates.sort((a, b) => b.calculatedFitScore - a.calculatedFitScore);

    const primary = scoredCandidates[0] || MOCK_SUPPLIERS[1];
    const secondary = scoredCandidates[1] || MOCK_SUPPLIERS[0];

    // Compute optimal split ratio
    // If delivery is paramount or risk is heavily weighted, split tilts to lower risk / faster
    let primaryRatio = 0.62;
    if (safeWeights.risk > 30) primaryRatio = 0.52; // more balanced to minimize single-vendor exposure
    if (safeWeights.price > 50) primaryRatio = 0.72; // tilt towards cheapest

    const secondaryRatio = 1 - primaryRatio;

    const primaryUnits = Math.round(safeUnits * primaryRatio);
    const secondaryUnits = safeUnits - primaryUnits;

    const primaryUnitPrice = product.baseUnitPrice * primary.unitPriceMultiplier;
    const secondaryUnitPrice = product.baseUnitPrice * secondary.unitPriceMultiplier;

    const primaryCost = Math.round(primaryUnits * primaryUnitPrice);
    const secondaryCost = Math.round(secondaryUnits * secondaryUnitPrice);
    const totalOptimizedCost = primaryCost + secondaryCost;

    // Single supplier worst/baseline cost (if 100% went to expensive/standard supplier)
    const singleSupplierBaselineCost = Math.round(safeUnits * (product.baseUnitPrice * 1.14));
    const savingsAmount = singleSupplierBaselineCost - totalOptimizedCost;
    const savingsPercent = Number(((savingsAmount / singleSupplierBaselineCost) * 100).toFixed(1));

    // Plain-language Explainable AI breakdown
    const aiExplanation = {
      headline: `Optimal ${Math.round(primaryRatio * 100)} / ${Math.round(secondaryRatio * 100)} allocation selected between ${primary.name} and ${secondary.name}.`,
      summary: `By routing ${primaryUnits.toLocaleString()} units (${Math.round(primaryRatio * 100)}%) to ${primary.name}, you capture maximum volume savings at $${primaryUnitPrice.toFixed(2)}/unit. Allocating the remaining ${secondaryUnits.toLocaleString()} units to ${secondary.name} guarantees safety stock delivery in ${secondary.deliveryDays} days, effectively insuring your order against single-point supply chain bottlenecks.`,
      keyDrivers: [
        {
          title: 'Cost Arbitrage Captured',
          desc: `Saved $${savingsAmount.toLocaleString()} (${savingsPercent}%) compared to quoting entirely through standard single-vendor channel.`,
          icon: 'TrendingDown',
        },
        {
          title: 'Lead Time Buffer',
          desc: `${secondary.name} delivers within ${secondary.deliveryDays} business days, ensuring 38% buffer inventory reaches assembly before peak demand.`,
          icon: 'Clock',
        },
        {
          title: 'Risk De-Risking',
          desc: `Eliminated 100% single-factory shutdown vulnerability; reduced overall portfolio disruption probability from 14.8% to 1.9%.`,
          icon: 'ShieldCheck',
        },
      ],
      tradeoffs: `Opting for 100% allocation to ${primary.name} would have saved an additional $2,400, but would increase shipment delay vulnerability by 3.4x due to regional port congestion.`,
    };

    return {
      product,
      totalUnits: units,
      targetDeadlineDays: deadlineDays,
      totalCost: totalOptimizedCost,
      baselineCost: singleSupplierBaselineCost,
      savings: savingsAmount,
      savingsPercent,
      blendedLeadTimeDays: Math.min(primary.deliveryDays, secondary.deliveryDays),
      riskScore: Math.round((primary.riskScore * primaryRatio) + (secondary.riskScore * secondaryRatio)),
      split: [
        {
          supplierId: primary.id,
          name: primary.name,
          country: primary.country,
          sharePercent: Math.round(primaryRatio * 100),
          units: primaryUnits,
          unitPrice: primaryUnitPrice,
          totalSpend: primaryCost,
          deliveryDays: primary.deliveryDays,
          color: '#00E5A0',
          role: 'Primary Volume Driver',
        },
        {
          supplierId: secondary.id,
          name: secondary.name,
          country: secondary.country,
          sharePercent: Math.round(secondaryRatio * 100),
          units: secondaryUnits,
          unitPrice: secondaryUnitPrice,
          totalSpend: secondaryCost,
          deliveryDays: secondary.deliveryDays,
          color: '#22D3EE',
          role: 'Buffer & Fast-Fulfillment',
        },
      ],
      aiExplanation,
    };
  },

  // --- WHAT-IF SIMULATOR ENGINE ---
  async runSimulation({ scenarioType, intensity = 50 }) {
    await sleep(500);

    // Baseline unoptimized single supplier impact vs SourceFlow multi-supplier impact
    const scenarios = {
      force_majeure: {
        title: 'Primary Supplier Factory Shutdown',
        scenarioDesc: 'Primary supplier encounters sudden fire / equipment outage halting 100% of production.',
        singleSupplierOutcome: {
          delayDays: 28,
          costImpact: 45000,
          ordersLost: 100,
          riskRating: 94,
          narrative: 'Complete standstill. Customer cancelations, lost revenue, emergency airfreight premiums.',
        },
        sourceFlowOutcome: {
          delayDays: 3,
          costImpact: 4800,
          ordersLost: 0,
          riskRating: 24,
          narrative: 'Secondary supplier Novatech automatically absorbes 75% overflow. Production uninterrupted.',
        },
        recommendedMitigation: 'Activate Tier-1 backup contract at locked rate; reroute raw material allocation in 2 clicks.',
      },
      price_spike: {
        title: 'Raw Material & Freight Surcharge (+25%)',
        scenarioDesc: 'Global shipping lane disruptions cause abrupt 25% price increase at overseas ports.',
        singleSupplierOutcome: {
          delayDays: 4,
          costImpact: 32400,
          ordersLost: 0,
          riskRating: 78,
          narrative: 'Forced to absorb 100% price hike with zero leverage or alternatives.',
        },
        sourceFlowOutcome: {
          delayDays: 1,
          costImpact: 6200,
          ordersLost: 0,
          riskRating: 18,
          narrative: 'SourceFlow instantly shifts 60% allocation to domestic casting partner Vanguard Heavy.',
        },
        recommendedMitigation: 'Shift split from 60/40 overseas to 30/70 domestic until container rates stabilize.',
      },
      volume_surge: {
        title: 'Black Friday 2x Demand Surge (+100% Units)',
        scenarioDesc: 'Marketing viral campaign spikes order requirements from 2,500 units to 5,000 units in 48 hours.',
        singleSupplierOutcome: {
          delayDays: 21,
          costImpact: 19800,
          ordersLost: 35,
          riskRating: 82,
          narrative: 'Single factory hits capacity ceiling (45k/mo); forced to reject customer wholesale inquiries.',
        },
        sourceFlowOutcome: {
          delayDays: 2,
          costImpact: -4500, // volume discount!
          ordersLost: 0,
          riskRating: 12,
          narrative: 'Order dynamically tri-split across 3 certified vendors, capturing higher tier volume discount!',
        },
        recommendedMitigation: 'Split 45% Novatech / 35% Apex / 20% EcoPack to utilize pooled idle capacity.',
      },
      port_strike: {
        title: 'West Coast / Yantian Port Congestion',
        scenarioDesc: 'Dockworkers contract negotiation causes 14-day backlog on Pacific shipping routes.',
        singleSupplierOutcome: {
          delayDays: 16,
          costImpact: 24000,
          ordersLost: 20,
          riskRating: 88,
          narrative: 'All container shipments trapped on ocean anchorage; assembly line stalled.',
        },
        sourceFlowOutcome: {
          delayDays: 2,
          costImpact: 3100,
          ordersLost: 0,
          riskRating: 16,
          narrative: 'European and domestic suppliers automatically fulfill urgent retail customer batches.',
        },
        recommendedMitigation: 'Re-route upcoming sea containers through Vancouver and fulfill urgency via domestic air-express.',
      }
    };

    return scenarios[scenarioType] || scenarios.force_majeure;
  }
};
