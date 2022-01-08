/**
 * Helper functions may be used to process and clean up the data
 * refer to usgs-query-example.json for structure of an USGS response json
 */
module.exports = {
  /**
   * @param {data} object of the values to extract
   * @returns {array} array of objects of desired values
   * For v1, only gage height and water temp will be returned
   * Not every site has measurements on gage height and water temp, the sites that have only one measurement type will return null for the other measurement type
   */
  extractWaterValues: async (data) => {
    try {

      let processedData = [];
    for (let i = 0; i < data.value.timeSeries.length; i++) {
      //if the site is a new site, push into array of vals, and set the other measurement value as null
      //if the site shows up again, the other measurement type will be set to the correct type
      //if the site doesn't measure that type, it will stay null
      dataPoint = data.value.timeSeries[i];
      if (!(processedData.hasOwnProperty(
        dataPoint.sourceInfo.siteName)))
        {
          if (dataPoint.variable.variableCode[0].value==00065){
            //take the most recent value (for now)
            //because there are varying amounts of objects in the values array for each location
            gageHeight = dataPoint.values[0].value[0].value;
            gageHeightTime = dataPoint.values[0].value[0].dateTime;
            waterTemp = null;
            waterTempTime = null;
          }
          else {
            //since we only query for gageHeight and waterTemp(for now)
            waterTemp = dataPoint.values[0].value[0].value;
            waterTempTime = dataPoint.values[0].value[0].dateTime;
            gageHeight = null;
            gageHeightTime = null;
          }
        }
      else 
        {
          //else we already have values for this site
          //check which values we already have
          //if gageHeight is null, that means there are existing values for waterTemp and vice-versa
          if (processedData[dataPoint.sourceInfo.siteName].gageHeight===null){
            gageHeight = dataPoint.values[0].value[0].value;
            gageHeightTime = dataPoint.values[0].value[0].dateTime;
            waterTemp = processedData[dataPoint.sourceInfo.siteName].waterTemp;
            waterTempTime = processedData[dataPoint.sourceInfo.siteName].waterTempTime;
          }
          else {
            waterTemp = dataPoint.values[0].value[0].value;
            waterTempTime = dataPoint.values[0].value[0].dateTime;
            gageHeight = processedData[dataPoint.sourceInfo.siteName].gageHeight;
            gageHeightTime = processedData[dataPoint.sourceInfo.siteName].gageHeightTime;
          }
        }
        siteName = dataPoint.sourceInfo.siteName;
        processedData.push({siteName, gageHeight, gageHeightTime, waterTemp, waterTempTime});  
    }
    return processedData;

    } catch (error) {
      console.log("error occured inside data processing service:", error);
      return {error};
    }
  }
}