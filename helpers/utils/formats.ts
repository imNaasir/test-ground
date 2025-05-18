// import { CurrencyProps } from "@stores/useCurrenciesStore";
import { CurrencyProps } from "@/stores/currencies/useCurrenciesStore";
import { useSystemSettingStore } from "@/stores/systemSettingStore";
import moment from "moment";
// import { useSystemSettingStore } from "@/stores/useSystemSettingStore"; // Import the store

// export const formatDigits = (amount: number): string => {
//     if (isNaN(amount) || amount === null || amount === undefined) {
//         return "0"; // Return "0" for invalid input
//     }

//     const roundedAmount = roundAmountBasedOnRules(amount); // Apply rounding rules
//     return addCommasToDecimalNumber(roundedAmount); // Format the number with commas
// };

// Use the store within the functions
export const formatDigits = (amount: number, name?: string): string => {
    const { data: systemSettings } = useSystemSettingStore.getState(); // Access system settings from the store

    // Check if system settings are loaded
    const numberFormat = systemSettings[0]?.numberFormat ?? "standard"; // Default to 'standard' if not set

    if (isNaN(amount) || amount === null || amount === undefined) {
        return "0"; // Return "0" for invalid input
    }

    const numStr = amount.toString();
    const [integerPart, decimalPart] = numStr.split(".");

    // Check if the decimal part exists
    if (decimalPart) {
        const leadingZeros = decimalPart.match(/^0+/); // Match leading zeros in the decimal part
        // If there are leading zeros
        if (leadingZeros) {
            const numberOfZeros = leadingZeros[0].length; // Count the number of leading zeros

            // Only apply the subscript if there are 4 or more leading zeros
            if (numberOfZeros >= 4) {
                const remainingDigits = decimalPart.substring(numberOfZeros, numberOfZeros + 2); // Get first 2 digits after zeros
                const subscriptDigit = getSubscript(numberOfZeros.toString()); // Convert zero count to subscript
                return `0.0${subscriptDigit}${remainingDigits}`; // Format as "0.0ₓₓ"
            }
        }
    }

    const roundedAmount = roundAmountBasedOnRules(amount, numberFormat); // Apply rounding rules
    return addCommasToDecimalNumber(roundedAmount); // Format the number with commas
};
// Helper function to convert digits to subscript
const getSubscript = (digits: string): string => {
    const subscriptMap: { [key: string]: string } = {
        "0": "₀",
        "1": "₁",
        "2": "₂",
        "3": "₃",
        "4": "₄",
        "5": "₅",
        "6": "₆",
        "7": "₇",
        "8": "₈",
        "9": "₉",
    };
    return digits
        .split("")
        .map((digit) => subscriptMap[digit] || digit)
        .join("");
};
// Function to round the amount based on the rules
const roundAmountBasedOnRules = (amount: number, numberFormat: string): number => {
    if (numberFormat === "currency") {
        return parseFloat(amount.toFixed(2)); // Apply rounding for currency (2 decimal places)
    }
    if (amount >= 100) return parseFloat(amount.toFixed(2));
    else if (amount >= 10) return parseFloat(amount.toFixed(4));
    // Adjust for other formats or defaults
    else return parseFloat(amount.toFixed(8)); // Default to 4 decimal places
};

// Helper function to format numbers with consistent decimal places
const addCommasToDecimalNumber = (num: number): string => {
    const [integerPart, decimalPart] = num.toString().split("."); // Split into integer and decimal parts
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add commas to the integer part

    // Ensure consistent decimal places based on the rules
    const decimalPlaces = num < 0 ? 6 : num < 100 ? 4 : 2;
    const paddedDecimalPart = (decimalPart || "").padEnd(decimalPlaces, "0"); // Pad with zeros if necessary

    return `${formattedInteger}.${paddedDecimalPart}`; // Combine integer and decimal parts
};

// export const formatNumbers = (currency: CurrencyProps, amount: number) => {
//     let points = currency?.decimalPoints ?? 5;

//     if (Number(currency?.decimalPoints) < 5 && currency?.abbreviation === "BTC") points = 6;

//     let formattedAmount = Number(amount).toFixed(points);

//     if (amount - Math.floor(amount) == 0) {
//         formattedAmount = Number(amount).toFixed(points);
//     }

//     return Number(formattedAmount);
// };

// Format numbers using the store settings (currency)
export const formatNumbers = (currency: CurrencyProps | null, amount: number) => {
    const { data: systemSettings } = useSystemSettingStore.getState(); // Access system settings
    // const points = systemSettings[0]?.numberFormat ;
    // const points = currency?.decimalPoints ?? systemSettings[0]?.numberFormat ?? 5;
    const points = 18;

    let formattedAmount = Number(amount).toFixed(Number(points));

    if (amount - Math.floor(amount) === 0) {
        formattedAmount = Number(amount).toFixed(Number(points));
    }

    return Number(formattedAmount);
};

