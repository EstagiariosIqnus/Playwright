//CT01 – Carregamento inicial da tela

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
  await page.locator('label').first().click();
  await page.getByRole('checkbox', { name: '×' }).check();
  await page.locator('.icon').first().click();
  await page.locator('#is_active').uncheck();
  await page.getByRole('searchbox', { name: 'Selecione...' }).click();
  await page.getByRole('option', { name: 'Loja 2' }).click();
  await page.getByRole('option', { name: 'Loja 1' }).click();
  await page.getByRole('searchbox').click();
  await page.getByRole('combobox', { name: 'Selecione...' }).click();
  await page.getByRole('combobox', { name: 'Selecione...' }).click();
  await page.getByRole('button').nth(2).click();
  await page.getByRole('button', { name: 'close' }).click();
  await page.getByRole('button').nth(3).click();
  await page.getByRole('button', { name: 'close' }).click();
  await page.locator('label').nth(1).click();
  await page.getByRole('checkbox', { name: '✔' }).uncheck();
  await page.locator('label').nth(1).click();
  await page.locator('#send_campaign_automatically').check();
  await page.getByText('Texto').click();
  await page.getByRole('radio', { name: 'Texto' }).check();
  await page.getByText('PDF').click();
  await page.getByRole('radio', { name: 'PDF' }).check();
  await page.getByText('Imagem').click();
  await page.getByRole('radio', { name: 'Imagem' }).check();
  await page.getByRole('button', { name: 'Cancelar' }).click();
  await page.getByRole('button', { name: 'Cancelar' }).click();
  await page.getByRole('button', { name: 'Cancelar' }).press('ControlOrMeta+-');
  await page.getByRole('button', { name: 'Cancelar' }).press('ControlOrMeta++');
  await page.getByRole('button', { name: 'Cancelar' }).click({
    clickCount: 3
  });
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.getByText('Sucesso! Configurações do').click();
});