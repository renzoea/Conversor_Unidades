const fs = require('node:fs');
const http = require('http');
const path = require('path');

const PORT = 3001;
const filePath = path.join(__dirname, 'datos.json');

// Inicializamos el archivo con un arreglo vacío si no existe
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]), 'utf8');
}

const requestListener = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json; charset=UTF-8');

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
                const newConversion = JSON.parse(body);

                // Leer el archivo actual
                const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                
                // Agregar la nueva conversión
                data.push(newConversion);

                // Guardar las conversiones actualizadas
                fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Conversión guardada correctamente' }));
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Error al guardar los datos', error: error.message }));
            }
        });
    } else if (req.method === 'GET' && req.url === '/obtener') {
        try {
            const data = fs.readFileSync(filePath, 'utf8');
            let parsedData = JSON.parse(data);
    
            // Verificar que la data es un array
            if (!Array.isArray(parsedData)) {
                parsedData = []; // Si no es un array, devolver un array vacío
            }
    
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(parsedData)); // Enviar los datos correctamente formateados
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Error al leer el archivo', error: error.message }));
        }
    }
}

// Crear servidor
const server = http.createServer(requestListener);

// Iniciar servidor
server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});