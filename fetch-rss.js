var FeedParser = require('feedparser')
,   parser = new FeedParser()
,   sql = require('/config/CMDA-tweets/sql.js')
,   l = console.log
,   interval = 1000 * 60 * 30 // 30 min
// ,   interval = 1000
,   fetch = function() {
    l('new fetch at ' + new Date());
    [
        'http://intra.iam.hva.nl/content/rss-feeds/med-rss.xml'
    ,   'http://intra.iam.hva.nl/content/rss-feeds/gg-rss.xml'
    ,   'http://intra.iam.hva.nl/content/rss-feeds/uit-rss.xml'
    ].forEach(function(url) {
        parser.parseFile(url);
    });   
}
,   ts
,   storeArticle = function( article ) {
    ts = Math.round( Date.parse( article.date ) / 1000 );
    if(article['rss:author']) { // if we have an author, store it to
        sql.query(
            "INSERT IGNORE INTO `intranet` (`timestamp` ,`author` ,`title` ,`content`, `url`, `stream`) VALUES (?, ?, ?, ?, ?, ?);"
        ,   [ ts, article['rss:author']['#'], article.title, article.description, article.link, article.meta.xmlUrl ]
        );   
    } else {
        sql.query(
            "INSERT IGNORE INTO `intranet` (`timestamp`, `title` ,`content`, `url`, `stream`) VALUES (?, ?, ?, ?, ?);"
        ,   [ ts, article.title, article.description, article.link, article.meta.xmlUrl ]
        );
    }
}
parser.on('article', storeArticle);

fetch();
setInterval( fetch, interval );
