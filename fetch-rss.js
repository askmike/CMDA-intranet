var FeedParser = require('feedparser')
,   parser = new FeedParser()
,   sql = require('/config/CMDA-tweets/sql.js')
,   l = console.log
,   hour = 1000 * 60 * 60
// ,   hour = 1000
,   fetch = function() {
    l('fetching at ' + new Date());

    [
        'http://intra.iam.hva.nl/content/rss-feeds/med-rss.xml'
    ,   'http://intra.iam.hva.nl/content/rss-feeds/gg-rss.xml'
    ,   'http://intra.iam.hva.nl/content/rss-feeds/uit-rss.xml'
    ].forEach(function(url, i) {
        
        parser.parseFile(url, function(error, meta, articles){
            if (error) l(error);
            else {
                var ts;
                articles.forEach(function(article) {
                    ts = Math.round( Date.parse( article.date ) / 1000 );

                    if(i === 0) { // only articles from 'med' have authors
                        sql.query(
                            "INSERT IGNORE INTO `intranet` (`timestamp` ,`author` ,`title` ,`content`, `stream`) VALUES (?, ?, ?, ?, ?);"
                        ,   [ ts, article['rss:author']['#'], article.title, article.description, url ]
                        );   
                    } else {
                        sql.query(
                            "INSERT IGNORE INTO `intranet` (`timestamp`, `title` ,`content`, `stream`) VALUES (?, ?, ?, ?);"
                        ,   [ ts, article.title, article.description, url ]
                        );
                    }
                });
               setTimeout( fetch, hour )
            }
        });

    });
}

fetch();