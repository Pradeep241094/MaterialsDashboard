export const prependZeroForGivenDigits = (str, digit) => {
    const lengthOfNum = String(str).length;
    const lengthOfPrependingZeros = digit - lengthOfNum;
    let prependingString = new String('');
    for (let index = 0; index < lengthOfPrependingZeros; index++) {
        prependingString = prependingString.concat('0');        
    }
    return prependingString + String(str);
}