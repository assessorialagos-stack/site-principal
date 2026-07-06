require('dotenv').config({ path: '.env.local' });
const ftp = require('basic-ftp');
const path = require('path');
const fs = require('fs');

async function deploy() {
    const client = new ftp.Client();
    // client.ftp.verbose = true; // Descomente para ver logs detalhados de conexão

    const { FTP_HOST, FTP_USER, FTP_PASS, FTP_REMOTE_DIR } = process.env;

    if (!FTP_HOST || !FTP_USER || !FTP_PASS) {
        console.error('Erro: FTP_HOST, FTP_USER e FTP_PASS devem estar definidos em .env.local');
        process.exit(1);
    }

    try {
        console.log(`Conectando ao FTP: ${FTP_HOST}...`);
        await client.access({
            host: FTP_HOST,
            user: FTP_USER,
            password: FTP_PASS,
            secure: false // A maioria das hospedagens Hostgator usa FTP simples. Mude para true se precisar de FTPS.
        });
        
        console.log('Conectado com sucesso!');

        const remoteDir = FTP_REMOTE_DIR || '/';
        console.log(`Navegando para o diretório remoto: ${remoteDir}`);
        await client.ensureDir(remoteDir);
        await client.cd(remoteDir);

        const itemsToUpload = [
            { type: 'dir', local: '.next', remote: '.next' },
            { type: 'dir', local: 'public', remote: 'public' },
            { type: 'file', local: 'package.json', remote: 'package.json' },
            { type: 'file', local: 'package-lock.json', remote: 'package-lock.json' },
            { type: 'file', local: 'server.js', remote: 'server.js' },
        ];

        for (const item of itemsToUpload) {
            const localPath = path.join(__dirname, item.local);
            if (!fs.existsSync(localPath)) {
                console.log(`Aviso: ${item.local} não encontrado localmente. Pulando...`);
                continue;
            }

            console.log(`Enviando ${item.local} para ${item.remote}...`);
            if (item.type === 'dir') {
                await client.uploadFromDir(localPath, item.remote);
            } else {
                await client.uploadFrom(localPath, item.remote);
            }
        }

        console.log('Deploy concluído com sucesso!');
        
        // Hostgator (cPanel Node.js App) requires touching a file named tmp/restart.txt to restart the app
        console.log('Tentando reiniciar a aplicação Node.js (se aplicável)...');
        try {
            await client.ensureDir('tmp');
            // Crie um arquivo vazio localmente e envie para tmp/restart.txt
            fs.writeFileSync('restart.txt', '');
            await client.uploadFrom('restart.txt', 'tmp/restart.txt');
            fs.unlinkSync('restart.txt');
            console.log('Comando de reinício enviado!');
        } catch (e) {
            console.log('Não foi possível reiniciar automaticamente (pode ignorar isso se reiniciar pelo painel).');
        }

    } catch (err) {
        console.error('Erro durante o deploy:', err);
    } finally {
        client.close();
    }
}

deploy();
