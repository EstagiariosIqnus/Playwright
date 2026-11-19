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
    
//   CT05 – Enable and disable switch:
  await page.getByText('Mensagem automática mudança de status (Abandonado):').click();
  await page.getByRole('checkbox', { name: 'Mensagem automática mudança de status (Abandonado):' }).uncheck();
  await page.getByText('Esta em abandono!').click();
  await page.locator('#abandoned_auto_message_fieldset').getByText('Adicionar variável').click();
  await page.locator('div:nth-child(4) > .custom-control > .d-flex').click();
  await page.getByText('Mensagem automática mudança de status (Abandonado):').click();
  await page.getByRole('checkbox', { name: 'Mensagem automática mudança de status (Abandonado):' }).check();
  await page.locator('#abandoned_auto_message_template_id-btn').click();
  await page.getByText('Esta em abandono!').click();
  await page.locator('#post_sale_auto_message_template_id-btn').click();
  await page.locator('#separated_in_store_auto_message_template_id-btn').click();
  

// CT07 – Text formatting (B, I, S, </>):
  await page.getByText('Esta em abandono!').click();
  await page.locator('div:nth-child(4) > .custom-control > .d-flex > .list-inline > li > .fas').first().click();
  await page.locator('div:nth-child(4) > .custom-control > .d-flex > .list-inline > li:nth-child(2) > .fas').click();
  await page.locator('div:nth-child(4) > .custom-control > .d-flex > .list-inline > li:nth-child(3) > .fas').click();
  
//   CT08 – Inserting dynamic variables (Add variable +):
  // await page.getByText('Voce acabou de criar o pedido!').click();
  await page.locator('#sale_created_auto_message_fieldset').getByText('Adicionar variável').click();
  await page.locator('.popover').getByText('{first_client_name}', { exact: true }).click();
  await page.getByRole('button', { name: 'Salvar' }).click();
  
});