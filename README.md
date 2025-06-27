# Currency Converter Scraper

A lightweight web scraper built with Playwright that fetches real-time currency exchange rates from X-Rates.com.

## Overview

This scraper extracts currency conversion data by automating a browser to visit X-Rates.com and retrieve exchange rate information. It's designed to be fast, reliable, and easy to use from the command line.

## Features

- 🌐 Real-time currency conversion rates
- 🎯 Command-line interface with flexible parameters
- 🚀 Fast scraping using Playwright
- 📊 JSON output format
- 🔧 Configurable source/target currencies and amounts
- ⚡ Headless browser support (currently disabled for debugging)

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository or navigate to the scrapers directory
2. Install dependencies:

```bash
npm install playwright
```

3. Install Playwright browsers:

```bash
npx playwright install chromium
```

## Usage

### Basic Usage

```bash
node currency-play.js
```

This will convert 1 GBP to USD (default values).

### Custom Currency Conversion

```bash
node currency-play.js [FROM_CURRENCY] [TO_CURRENCY] [AMOUNT]
```

#### Examples

```bash
# Convert 100 EUR to USD
node currency-play.js EUR USD 100

# Convert 50 GBP to JPY
node currency-play.js GBP JPY 50

# Convert 1000 USD to CAD
node currency-play.js USD CAD 1000
```

### Output Format

The scraper returns JSON data with the following structure:

```json
{
  "text": "1 British Pound =",
  "result": "1.2750"
}
```

- `text`: Descriptive text from the conversion
- `result`: The converted amount (numeric string)

## Supported Currencies

The scraper supports all currency codes available on X-Rates.com, including but not limited to:

- **USD** - US Dollar
- **EUR** - Euro
- **GBP** - British Pound
- **JPY** - Japanese Yen
- **CAD** - Canadian Dollar
- **AUD** - Australian Dollar
- **CHF** - Swiss Franc
- **CNY** - Chinese Yuan
- And many more...

## Configuration

### Browser Settings

The scraper currently runs with:
- **Headless mode**: Disabled (set to `false` for debugging)
- **Viewport**: 1280x800 pixels
- **Timeout**: 10 seconds for selector waiting

To enable headless mode for production, modify the `setBrowser()` function:

```javascript
const browser = await chromium.launch({ headless: true });
```

### Timeout Configuration

To adjust the timeout for waiting for page elements:

```javascript
await page.waitForSelector(".ccOutputBx", { timeout: 15000 }); // 15 seconds
```

## Error Handling

The scraper includes comprehensive error handling:

- Network timeout errors
- Missing DOM elements
- Invalid currency codes
- Browser launch failures

Errors are logged to the console with descriptive messages.

## Technical Details

### Architecture

The scraper is organized into three main functions:

1. **`setBrowser()`** - Initializes the Playwright browser instance
2. **`navigateAndScrape()`** - Handles navigation and data extraction
3. **`main()`** - Orchestrates the scraping process and error handling

### Data Extraction

The scraper targets specific CSS selectors on X-Rates.com:
- `.ccOutputBx` - Main container for conversion results
- `.ccOutputTxt` - Descriptive text element
- `.ccOutputRslt` - Numeric result element
- `.ccOutputCode` - Currency code (removed from result)

## Troubleshooting

### Common Issues

1. **Browser launch fails**
   - Ensure Playwright browsers are installed: `npx playwright install`
   - Check if Chromium is available on your system

2. **Timeout errors**
   - Increase timeout value in `waitForSelector`
   - Check internet connection
   - Verify X-Rates.com is accessible

3. **Invalid currency codes**
   - Use standard 3-letter ISO currency codes
   - Check X-Rates.com for supported currencies

### Debug Mode

The scraper runs in visible browser mode by default for debugging. Watch the browser automation to identify issues with:
- Page loading
- Element selection
- Data extraction

## Performance

- **Average execution time**: 3-5 seconds
- **Memory usage**: ~50-100MB (including browser instance)
- **Rate limiting**: Respectful delays built into Playwright

## License

This project is part of the TripGenie application. Please refer to the main project license.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Dependencies

- **Playwright**: Web automation and scraping
- **Chromium**: Browser engine for automation

For complete dependency list, see `package.json` in the parent directory.

---

*Last updated: June 2025*
