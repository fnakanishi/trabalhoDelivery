const cnpjValidator = (cnpj) => {
    const numerosCNPJ = cnpj.replace(/\./g, '').replace(/-/g, '').replace(/\//g, '');
    const multiplicadores = '6543298765432';
    const primeiro = parseInt(numerosCNPJ[0]);
    let somaDigitoA = 0;
    let somaDigitoB = 0;
    let dif = false;
    for (let i = 0; i < 12; i++) {
        const digito = parseInt(numerosCNPJ[i]);
        const multiplicadorA = parseInt(multiplicadores[i + 1]);
        const multiplicadorB = parseInt(multiplicadores[i]);
        somaDigitoA += (digito * multiplicadorA);
        somaDigitoB += (digito * multiplicadorB);
        if (!dif && digito !== primeiro)
        dif = true;
    }
    somaDigitoB += 2 * parseInt(numerosCNPJ[12]);
    const digitoA = (somaDigitoA % 11) < 2 ? 0 : (11 - (somaDigitoA % 11));
    const digitoB = (somaDigitoB % 11) < 2 ? 0 : (11 - (somaDigitoB % 11));
    if (!dif && (primeiro !== digitoA || primeiro !== digitoB))
        dif = true;
    if (digitoA === parseInt(numerosCNPJ[12]) && digitoB === parseInt(numerosCNPJ[13]) && dif)
        return 'OK';
    return 'CNPJ inválido.';
}

modules.export = cnpjValidator;