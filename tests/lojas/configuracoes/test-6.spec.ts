import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://mariameiretreinamento.botvendas.com/login');
  await page.getByRole('textbox', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Login' }).fill('admin@iqnus.com.br');
  await page.getByRole('textbox', { name: 'Login' }).press('Enter');
  await page.getByRole('textbox', { name: 'Senha' }).click();
  await page.getByRole('textbox', { name: 'Senha' }).fill('Bot@iq587!');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await page.getByRole('link', { name: ' Lojas ' }).click();
  await page.getByRole('link', { name: ' Configurações' }).click();
  await page.getByText('Loja 1Desconfig.(85) 3034-').click();
  await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/general?2=');
  await page.locator('input[name="cpf_cnpj"]').click();
  await page.locator('input[name="cpf_cnpj"]').fill('');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.getByText('O campo CPF/CNPJ é obrigatório').nth(1).click();
  await page.getByText('Essa ação não pôde ser').click();
  await page.locator('#shop-form').getByText('O campo CPF/CNPJ é obrigatório').click();
})