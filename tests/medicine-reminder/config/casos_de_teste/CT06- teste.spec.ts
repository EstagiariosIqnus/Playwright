//CT06 – Ligar e desligar o módulo lembrete de medicamento

import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://roselanematostreinamento.botvendas.com/login');
  await page.getByRole('textbox', { name: 'Login' }).fill('admin@iqnus.com.br');
  await page.getByRole('textbox', { name: 'Senha' }).click();
  await page.getByRole('textbox', { name: 'Senha' }).fill('Bot@iq587!');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await page.getByText('Loja 1Desconfig.(85) 3034-').click();
  await page.goto('https://roselanematostreinamento.botvendas.com/dashboard');
  await page.getByRole('link', { name: ' Lembrete de medicamentos ' }).click();
  await page.getByRole('link', { name: ' Configurações' }).click();
//

  //ativando
  await page.locator('label').first().click();
  // await page.getByRole('checkbox', { name: '×' }).check();
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText('Sucesso!', { exact: true }).first());
  //desativando
  await page.locator('label').first().click();
  // await page.locator('#is_active').uncheck();
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText('Sucesso!', { exact: true }).first());
  
});