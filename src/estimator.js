class ImpactEstimator {
  constructor({
    region,
    periodType,
    timeToElapse,
    reportedCases,
    population,
    totalHospitalBeds
  },
  severityFactor) {
    this.region = region;
    this.periodType = periodType;
    this.timeToElapse = timeToElapse;
    this.reportedCases = reportedCases;
    this.population = population;
    this.totalHospitalBeds = totalHospitalBeds;
    this.severityFactor = severityFactor;
  }

  periodInDays() {
    switch (this.periodType) {
      case 'weeks': {
        return this.timeToElapse * 7;
      }
      case 'months': {
        return this.timeToElapse * 30;
      }
      default: {
        return this.timeToElapse;
      }
    }
  }

  get currentlyInfected() {
    return this.reportedCases * this.severityFactor;
  }

  get infectionsByRequestedTime() {
    const powerFactor = Math.floor(this.periodInDays / 3);
    return this.currentlyInfected * 2 ** powerFactor;
  }

  getEstimate() {
    return {
      infectionsByRequestedTime: this.infectionsByRequestedTime
    };
  }
}
const covid19ImpactEstimator = (data) => {
  const impactObj = new ImpactEstimator(data, 10);
  const severeImpactObj = new ImpactEstimator(data, 50);
  return {
    data,
    impact: impactObj.getEstimate(),
    severeImpact: severeImpactObj.getEstimate()
  };
};


export default covid19ImpactEstimator;
