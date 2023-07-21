const { test, expect } = require("@playwright/test");
const data = require('../data/data.json');
const { PublicMobileHome } = require('../pages/PublicMobileHome')
const { ShopSubscription } = require('../pages/ShopSubscription')
const { GetHelp } = require('../pages/GetHelp')



test.describe("Testing public Mobile", async () => {

  test('test on english version', async ({ page }) => {
    const publicMobileHome = new PublicMobileHome(page);
    const shopSubScription = new ShopSubscription(page);
    const getHelp = new GetHelp(page);

    await publicMobileHome.navigateToSiteInEnglish(data.URLEN)
    await publicMobileHome.verifyLinksTextOfFooter()
    await publicMobileHome.changeProvinceToAlberta();
    await publicMobileHome.clickShopLink();
  
    await shopSubScription.select3gPaymentPlan();
    await shopSubScription.select15USDPackage();
    await shopSubScription.clickOfferDetails();
    await page.waitForTimeout(5000)
    await shopSubScription.printNumberOfLinksOfOfferDetails();
    await shopSubScription.closeOfferDetails();
    await shopSubScription.clickGetHelp();
    await page.waitForTimeout(5000)
  
    await getHelp.searchHelpFieldWith("Plans");
    await getHelp.navigateToThirdLink();
  });

  test('test on french version', async ({ page }) => {
    const publicMobileHome = new PublicMobileHome(page);
    const shopSubScription = new ShopSubscription(page);
    const getHelp = new GetHelp(page);

    await publicMobileHome.navigateToSiteInFrench(data.URLFRENCH)
    await publicMobileHome.changeProvinceToAlberta();
    await publicMobileHome.clickShopLink();
  
    await shopSubScription.select3gPaymentPlan();
    await shopSubScription.select15USDPackage();
    await shopSubScription.clickOfferDetails();
    await page.waitForTimeout(5000)
    await shopSubScription.printNumberOfLinksOfOfferDetails();
    await shopSubScription.closeOfferDetails();
    await shopSubScription.clickGetHelp();
  
    await page.waitForTimeout(5000)
  
    await getHelp.searchHelpFieldWith("Plans");
    await getHelp.navigateToThirdLink();
  });

});
