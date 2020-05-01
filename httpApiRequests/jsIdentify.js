/**
 * Simple js asynchronous function to make an API request to a Segment HTTP API source. This can be embedded in another program and called repeatedly with params.
 */

// example of HTTP API endpoint you may want to send events to. all endpoints and description available here https://segment.com/docs/connections/sources/catalog/libraries/server/http/
let exampleEndpoint = 'https://api.segment.io/v1/identify';

// you may set event and writekey based on other events in your script or function
let event = {};
let writekey


let sendToSegment = async (endpoint, writekey, event) => {
    let res = await fetch(endpoint.toString(), {
        body: JSON.stringify(event),
        headers: new Headers({
            Authorization: 'Basic ' + btoa(`${writekey}:`),
            'Content-Type': 'application/json'
        }),
        method: 'post'
    });
    if (res.ok) {
        console.log(`sent to ${writekey}`);
    } else {
        console.log('something went wrong. status: ', res.status, res.statusText);
        throw new Error(
            `something went wrong. status: ${res.status} ${res.statusText}`
        );
    }
};

return await sendToSegment(exampleEndpoint, writekey, event);