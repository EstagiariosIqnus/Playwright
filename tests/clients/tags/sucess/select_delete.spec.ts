import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://roselanematostreinamento.botvendas.com/login');
  await page.getByRole('textbox', { name: 'Login' }).fill('admin@iqnus.com.br');
  await page.getByRole('textbox', { name: 'Senha' }).click();
  await page.getByRole('textbox', { name: 'Senha' }).fill('Bot@iq587!');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await page.getByRole('link', { name: ' Clientes ' }).click();
  await page.getByRole('link', { name: ' Etiquetas' }).click();
  await page.locator('[id="1"]').getByRole('cell').filter({ hasText: /^$/ }).click();
  await page.getByRole('button', { description: 'Excluir', exact: true }).click();
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('1');
  await page.getByRole('button', { name: 'SIM, QUERO REMOVER' }).click();
});
