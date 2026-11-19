import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://mariameiretreinamento.botvendas.com/login');
  await page.getByRole('textbox', { name: 'Login' }).fill('admin@iqnus.com.br');
  await page.getByRole('textbox', { name: 'Senha' }).click();
  await page.getByRole('textbox', { name: 'Senha' }).fill('Bot@iq587!');
  await page.getByRole('textbox', { name: 'Senha' }).press('Enter');
  await page.getByText('Loja 01Desconfig.(85) 3034-').click();
  await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/general?2=');
  await page.getByRole('textbox', { name: ' Farmacêutico responsável:' }).click();
  await page.getByRole('textbox', { name: ' Farmacêutico responsável:' }).click();
  await page.getByRole('textbox', { name: ' Farmacêutico responsável:' }).fill('José Silva ');
  await page.getByRole('textbox', { name: ' CRF do farmacêutico respons' }).click();
  await page.getByRole('textbox', { name: ' CRF do farmacêutico respons' }).fill('1298000');
  await page.locator('.card > div:nth-child(4)').first().click();
  await page.getByRole('textbox', { name: ' Registro Sanitário:' }).click();
  await page.getByRole('textbox', { name: ' Registro Sanitário:' }).fill('12270');
  await page.getByRole('textbox', { name: ' Autorização de' }).click();
  await page.getByRole('textbox', { name: ' Autorização de' }).fill('6001');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.getByRole('link', { name: ' Lojas ' }).click();
  await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/general?2=');
  await page.getByRole('textbox', { name: ' Farmacêutico responsável:' }).click();
  await page.getByRole('textbox', { name: ' CRF do farmacêutico respons' }).click();
  await page.locator('.card > div:nth-child(4)').first().click();
  await page.getByRole('textbox', { name: ' Autorização de' }).click();
  await page.getByRole('button', { name: 'Salvar' }).click();
});