// formatNumbers(number, digits = 0) {
//     number = Number(String(number).replace(/[^0-9\.-]+/g, ''))
//     if (digits == 0) {
//         let formatDigit = 4
//         const system_settings = this.$systemSetting[0]
//         if (system_settings) formatDigit = system_settings?.numberFormat ?? 2
//         return number.toFixed(formatDigit)
//     } else return number.toFixed(digits)
// },

export const formatCurrencyDigits = (amount: number, type: string) => {
    if (type == "crypto" || type == "sell") return amount.toFixed(6);
    if (type == "fiat" || type == "buy") return amount.toFixed(2);
};

export const formatDigitsWithAbbreviation = (currency: CurrencyProps | null, amount: number, isPrefix = true) => {
    let points = (currency?.decimalPoints || currency?.decimal_points) ?? 5;
    let formattedAmount = numberWithCommas(Number(amount).toFixed(points));

    if (amount - Math.floor(amount) == 0) formattedAmount = Number(amount).toFixed(points);

    return isPrefix ? formattedAmount + " " + currency?.abbreviation : currency?.abbreviation + " " + formattedAmount;
};

const numberWithCommas = (number: any) => {
    if (number !== undefined) {
        let numString = String(number);

        let parts = numString.split(".");
        let integerPart = parts[0];
        let decimalPart = parts[1];

        let formattedInteger = integerPart.replace(/\B(?=\d{3}(?!\d))/g, ",");

        if (decimalPart !== undefined) {
            return formattedInteger + "." + decimalPart;
        } else {
            return formattedInteger;
        }
    } else {
        return number;
    }
};

export const removeCommas = (number: any) => {
    return number.replace(/,/g, "");
};

// export const formatDate = (date: any) => {
//     return date ? moment(date).format("llll") : "";
// };

// Updated formatDate function using the store for settings
export const formatDate = (date: any, time = true) => {
    // Get system settings from the Zustand store
    const { data: systemSettings } = useSystemSettingStore.getState();

    if (date === undefined) {
        return date; // Return the original date if undefined
    }

    let dateFormat = time ? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD"; // Default format

    if (systemSettings.length > 0) {
        const systemSetting = systemSettings[0];

        // Check if system setting has a custom date format
        if (systemSetting.dateFormat !== undefined) {
            // Use the system date format and time format if provided
            dateFormat = time ? `${systemSetting.dateFormat} ${systemSetting.timeFormat}` : systemSetting.dateFormat;
        }
    }

    // Format the date using moment.js
    return moment(date).format(dateFormat);
};
interface Commission {
    rate: string;
    maximum: string;
    minimum: string;
    rate_type: string;
}

interface Tax {
    min: string;
    max: string;
    tax: string;
    tax_type: string;
}

export const calculateCommissionAndTax = (amount: number, commissions: Commission[] | null | undefined, taxes: Tax[] | null | undefined): { commission: number; tax: number } => {
    let commissionAmount = 0;
    let taxAmount = 0;

    // Calculate commission
    if (commissions) {
        for (const commission of commissions) {
            const minAmount = parseFloat(commission.minimum);
            const maxAmount = parseFloat(commission.maximum);
            if (minAmount <= amount && amount <= maxAmount) {
                const commissionRate = parseFloat(commission.rate);
                if (commission.rate_type === "$") {
                    commissionAmount = commissionRate;
                } else if (commission.rate_type === "%") {
                    commissionAmount = (commissionRate / 100) * amount;
                } else {
                    throw new Error("Unsupported commission rate type");
                }
                break;
            }
        }
    }

    // Calculate tax
    if (taxes) {
        for (const tax of taxes) {
            const minAmount = parseFloat(tax.min);
            const maxAmount = parseFloat(tax.max);
            if (minAmount <= amount && amount <= maxAmount) {
                const taxRate = parseFloat(tax.tax);
                if (tax.tax_type === "$") {
                    taxAmount = taxRate;
                } else if (tax.tax_type === "%") {
                    taxAmount = (taxRate / 100) * amount;
                } else {
                    throw new Error("Unsupported tax rate type");
                }
                break;
            }
        }
    }

    return { commission: commissionAmount, tax: taxAmount };
};

export const maskString = (inputString?: string, length = 14, cut = 7): string | undefined => {
    if (inputString !== undefined) {
        if (inputString?.length <= length) {
            return inputString;
        } else {
            const firstChars = inputString.substr(0, cut);
            const lastChars = inputString.substr(-cut);
            const maskedChars = "*".repeat(3); // Adjust this if you want to dynamically generate asterisks
            const maskedString = firstChars + maskedChars + lastChars;

            return maskedString;
        }
    }
};

export const splitAndCapitalize = (str: string) => {
    return str
        .replace(/(?!^)([A-Z])/g, " $1") // Insert space before capital letters (except the first)
        .split(" ") // Split the string into words
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
        .join(" "); // Join words back into a sentence
};

export const capitalize = (str: string | undefined | null): string => (str ? str.charAt(0).toUpperCase() + str.slice(1) : "");
