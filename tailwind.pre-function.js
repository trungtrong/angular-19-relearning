/**
 * Src: Refer to: https://github.com/tailwindlabs/tailwindcss/issues/1232
 */
module.exports = class TailwindPreFunction {
    static isNumber(value) {
        return (
            value != null && typeof value === "number" && Number.isFinite(value)
        );
    }

    static setValueForConvertedPixelObject({ convertedPixelObject, value }) {
        convertedPixelObject[`${value}`] = `${value}px`;
    }

    /**
    * @param {number} fromNumber
    * @param {number} toNumber
    * @param {boolean} hasDefaultDecimalPart
    * @param {array} customNumbers
    * @returns {Object}
    */
    static generatePixelValues({
        fromNumber,
        toNumber,
        hasDefaultDecimalPart,
        customNumbers,
    }) {
        const convertedPixelObject = {};
        if (!arguments) {
            return convertedPixelObject;
        }
        // Create Object of values [fromNumber, toNumber]
        if (
            fromNumber != null &&
            toNumber != null &&
            this.isNumber(fromNumber) &&
            this.isNumber(toNumber) &&
            fromNumber <= toNumber
        ) {
            switch (true) {
                case fromNumber === toNumber:
                    this.setValueForConvertedPixelObject({
                        convertedPixelObject,
                        value: toNumber,
                    });
                    break;
                default:
                    for (let start = fromNumber; start <= toNumber; start++) {
                        this.setValueForConvertedPixelObject({
                            convertedPixelObject,
                            value: start,
                        });
                        if (hasDefaultDecimalPart) {
                            this.setValueForConvertedPixelObject({
                                convertedPixelObject,
                                value: start + 0.5,
                            });
                            this.setValueForConvertedPixelObject({
                                convertedPixelObject,
                                value: start + 0.75,
                            });
                        }
                    }
                    break;
            }
        }
        //
        if (!!customNumbers && Array.isArray(customNumbers) && customNumbers?.length > 0) {
            customNumbers.forEach((item) => {
                if (!this.isNumber(item)) {
                    return;
                }
                //
                this.setValueForConvertedPixelObject({
                    convertedPixelObject,
                    value: item,
                });
            });
        }
        //
        return convertedPixelObject;
    }
};
