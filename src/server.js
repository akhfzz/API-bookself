const [hapi, routes] = [require('@hapi/hapi'), require('./routes')];

const init = async () => {
    const server = hapi.server({
        port: 5000,
        host: 'localhost',
        routes: {
            cors: {
                origin: [ '*' ],
            },
        },
    });
    
    server.route(routes);

    await server.start();
    console.log(`kamu berjalan di host ${server.info.uri}`);
}
init();