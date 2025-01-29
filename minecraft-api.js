console.log("Minecraft API is running...");
const express = require('express');
const { Rcon } = require('rcon-client');
const app = express();
const port = 3000;

app.use(express.json());

// Configuração do servidor Minecraft
const rconOptions = {
    host: '',  // Endereço IP do servidor Minecraft
    port: 25725,        // Porta do RCON
    password: ''  // Senha do RCON
};

// Endpoint para realizar a ação de dar pontos ao jogador, se for de sua preferencia, pode retirar o comando /givepoints, ele nao é importante.
app.post('/givepoints', async (req, res) => {
    const { playerName, amount } = req.body;

    // Conectar ao servidor Minecraft via RCON
    const rcon = new Rcon(rconOptions);
    try {
        await rcon.connect();
        const command = `/points give ${playerName} ${amount}`;
        const result = await rcon.send(command);
        await rcon.end();
        res.json({ message: `Comando enviado: ${result}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
});
