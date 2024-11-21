// @ts-check
const { test, expect } = require('@playwright/test');

/* Exercise 3 - Go to the Google landing page, search for “Playwright getting started”, 
click on the Playwright Getting Started link and validate that we ended up there. */
/*test('Validate if we can get to Playrwright Getting Started page from google', async ({ page }) => {
    await page.goto('https://www.google.com/');

    await page.getByRole('button', {name: 'Zaakceptuj wszystko'}).click();

    await page.getByLabel('Szukaj', { exact: true }).fill("Playwright getting started");

    await page.keyboard.press("Enter");

    await page.getByRole('link', { name: 'Installation | Playwright' }).click();

    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();


  });
*/

test('Validate if we can end up to Playrwright Getting Started - 2', async ({ page }) => {
  await page.goto('https://www.google.com/');

  await page.locator("#L2AGLb").click();

  await page.locator("#APjFqb").fill("Playwright getting started");

  await page.keyboard.press("Enter");

  await page.getByRole('link', { name: 'Installation | Playwright' }).click();

  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();


});

/* Exercise 4 - It is possible to enter a new todo */
test('it is possible to enter a new todo', async ({ page }) => {
  let text = 'buy milk';
  await page.goto('https://todomvc.com/examples/react/dist/');

  await page.getByTestId("text-input").fill(text);
  /* Different locators to target the 'needs to be done' input box (like above):
  await page.getByPlaceholder("What needs to be done?");
  await page.getByLabel("New todo Input");

  await page.locator("[class='new-todo']");
  await page.locator("#todo-input");
  await page.locator("input");
  await page.locator("xpath=/html/body/section/header/div/input"); */

  await page.keyboard.press("Enter");

  await expect(page.getByTestId('todo-item-label')).toHaveText(text);
  await expect(page.getByTestId('todo-list')).toBeVisible();
});
