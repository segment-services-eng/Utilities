# Filter Tools

This is a utility for creating, listing and deleting [destination filters](https://segment.com/docs/connections/destinations/destination-filters/). 
The main value is a tool that allows a user to pull filters from an collection of Source / Destination comibinations (i.e. non-prod) and then push those filters into a different configuration (i.e. prod)

You can use this tool to setup multiple sources into the same destination. For multiple destinations, you would need to manage in configuration and run mulitple times.

## Usage

### Configuration 
The configuration is managed in the environment.js file (you can clone and have multiples of this) and this is passed into the various tools listed below.
```
exports.settings = {
    workspace:'your_workspace',
    access_token:'your_access_token',
    sources:["list","of","sources"],
    destination:"destination_source_is_connected_to",
    filters:['filters/filter1.json','filters/filter2.json']
};
```

This configuration would set two destination filters on three sources, all pointing to the same destination. 
Pass the environment file into the tool on the commandline, leave the ".js" off it

### Listing Filters
Get a list of the destination filters, including the Filter JSON.
This simply prints to the console.log output. 

```
> node listFilters.js environment 
```

### Create Filters
Will create all the filters listed in the configuration files, accepts the environment configuration as command parameter

```
> node createFilters.js environment
```

### Delete Filters
Deletes all the filters on a source / destination pair. 

```
> node deleteFilters.js environment
```