`use strict`

const https = require('https');
const fs = require('fs');
if (process.argv.length <= 2) {
    console.log("\nspecifcy which settings module you want use");
    console.log("e.g. node createFilters.js segment-test-env\n");
    process.exit(1);
}
let settings = require(`./${process.argv[2]}`).settings;


settings.sources.forEach(source => {

    var options = {
        hostname: 'platform.segmentapis.com',
        port: 443,
        method: 'POST',
        path: `/v1beta/workspaces/${settings.workspace}/sources/${source}/destinations/${settings.destination}/filters`,
        headers: {
            'Content-Type':'application/json',
            'Authorization':`Bearer ${settings.access_token}`
        }
      };
      
      for(var i=0 ; i<settings.filters.length ; i++) {
        var filterString = fs.readFileSync(settings.filters[i]);
        options.headers['Content-Length'] = Buffer.byteLength(filterString);

        req = https.request(options, (res) => {
            var result = '';
            res.on('data', (d) => {
                result += d;
            });
            res.on('end', () => {
                console.log(result);
            });
        });
        req.on('error', (e) => {
            console.error(e);
        });
        req.write(filterString);
        req.end();
      }
});