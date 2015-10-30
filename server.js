var express = require('express'),
    http = require('http'),
    path = require('path'),
    app = express(),
    request = require('request'),
    compression = require('compression'),
    session = require('express-session'),
    csrf = require('csurf'),
    override = require('method-override')

function startServer() {

    // all environments
    app.set('port', process.argv[3] || process.env.PORT || 3000)
    app.disable('x-powered-by')
    app.use(/(.*).(css|js)/, compression())
    app.use(express.static(__dirname+'/dist'))
    app.use(express.static(__dirname+'/bower_components'))


    const querify = (queryParamsObject) => {
        var params = Object.keys(queryParamsObject).map(function(val, key) {
            return val + '=' + queryParamsObject[val]
        }).join('&')
        return params.length === 0 ? '' : '?' + params
    }


    // adds a new rule to proxy a localUrl -> webUrl
    // i.e. proxify ('/my/server/google', 'http://google.com/')
    const proxify = (localUrl, webUrl) => {
        app.get(localUrl, (req, res, next) => {
            var tokens = webUrl.match(/:(\w+)/ig)
            var remote = (tokens || []).reduce((a, t) => {
                return a.replace(new RegExp(t, 'ig'), req.params[t.substr(1)])
            }, webUrl)
            req.pipe(
                request(remote + querify(req.query))
                    .on('error', err => console.error(err))
            ).pipe(res)
        })
        app.post(localUrl, (req, res, next) => {
            var tokens = webUrl.match(/:(\w+)/ig)
            var remote = (tokens || []).reduce((a, t) => {
                return a.replace(new RegExp(t, 'ig'), req.params[t.substr(1)])
            }, webUrl)
            req.pipe(
                request.post(remote + querify(req.query), {form:req.query})
                    .on('error', err => console.error(err))
            ).pipe(res)
        })
    }

    // add your proxies here.
    //
    // examples:
    // proxify('/yummly/recipes', 'http://api.yummly.com/v1/api/recipes');
    // proxify('/brewery/styles', 'https://api.brewerydb.com/v2/styles');

    // SOME SECURITY STUFF
    // ----------------------------
    // more info: https://speakerdeck.com/ckarande/top-overlooked-security-threats-to-node-dot-js-web-applications
    // ----
    // remove some info so we don't divulge to potential
    // attackers what platform runs the website
    app.disable('x-powered-by')
    // change the generic session cookie name
    // app.use(session({ secret: 'some secret', key: 'sessionId', cookie: {httpOnly: true, secure: true} }))
    // enable overriding
    app.use(override("X-HTTP-Method-Override"))
    // enable CSRF protection
    // app.use(csrf())
    // app.use((req, res, next) => {
    //     res.locals.csrftoken = req.csrfToken() // send the token to the browser app
    //     next()
    // })
    // ---------------------------

    const throwYourHandsUp = (port=app.get('port')) => {
        http.createServer(app).listen(port, () => {
            console.log(`Express server listening on port ${port}`)
        }).on('error', e => {
            app.set('port', port+1)
            throwYourHandsUp()
        })
    }
    throwYourHandsUp()

}

module.exports.startServer = startServer