import { Locator, Page } from "@playwright/test"

export class LocalESimPopupPage {
    page: Page
    simPackageHeader: Locator
    simPackageTitle: Locator
    simPackageDetail: Locator


    constructor(page: Page) {
        this.page = page
        this.simPackageHeader = this.page.locator('//div[@data-testid="sim-detail-header"]')
        this.simPackageTitle = this.page.locator('//div[@data-testid="sim-detail-operator-title"]//p')
    }

    async getSimPackageHeaderValue() {
        await this.page.waitForLoadState('load')
        await this.simPackageTitle.waitFor({ state: 'visible', timeout: 10000 })
        return await this.simPackageTitle.innerText()
    }

    async getSimPackageDetailValue(value: string) {
        const upperValue = value.toUpperCase()
        const xpathExpression = `//p[text()="${upperValue}"]/following-sibling::p`;
        this.simPackageDetail = this.simPackageHeader.locator(xpathExpression)
        await this.page.waitForLoadState('load')
        await this.simPackageDetail.waitFor({ state: 'visible', timeout: 10000 })
        return this.simPackageDetail.innerText()
    }
}