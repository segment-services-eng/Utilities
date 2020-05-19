`use strict`

const https = require('https');

if (process.argv.length <= 2) {
    console.log("\nspecifcy which settings module you want use");
    console.log("e.g. node listFilters.js segment-test-env\n");
    process.exit(1);
}
let settings = require(`./${process.argv[2]}`).settings;

settings.sources.forEach(source => {

    var options = {
        hostname: 'platform.segmentapis.com',
        path: `/v1beta/workspaces/${settings.workspace}/sources/${source}/destinations/${settings.destination}/filters`,
        headers: {
            'Content-Type':'application/json',
            'Authorization':`Bearer ${settings.access_token}`
        }
      };
    var req = https.get(options, (res) => {
        var result = '';
        res.on('data', (d) => {
            result += d;
        });
        res.on('end', () => {

            var filters = JSON.parse(result).filters;
            for(var i=0 ; i<filters.length ; i++) {
                var filter = filters[i];
                console.log(JSON.stringify(filter));
                console.log();
            }

        });
    });
    req.on('error', (e) => {
        console.error(e);
    });
    req.end();
});