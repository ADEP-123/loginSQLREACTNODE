import { rateLimit } from "express-rate-limit";

let middlewareRateLimit = rateLimit({
    windowMs: 30 * 1000,
    max: 5,
    stadarHeaders: true,
    legacyHeaders: false,
    message: (req, res) => {
        res.status(429).send({
            status: 429,
            message: "Ya se acabo tu tiempo :c"
        });
    }
})

export {
    middlewareRateLimit
}

