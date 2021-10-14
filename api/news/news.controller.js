const NewsAPI = require('newsapi');
const env_vars = require('../../config.js');

const newsapi = new NewsAPI(env_vars.newsApiKey);
//docs: https://newsapi.org/docs/endpoints/everything

module.exports = {
  getArticles: (req,res) => {
    query=req.params.query;
    sources=req.params.sources;
    domains=req.params.domains;
    fromDate=req.params.fromDate;
    toDate=req.params.toDate;
    language=req.params.timeRange;
    sortBy=req.params.sortBy;
    pageNum=req.params.pageNum;

    //probably should check is params are acceptable somewhere here..
    newsapi.v2.everything({
      q: query,
      sources: sources,
      domains: domains,
      from: timeRange.fromDate,
      to: timeRange.toDate,
      language: language,
      sortBy: sortBy,
      page: pageNum
    }).then(response => {
      if (res.status == 'ok')
        { 
          res.status(200).json(response); 
          console.log(`Successful GET request made from NewsApi at ${new Date().toString()}`);
        }
      else 
        { res.status(500).json(response); 
          console.log(`Error. GET request from NewsApi failed at ${new Date().toString()}`);
        }
    });

  }
}