import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://roselanematostreinamento.botvendas.com/login');
  await page.getByRole('textbox', { name: 'Login' }).fill('admin@iqnus.com.br');
  await page.getByRole('textbox', { name: 'Senha' }).click();
  await page.getByRole('textbox', { name: 'Senha' }).fill('Bot@iq587!');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await page.getByText('Loja 1Desconfig.(85) 3034-').click();
  await page.getByText('Loja 1Desconfig.(85) 3034-').check();
  await page.goto('https://roselanematostreinamento.botvendas.com/dashboard');
  await page.getByRole('combobox').selectOption('2');
  await page.goto('https://roselanematostreinamento.botvendas.com/dashboard');
  await page.getByRole('combobox').selectOption('1');
  await page.goto('https://roselanematostreinamento.botvendas.com/dashboard');
  await page.getByRole('link', { name: ' Lojas ' }).click();
  await page.getByRole('link', { name: ' Configurações' }).click();
  await page.getByRole('link', { description: 'editar', exact: true }).click();
  await page.locator('input[name="name"]').click();
  await page.locator('input[name="name"]').fill('');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.locator('div:nth-child(4) > .col-md-12').click();
  await page.getByRole('button', { name: 'Salvar' }).click();
});