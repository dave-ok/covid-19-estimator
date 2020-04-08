const covid19ImpactEstimator = (data) => {
  const impactObj = new ImpactEstimator(data, 10);
  const severeImpactObj = new ImpactEstimator(data, 50);
  return {
    data,
    impact: impactObj.getEstimate(),
    severeImpact: severeImpactObj.getEstimate()
  }
}

class ImpactEstimator {
  constructor({
    region, 
    periodType, 
    timeToElapse, 
    reportedCases, 
    population, 
    totalHospitalBeds},
    severityFactor){
    this.region = region;
    this.periodType = periodType;
    this.timeToElapse = timeToElapse;
    this.reportedCases = reportedCases;
    this.population = population;
    this.totalHospitalBeds = totalHospitalBeds;
    this.severityFactor = severityFactor;
  }    

  getEstimate() {
    return {
      
    }

  }
}

export default covid19ImpactEstimator;

