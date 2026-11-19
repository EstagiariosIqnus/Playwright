//CT12 - Dropdown Clube de vantagens:

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
  // ON
  const campoClubV = page.getByRole('combobox', {
    name: 'Clube de Vantagens'
  });
  await campoClubV.selectOption({ label: 'Ativo' });
  await page.getByRole('button', { name: 'Salvar' }).click();
  // await expect(page.getByText(/Sucesso!Cliente atualizado/i).first());
  await page.reload();
  await page.goto('https://roselanematostreinamento.botvendas.com/clients/3/edit?tab=client');
  await expect(campoClubV.locator('option:checked')).toHaveText('Ativo');
 //OFF
  await page.goto('https://roselanematostreinamento.botvendas.com/clients/3/edit?tab=client');
  await campoClubV.selectOption({ label: 'Desativado' })
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText(/Sucesso!Cliente atualizado/i).first());
  await page.reload();
  await page.goto('https://roselanematostreinamento.botvendas.com/clients/3/edit?tab=client');
  await expect(campoClubV.locator('option:checked')).toHaveText('Desativado');

});