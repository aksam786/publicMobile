const { expect } = require('@playwright/test');
const data = require('../data/data.json')
const fs = require("fs");

const path = ".//SelectedPlanScreenshot.png";

class ShopSubscription {
    constructor(page) {
        this.page = page;
    }

    async select3gPaymentPlan() {
        try {
            await this.page.locator('button[id="3G"]').click();  
        } catch (error) {
            console.log("Error in selecting 3g", error)
        }
    }

    async select15USDPackage() {
        try {
            await this.page.getByRole('heading', { name: '15' }).click();
            // // assertion if contents have changed or not
            // await this.page.locator('(//*[@data-testid="pm-plan-card"])[1]').screenshot({ path: 'SelectedPlanScreenshot.png' });
            // await expect(await this.page.locator('(//*[@data-testid="pm-plan-card"])[1]').screenshot()).toMatchSnapshot('planScreenshot.png');
            // await fs.unlinkSync(path);
        } catch (error) {
            console.log("Error in selecting 15 usd package", error)
        }
    }

    async clickOfferDetails() {
        try {
            console.log('Clicking Offer Details');
            await this.page.locator('[data-testid="offerDetailsBtn"]').click();
        } catch (error) {
            console.log("Error during clicking offer details", error)
        }
    }

    async printNumberOfLinksOfOfferDetails(){
        try {
            let Links = await this.page.locator('p').getByRole('link');
            let NoOfLinks = await Links.count();
            console.log("Number of links on offer details page = ", NoOfLinks)
        } catch(error) {
            console.log("Error during getting links on offer details", error)
        }
    }

    async clickGetHelp() {
        try {
            console.log('Clicking Get help');
            await this.page.waitForTimeout(3000);
            await this.page.locator('(//a[@data-testid="pm-link"])[7]').click({force: true});
        } catch (error) {
            console.log("Error clicking get help", error)
        }
    }

    async closeOfferDetails() {
        try {
            console.log('Close Offer Details');
            await this.page.getByRole('button', { name: 'Close' }).click();
        } catch (error) {
            console.log("Error closing offer details", error)
        }
    }
}
module.exports.ShopSubscription = ShopSubscription;