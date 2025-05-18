export const generateRandomString = (len: number) => {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < len; i++) {
         const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
};

export const generateUniqueId = (len: number, arr: string[]) => {
    let randomString = generateRandomString(len);
    while (true) {
        if (!arr.includes(randomString)) break;
        randomString = generateRandomString(len);
    }
    return randomString;
};
