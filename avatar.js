const readyPromise = new Promise((resolve, reject) => {
    if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
        setTimeout(() => resolve(), 1);
    } else {
        const onContentLoaded = () => {
            resolve();
            document.removeEventListener('DOMContentLoaded', onContentLoaded, false);
        }
        document.addEventListener('DOMContentLoaded', onContentLoaded, false);
    }
});

const md5 = (() => {
    const safeAdd = (x, y) => {
        const lsw = (x & 0xffff) + (y & 0xffff)
        const msw = (x >> 16) + (y >> 16) + (lsw >> 16)
        return (msw << 16) | (lsw & 0xffff)
    };

    const bitRotateLeft = (num, cnt) => (num << cnt) | (num >>> (32 - cnt));
    const md5cmn = (q, a, b, x, s, t) => safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
    const md5ff = (a, b, c, d, x, s, t) => md5cmn((b & c) | (~b & d), a, b, x, s, t);
    const md5gg = (a, b, c, d, x, s, t) => md5cmn((b & d) | (c & ~d), a, b, x, s, t);
    const md5hh = (a, b, c, d, x, s, t) => md5cmn(b ^ c ^ d, a, b, x, s, t);
    const md5ii = (a, b, c, d, x, s, t) => md5cmn(c ^ (b | ~d), a, b, x, s, t);

    const binlMD5 = (x, len) => {
        x[len >> 5] |= 0x80 << (len % 32);
        x[((len + 64) >>> 9 << 4) + 14] = len;

        let i;
        let olda;
        let oldb;
        let oldc;
        let oldd;
        let a = 1732584193;
        let b = -271733879;
        let c = -1732584194;
        let d = 271733878;

        for (i = 0; i < x.length; i += 16) {
            olda = a;
            oldb = b;
            oldc = c;
            oldd = d;

            a = md5ff(a, b, c, d, x[i], 7, -680876936);
            d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
            c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
            b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
            a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
            d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
            c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
            b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
            a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
            d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
            c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
            b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
            a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
            d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
            c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
            b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);

            a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
            d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
            c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
            b = md5gg(b, c, d, a, x[i], 20, -373897302);
            a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
            d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
            c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
            b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
            a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
            d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
            c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
            b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
            a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
            d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
            c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
            b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);

            a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
            d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
            c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
            b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
            a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
            d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
            c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
            b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
            a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
            d = md5hh(d, a, b, c, x[i], 11, -358537222);
            c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
            b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
            a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
            d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
            c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
            b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);

            a = md5ii(a, b, c, d, x[i], 6, -198630844);
            d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
            c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
            b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
            a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
            d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
            c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
            b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
            a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
            d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
            c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
            b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
            a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
            d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
            c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
            b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);

            a = safeAdd(a, olda);
            b = safeAdd(b, oldb);
            c = safeAdd(c, oldc);
            d = safeAdd(d, oldd);
        }
        return [a, b, c, d]
    }

    const binl2rstr = (input) => {
        let i;
        let output = '';
        let length32 = input.length * 32;
        for (i = 0; i < length32; i += 8) {
            output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xff);
        }
        return output;
    }

    const rstr2binl = (input) => {
        let i;
        let output = [];
        output[(input.length >> 2) - 1] = undefined;
        for (i = 0; i < output.length; i += 1) {
            output[i] = 0;
        }
        let length8 = input.length * 8;
        for (i = 0; i < length8; i += 8) {
            output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << (i % 32);
        }
        return output;
    }

    const rstrMD5 = (s) => binl2rstr(binlMD5(rstr2binl(s), s.length * 8));

    const rstrHMACMD5 = (key, data) => {
        let i;
        let bkey = rstr2binl(key);
        let ipad = [];
        let opad = [];
        let hash;

        ipad[15] = opad[15] = undefined;
        if (bkey.length > 16) {
            bkey = binlMD5(bkey, key.length * 8);
        }
        for (i = 0; i < 16; i += 1) {
            ipad[i] = bkey[i] ^ 0x36363636;
            opad[i] = bkey[i] ^ 0x5c5c5c5c;
        }
        hash = binlMD5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
        return binl2rstr(binlMD5(opad.concat(hash), 512 + 128));
    }

    const rstr2hex = (input) => {
        var hexTab = '0123456789abcdef';
        var output = '';
        var x;
        var i;
        for (i = 0; i < input.length; i += 1) {
            x = input.charCodeAt(i);
            output += hexTab.charAt((x >>> 4) & 0x0f) + hexTab.charAt(x & 0x0f);
        }
        return output;
    }

    const str2rstrUTF8 = (input) => unescape(encodeURIComponent(input));
    const rawMD5 = (s) => rstrMD5(str2rstrUTF8(s));

    const hexMD5 = (s) => rstr2hex(rawMD5(s));

    const rawHMACMD5 = (k, d) => rstrHMACMD5(str2rstrUTF8(k), str2rstrUTF8(d));
    const hexHMACMD5 = (k, d) => rstr2hex(rawHMACMD5(k, d));

    const md5 = (string, key, raw) => {
        if (!key) {
            if (!raw) {
                return hexMD5(string);
            }
            return rawMD5(string);
        }
        if (!raw) {
            return hexHMACMD5(key, string);
        }
        return rawHMACMD5(key, string);
    }

    return md5;
})();

