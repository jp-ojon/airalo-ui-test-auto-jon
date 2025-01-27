import { test, expect } from '@playwright/test'
import { PageObjectsManager } from '../../page-objects/pageObjectsManager'
import { readCSV } from '../../utilities/CSVReader';

interface TestData {
    country: string
    title: string
    coverage: string
    data: string
    validity: string
    price: string
}
let testData: TestData[]

test.describe('Esim Package Details Test', () => {

    test.beforeAll(async () => {
        // Load CSV data before running tests
        testData = await readCSV('testdata.csv')
        //** CSV reader used for long term plan to loop through all packages within the esim page of a country **/
    })


    test.beforeEach(async ({ page }) => {
        //Step 1: Navigate to website
        await page.goto('https://www.airalo.com/')
    })

    test('Test Case 1: Japan Esim Moshi Moshi first package', async ({ page }) => {
        const pom = new PageObjectsManager(page)

        //Optional steps
        await pom.mainPageObject().clickAcceptCookieButton()
        await pom.mainPageObject().clickPushNotificationsAllowButton()
        await pom.mainPageObject().clickVieweSIMStoreButton()

        //Step 2: Search for country on the search input field and then click the “Local” section -> country in the autocomplete options.
        await pom.mainPageObject().fillSearchInputField(testData[0].country)
        await pom.mainPageObject().clickDestinationToSelect(testData[0].country)
        let expectedURL = 'https://www.airalo.com/' + testData[0].country.toLowerCase() + '-esim'
        expect(await page.waitForURL(expectedURL))
        
        //Step 3: Select the first eSIM Package.
        await pom.localESimPageObject().clickFirstPackageListBuyNowButton()

        //Step 4: Verify Package Details.
        testData.forEach(async (testdata) => {
            let title = await pom.localESimPopupPageObject().getSimPackageHeaderValue()
            let coverage = await pom.localESimPopupPageObject().getSimPackageDetailValue('Coverage')
            let data = await pom.localESimPopupPageObject().getSimPackageDetailValue('Data')
            let validity = await pom.localESimPopupPageObject().getSimPackageDetailValue('Validity')
            let price = await pom.localESimPopupPageObject().getSimPackageDetailValue('Price')

            //Comparison not case-sensitive for flexibility.
            expect(title.toLowerCase()).toEqual(testdata.title.toLowerCase())
            expect(coverage.toLowerCase()).toEqual(testdata.coverage.toLowerCase())
            expect(data.toLowerCase()).toEqual(testdata.data.toLowerCase())
            expect(validity.toLowerCase()).toEqual(testdata.validity.toLowerCase())
            expect(price.toLowerCase()).toEqual(testdata.price.toLowerCase())
            //Create logs for debugging.
            console.log("Actual Title: " + title + ", Expected Title: " + testdata.title)
            console.log("Actual Coverage: " + coverage + ", Expected Coverage: " + testdata.coverage)
            console.log("Actual Data: " + data + ", Expected Data: " + testdata.data)
            console.log("Actual Validity: " + validity + ", Expected Validity: " + testdata.validity)
            console.log("Actual Price: " + price + ", Expected Price: " + testdata.price)
        })
    })
})