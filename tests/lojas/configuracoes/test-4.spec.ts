import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  // Recording...
  await page.locator('body').click();
  await page.goto('https://mariameiretreinamento.botvendas.com/login');
  await page.getByRole('textbox', { name: 'Login' }).fill('admin@iqnus.com.br');
  await page.getByRole('textbox', { name: 'Senha' }).fill('Bot@iq587!');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await page.getByRole('link', { name: ' Configurações ' }).click();
});