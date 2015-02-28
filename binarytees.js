var URL = "http://localhost/~georgesomerville/BinaryTees/binarytees/index.php",
    SUBMIT_TYPE = "[type=submit]",
    CKO_PAYNOW_CLASS = ".cko-pay-now"


var Cards = {
    'success': {
        'visa': {
            CARD_NUMBER: "4242 4242 4242 4242",
            EXPIRY_MONTH: "06",
            EXPIRY_YEAR: "18",
            CVV: "100"
        },

    },
    'fail': {
        'visa': {
            INCORRECT_CARD_NUMBER: "4242 4242 4242 4242",
            INCORRECT_EXPIRY_MONTH: "01",
            INCORRECT_EXPIRY_YEAR: "17",
            INCORRECT_CVV: "999"
        }
    }
}

// [{

//     pan: '424242'
// }, {
//     pan
// }]
// }

function setUpBrowser(browser, url) {
    var b = browser
        .url(url)
        .execute("Checkout.addEventHandler(Checkout.Events.CARD_CHARGED, function(event) { console.log('event firing!');console.log(event); });", function(err, res) {
            console.log("safe execution working.")
        })
        .assert.title("BINARY TEES")
    return b
}

function fillInInformation(browser, cardNumber, expiryMonth, expiryYear, cvv) {
    browser.click('input[data-checkout=card-number]')
        .setValue('input[data-checkout=card-number]', cardNumber)
        .click('input[data-checkout=expiry-month]')
        .setValue('input[data-checkout=expiry-month]', expiryMonth)
        .click('input[data-checkout="expiry-year"]')
        .setValue('input[data-checkout=expiry-year]', expiryYear)
        .click('input[data-checkout="cvv"]')
        .setValue('input[data-checkout=cvv]', cvv)
        .click('.form-submit')
}

function clearValues(browser) {
    browser.waitForElementVisible('.cko-md-content', 10000)
        .clearValue('input[data-checkout=expiry-month]')
        .clearValue('input[data-checkout=expiry-year]')
        .clearValue('input[data-checkout=cvv]')
}

function verifyFlow(browser) {
    var VALID_PAYMENT_TOKEN_VALIDATION = /^(pay_tok_)(\w{8})-(\w{4})-(\w{4})-(\w{4})-(\w{12})$/,
        ABSOLUTE_URL_VALIDATOR = /^((http|https):\/\/)([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i
    browser.frameParent(function(err) {
        browser.waitForElementVisible('.payment-form', 10000)
            .waitForElementPresent("form input[name=cko-payment-token]", 10000)
            .getValue('form input[name=cko-payment-token]', function(value) {
                console.log("the value *****************", value.value);
                console.log(VALID_PAYMENT_TOKEN_VALIDATION.test(value.value));
            })
            .getAttribute('.payment-form', 'action', function(attribute) {
                console.log(attribute.value);
                console.log(ABSOLUTE_URL_VALIDATOR.test(attribute.value));
            })
    });
}



module.exports = {
    "BinaryTees URL Regex Test": function(browser) {
        // var Cards = globals.Cards
        // console.log(Cards)
        setUpBrowser(browser, URL)
            .windowHandle(function(handle) {
                browser.waitForElementVisible(CKO_PAYNOW_CLASS, 10000)
                    .click(CKO_PAYNOW_CLASS)
                    .waitForElementVisible('#cko-iframe-id', 10000)
                    .frame('cko-iframe-id') // NO ID NEEDED IN FRONT!
                fillInInformation(browser, Cards.success.visa.CARD_NUMBER, Cards.success.visa.EXPIRY_MONTH, Cards.success.visa.EXPIRY_YEAR, Cards.success.visa.CVV)
                browser.assert.valueContains('input[data-checkout=card-number]', Cards.success.visa.CARD_NUMBER)
                    .assert.valueContains('input[data-checkout=expiry-month]', Cards.success.visa.EXPIRY_MONTH)
                    .assert.valueContains('input[data-checkout=expiry-year]', Cards.success.visa.EXPIRY_YEAR)
                    .assert.valueContains('input[data-checkout=cvv]', Cards.success.visa.CVV)
                verifyFlow(browser);
            })
            .end();

    },
    "BinaryTees incorrect information Test": function(browser) {

        setUpBrowser(browser, URL)
            .windowHandle(function(handle) {
                browser.waitForElementVisible(CKO_PAYNOW_CLASS, 10000)
                    .click(CKO_PAYNOW_CLASS)
                    .waitForElementVisible('#cko-iframe-id', 10000)
                    .frame('cko-iframe-id') // NO ID NEEDED IN FRONT!
                fillInInformation(browser, Cards.fail.visa.INCORRECT_CARD_NUMBER, Cards.fail.visa.INCORRECT_EXPIRY_MONTH, Cards.fail.visa.INCORRECT_EXPIRY_YEAR, Cards.fail.visa.INCORRECT_CVV)
                browser.waitForElementVisible('div[class=msg-holder]', 10000)
                    .waitForElementVisible('span[class=circle]', 10000)
                    .assert.visible(".ckojs-cross")
                // .assert.visible("span[class=title]") // but => containes text, looks for website title
                .assert.containsText(".title", " ")
                    .assert.containsText(".text", " ")
                    .assert.valueContains(".btn", "Retry")
                    .assert.visible('.go-back')
                    .click('.go-back')
                clearValues(browser)
                fillInInformation(browser, Cards.success.visa.CARD_NUMBER, Cards.success.visa.EXPIRY_MONTH, Cards.success.visa.EXPIRY_YEAR, Cards.success.visa.CVV)
                verifyFlow(browser);
            })
            .end();
    }

}