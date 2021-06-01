// Menangani routing
// respon ketika client request method / url
// server.route([
//     {
//         method:'GET',
//         handler: (request,h) => {
//             return 'hello world';
//         }
//     }
// ])



const route = [
    {
        method: 'GET',
        path: '/',
        // Handler pada hapi dipisahkan berdasarkan route yg ada
        // Setiap spesifikasi route memiliki handler-nya masing - masing
        handler: (request,h) => {
            return `Homepage ${route[0].method}`
        }
    }, 
    {
        method: '*',
        path: '/',
        handler: (request,h) => {
            // Materi Terakhir (response toolkit)
            // Ketika butuh mengubah nilai status response, ditiulah anda membutuhkan parameter h
            // fungsi handler selalu mengembalikan sebuah nilai, bila anda menggunakan h ketika menangani permintaan maka kembalikanlah dengan nilai h.respose
            // Parameter h bisa juga menetapkan header respose, content-type, content-length dsb
            return h.response('Bad Request').code(400)
            .type('application/json')
            .header('X-Powered-By','HAPI JS');
            // return `Halaman tidak dapat diakses menggunakan ${route[1].method} tersebut`
        }
    },

    {
        method: 'GET',
        path: '/about',
        handler: (request,h) => {
            return `About Page`
        }
    }, 
    {
        method: '*',
        path: '/about',
        handler: (request,h) => {
            return `Halaman tidak dapat diakses dengan method tersebut`;
        }
    },
    {
        method: '*',
        path: '/{any*}',
        handler: (request,h) => {
            return `Halaman tidak ditemukan`
        }

    },
    {
        method: 'GET',
        // tanda ? membuat parameter bersifat opsional
        path: '/users/{username?}',
        handler: (request,h) => {
            // Bila client meminta alamat /users/bulma, server akan menanggapi dengan hello, bulma
            // Jika client meminta users maka server akan menanggapi hello budi
            // Paling penting bahwa optional path parameter hanya dapat digunakan diakhir bagian path
            // artinya, jika menetapkan optional path di tengah - tengah path parameter lain, maka path dianggap tidak valid
            const {username = "Strangers"} = request.params;
            // Cara lain yang sering digunakan dalam mengirimkan data melalui URL, yakni dengan Query parameter
            // Teknik ini umum digunakan pada permintaan yang membutuhkan query dari client
            // Contoh seperti pencarian dan filter data, data yang dikirim melalui query memiliki format key=value
            const {lang} = request.query;
            if(lang === 'id') {
                return `Hai ${username} from ${lang}`;
            }

            return `Hai ${username} `;

        }
    }, 
    {
        method: 'POST',
        path: '/login',
        handler: (request,h) => {
            // Sebelumnya dengan node.js untuk mendapatkan data pada body request harus menggunakan teknik readable stream
            // pada Hapi .js dibalik layar secara default akan mengubah payload JSON menjadi objek JS
            const {username,password} = request.payload;
            return `Welcome ${username}`
        }
    }
];




module.exports = route;