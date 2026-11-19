import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  test.setTimeout(60000)
  await page.goto('https://roselanematostreinamento.botvendas.com/login');
  await page.getByRole('textbox', { name: 'Login' }).fill('admin@iqnus.com.br');
  await page.getByRole('textbox', { name: 'Senha' }).click();
  await page.getByRole('textbox', { name: 'Senha' }).fill('Bot@iq587!');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await page.getByText('Loja 1Desconfig.(85) 3034-').click();
  await page.goto('https://roselanematostreinamento.botvendas.com/dashboard');
  await page.getByRole('link', { name: '$ Cobrança ' }).click();
  await page.getByRole('link', { name: ' Configurações', exact: true }).click();
  await page.goto('https://roselanematostreinamento.botvendas.com/billings/config');
  await page.locator('input[name="billing_message_limit"]').click();
  await page.locator('input[name="billing_message_limit"]').fill('1000000');
  await page.getByRole('textbox', { name: 'Juros (Percentual):  ' }).click();
  await page.getByRole('textbox', { name: 'Juros (Percentual):  ' }).fill('100,00000');
  await page.getByRole('radio', { name: 'Multa (Valor Percentual):' }).check();
  await page.getByRole('textbox', { name: 'Multa (Valor Percentual):  ' }).click();
  await page.getByRole('textbox', { name: 'Multa (Valor Percentual):  ' }).fill('100,00000');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.getByText('Sucesso!', { exact: true }).click();
  await page.getByText('Configurações salvas com').click();
  await page.locator('input[name="billing_message_limit"]').click();
  await page.locator('input[name="billing_message_limit"]').fill('10000000000');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.getByText('× Essa ação não pôde ser').click();
  await page.getByText('Essa ação não pôde ser').click();
  await page.getByText('Server Error').click();
});