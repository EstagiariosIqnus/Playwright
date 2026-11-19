import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  test.setTimeout(60000);
  await page.goto('https://roselanematostreinamento.botvendas.com/login');
  await page.getByRole('textbox', { name: 'Login' }).fill('admin@iqnus.com.br');
  await page.getByRole('textbox', { name: 'Senha' }).click();
  await page.getByRole('textbox', { name: 'Senha' }).fill('Bot@iq587!');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await page.getByRole('link', { name: ' Clientes ' }).click();
  await page.getByRole('link', { name: ' Etiquetas' }).click();
  await page.locator('i.fa-edit, i.fa-pencil, i.fa-pen').first().click();
  await page.getByRole('textbox', { name: 'Mensagem para o cliente  ' }).click();
  await page.getByRole('textbox', { name: 'Mensagem para o cliente  ' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Mensagem para o cliente  ' }).fill('E');
  await page.getByRole('textbox', { name: 'Mensagem para o cliente  ' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Mensagem para o cliente  ' }).fill('Esse cliente costuma comprar apenas medicamentos. ');
  await page.getByRole('textbox', { name: 'Mensagem para o cliente  ' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Mensagem para o cliente  ' }).press('CapsLock');
  await page.getByRole('button', { name: 'Salvar' }).click();
});
//deu certo