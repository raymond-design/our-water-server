const axios = require('axios');
const service = require('./usgs-services.js');

module.exports = {
  /**
   * @param {req, res} site param - the specific USGS measurement site
   * @returns {object} an object of values {}
   * will return more than huc since site is data in only one location
   */
  site: async (req,res) => {
    try {
      res.json({"site": "random site"})
    } catch (error) {
      res.status(500).json({error});
    }
  },

  /**
   * @param {req, res} county param - US county code
   * @returns {object} an object of values {}
   * will return more than huc since county is data in only one location
   */
  county: async (req, res) => {
    try {
      res.json({"site": "random county"})
    } catch (error) {
      res.status(500).json({error});
    }
  },

  /**
   * @param {req, res} huc param - USGS' code assigned to a certain region
   * @returns {object} an object of objects {LocationName, GageHeight, WaterTemp}
   * v1 will return only LocationName, GageHieght, and Water Temp
   */
  huc: async (req, res) => {
    try {
      huc=String(req.query.huc)
      //check if huc id is valid

      /**
       * For complete parameters:
       * https://help.waterdata.usgs.gov/codes-and-parameters/parameters
       * Note: ID's and HUC must be strings or else JS will truncate the leading 0's, which are necessary for the url params
       */
      const gageHeightId = "00065";
      const waterTempId = "00010";

      let result = await axios.get(`https://waterservices.usgs.gov/nwis/iv/?format=json&huc=${huc}&parameterCd=${gageHeightId},${waterTempId}&siteStatus=all`);
      
      if (result.data.hasOwnProperty("name")){
        console.log(`Successful GET request made from USGS at ${new Date().toString()}`);
      }
      else {
        res.json(500).json({error: "Successful req, but incorrect data received"})
      }
      //console.log(await service.extractWaterValues(result.data))
      res.status(200).json(await service.extractWaterValues(result.data));
    } catch (error) {
      console.log(`GET request failed: ${error}`)
      res.status(500).json({error});
    }
  }
}