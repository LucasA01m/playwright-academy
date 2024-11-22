const { test, expect } = require('@playwright/test');

test('SCENARIO: User should be able to add a new todo.', async ({ page }) => {
    await test.step('GIVEN: User has opened the todomvc todos page.', async () => {

    });

    await test.step('WHEN: User types a new todo and submits it.', async () => {

    });

    await test.step('THEN: User should see the new todo was added.', async () => {

    });
});

test('SCENARIO: User should be able to see the completed tasks when “Completed” filter is selected.', async ({ page }) => {
    await test.step('GIVEN: User is on the todo page and has entered one todo that has been completed.', async () => {
        await page.goto('https://todomvc.com/examples/react/dist/');
        await page.getByTestId("text-input").fill('buy milk');
        await page.keyboard.press("Enter");
        await page.getByTestId('todo-item-toggle').click();
        await expect(page.getByTestId('todo-item-toggle')).toBeChecked();
    });

    await test.step('WHEN: User selects the “Completed” filter from the menu. ', async () => {
        await page.getByRole('link', { name: 'Completed' }).click();
        await expect(page).toHaveURL(/.*completed/);


    });

    await test.step('THEN: User is able to see the completed todo task.', async () => {
        await expect(page.getByTestId('todo-list')).not.toBeEmpty();
        const listTodos = await page.locator("[data-testid='todo-item-label']").allTextContents();
        console.log(listTodos);
        await expect(listTodos).toContain("buy milk");
        /* await page.getByRole('link', { name: 'Active' }).click();
        await expect(page.getByTestId('todo-list').toBeEmpty()); */
    });
});

// #1 - Done
test("SCENARIO: User should be able to filter between 'All', 'Active' and 'Completed' filters with desired results.", async ({ page }) => {
    await test.step('GIVEN: User has checked and unchecked items added to the todo list and is able to visualize them', async () => {
        const items = ['have lunch', 'do playwright tasks']
        await page.goto('https://todomvc.com/examples/react/dist/');
        for (let item in items) {
            await page.getByTestId("text-input").fill(items[item]);
            await page.keyboard.press("Enter");
        }
        await page.locator('div').filter({ hasText: 'have lunch' }).getByTestId('todo-item-toggle').click();
        await expect(page.locator('div').filter({ hasText: 'have lunch' }).getByTestId('todo-item-toggle')).toBeChecked
        await expect(page.getByTestId('todo-list')).toBeVisible();
    });

    await test.step('WHEN: When the user clicks in the "All" button', async () => {
        await page.getByRole('link', { name: 'All' }).click();

    });

    await test.step('THEN: The right visualization is shown', async () => {
        await expect(page.getByTestId('todo-list')).not.toBeEmpty();

    });

    await test.step('AND WHEN: When the user clicks in the "Completed" button', async () => {
        await page.getByRole('link', { name: 'Completed' }).click();
    });

    await test.step('THEN: The right visualization is shown', async () => {
        await expect(page).toHaveURL(/.*completed/);
        await expect(page.getByTestId('todo-list')).not.toBeEmpty();
    });

    await test.step('AND WHEN: When the user clicks in the "Active" button', async () => {
        await page.getByRole('link', { name: 'Active' }).click();
    });

    await test.step('THEN: The right visualization is shown', async () => {
        await expect(page).toHaveURL(/.*active/);
        await expect(page.getByTestId('todo-list')).not.toBeEmpty();
    });
});

// #2 - Done
test('SCENARIO: User should be able to remove the completed todos.', async ({ page }) => {
    const item = 'do task 2'
    await test.step('GIVEN: User has tasks in the list marked as "done"', async () => {
        await page.goto('https://todomvc.com/examples/react/dist/');
        await page.getByTestId("text-input").fill(item);
        await page.keyboard.press("Enter");
        await page.locator('div').filter({ hasText: item }).getByTestId('todo-item-toggle').click();
        await expect(page.getByTestId('todo-item-toggle')).toBeChecked();
    });

    await test.step('WHEN: User clicks the "check" in the task marked', async () => {
        await page.locator('div').filter({ hasText: item }).getByTestId('todo-item-toggle').click();
    });

    await test.step('THEN: The checkbox should be unmarked', async () => {
        await expect(page.locator('div').filter({ hasText: item }).getByTestId('todo-item-toggle')).not.toBeChecked();
    });
});

// #3
test('SCENARIO: User should be able to toggle multiple tasks as completed from complete all toggle.', async ({ page }) => {
    const items = ['have lunch', 'do playwright tasks', 'study javascript', 'read emails', 'write thesis'];

    await test.step('GIVEN: User has multiple unchecked tasks', async () => {
        await page.goto('https://todomvc.com/examples/react/dist/');
        for (let index = 0; index < items.length; index++) {
            await page.getByTestId("text-input").fill(items[index]);
            await page.keyboard.press("Enter");
            await expect(page.getByTestId('todo-list')).toContainText(items[index]);
            //expect(page.locator('div').filter({ hasText: items[index] }).getByTestId('todo-item-toggle')).not.toBeChecked();
        }
        expect(page.getByTestId('todo-list')).toBeVisible();
        await expect(page.locator('span')).toContainText(String(items.length));
    });

    await test.step('WHEN: User clicks the "Complete all" button', async () => {
        await page.getByTestId("toggle-all").click();
    });

    await test.step('THEN: All unchecked tasks should be checked as completed', async () => {
        await expect(page.locator('span')).toContainText('0');
    });
});

