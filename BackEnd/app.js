const User = require('./models/User');
const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();

const corsOptions = {
    origin: 'http://127.0.0.1:5500',
    methods: 'GET,POST',
};

app.use(cors(corsOptions));

app.use(express.json());

app.get("/", async (req, res) => {
    res.send("Ok");
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;


        const user = await User.findOne({ where: { email } });

        const username = user.name;
        const userEmail = user.email;


        if (!user) {
            return res.status(401).json({ mensagem: 'Email não encontrado.' });
        }

        const senhaValida = bcrypt.compareSync(password, user.password);

        if (!senhaValida) {
            return res.status(401).json({ mensagem: 'Senha incorreta.' });
        }

        const token = jwt.sign({ userId: user.id, username: user.name }, 'secreto');
        return res.json({ token, username, userEmail});
    } catch (error) {
        console.error('Erro no login:', error);
        return res.status(500).json({ mensagem: "Erro no servidor ao fazer login." });
    }
});



app.post("/cadastrar", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);

        const hashedPassword = bcrypt.hashSync(password, salt);

        await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return res.json({
            erro: false,
            mensagem: "Usuário cadastrado com sucesso!"
        });
    } catch (error) {
        console.error('Erro no cadastro de usuário:', error);
        return res.status(400).json({
            erro: true,
            mensagem: "Erro no cadastro de usuário!"
        });
    }
});

app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});
