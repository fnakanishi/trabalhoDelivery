module.exports = {
  cpfValidation(cpf) {
    if (cpf.lenght < 11 || cpf.lenght > 14)
      return 'CPF deve conter 11 números.';
    else if (!cpf.match(/[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}/g))
      return 'Caracteres inválidos.';
    else {
      const numerosCPF = cpf.replace('.', '').replace('-', '');
      const primeiro = parseInt(numerosCPF[0]);
      let somaDigitoA = 0;
      let somaDigitoB = 0;
      for (let i = 0; i < 9; i++) {
        const digito = parseInt(numerosCPF[i]);
        somaDigitoA += digito * (10 - i);
        somaDigitoB += digito * (11 - i);
        if (!dif && digito !== primeiro)
          dif = true;
      }
      somaDigitoB += 2 * parseInt(numerosCPF[9]);
      const digitoA = 11 - ((somaDigitoA % 11) >= 10 ? 0 : (somaDigitoA % 11));
      const digitoB = 11 - ((somaDigitoB % 11) >= 10 ? 0 : (somaDigitoB % 11));
      if (!dif && (primeiro !== digitoA || primeiro !== digitoB))
        dif = true;
      if (digitoA === parseInt(numerosCPF[9]) && digitoB === parseInt(numerosCPF[10]) && dif)
        return 'OK';
      return 'CPF inválido.';
    }
  },

  cnpjValidation(cnpj) {
    if (cnpj.lenght < 14 || cnpj.lenght > 18)
      return 'CNPJ deve conter 14 números.';
    else if (!cpf.match(/[0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2}/g))
      return 'Caracteres inválidos.';
    else {
      const multiplicadores = '6543298765432';
      const numerosCNPJ = CNPJ.replace('.', '').replace('-', '').replace('/', '');
      const primeiro = parseInt(numerosCNPJ[0]);
      let somaDigitoA = 0;
      let somaDigitoB = 0;
      let dif = false;
      for (let i = 0; i < 12; i++) {
        const digito = parseInt(numerosCNPJ[i]);
        const multiplicadorA = parseInt(multiplicadores[i + 1]);
        const multiplicadorB = parseInt(multiplicadores[i]);
        somaDigitoA += digito * (multiplicadorA - i);
        somaDigitoB += digito * (multiplicadorB - i);
        if (!dif && digito !== primeiro)
          dif = true;
      }
      somaDigitoB += 2 * parseInt(numerosCNPJ[12]);
      const digitoA = 11 - ((somaDigitoA % 11) >= 10 ? 0 : (somaDigitoA % 11));
      const digitoB = 11 - ((somaDigitoB % 11) >= 10 ? 0 : (somaDigitoB % 11));
      if (!dif && (primeiro !== digitoA || primeiro !== digitoB))
        dif = true;
      if (digitoA === parseInt(numerosCNPJ[12]) && digitoB === parseInt(numerosCNPJ[13]) && dif)
        return 'OK';
      return 'CNPJ inválido.';
    }
  },

  passwordValidation(password) {
    if (password.lenght < 8)
      return 'Senha deve conter no mínimo 8 caracteres.';
    else if (!password.match(/[a-zA-Z]/g))
      return 'Senha deve conter no mínimo uma letra.';
    else if (!password.match(/[0-9]+/))
      return 'Senha deve conter no mínimo uma letra.';
    else
      return 'OK';
  },

    generateToken(id) {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: 82800,
    });
    console.log(token);
    return token;
  }
}