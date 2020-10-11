const express = require('express');
const app = express();
const Usuario = require('./model');


app.post('/usuario', (req, res) => {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuario) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        //usuario.password = null;
        res.json({
            ok: true,
            usuario
        });

    });
});