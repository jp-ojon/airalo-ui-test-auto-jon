import {Page} from '@playwright/test'
import {MainPage} from '../page-objects/mainPage'
import {LocalESimPage} from './localesims/localESimPage'
import {LocalESimPopupPage} from './localesims/localESimPopupPage'

export class PageObjectsManager{
    page: Page
    mainPage: MainPage
    localESimPage: LocalESimPage
    localESimPopupPage: LocalESimPopupPage

    constructor(page: Page){
        this.page = page
        this.mainPage = new MainPage(page)
        this.localESimPage = new LocalESimPage(page)
        this.localESimPopupPage = new LocalESimPopupPage(page)
    }

    mainPageObject(){
        return this.mainPage
    }

    localESimPageObject(){
        return this.localESimPage
    }

    localESimPopupPageObject(){
        return this.localESimPopupPage
    }
}