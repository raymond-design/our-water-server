module.exports = {
  /**
   * @param {int} site - the specific USGS measurement site
   * @returns {object} an object of values {}
   * will return more than huc since site is data in only one location
   */
  site: async (site) => {
    try {
      res.json({"site": "random site"})
    } catch (error) {
      res.status(500).json({error});
    }
  },

  /**
   * @param {int} county - US county code
   * @returns {object} an object of values {}
   * will return more than huc since county is data in only one location
   */
  county: async (county) => {
    try {
      res.json({"site": "random county"})
    } catch (error) {
      res.status(500).json({error});
    }
  },

  /**
   * @param {int} huc - USGS' code assigned to a certain region
   * @returns {array} an array of objects {LocationName, GageHeight, WaterTemp}
   * basic version of api will return only LocationName, GageHieght, and Water Temp
   */
  huc: async (huc) => {
    try {
      res.json({"site": "huc"})
    } catch (error) {
      res.status(500).json({error});
    }
  }
}