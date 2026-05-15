export class BaseHttpClient {
    async request(url, options = {}) {
        const response = await fetch(url, options);
        return response;
    }
}

export class JwtAuthStrategy {
    constructor(getToken, refreshToken) {
        this.getToken = getToken; 
        this.refreshToken = refreshToken; 
    }

    inject(options) {
        const headers = new Headers(options.headers || {});
        headers.set('Authorization', `Bearer ${this.getToken()}`);
        return { ...options, headers };
    }

    async refresh() {
        if (this.refreshToken) {
            await this.refreshToken();
        }
    }
}

// Стратегія 2: API Key
export class ApiKeyStrategy {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    inject(options) {
        const headers = new Headers(options.headers || {});
        headers.set('X-API-Key', this.apiKey);
        return { ...options, headers };
    }

    async refresh() { 
    }
}