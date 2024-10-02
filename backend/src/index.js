import config from "./config.js";
import appExpress from "./app.js";

const main = () => {
    appExpress.listen(config.server, () => console.log(`http://${config.server.hostname}:${config.server.port}`));
    console.log(`Servidor iniciado en puerto ${config.server.port}`);
}
main();