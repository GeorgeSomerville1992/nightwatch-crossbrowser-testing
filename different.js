             // you can do it without callbacks... as it will run every statement step in line
             // browser
             //     .url("http://localhost/~georgesomerville/BinaryTees/binarytees/index.php")
             //     .execute("Checkout.addEventHandler(Checkout.Events.CARD_CHARGED, function(event) { console.log('event firing!');console.log(event); });", function(err, res) {
             //         console.log("safe execution working.")
             //     })
             //     .assert.title("BINARY TEES")
             //     .waitForElementVisible('.cko-pay-now', 10000)
             //     .click('.cko-pay-now')
             //     .waitForElementVisible('#cko-iframe-id', 10000)
             //     .frame('cko-iframe-id') // NO ID NEEDED IN FRONT!
             // .click('input[data-checkout=card-number]')
             //     .setValue('input[data-checkout=card-number]', '4242 4242 4242 4242')
             //     .assert.valueContains('input[data-checkout=card-number]', '4242 4242 4242 4242')
             //     .click('input[data-checkout=expiry-month]')
             //     .setValue('input[data-checkout=expiry-month]', '06')
             //     .assert.valueContains('input[data-checkout=expiry-month]', '06')
             //     .click('input[data-checkout="expiry-year"]')
             //     .setValue('input[data-checkout=expiry-year]', '18')
             //     .assert.valueContains('input[data-checkout=expiry-year]', '18')
             //     .click('input[data-checkout="cvv"]')
             //     .setValue('input[data-checkout=cvv]', '100')
             //     .assert.valueContains('input[data-checkout=cvv]', '100')
             //     .click('.form-submit')
             //     .frameParent()
             //     .waitForElementVisible('.payment-form', 10000)
             //     .waitForElementVisible("#cko-widget", 10000)
             //     .waitForElementPresent("input[type=hidden]", 10000)
             //     .getValue('.payment-form input[type=hidden]', function(err, value) {
             //         console.log("the value *****************", value);
             //         console.log(VALID_PAYMENT_TOKEN_VALIDATION.test(value))
             //     })
             //     .getAttribute('.payment-form', 'action', function(err, value) {
             //         console.log(value);
             //         console.log(ABSOLUTE_URL_VALIDATOR.test(value))
             //     })