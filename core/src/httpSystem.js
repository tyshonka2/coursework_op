export class BaseHttpClient {
    async request(url, options = {}) {
        const response = await fetch(url, options);
        return response;
    }
}