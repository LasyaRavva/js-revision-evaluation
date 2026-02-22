const { allow } = require("joi");

function createRateLimiter(limit = 5, interval = 1000) {
    let count = 0;
    let resetTime = Date.now() + interval;

    function resetIfNeeded() {
        const now = Date.now();
        if(now >= resetTime) {
            count = 0;
            resetTime = now + interval;
        }
    }

    return function attempt() {
        resetIfNeeded();

        const now = Date.now();
        const msUntilReset = resetTime - now;

        if(count < limit) {
            count++;

            return{
                allowed: true,
                remaining: limit - count,
                resetInMs: msUntilReset
            }
        }

        return{
            allowed: false,
            remaining: 0,
            resetInMs: msUntilReset
        }
    }
}

if(require.main === module){
    const limiter = createRateLimiter(3, 2000);

    console.log("call1:", limiter());
    console.log("call2:", limiter());
    console.log("call3:", limiter());
    console.log("call4:", limiter());
    console.log("call5:", limiter());
 
    setTimeout(() => {
        console.log("\n after ~2.5s:");
        console.log("call6:", limiter());
        console.log("call7:", limiter());
    },2500);
}

module.exports = { createRateLimiter };