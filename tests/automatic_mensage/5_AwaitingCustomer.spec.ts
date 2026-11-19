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

// CT12 – First message configuration and wait time
  await page.getByText('Primeira mensagem:').click();
  await page.locator('#waiting_seller_auto_messages_0_text').click();
  await page.locator('#waiting_seller_auto_messages_0_text').fill('');
  await page.locator('#waiting_seller_auto_messages_0_text').click();
  await page.locator('#waiting_seller_auto_messages_0_text').fill('Olá! Ainda estamos aguardando você para finalizar seu atendimento.');
  await page.locator('#waiting_seller_auto_messages_0_text').click();
  await page.locator('.markdown-shortcuts > .list-inline > li > .fas').first().click();
  await page.locator('#waiting_seller_auto_messages_0_text').fill('Olá! Ainda estamos aguardando *você* para finalizar seu atendimento.');
  // 1. Clica no botão "Adicionar variável" da última seção (Aguardando atendimento)
  
  await page.getByText('Adicionar variável').last().click();

// 2. Aguarda o item aparecer na tela e clica nele
  await page.getByText('#two_client_name#').first().click();
//   await page.locator('.d-flex > .badge').click();
//   await page.getByText('#two_client_name#').click();
  await page.locator('#waiting_seller_auto_messages_0_minutes').click();
  await page.locator('#waiting_seller_auto_messages_0_minutes').fill('15');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.locator('body').press('F5');
  await page.locator('#waiting_seller_auto_messages_0_text').click();
  await page.getByText('260930-3ae002f7 Dashboard').click();
  await page.locator('#waiting_seller_auto_messages_0_text').fill('Aguardando cliente.');
  await page.locator('#waiting_seller_auto_messages_0_minutes').click();
  await page.locator('#waiting_seller_auto_messages_0_minutes').fill('30');
  await page.getByRole('button', { name: 'Salvar' }).click();

//   CT13 – Minutes field (Min) boundary validation

    await page.locator('#waiting_seller_auto_messages_0_minutes').click();
    await page.locator('#waiting_seller_auto_messages_0_minutes').fill('');
    await page.getByRole('button', { name: 'Salvar' }).click();
    await page.getByText('Essa ação não pôde ser').click();
    await page.getByText('Ocorreu um erro ao salvar as').click();
    // await page.locator('#waiting_seller_auto_messages_0_minutes').click();
    await page.locator('#waiting_seller_auto_messages_0_minutes').fill('0');
    await page.getByRole('button', { name: 'Salvar' }).click();
    await page.locator('#waiting_seller_auto_messages_0_minutes').fill('9');
    await page.getByRole('button', { name: 'Salvar' }).click();
    await page.waitForLoadState('networkidle');
    await expect(page.locator('#waiting_seller_auto_messages_0_minutes')).toHaveValue('9');
    await page.locator('#waiting_seller_auto_messages_0_minutes').fill('1440');
    await page.getByRole('button', { name: 'Salvar' }).click();
    await page.waitForLoadState('networkidle');
    await expect(page.locator('#waiting_seller_auto_messages_0_minutes')).toHaveValue('1440');
    await page.locator('#waiting_seller_auto_messages_0_minutes').fill('30');
    await page.getByRole('button', { name: 'Salvar' }).click();
    await page.waitForLoadState('networkidle');
    await expect(page.locator('#waiting_seller_auto_messages_0_minutes')).toHaveValue('30');

    // CT14 – Adding and removing sequential messages (+ button)
    await page.getByRole('button', { name: '+' }).click();
    await page.locator('#waiting_seller_auto_messages_1_text').click();
    await page.locator('#waiting_seller_auto_messages_1_text').fill('Ainda precisa de ajuda com o seu pedido?');
    await page.locator('#waiting_seller_auto_messages_1_minutes').click();
    await page.locator('#waiting_seller_auto_messages_1_minutes').fill('60');
    await page.getByRole('button', { name: 'Salvar' }).click();
    await page.locator('body').press('F5');
    await expect(page.locator('#waiting_seller_auto_messages_1_minutes')).toHaveValue('60');
    await page.getByText('Seu pedido está chegando!').click();
    await page.getByText('O endereço de entrega está').click();
    await page.locator('#waiting_seller_auto_messages_0_text').click();
    await expect(page.locator("#waiting_seller_auto_messages_1_text")).toHaveValue('Ainda precisa de ajuda com o seu pedido?');
    await page.locator('#waiting_seller_auto_messages_1_text').click();
    await page.locator('#waiting_seller_auto_messages_0_minutes').click();
    await page.locator('#waiting_seller_auto_messages_1_minutes').click();
    await page.getByRole('button').filter({ hasText: /^$/ }).first().click();
    await page.getByRole('button', { name: 'Salvar' }).click();
    await page.locator('body').press('F5');
    await page.locator('#waiting_seller_auto_messages_0_text').click();

});