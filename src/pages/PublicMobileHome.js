const { expect } = require('@playwright/test');
const data = require('../data/data.json')

class PublicMobileHome {
    constructor(page) {
        this.page = page;
    }

    async navigateToSiteInEnglish(url) {
        try {
            console.log('Entering URL: ', url);
            await this.page.goto(data.URLEN);
        } catch (error) {
            console.log("Error in opening url", error)
        }
    }

    async navigateToSiteInFrench(url) {
        try {
            console.log('Entering URL: ', url);
            await this.page.goto(data.URLFRENCH);
        } catch (error) {
            console.log("Error in opening url", error)
        }
    }

    async verifyLinksTextOfFooter(){
        try {
            console.log("Asseting Footer Link Texts")
            const footerLinkText = ['Shop','Subscription Plans','Pick up a SIM card','Download the app','Why Public', 'Why Choose Public','Rewards', 'Coverage','Get Help','Help Articles', 'Community', 'Start a Chat','Device Repair','Privacy and More','Accessibility', 'Service Terms', 'E911 Service','CRTC Wireless Code', 'Sign In', 'My Account','Instagram','Twitter','Youtube','facebook']
            await this.page.locator('footer').scrollIntoViewIfNeeded();
            const linksInFooter = await this.page.locator('footer').getByRole('link').count();
            for(let i = 0; i<=linksInFooter-2; i++){
                let linkText = await this.page.locator('footer').getByRole('link').nth(i);
                let linkTextInside = await linkText.innerText();
                await expect(linkTextInside).toEqual(footerLinkText[i])
            }
        } catch (error) {
            console.log("Error in scrolling into footer", error);
        }
    }

    async changeProvinceToAlberta() {
        try {
            
            if(await this.page.url() == data.URLEN){
                await this.page.getByRole('button', { name: 'en (on)' }).click();
                await this.page.locator('label').filter({hasText: 'Alberta'}).locator('span').click({force:true});
                await expect(this.page).toHaveURL("https://publicmobile.ca/en/ab/")
            }
            else if (await this.page.url() == data.URLFRENCH){
                await this.page.getByRole('button', { name: 'fr (on)' }).click();
                await this.page.locator('label').filter({hasText: 'Alberta'}).locator('span').click({force:true});
                await expect(this.page).toHaveURL("https://publicmobile.ca/fr/ab/")
            }
            
        } catch (error) {
            console.log("Error in changing province", error)
        }
    }

    async clickShopLink() {
        try {
            console.log('Clicking Shop Button');
            await this.page.locator('//a[@data-testid="pm-link"]/span').nth(0).click()
           // await this.page.getByTestId('headerLeftMenu').getByRole('link', { name: 'Shop' }).click();
        } catch (error) {
            console.log("Error during clicking shop button", error)
        }
    }
}
module.exports.PublicMobileHome = PublicMobileHome;