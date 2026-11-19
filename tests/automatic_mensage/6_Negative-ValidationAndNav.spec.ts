import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  test.setTimeout(60000);
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
  await page.getByRole('checkbox', { name: 'Mensagem automática de criação link de pagamento:' }).check({ force: true });
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(/auto-messages/);
  // 2. Restaura: desliga o switch novamente e salva
  await page.getByRole('checkbox', { name: 'Mensagem automática de criação link de pagamento:' }).uncheck({ force: true });
  // await page.getByLabel(/criação.*link de pagamento/i).uncheck({ force: true });
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.waitForLoadState('networkidle');

  // CT16 – Store switching in header
  await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/auto-messages?2');
  await expect(page.locator('#sale_created_auto_message_fieldset textarea').first()).toHaveValue('Voce {first_client_name} acabou de criar o pedido!');
  await page.locator('#navbar_shop_select').locator('visible=true').selectOption('3', { force: true });
  await page.waitForLoadState('networkidle');
  await expect(page.locator('#sale_created_auto_message_fieldset textarea')).not.toHaveValue('Voce {first_client_name} acabou de criar o pedido!');
  await page.waitForLoadState('networkidle');
  // 4. Restaura o contexto para a Loja 01
  await page.locator('#navbar_shop_select').locator('visible=true').selectOption('2', { force: true });
  await page.waitForLoadState('networkidle');

  // CT17 – Discarding unsaved changes
  await page.getByText('Voce {first_client_name}').click();
  await page.getByText('Voce {first_client_name}').fill('Texto temporário não salvo.');
  await page.getByRole('checkbox', { name: 'Preço de atacado' }).uncheck();
  await page.getByText('Voce {first_client_name}').fill('Texto temporário não salvo.');
  await page.getByRole('tab', { name: 'Geral' }).click();
  await page.getByRole('tab', { name: 'Mensagens automáticas' }).click();
  await page.getByText('Voce {first_client_name}').click();


});