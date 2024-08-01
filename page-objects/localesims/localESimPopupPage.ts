import { Locator, Page } from "@playwright/test"
import { retryOperation } from '../../utilities/GeneralUtilities'

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

    /**
     * This method will get the Sim Package Header Value text. Retry Mechanism included.
     * @returns Sim Package Header Value text
     */
    async getSimPackageHeaderValue() {
        await this.page.waitForLoadState('load')

        let elementText = await retryOperation(async () => {
            await this.simPackageTitle.waitFor({ state: 'attached', timeout: 10000 })
            return await this.simPackageTitle.innerText()
        })
        return elementText
    }

    /**
     * This method will get the Sim Package Detail Value text, will get based on the "value" of the text identifying the criteria. Retry Mechanism included.
     * @param value 
     * @returns Sim Package Detail Value text
     */
    async getSimPackageDetailValue(value: string) {
        const upperValue = value.toUpperCase()
        const xpathExpression = `//p[text()="${upperValue}"]/following-sibling::p`
        //const fullXpathExpression = '//div[@data-testid="sim-detail-header"]'+ xpathExpression
        //await this.page.waitForSelector(fullXpathExpression, { state: 'attached', timeout: 10000 });

        let elementText = await retryOperation(async () => {
            this.simPackageDetail = this.simPackageHeader.locator(xpathExpression)
            await this.simPackageDetail.waitFor({ state: 'attached', timeout: 10000 })
            return this.simPackageDetail.innerText()
        })
        return elementText
    }
}