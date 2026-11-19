import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('about:blank');
  await page.goto('https://mariameiretreinamento.botvendas.com/login');
  await page.getByRole('textbox', { name: 'Login' }).fill('admin@iqnus.com.br');
  await page.getByRole('textbox', { name: 'Senha' }).click();
  await page.getByRole('textbox', { name: 'Senha' }).fill('Bot@iq587!');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await page.getByRole('link', { name: ' Lojas ' }).click();
  await page.getByRole('link', { name: ' Configurações' }).click();
  await page.getByText('Loja 02 await page.locator('input[name="cpf_cnpj"]').click();
  await page.locator('input[name="cpf_cnpj"]').fill('33.509.424/0001-35');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.getByRole('link', { description: 'editar', exact: true }).click();
  await page.locator('input[name="cpf_cnpj"]').click();
  await page.locator('input[name="cpf_cnpj"]').fill('335.094.24');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.getByText('Essa ação não pôde ser').click();
  await page.getByText('O campo cpf cnpj deve ter no').nth(1).click();
  await page.getByRole('button', { name: 'Salvar' }).click();(Matriz)Desconfig.(85) 3034-').click();
  await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/general?2=');

});