const Hapi = require('@hapi/hapi');

const init = async () => {
    const server = Hapi.Server({
        host: 'localhost',
        port: 1234
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return "<h1>Hello world</h1>";
        }
    });

    server.route([
        {
            method: 'GET',
            path: '/users/{name?}',
            handler: (request, h) => {
                if (request.params.name) {
                    return `<h1>Hello ${request.params.name}</h1>`;
                }
                else if (request.query.firstname && request.query.lastname) {
                    return `<h3>my name is ${request.query.firstname} ${request.query.lastname}</h3>`
                }
                else if (request.query.firstname) {
                    return `<h1>nama saya ${request.query.firstname}</h1>`;
                }
                else {
                    return `<h1>hello user not found</h1>`
                }
            }
        },
        {
            method: 'GET',
            path: '/home',
            handler: (request, h) => {
                return h.redirect('/')
            }
        },
        {
            method: 'GET',
            path: '/{any*}',
            handler: (request, h) => {
                return "<h1>halaman tidak ditemukan</h1>"
            }
        }

    ]);

    await server.start();
    console.log(`Server started on: ${server.info.uri}`);
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();