const getMd5Random = (hexMd5, offset, size, max, min) => {
    let shouldFloor = true;
    if (min === undefined) {
        min = 0;
    }
    if (max === undefined) {
        max = 1;
        shouldFloor = false;
    }
    const maxNumber = 2 ** (size * 4);
    const value = Number.parseInt(hexMd5.slice(offset, offset + size), 16);

    let result = min + value * (max - min + 1) / maxNumber;
    if (shouldFloor) {
        result = Math.floor(result);
    }
    return result;
}

const loadInto = (url, context) => new Promise((resolve, reject) => {
    let image = new Image();
    image.onload = () => {
        context.drawImage(image, 0, 0);
        resolve();
    };
    image.onerror = () => reject();
    image.src = url;
});

const getAvatarProps = (name) => {
    const hexMd5 = md5(name);
    const tail = getMd5Random(hexMd5, 0, 2, 9, 1);
    const hoop = getMd5Random(hexMd5, 2, 2, 10, 1);
    const body = getMd5Random(hexMd5, 4, 2, 9, 1);
    const wing = getMd5Random(hexMd5, 6, 2, 9, 1);
    const eyes = getMd5Random(hexMd5, 8, 2, 9, 1);
    const bec = getMd5Random(hexMd5, 10, 2, 9, 1);
    const accessorie = getMd5Random(hexMd5, 12, 4, 20, 1);

    // console.log(`${tail}-${hoop}-${body}-${wing}-${eyes}-${bec}-${accessorie}`);

    return { values: { tail, hoop, body, wing, eyes, bec, accessorie }, name };
}

const avatarGenerator = (element, name, props) => {
    let finalCanvas = null;
    props = props || {};

    let background = props.background || '#ffffff';
    let size = props.size || 256;
    let scale = null;
    if (size !== 256) {
        scale = size / 256;
    }

    if (element.tagName === 'CANVAS') {
        finalCanvas = element;
    } else {
        finalCanvas = document.createElement('canvas');
        finalCanvas.width = size;
        finalCanvas.height = size;
        element.appendChild(finalCanvas);
    }

    // I'm drawing in newCanvas, and the one shown is finalCanvas => it's to avoid element appearing one after another.
    let newCanvas = document.createElement('canvas');
    newCanvas.width = 256;
    newCanvas.height = 256;
    const context = newCanvas.getContext('2d');
    context.fillStyle = background;
    context.fillRect(0, 0, 256, 256);

    const avatarProps = getAvatarProps(name);

    let promise = Promise.resolve();

    Object.keys(avatarProps.values).forEach(key => {
        promise = promise.then(() => loadInto(`./img/${key}_${avatarProps.values[key]}.png`, context));
    });

    return promise.then(() => {
        finalCanvas.width = size;
        finalCanvas.height = size;
        let destContext = finalCanvas.getContext('2d');
        if (scale) {
            destContext.scale(scale, scale)
        }

        destContext.drawImage(newCanvas, 0, 0);
        finalCanvas.setAttribute('title', name)
    });
};
