
exports.settings = {
    workspace:'segment-sa', // workplace slug can be found in the URL of your segment home page (https://app.segment.com/segment-sa/overview - my workspace in this instance is segment-sa) 
    access_token:'your_access_token', // https://segment.com/docs/config-api/#access-tokens
    sources:["list","of","sources"],
    destination:"destination_source_is_connected_to", // this is not going to handle a list of destinations
    filters:['filters/filter1.json','filters/filter2.json']
};