// #4
test('SCENARIO: User should be able to remove an added todo with x icon.', async ({ page }) => {
    await test.step('GIVEN: User has a item in the list', async () => {
        await page.goto('https://todomvc.com/examples/react/dist/');

        await page.getByTestId("text-input").fill('buy milk');
        await page.keyboard.press("Enter");
    });

    await test.step('WHEN: User clicks the x button to delete', async () => {
        await page.getByTestId('todo-item').first().hover();
        await page.getByTestId('todo-item-button').first().click();
    });

    await test.step('THEN: The item should disappear', async () => {
        await expect(page.getByTestId("toggle-all")).not.toBe();
    });
});

// #5
test('SCENARIO: User should be able to uncheck a completed todo item from todo list that has multiple items.', async ({ page }) => {
    const items = ['have lunch', 'do playwright tasks', 'study javascript', 'read emails', 'write thesis'];
    await test.step('GIVEN: User hasmultiple items added to the list', async () => {
        await page.goto('https://todomvc.com/examples/react/dist/');
        for (let index = 0; index < items.length; index++) {
            await page.getByTestId("text-input").fill(items[index]);
            await page.keyboard.press("Enter");
            expect(page.locator('div').filter({ hasText: items[index] }).getByTestId('todo-item-toggle')).not.toBeChecked
            await expect(page.getByTestId('todo-list')).toBeVisible();
        }
    });

    await test.step('WHEN: User clicks in an item checkbox', async () => {
        await page.getByTestId('todo-item-toggle').first().click();
    });

    await test.step('THEN: Only checked item should be checked', async () => {
        for (let index = 0; index < items.length; index++) {
            if (index == 0) {
                expect(page.locator('div').filter({ hasText: items[index] }).getByTestId('todo-item-toggle')).toBeChecked
            }
            expect(page.locator('div').filter({ hasText: items[index] }).getByTestId('todo-item-toggle')).not.toBeChecked
            await expect(page.getByTestId('todo-list')).toBeVisible();
        }
    });
});

// #6
test('SCENARIO: User should be able to edit existing todo item and change the name to a new one.', async ({ page }) => {
    const items = ['have lunch', 'do playwright tasks', 'study javascript', 'read emails', 'write thesis'];
    let original = '';
    await test.step('GIVEN: User has items added to the list', async () => {
        await page.goto('https://todomvc.com/examples/react/dist/');
        for (let index = 0; index < items.length; index++) {
            await page.getByTestId("text-input").fill(items[index]);
            await page.keyboard.press("Enter");
            expect(page.locator('div').filter({ hasText: items[index] }).getByTestId('todo-item-toggle')).not.toBeChecked
            await expect(page.getByTestId('todo-list')).toBeVisible();
        }
        original = await page.getByTestId('todo-item-label').first().textContent();
    });

    await test.step('WHEN: User edits and confirm the changes.', async () => {
        await page.getByTestId('todo-item').first().dblclick();
        await page.getByTestId('todo-list').getByTestId('todo-item').first().getByTestId('text-input').fill('changes');
        await page.keyboard.press("Enter");
    });

    await test.step('THEN: That item should be different', async () => {
        await expect(page.getByTestId('todo-item').first()).not.toContainText(original);
        await expect(page.getByTestId('todo-item').first()).toContainText('changes');
    });
});

// # Extra
test.skip('SCENARIO: User should be able to delete the completed tasks with the button "Clear Completed", and only them ', async ({ page }) => {
    let checked = 0;
    const items = ['have lunch', 'do playwright tasks', 'study javascript', 'read emails', 'write thesis'];

    await test.step('GIVEN: User has completed and not completed tasks in the list', async () => {
        await page.goto('https://todomvc.com/examples/react/dist/');
        for (let index = 0; index < items.length; index++) {
            await page.getByTestId("text-input").fill(items[index]);
            await page.keyboard.press("Enter");
            if (index % 2 == 0) {
                await page.locator('div').filter({ hasText: items[index] }).getByTestId('todo-item-toggle').click();
                expect(page.locator('div').filter({ hasText: items[index] }).getByTestId('todo-item-toggle')).toBeChecked
                checked++;
            } else {
                expect(page.locator('div').filter({ hasText: items[index] }).getByTestId('todo-item-toggle')).not.toBeChecked
            }
        }
        await expect(page.getByTestId('todo-list')).toBeVisible();
    });

    await test.step('WHEN: User clicks the buttons "Clear Completed" ', async () => {
        await page.getByRole('button', { name: 'Clear Completed' }).click();
    });

    await test.step('THEN: All the checked items should be deleted', async () => {
        // const not_checked = items.length - checked
        // await page.getByRole('link', { name: 'Completed' }).click();
        // for (i = 0; i < checked; i++) {

        // }
        //await expect(page.getByTestId('todo-list')).toHaveCount(items.length - checked);

        await page.getByRole('link', { name: 'Completed' }).click();
        await expect(page.getByTestId('todo-list')).toHaveCount(0);

        await page.getByRole('link', { name: 'Active' }).click();
        await expect(page.getByTestId('todo-list')).toHaveCount(items.length - checked);

    });

    //<li class="" data-testid="todo-item"> [...] </li> // list item class shows when they are checked or not
    //<span class="todo-count">2 items left!</span> // this tag shows how many items are not checked
});

