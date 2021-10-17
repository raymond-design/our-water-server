const NewsAPI = require('newsapi');
const env_vars = require('../../config.js');

const newsapi = new NewsAPI(env_vars.newsApiKey);
//docs: https://newsapi.org/docs/endpoints/everything

module.exports = {
  getArticles: (req,res) => {
    query=req.query.query;
    sources=req.query.sources;
    domains=req.query.domains;
    fromDate=req.query.fromDate;
    toDate=req.query.toDate;
    language=req.query.language;
    sortBy=req.query.sortBy;
    pageNum=req.query.pageNum;

    //according to newsapi, 1 of 3 params must be present:
    if (query == undefined && sources == undefined && domains == undefined)
    {
      res.status(400).json({error: "Neccessary params missing"});
      console.log(`Error. Neccessary params missing, failed at ${new Date().toString()}`);
      return;
    }
    //probably should check is params are acceptable somewhere here..

    //todo: check that time range doesn't exceed last 30 days
    
    newsapi.v2.everything({
      q: query,
      sources: sources,
      domains: domains,
      from: fromDate,
      to: toDate,
      language: language,
      sortBy: sortBy,
      page: pageNum
    }).then(response => {
      if (response.status == 'ok')
        { 
          res.status(200).json(response); 
          console.log(`Successful GET request made from NewsApi at ${new Date().toString()}`);
        }
      else 
        { res.status(500).json(response); 
          console.log(`Error. GET request from NewsApi failed at ${new Date().toString()}`);
          console.log(response);
        }
    });

  }
}