function _intFloatFun(toParse,isInt){
    if (isInt) {
        return parseInt(toParse);
    }else{
        return parseFloat(toParse);
    }
}
/**
 *
 * @param A
 * @param B
 * @param isInt
 * @returns {number}
 */
function add(A,B,isInt=true) {
    let result = [];
    A += "";
    B += "";
    const l = -15;
    while (A !== "" && B !== "") {
        result.unshift(_intFloatFun(A.substr(l),isInt) + _intFloatFun(B.substr(l),isInt));
        A = A.slice(0, l);
        B = B.slice(0, l);
    }
    A += B;

    for(let i = result.length - 1; i > 0; i--) {
        result[i] += "";
        if (result[i].length > -l) {
            result[i - 1] += 1;
            result[i] = result[i].substr(1);
        } else {
            while (result[i].length < -l) {
                result[i] = "0" + result[i];
            }
        }
    }

    while (A && (result[0] + "").length > -l) {
        result[0] = (result[0] + "").substr(1);
        result.unshift(_intFloatFun(A.substr(l),isInt) + 1);
        A = A.slice(0, l);
    }

    if (A) {
        while ((result[0] + "").length < -l) {
            result[0] = "0" + result[0];
        }
        result.unshift(A);
    }

    if (result[0]) {
        result = result.join("");
    } else {
        result = "0";
    }

    return result;
}
/**
 *
 * @param A
 * @param B
 * @param isInt
 * @returns {number}
 */
function subtract(A,B,isInt=true){
    let result = [];
    (A += ""), (B += "");
    while (A[0] === "0") {
        A = A.substr(1);
    }
    while (B[0] === "0") {
        B = B.substr(1);
    }
    const l = -15;
    let N = "1";
    for (let i = 0; i < -l; i++) {
        N += "0";
    }
    N = _intFloatFun(N,isInt);
    while (A !== "" && B !== "") {
        result.unshift(_intFloatFun(A.substr(l),isInt) - _intFloatFun(B.substr(l),isInt));
        A = A.slice(0, l);
        B = B.slice(0, l);
    }
    if (A !== "" || B !== "") {
        let s = B === "" ? 1 : -1;
        A += B;
        while (A !== "") {
            result.unshift(s * _intFloatFun(A.substr(l),isInt));
            A = A.slice(0, l);
        }
    }
    while (result.length !== 0 && result[0] === 0) {
        result.shift();
    }
    let s = "";
    if (result.length === 0) {
        result = 0;
    } else if (result[0] < 0) {
        s = "-";
        for (let i = result.length - 1; i > 0; i--) {
            if (result[i] > 0) {
                result[i] -= N;
                result[i - 1]++;
            }
            result[i] *= -1;
            result[i] += "";
            while (result[i].length < -l) {
                result[i] = "0" + result[i];
            }
        }
        result[0] *= -1;
    } else {
        for (let i = result.length - 1; i > 0; i--) {
            if (result[i] < 0) {
                result[i] += N;
                result[i - 1]--;
            }
            result[i] += "";
            while (result[i].length < -l) {
                result[i] = "0" + result[i];
            }
        }
    }

    if (result) {
        while ((result[0] = _intFloatFun(result[0]),isInt) === 0) {
            result.shift();
        }
        result = s + result.join("");
    }
    return result;
}
export default {
    add,
    subtract
}


