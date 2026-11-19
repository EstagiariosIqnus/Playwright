//CT17 - Gerenciamento de Etiquetas:

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
  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByText('Medicamentos', { exact: true }).click();
  await expect(page.getByText('Sucesso! Etiqueta adicionada').first());
  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByText('Fralda', {exact: true}).click();
  await page.getByText('×').first().click();
  await expect(page.getByText('Sucesso! Etiqueta adicionada').first());
  await expect(page.getByText('Sucesso! Etiqueta removida').first());
  
});