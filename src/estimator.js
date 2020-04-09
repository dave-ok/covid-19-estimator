class ImpactEstimator {
  constructor({
    region,
    periodType,
    timeToElapse,
    reportedCases,
    totalHospitalBeds
  },
  severityFactor) {
    Object.defineProperty(this, 'currentlyInfected', {
      get() {
        return reportedCases * severityFactor;
      },
      enumerable: true
    });

    Object.defineProperty(this, 'periodInDays', {
      get() {
        switch (periodType) {
          case 'weeks': {
            return timeToElapse * 7;
          }
          case 'months': {
            return timeToElapse * 30;
          }
          default: {
            return timeToElapse;
          }
        }
      },
      enumerable: false
    });

    Object.defineProperty(this, 'infectionsByRequestedTime', {
      get() {
        const powerFactor = Math.floor(this.periodInDays / 3);
        return this.currentlyInfected * 2 ** powerFactor;
      },
      enumerable: true
    });
    Object.defineProperty(this, 'severeCasesByRequestedTime', {
      get() {
        return parseInt(0.15 * this.infectionsByRequestedTime, 10);
      },
      enumerable: true
    });
    Object.defineProperty(this, 'hospitalBedsByRequestedTime', {
      get() {
        return parseInt(0.35 * totalHospitalBeds - this.severeCasesByRequestedTime, 10);
      },
      enumerable: true
    });
    Object.defineProperty(this, 'casesForICUByRequestedTime', {
      get() {
        return parseInt(0.05 * this.infectionsByRequestedTime, 10);
      },
      enumerable: true
    });
    Object.defineProperty(this, 'casesForVentilatorsByRequestedTime', {
      get() {
        return parseInt(0.02 * this.infectionsByRequestedTime, 10);
      },
      enumerable: true
    });
    Object.defineProperty(this, 'dollarsInFlight', {
      get() {
        return parseFloat((this.infectionsByRequestedTime * region.avgDailyIncomeInUSD
          * region.avgDailyIncomePopulation * this.periodInDays).toFixed(2));
      },
      enumerable: true
    });
  }
}
const covid19ImpactEstimator = (data) => (
  {
    data,
    impact: new ImpactEstimator(data, 10),
    severeImpact: new ImpactEstimator(data, 50)
  }
);

export default covid19ImpactEstimator;
