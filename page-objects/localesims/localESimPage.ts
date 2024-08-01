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

    /**
     * This method will click the First Package List Buy Now Button on the local ESims page of the country
     */
    async clickFirstPackageListBuyNowButton() {
        await this.firstPackageListBuyNowButton.waitFor({ state: 'visible' })
        await this.firstPackageListBuyNowButton.click()
        await this.page.waitForLoadState('load')
    }
}