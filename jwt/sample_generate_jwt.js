const generate_jwt = function (request_body, request_uri, query_string) {
    let request_body_string = JSON.stringify(request_body);
    let request_data =
        request_uri.toString() +
        '|' +
        request_body_string +
        '|' +
        query_string.toString();
    
    let hash = crypto.createHash('sha1');
    let request_hash = hash.update(request_data).digest('hex');

    const jwtHeader = {
        alg: 'HS256'
    };

    // this body assumes there is a required expiration attribute, in order to satisfy requirements for a specific API. the 'exp' attribute may be removed if not needed.
    const jwtBody = {
        'request-hash': request_hash,
        exp: Date.now() + 600000
    };


    const encodedBody = encodeParams(jwtBody);
    const encodedHeader = encodeParams(jwtHeader);
    const signature = crypto
        .createHmac('sha256', settings.apiKey)
        .update(encodedHeader + '.' + encodedBody)
        .digest('base64')
        .replace('+', '-')
        .replace('/', '_')
        .replace(/=+$/, '');

    let jwt = `${encodedHeader}.${encodedBody}.${signature}`;
    
    return jwt;

}