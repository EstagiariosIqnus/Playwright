import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://roselanematostreinamento.botvendas.com/');
});
