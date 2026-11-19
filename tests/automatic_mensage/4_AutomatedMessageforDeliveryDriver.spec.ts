import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://mariameiretreinamento.botvendas.com/login'); 
  await page.getByRole('textbox', { name: 'Login' }).fill('admin@iqnus.com.br');
  await page.getByRole('textbox', { name: 'Senha' }).click();
  await page.getByRole('textbox', { name: 'Senha' }).fill('Bot@iq587!');
  await page.getByRole('textbox', { name: 'Senha' }).press('Enter');
  await page.getByRole('link', { name: ' Lojas ' }).click();
  await page.getByRole('link', { name: ' Configurações' }).click();
  await page.getByText('Loja 01Desconfig.(85) 3034-').click();
  await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/general?2=');
  await page.getByRole('tab', { name: 'Mensagens automáticas' }).click();

// CT11 – Activation and template selection for delivery driver
  await page.getByText('Enviar mensagem automática').click();
  await page.getByRole('checkbox', { name: 'Enviar mensagem automática' }).check();
  await page.locator('.custom-control-label > .fa-stack').first().click();

  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.locator('body').press('F5');
  await page.getByText('Enviar mensagem automática').click();
  await expect(page.getByRole('checkbox', { name: 'Enviar mensagem automática' })).toBeChecked();

  await page.getByRole('checkbox', { name: 'Enviar mensagem automática' }).uncheck();
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.locator('body').press('F5');
  
});