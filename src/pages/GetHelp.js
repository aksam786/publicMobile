const { expect } = require('@playwright/test');
const data = require('../data/data.json')

class GetHelp {
    constructor(page) {
        this.page = page;
    }

    async searchHelpFieldWith(text) {
        try {
            await this.page.locator('input[data-testid="article_search_autocomplete_test_input"]').click();
            await this.page.waitForTimeout(5000)
            await this.page.locator('input[data-testid="article_search_autocomplete_test_input"]').fill(text);
            await this.page.waitForTimeout(5000)

        } catch (error) {
            console.log("Error in searching help field", error)
        }
    }

    async navigateToThirdLink() {
        try {
            const parentList = await this.page.waitForSelector('ul[role="listbox"]');
            const liElements = await parentList.$$('li[role="option"]');

            // Check if there are at least three elements in the nested dropdown
            if (liElements.length >= 3) {
                // Select the third element (index 2) from the nested dropdown
                await liElements[2].click();
            } else {
                console.error('The nested dropdown does not have at least three elements.');
            }
            await this.page.waitForURL('**/articles/**'); // assert if user has navigated
            console.log("Ending test here")
        } catch (error) {
            console.log("Error in finding third link", error)
        }
    }
}
module.exports.GetHelp = GetHelp;