import { Locator, Page } from "@playwright/test"

export class LocalESimPage {
    page: Page
    readonly packageList: Locator
    readonly firstPackageListBuyNowButton: Locator


    constructor(page: Page) {
        this.page = page
        this.packageList = this.page.locator('//div[@class="package-list-wrapper"]')
        this.firstPackageListBuyNowButton = this.packageList.locator('//a//button[@type="button"]').first()

    }

    async clickFirstPackageListBuyNowButton() {
        await this.firstPackageListBuyNowButton.waitFor({ state: 'visible' })
        await this.firstPackageListBuyNowButton.click()
        await this.page.waitForLoadState('load')
    }
}