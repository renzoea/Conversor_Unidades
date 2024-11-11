const fs = require('fs');
const http = require('http');
const path = require('path');

const PORT = 3001;
const filePath = path.join(__dirname, 'datos.json');

const requestListener = (req, res) => {
    // Configuración de CORS manual
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json; charset=UTF-8');

    // Manejo de solicitudes OPTIONS (necesarias para CORS)
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.method === 'POST' && req.url === '/guardar') {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            try {
                const data = JSON.parse(body);

                // Validar si los datos tienen la estructura esperada
                if (!data || typeof data !== 'object') {
                    throw new Error('Los datos enviados no tienen el formato esperado');
                }

                // Crear el archivo si no existe y escribir los datos
                fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Datos guardados correctamente' }));
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Error al procesar los datos', error: error.message }));
            }
        });
    } else if (req.method === 'GET' && req.url === '/obtener') {
        try {
            // Verificar si el archivo existe antes de leerlo
            if (fs.existsSync(filePath)) {
                const data = fs.readFileSync(filePath, 'utf8');
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(data);
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'No se encontraron datos guardados' }));
            }
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Error al leer el archivo', error: error.message }));
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Ruta no encontrada');
    }
};

// Crear servidor
const server = http.createServer(requestListener);

// Iniciar servidor
server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
