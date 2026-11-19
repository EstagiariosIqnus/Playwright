import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('about:blank');
  await page.goto('https://roselanematostreinamento.botvendas.com/login');
  await page.getByRole('textbox', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Login' }).fill('admin@iqnus.com.br');
  await page.getByRole('textbox', { name: 'Login' }).press('Tab');
  await page.getByRole('textbox', { name: 'Senha' }).fill('Bot@iq587!');
  await page.getByRole('textbox', { name: 'Senha' }).press('Enter');
  await page.getByRole('link', { name: ' Clientes ' }).click();
  await page.getByRole('link', { name: ' Cadastros' }).click();
  await page.getByRole('link', { name: ' Clientes ' }).click();
  await page.getByRole('link', { name: ' Cadastros' }).click();
  await page.getByRole('combobox').selectOption('1');
  await page.getByRole('link', { name: ' Clientes ' }).click();
  await page.getByRole('link', { name: ' Cadastros' }).click();
  await page.goto('https://roselanematostreinamento.botvendas.com/clients/3/edit?tab=client');
  await page.getByRole('textbox', { name: 'Data de nascimento:' }).click();
  await page.getByLabel('Outubro 4,').click();
  await page.getByRole('textbox', { name: 'Data de nascimento:' }).fill('04/10/2000');
  await page.getByRole('textbox', { name: 'E-mail:' }).click();
  await page.getByRole('textbox', { name: 'E-mail:' }).fill('teste@gmail.com');
  await page.getByLabel('Vendedor carteirizado:').selectOption('6');
  await page.getByRole('textbox', { name: 'Nível de pagamento  ' }).click();
  await page.getByRole('textbox', { name: 'Nível de pagamento  ' }).fill('1');
  await page.getByRole('textbox', { name: 'Prazo de pagamento (dias)  ' }).click();
  await page.getByRole('textbox', { name: 'Prazo de pagamento (dias)  ' }).fill('5');
  await page.getByRole('button', { name: 'Salvar' }).click();
});
//deu certo esse