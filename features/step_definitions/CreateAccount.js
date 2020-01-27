const { setDefaultTimeout,Given, When, Then } = require('cucumber');
setDefaultTimeout(100*1000);
const assert = require('assert');
const driver = require('../../driver');
const chromeDriver = driver("chrome").chrome;
const {By, Key} = require("selenium-webdriver");

let testingData = {
    countElementsPlans: '',
    countDivDelivery:'',
    searchClassDayElement:'',
    searchHoursElement:'',
    searchResponseDoormansElement:'',
    searchClassResponseDoormansElement:'',
    searchButtonContinueElement:'',
    searchButtonsAddMealsElements:'',
    countButtonsAddMealsElements:'',
    randomFirstMeal:'',
    randomSecondMeal:'',
    randomThirdMeal:'',
    randomFourthMeal:''
};

Given('The user open {string}', async (url) => {
    await chromeDriver.get(url);

});

When("Enter the {int} and press on button GET 50 OFF", async function(sendValue) {
    const searchInputValueElement = await chromeDriver
        .findElement(By.id("zipcode1"));
    await searchInputValueElement.sendKeys(sendValue);

    const searchButtonElement = await chromeDriver
        .findElement(By.xpath("//button[contains (text(),'Get 50% off')]"));
    await searchButtonElement.click();
});

Then("The user must be taken to select the plan", async  function() {
    await chromeDriver.sleep(10000);
    const resultElements = await chromeDriver
        .findElements(By.xpath('//*[@id="root"]/div/div[3]/div/div[5]/div/child::div'));
    testingData.countElementsPlans = await resultElements.length;
    assert.equal(await testingData.countElementsPlans, 4);
});


When("When the user selected the plan 4 meals and press choose this plan", async function() {
    const searchPlanElement = await chromeDriver
        .findElement(By.xpath(`//*[@id="root"]/div/div[3]/div/div[5]/div/div[4]`));
    await searchPlanElement.click();
    const searchChoosePlanElement = await chromeDriver
        .findElement(By.xpath(`//button[contains (text(),'Choose this plan')]`));
    await searchChoosePlanElement.click();


});

Then("The user must be taken to select the options the preferences of delivery", async function() {
    const searchDivContentPlan = await chromeDriver
        .findElements(By.xpath(`//*[@id="root"]/div/div[3]/div/div[4]/div/child::div`));
    testingData.countDivDelivery = await searchDivContentPlan.length;
    assert.equal(await testingData.countElementsPlans, 4);
});

When("the user selected the Wednesday", async function() {
    const searchDayElement = await chromeDriver
        .findElement(By.xpath(`//*[@id="root"]/div/div[3]/div/div[4]/div/div[1]/div/div/div[4]/div`));
    await searchDayElement.click();
});

Then("The day Wednesday must be selected", async function() {
    const searchClassDayElement = await chromeDriver
        .findElement(By.xpath(`//*[@id="root"]/div/div[3]/div/div[4]/div/div[1]/div/div/div[4]/div`));
    testingData.searchClassDayElement = await searchClassDayElement.getAttribute("class");
    assert.equal(await testingData.searchClassDayElement, 'checkbox checked');
});

When("The user selected the range from hours 2:00 PM - 5:00 PM", async function() {
    const searchHoursElement = await chromeDriver
        .findElement(By.xpath(`//*[@id="root"]/div/div[3]/div/div[4]/div/div[2]/div/div/div[1]/div`));
    testingData.searchHoursElement = await searchHoursElement.getAttribute("class");

});

Then("The range from hours 2:00 PM - 5:00 PM must be selected", async function() {
    const searchClassHoursElement = await chromeDriver
        .findElement(By.xpath(`//*[@id="root"]/div/div[3]/div/div[4]/div/div[2]/div/div/div[1]/div`));
    testingData.searchClassHoursElement = await searchClassHoursElement.getAttribute("class");


    assert.equal(await testingData.searchClassHoursElement, 'checkbox checked');
});
When("The user indicates that {string}, it can be left with the doorman", async function(responseDoorman) {
    const searchResponseDoormansElement = await chromeDriver
        .findElement(By.xpath(`//span[contains (text(),'${responseDoorman}')]`));
    testingData.searchResponseDoormansElement = await searchResponseDoormansElement.click();

});

Then("The option {string} must be selected", async function(responseDoorman) {
    const searchClassResponseDoormansElement = await chromeDriver
        .findElement(By.xpath(`//span[contains (text(),'${responseDoorman}')]/parent::div`));
    testingData.searchClassResponseDoormansElement = await searchClassResponseDoormansElement.getAttribute("class");


    assert.equal(await testingData.searchClassResponseDoormansElement, 'doorman_option checked');
});
When("The user press on continue", async function() {
    const searchButtonContinueElement = await chromeDriver
        .findElement(By.xpath(`//*[@id="root"]/div/div[3]/div/div[5]/div/div[2]/button[2]/div/img`));
    testingData.searchButtonContinueElement = await searchButtonContinueElement.click();

});
//***

