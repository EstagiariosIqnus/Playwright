import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('about:blank');
  await page.goto('https://roselanematostreinamento.botvendas.com/login');
  await page.getByRole('textbox', { name: 'Login' }).fill('admin@iqnus.com.br');
  await page.getByRole('textbox', { name: 'Login' }).press('ArrowDown');
  await page.getByRole('textbox', { name: 'Login' }).press('Tab');
  await page.getByRole('textbox', { name: 'Senha' }).fill('Bot@iq587!');
  await page.getByRole('textbox', { name: 'Senha' }).press('Enter');
  await page.getByRole('link', { name: ' Clientes ' }).click();
  await page.getByRole('link', { name: ' Cadastros' }).click();
  await page.getByText('Loja 1Desconfig.(85) 3034-').click();
  await page.getByText('Loja 1Desconfig.(85) 3034-').check();
  await page.goto('https://roselanematostreinamento.botvendas.com/clients/3/edit?tab=address');
  await page.getByRole('button', { name: ' Adicionar' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
});