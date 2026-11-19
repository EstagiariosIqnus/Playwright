import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  test.setTimeout(60000);
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
  await page.getByRole('textbox', { name: 'Data de nascimento:' }).click();
  await page.getByRole('textbox', { name: 'Data de nascimento:' }).click();
  await page.getByRole('textbox', { name: 'Data de nascimento:' }).fill('01/07/2027');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText('Sucesso!Cliente atualizado').first());
  await page.goto('https://roselanematostreinamento.botvendas.com/clients/3/edit?tab=client');
  await page.getByRole('textbox', { name: 'Data de nascimento:' }).click();
  await page.getByRole('textbox', { name: 'Data de nascimento:' }).fill('99/99/9999');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText('Sucesso!Cliente atualizado').first());
  await page.goto('https://roselanematostreinamento.botvendas.com/clients/3/edit?tab=client');
  await page.getByRole('textbox', { name: 'Data de nascimento:' }).click();
  await page.getByRole('textbox', { name: 'Data de nascimento:' }).click();
  await page.getByRole('textbox', { name: 'Data de nascimento:' }).fill('01/07/2008');
  await page.getByRole('button', { name: 'Salvar' }).click();
 
});