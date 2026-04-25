const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

app.use(cors());
app.use(express.json());

const path = require('path');
app.use('/galeria', express.static(path.join(__dirname, 'public/galeria')));
app.use('/alumnos', express.static(path.join(__dirname, 'public/alumnos')));


// Conexión a PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'prueba',
  password: '123456',
  port: 5432,
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Backend funcionando 🚀');
});

// Obtener usuarios
app.get('/usuarios', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener usuarios');
  }
});
  

// Guardar usuario
app.post('/usuarios', async (req, res) => {
  const { nombre } = req.body;

  
  try {
    const result = await pool.query(
        'INSERT INTO usuarios (nombre) VALUES ($1) RETURNING *',
        [nombre]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al guardar usuario');
  }
});



// Obtener alumnos
app.get('/alumnos', async (req, res) => {
  try {
    const result = await pool.query(`
  SELECT id, nombre, edad, categoria, club, ciudad, record, fotos
  FROM alumnos
`);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener alumnos');
  }
});


app.post('/alumnos', async (req, res) => {
  const { nombre, edad, categoria, club, ciudad, record, fotos } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO alumnos 
      (nombre, edad, categoria, club, ciudad, record, fotos)
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING *`,
      [nombre, edad, categoria, club, ciudad, record, fotos]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al crear alumno');
  }
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});

app.get('/galeria', (req, res) => {
  res.json([
    '/galeria/foto1.jpg',
    '/galeria/foto2.jpg',
    '/galeria/foto3.jpg'
  ]);
});