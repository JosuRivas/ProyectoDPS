const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');
const fileUpload = require('express-fileupload');
class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        
        this.paths = {
            auth:'/api/auth',
            usuarios:'/api/usuarios',
            categorias:'/api/categorias',
            productos:'/api/productos',
            buscar:'/api/buscar',
            uploads:'/api/uploads',
            compras:'/api/compras'
        }

        //Conectar DB
        this.conectarDB();

        //Middlewares : funciones que se ejecutan antes de llamar a un controlador (user.js) o antes de seguir a las peticiones
        this.middlewares();

        this.routes(); // configura las rutas de la app
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){

        //todos se ejecutan antes de llegar a las rutas
        //CORS
        this.app.use(cors());

        // Parsing y lectura del body
        this.app.use(express.json());

        //directorio publico
        this.app.use( express.static('public') );
        //file upload o carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath:true
        }));

    }

    routes(){
        this.app.use(this.paths.auth,require('../routes/auth'));
        this.app.use(this.paths.usuarios,require('../routes/user'));
        this.app.use(this.paths.categorias,require('../routes/categorias'));
        this.app.use(this.paths.productos,require('../routes/productos'));
        this.app.use(this.paths.buscar,require('../routes/buscar'));
        this.app.use(this.paths.uploads,require('../routes/uploads'));
        this.app.use(this.paths.compras,require('../routes/compras'));
        
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Corriendo en el puerto',this.port);
        });
    }


}



module.exports = Server;