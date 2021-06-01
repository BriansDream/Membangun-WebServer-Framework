// Membuat Web Server menggunakan HAPI.JS
const Hapi = require('@hapi/hapi');
const route = require('./routes');
const init = async () => {
    // HTTP Server sendiri dibuat melalui method hapi.server()
    // Method ini menerima satu parameter yakni serverOptions
    const server = Hapi.server({
        // ServerOptions merupakan objek yang menampung konfigurasi dari server yang hendak dibuat
        // Salah satunya property port dan host
        port: 5000,
        host: 'localhost',
    });

    server.route(route)
    
    // Proses menjalankan server dilakukan secara asynchronus
    await server.start();
    // Setelah server berhasil anda bisa melihat alamat lengkap dan porty dimana server dijalankan melalui property server.info.url
    console.log(`Server berjalan pada ${server.info.uri}`);
}
 
init();
