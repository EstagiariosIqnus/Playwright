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

  // CT15 – Switch enabled with empty message and template
  await page.getByText('Mensagem automática de criação link de pagamento:').click();
  await page.getByRole('checkbox', { name: 'Mensagem automática de criação link de pagamento:' }).check();
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(/auto-messages/);
  await page.getByText('Mensagem automática de criação link de pagamento:').click();
  await page.getByRole('checkbox', { name: 'Mensagem automática de criação link de pagamento:' }).uncheck();
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.waitForLoadState('networkidle');

  // CT16 – Store switching in header
  // CT16 – Store switching in header
  await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/auto-messages?2');
  await expect(page.locator('#sale_created_auto_message_fieldset textarea').first()).toHaveValue(/Voce acabou de criar o pedido/i);
  await page.getByText('Loja 01').first().click();
  await expect(page.locator('#sale_created_auto_message_fieldset textarea')).toHaveValue('Voce acabou de criar o pedido!');
  await page.getByText('Loja 01').first().click();
  await page.getByText('Loja 02').click();
  await page.waitForLoadState('networkidle');

  // 3. Garante que a página carregou as configurações independentes da nova loja sem erro
  await expect(page).not.toHaveURL(/auto-messages\?2$/);

  // 4. Restaura o contexto para a Loja 01
  await page.getByText('Loja 02').first().click();
  await page.getByText('Loja 01').click();
  await page.waitForLoadState('networkidle');

});