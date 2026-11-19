import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  test.setTimeout(60000);
  await page.goto('https://roselanematostreinamento.botvendas.com/login');
  await page.getByRole('textbox', { name: 'Login' }).fill('admin@iqnus.com.br');
  await page.getByRole('textbox', { name: 'Senha' }).click();
  await page.getByRole('textbox', { name: 'Senha' }).fill('Bot@iq587!');
  await page.getByRole('textbox', { name: 'Senha' }).press('Enter');
  await page.getByRole('link', { name: ' Clientes ' }).click();
  await page.getByRole('link', { name: ' Cadastros' }).click();
  await page.getByText('Loja 1Desconfig.(85) 3034-').check();
  await page.getByRole('link', { name: ' Clientes ' }).click();
  await page.getByRole('link', { name: ' Cadastros' }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: '3' }).click();
  const page1 = await page1Promise;
  await page1.getByRole('tab', { name: 'Lembretes ativados' }).click();
  await page1.getByRole('button', { name: '+ Novo Lembrete' }).click();
  await page1.getByRole('searchbox', { name: 'Selecione...' }).click();
  await page1.getByRole('option', { name: 'Loja 2' }).click();
  await page1.locator('#products-modal').click();
  await page1.getByText('××Loja').click();
  await page1.getByRole('option', { name: 'Loja 1' }).click();
  await page1.getByPlaceholder('Pesquisar...').click();
  await page1.getByPlaceholder('Pesquisar...').fill('');
  await page1.getByRole('button', { name: 'close' }).click();
});
//deu certo