const getMap = (legend, shift) => {
    return legend.reduce((charsMap, currentChar, charIndex) => {
        const copy = { ...charsMap
        };
        let ind = (charIndex + shift) % legend.length;
        if (ind < 0) {
            ind += legend.length;
        }
        copy[currentChar] = legend[ind];
        return copy;
    }, {});
};
const crypt = (str, shift = 13) => {
    const legend = "abcdefghijklmnopqrstuvwxyz".split("");

    const map = getMap(legend, shift);

    return str
        .toLowerCase()
        .split("")
        .map((char) => map[char] || char)
        .join("");
};

export function accountToReferralCode(account) {
    if (account) {
        const substring = account.substring(2);

        return crypt(substring);
    }

    return undefined;
}

export function referralCodeToAccount(code) {
    if (code) return `0x${crypt(code)}`;

    return undefined;
}