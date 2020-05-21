`use strict`

const https = require('https');
if (process.argv.length <= 2) {
    console.log("\nspecifcy which settings module you want use");
    console.log("e.g. node deleteFilters.js segment-test-env\n");
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
        res.on('data', (chunk) => {
            result += chunk;
        });
        res.on('end', () => {

            var filters = JSON.parse(result).filters;
            
            for(var i=0 ; i<filters.length ; i++) {
                var filter = filters[i];
                console.log(`attempting to delete ${filter.name}`);
                var deleteOptions = {
                    hostname: 'platform.segmentapis.com',
                    port: 443,
                    method: 'DELETE',
                    path: `/v1beta/${filter.name}`,
                    headers: {
                        'Content-Type':'application/json',
                        'Authorization':`Bearer ${settings.access_token}`
                    }
                  };
                var deleteRequest = https.request(deleteOptions, (res) => {
                    var result = '';
                    res.on('data', (d) => {
                        result += d;
                    });
                    res.on('end', () => {
                        console.log(result);
                    });
                });
                deleteRequest.on('error', (e) => {
                    console.log(e)
                });
                deleteRequest.end();
            }

        });
    });
    req.on('error', (e) => {
        console.error(e);
    });
    req.end();
});