export async function getHash(str: string, algo = "SHA-256") {
  let strBuf = new TextEncoder().encode(str);
  return crypto.subtle.digest(algo, strBuf)
    .then(hash => {
      let result = '';
      const view = new DataView(hash);
      for (let i = 0; i < hash.byteLength; i += 4) {
        result += ('00000000' + view.getUint32(i).toString(16)).slice(-8);
      }
      return result;
    });
}
