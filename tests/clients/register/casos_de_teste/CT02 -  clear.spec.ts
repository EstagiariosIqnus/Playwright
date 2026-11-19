// CT02 - Validação de campo obrigatório em Nome/Razão Social:

import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
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
  await page.getByRole('textbox', { name: 'Nome/Razão social:' }).click();
  await page.getByRole('textbox', { name: 'Nome/Razão social:' }).press('ControlOrMeta+a');
  await page.getByRole('textbox', { name: 'Nome/Razão social:' }).fill('');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText('Essa ação não pôde ser').first());
  await expect(page.getByText('O campo name é obrigatório.').nth(2).first());
  await expect(page.getByText('× Essa ação não pôde ser').first()); 
  await expect(page.locator('#client').getByText('O campo name é obrigatório.').first());

});