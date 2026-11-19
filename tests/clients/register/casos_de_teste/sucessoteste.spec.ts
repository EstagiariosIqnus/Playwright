import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://roselanematostreinamento.botvendas.com/login');
  await page.getByRole('textbox', { name: 'Login' }).fill('admin@iqnus.com.br');
  await page.getByRole('textbox', { name: 'Senha' }).click();
  await page.getByRole('textbox', { name: 'Senha' }).fill('Bot@iq587!');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await page.getByText('Loja 1Desconfig.(85) 3034-').click();
  await page.getByText('Loja 1Desconfig.(85) 3034-').click();
  await page.getByText('Loja 1Desconfig.(85) 3034-').check();
  await page.goto('https://roselanematostreinamento.botvendas.com/dashboard');
  await page.getByRole('link', { name: ' Clientes ' }).click();
  await page.getByRole('link', { name: ' Cadastros' }).click();
  await page.getByRole('link', { description: 'Editar', exact: true }).click();
  await page.getByRole('textbox', { name: 'CPF/CNPJ:' }).click();
  await page.getByRole('textbox', { name: 'CPF/CNPJ:' }).fill('00.000.000/0000-00');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.getByRole('link', { description: 'Editar', exact: true }).click();
  await page.getByRole('link', { description: 'Editar', exact: true }).click();
  await page.getByRole('textbox', { name: 'CPF/CNPJ:' }).click();
  await page.getByRole('textbox', { name: 'CPF/CNPJ:' }).fill('000.000.00');
  await page.getByRole('button', { name: 'Salvar' }).click();
});