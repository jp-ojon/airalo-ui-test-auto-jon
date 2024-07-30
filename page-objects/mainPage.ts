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

    async clickAcceptCookieButton() {
        await this.acceptCookieButton.waitFor({ state: 'visible' })
        await this.acceptCookieButton.click()
    }

    async clickPushNotificationsAllowButton() {
        await this.pushNotificationsAllowButton.waitFor({ state: 'visible' })
        await this.pushNotificationsAllowButton.click()
    }

    async clickVieweSIMStoreButton() {
        await this.vieweSIMStoreButton.waitFor({ state: 'visible' })
        await this.vieweSIMStoreButton.click()
    }

    async fillSearchInputField(value: string) {
        await this.searchInputField.fill(value)
    }

    async clickDestinationToSelect(value: string) {
        const xpathExpression = `//li/span[(text()="${value}")]`;
        this.destinationToSelect = this.page.locator(xpathExpression)
        await this.destinationToSelect.click()
    }
}