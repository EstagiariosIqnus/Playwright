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

  // CT09 – Send order summary:
  await page.getByText('Enviar resumo do pedido').first().click();
  await page.locator('#resume1').uncheck();
  await page.getByText('Enviar resumo do pedido').nth(4).click();
  await page.locator('#resume5').uncheck();
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.locator('body').press('F5');
  await page.getByText('Enviar resumo do pedido').nth(4).click();
  await page.locator('#resume5').check();
  await page.getByText('Enviar resumo do pedido').first().click();
  await page.locator('#resume1').check();
  await page.getByRole('button', { name: 'Salvar' }).click();

  // await page.getByText('Enviar boleto (integração com').nth(4).click();
  // await page.getByText('Enviar nota fiscal (integraçã').nth(4).click();
  
  // CT10 - Validação específica para "Enviar nota fiscal" (invoice5)
  await expect(page.locator('#invoice5')).toBeDisabled();
  await page.locator('label[for="invoice5"]').hover();
  await expect(page.getByText('Para enviar nota fiscal ou boletos é necessário que a integração com o ERP seja Integradora Botvendas')).toBeVisible();
});
