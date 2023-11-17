function isSigmano(dna: string[]): boolean {
  const n = dna.length;

  // Verifica horizontalmente
  for (let i = 0; i < n; i++) {
    for (let j = 0; j <= n - 4; j++) {
      if (
        dna[i]
          .substring(j, j + 4)
          .split("")
          .every((char, index) => char === dna[i][j])
      ) {
        return true;
      }
    }
  }

  // Verifica verticalmente
  for (let i = 0; i <= n - 4; i++) {
    for (let j = 0; j < n; j++) {
      if (
        dna[i][j] === dna[i + 1][j] &&
        dna[i][j] === dna[i + 2][j] &&
        dna[i][j] === dna[i + 3][j]
      ) {
        return true;
      }
    }
  }

  // Verifica diagonalmente (superior esquerda para inferior direita)
  for (let i = 0; i <= n - 4; i++) {
    for (let j = 0; j <= n - 4; j++) {
      if (
        dna[i][j] === dna[i + 1][j + 1] &&
        dna[i][j] === dna[i + 2][j + 2] &&
        dna[i][j] === dna[i + 3][j + 3]
      ) {
        return true;
      }
    }
  }

  // Verifica diagonalmente (superior direita para inferior esquerda)
  for (let i = 0; i <= n - 4; i++) {
    for (let j = n - 1; j >= 3; j--) {
      if (
        dna[i][j] === dna[i + 1][j - 1] &&
        dna[i][j] === dna[i + 2][j - 2] &&
        dna[i][j] === dna[i + 3][j - 3]
      ) {
        return true;
      }
    }
  }

  return false;
}

export { isSigmano };
