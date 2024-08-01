import { Locator, Page } from "@playwright/test"

export class MainPage {
    page: Page
    readonly acceptCookieButton: Locator
    readonly pushNotificationsAllowButton: Locator
    readonly vieweSIMStoreButton: Locator
    readonly searchInputField: Locator
    destinationToSelect: Locator

    constructor(page: Page) {
        this.page = page
        this.acceptCookieButton = this.page.locator('button#onetrust-accept-btn-handler')
        this.pushNotificationsAllowButton = this.page.locator('button#wzrk-confirm')
        this.vieweSIMStoreButton = this.page.locator('//div[@id="ten-million-users-modal___BV_modal_content_"]//button[@type="button" and contains(text(), "VIEW eSIM STORE")]')
        this.searchInputField = this.page.locator('//input[@data-testid="search-input"]')
    }

    /**
     * This method will click the Accept Cookie Button during initial loading of main page. It will still proceed in case element does not appear
     */
    async clickAcceptCookieButton() {
        try {
            // Wait for the element to be visible
            await this.acceptCookieButton.waitFor({ state: 'visible'})
            // Perform the click operation
            await this.acceptCookieButton.click()
        } catch (error) {
            // Handle the error if the element does not appear or the click fails
            console.error('Error occurred while trying to click the element:', error)
        }
    }

    /**
     * This method will click the Push Notifications Allow Button during initial loading of main page. It will still proceed in case element does not appear
     */
    async clickPushNotificationsAllowButton() {
        try {
            // Wait for the element to be visible
            await this.pushNotificationsAllowButton.waitFor({ state: 'visible' })
            // Perform the click operation
            await this.pushNotificationsAllowButton.click()
        } catch (error) {
            // Handle the error if the element does not appear or the click fails
            console.error('Error occurred while trying to click the element:', error)
        }
    }

    /**
     * This method will click the View eSIM Store Button during initial loading of main page. It will still proceed in case element does not appear
     */
    async clickVieweSIMStoreButton() {
        try {
            // Wait for the element to be visible
            await this.vieweSIMStoreButton.waitFor({ state: 'visible' })
            // Perform the click operation
            await this.vieweSIMStoreButton.click()
        } catch (error) {
            // Handle the error if the element does not appear or the click fails
            console.error('Error occurred while trying to click the element:', error)
        }
    }

    /**
     * This method will fill the Search Input Field with a value
     * @param value 
     */
    async fillSearchInputField(value: string) {
        await this.searchInputField.fill(value)
    }

    /**
     * This mthod will click the Destination To Select based on the "value"
     * @param value 
     */
    async clickDestinationToSelect(value: string) {
        const xpathExpression = `//li/span[(text()="${value}")]`
        this.destinationToSelect = this.page.locator(xpathExpression)
        await this.destinationToSelect.click()
    }
}