Then("The user must be taken to the selection of the meals of his preference", async function() {
    await chromeDriver.sleep(5000);
    const countMealsElements = await chromeDriver
        .findElements(By.xpath(`//*[@id="root"]/div/div[3]/div/div[5]/div[2]/div/child::article`));
    testingData.countMealsElements = await countMealsElements.length;
    let result;
    if(await testingData.countMealsElements >= 5) {result = true}
    assert.equal(await result,true);
});
When("The user must select the first meal of their choice", async function() {

    testingData.searchButtonsAddMealsElements = await chromeDriver
        .findElements(By.xpath(`//span[contains (text(),'Add')]`));
    testingData.countButtonsAddMealsElements = await testingData.searchButtonsAddMealsElements.length;
    testingData.randomFirstMeal = parseInt(await Math.random() * (await testingData.countButtonsAddMealsElements - 1) + 1);
    const buttonAdd  =  await testingData.searchButtonsAddMealsElements[testingData.randomFirstMeal];
    await chromeDriver.executeScript("arguments[0].click();", buttonAdd);
});

Then("The first meal must be selected", async function() {
    await chromeDriver.sleep(2000);
    let searchableQuantityElement = await chromeDriver
        .findElement(By.xpath(`//*[@id="root"]/div/div[3]/div/div[5]/div[2]/div/article[${testingData.randomFirstMeal+1}]/div[3]/div/div[3]/div[2]/div/div/div/div[2]`));
    let selectedQuantity = await searchableQuantityElement.getText();
    assert.equal(selectedQuantity, 1);
});

When("The user must select the second meal of their choice", async function() {

    testingData.randomSecondMeal = parseInt(await Math.random() * (testingData.countButtonsAddMealsElements - 1) + 1);
    const buttonAdd  =  await testingData.searchButtonsAddMealsElements[testingData.randomSecondMeal];
    await chromeDriver.executeScript("arguments[0].click();", buttonAdd);
});

Then("The second meal must be selected", async function() {
    let searchableQuantityElement = await chromeDriver
        .findElement(By.xpath(`//*[@id="root"]/div/div[3]/div/div[5]/div[2]/div/article[${testingData.randomSecondMeal+1}]/div[3]/div/div[3]/div[2]/div/div/div/div[2]`));
    let selectedQuantity = await searchableQuantityElement.getText();
    assert.equal(selectedQuantity, 1);
});
When("The user must select the third meal of their choice", async function() {

    testingData.randomThirdMeal = parseInt(await Math.random() * (testingData.countButtonsAddMealsElements - 1) + 1);
    const buttonAdd  =  await testingData.searchButtonsAddMealsElements[testingData.randomThirdMeal];
    await chromeDriver.executeScript("arguments[0].click();", buttonAdd);
});

Then("The third meal must be selected", async function() {
    let searchableQuantityElement = await chromeDriver
        .findElement(By.xpath(`//*[@id="root"]/div/div[3]/div/div[5]/div[2]/div/article[${testingData.randomThirdMeal+1}]/div[3]/div/div[3]/div[2]/div/div/div/div[2]`));
    let selectedQuantity = await searchableQuantityElement.getText();
    assert.equal(selectedQuantity, 1);
});
When("The user must select the fourth meal of their choice", async function() {

    testingData.randomFourthMeal = parseInt(await Math.random() * (testingData.countButtonsAddMealsElements - 1) + 1);
    const buttonAdd  =  await testingData.searchButtonsAddMealsElements[testingData.randomFourthMeal];
    await chromeDriver.executeScript("arguments[0].click();", buttonAdd);
});

Then("The fourth meal must be selected and press on continue", async function() {
    let searchableQuantityElement = await chromeDriver
        .findElement(By.xpath(`//*[@id="root"]/div/div[3]/div/div[5]/div[2]/div/article[${testingData.randomFourthMeal+1}]/div[3]/div/div[3]/div[2]/div/div/div/div[2]`));
    let selectedQuantity = await searchableQuantityElement.getText();
    assert.equal(selectedQuantity, 1);

    const searchButtonContinueElement = await chromeDriver
        .findElement(By.xpath(`//*[@id="root"]/div/div[3]/div/div[6]/div/div[2]/button[2]/div/img`));
    testingData.searchButtonContinueElement = await searchButtonContinueElement.click();
});

When("The user must be enter the first name", async function() {
    const searchInputFirstNameElement = await chromeDriver
        .findElement(By.id(`firstName`));
    await searchInputFirstNameElement.sendKeys("Noah")
});

When("The user must be enter the last name", async function() {
    const searchInputLastNameElement = await chromeDriver
        .findElement(By.id(`lastName`));
    await searchInputLastNameElement.sendKeys("Johnson")
});
When("The user must be enter the email", async function() {
    const searchInputEmailElement = await chromeDriver
        .findElement(By.id(`email`));
    await searchInputEmailElement.sendKeys("sandrajaimesduran@gmail.com")
});

When("The user must be enter the password and press on sign up with your email", async function() {
    const searchInputPasswordElement = await chromeDriver
        .findElement(By.id(`password`));
    await searchInputPasswordElement.sendKeys("Sandra2020")
});
