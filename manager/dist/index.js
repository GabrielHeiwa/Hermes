"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const whatsapp_web_js_1 = require("whatsapp-web.js");
function main() {
    const clients = Array
        .from({ length: 10 })
        .map((v, i) => new whatsapp_web_js_1.Client({
        puppeteer: {
            headless: false
        },
        authStrategy: new whatsapp_web_js_1.LocalAuth({ clientId: `${i}` })
    }));
    for (const client of clients)
        client.initialize();
    return;
}
main();
