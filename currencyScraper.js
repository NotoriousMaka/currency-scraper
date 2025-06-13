import puppeteer from 'puppeteer';

function isValidCurrency(currency) {
    const validCurrencies = [
        "AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN",
        "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BRL", "BSD",
        "BTN", "BWP", "BYN", "BZD", "CAD", "CDF", "CHF", "CLP", "CNY", "COP",
        "CRC", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", "EGP", "ERN",
        "ETB", "EUR", "FJD", "FKP", "GBP", "GEL", "GGP", "GHS", "GIP", "GMD",
        "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF", "IDR", "ILS",
        "IMP", "INR", "IQD", "IRR", "ISK", "JEP", "JMD", "JPY", "KES", "KGS",
        "KHR", "KID", "KMF", "KRW", "KWD", "KYD", "KZT", "LAK", "LBP", "LKR",
        "LRD", "LSL", "LYD", "MAD", "MDL", "MGA", "MKD", "MMK", "MNT", "MOP",
        "MRU", "MUR", "MVR", "MWK", "MXN", "MYR", "MZN", "NAD", "NGN", "NIO",
        "NOK", "NZD", "OMR", "PAB", "PEN", "PGK", "PHP", "PKR", "PLN", "PYG",
        "QAR", "RON", "RSD", "RUB", "RWF", "SAR", "SBD", "SCR", "SDG", "SEK",
        "SGD", "SHP", "SLL", "SOS", "SRD", "SSP", "STN", "SYP", "SZL", "THB",
        "TJS", "TMT", "TND", "TOP", "TRY", "TTD", "TWD", "TZS", "UAH", "UGX",
        "USD", "UYU", "UZS", "VEF", "VND", "VUV", "WST", "XAF", "XAG", "XAU",
        "XCD", "XOF", "XPF", "YER", "ZAR", "ZMW", "ZWL"
    ];
    return validCurrencies.includes(currency.toUpperCase());
}


async function convertCurrency(sourceCurrency, targetCurrency, amount) {
    if (!isValidCurrency(sourceCurrency) || !isValidCurrency(targetCurrency)) {
        console.error("Invalid currency code entered.");
        return { convertedValue: null };
    }

    const url = `https://www.currency.wiki/${sourceCurrency.toLowerCase()}_${targetCurrency.toLowerCase()}?value=${amount}`;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        await page.goto(url, { waitUntil: 'domcontentloaded' });

        const convertedValue = await page.evaluate(() => {
            const convertedCurrencyElement = document.querySelector('.converted-currency');
            if (convertedCurrencyElement) {
                return convertedCurrencyElement.innerText.trim();
            }
            return null;
        });

        if (!convertedValue) {
            console.error(`Conversion rate not found for ${sourceCurrency} to ${targetCurrency}`);
            return { convertedValue: null };
        }

        console.log(`${amount} ${sourceCurrency} = ${convertedValue}`);
        return { convertedValue };

    } catch (error) {
        console.error('Error occurred during scraping:', error);
    } finally {
        await browser.close();
    }
}

const sourceCurrency = process.argv[2];
const targetCurrency = process.argv[3];
const amount = process.argv[4];

convertCurrency(sourceCurrency, targetCurrency, amount).then(result => {
    console.log(JSON.stringify(result));
});
