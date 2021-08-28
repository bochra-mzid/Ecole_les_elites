const express = require('express');
const router = express.Router();
const Adm = require("../models/Administrateur")
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const withAuth = require('../middleware/middleware');

const secret = 'mysecretsshhh';

router.post('/', function (req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res
            .json({ auth: false, message: "الرجاء ادخال كل البيانات المطلوبة" })
    }
    Adm.findOne({ email }).then((user) => {
        if (user) {
            const passwordCorrect = (password == user.mdp)

            if (passwordCorrect) {
                const payload = { email };
                const token = jwt.sign(payload, secret, {
                    expiresIn: '5h'
                });
                console.log("done")
                res.json({ token: token, auth: true, id: user._id });
            }
            else {
                res.json({ auth: false, message: 'الرجاء التقبت من كلمة السر' });
            }
        }
        else {
            res.json({ auth: false, message: "هذا البريد الالكتروني غير مسجل" })
        }
    }).catch(err => {
        res.json({ message: "error 1" })
    })
})

module.exports = router