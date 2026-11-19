import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('about:blank');
  await page.goto('https://roselanematostreinamento.botvendas.com/login');
  await page.getByRole('textbox', { name: 'Login' }).fill('admin@iqnus.com.br');
  await page.getByRole('textbox', { name: 'Senha' }).click();
  await page.getByRole('textbox', { name: 'Senha' }).fill('Bot@iq587!');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await page.getByText('Loja 1Desconfig.(85) 3034-').click();
  await page.goto('https://roselanematostreinamento.botvendas.com/dashboard');
  await page.getByRole('link', { name: ' Clientes ' }).click();
  await page.getByRole('link', { name: ' Cadastros' }).click();
  await page.goto('https://roselanematostreinamento.botvendas.com/clients/3/edit?tab=client');
  await page.getByRole('tab', { name: 'Endereços' }).click();
  await page.getByRole('button', { name: ' Adicionar' }).click();
  await page.getByRole('dialog', { name: 'Adicionar Endereço' }).locator('input[name="zipcode"]').click();
  await page.getByRole('dialog', { name: 'Adicionar Endereço' }).locator('input[name="zipcode"]').fill('60760-445');
  await page.getByRole('dialog', { name: 'Adicionar Endereço' }).click();
  await page.getByRole('dialog', { name: 'Adicionar Endereço' }).locator('input[name="number"]').click();
  await page.getByRole('dialog', { name: 'Adicionar Endereço' }).locator('input[name="number"]').fill('888');
  await page.getByRole('dialog', { name: 'Adicionar Endereço' }).locator('input[name="reference"]').click();
  await page.getByRole('dialog', { name: 'Adicionar Endereço' }).locator('input[name="reference"]').press('CapsLock');
  await page.getByRole('dialog', { name: 'Adicionar Endereço' }).locator('input[name="reference"]').fill('C');
  await page.getByRole('dialog', { name: 'Adicionar Endereço' }).locator('input[name="reference"]').press('CapsLock');
  await page.getByRole('dialog', { name: 'Adicionar Endereço' }).locator('input[name="reference"]').fill('Colegio');
  await page.getByRole('button', { name: 'Adicionar', exact: true }).click();
});
//deu "certo" (não aparece a mensagem de sucesso, mas ele realmente salvou o endereço)