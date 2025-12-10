type RateLimitRecord = {
    count: number;
    resetTime: number;
};

const ipCache = new Map<string, RateLimitRecord>();

const WINDOW_SIZE_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 3; // 3 requests per hour

export function checkRateLimit(ip: string): { success: boolean } {
    const now = Date.now();
    const record = ipCache.get(ip);

    // Clean up old entries periodically (simple optimization)
    // In a real high-traffic app, we'd use a proper LRU cache or Redis
    if (ipCache.size > 1000) {
        for (const [key, value] of ipCache.entries()) {
            if (now > value.resetTime) {
                ipCache.delete(key);
            }
        }
    }

    if (!record) {
        ipCache.set(ip, { count: 1, resetTime: now + WINDOW_SIZE_MS });
        return { success: true };
    }

    if (now > record.resetTime) {
        // Window expired, reset
        ipCache.set(ip, { count: 1, resetTime: now + WINDOW_SIZE_MS });
        return { success: true };
    }

    if (record.count >= MAX_REQUESTS) {
        return { success: false };
    }

    record.count += 1;
    return { success: true };
}
