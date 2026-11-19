import { test, expect } from '@playwright/test';

// CT12 - Limite de Descontos (Item, Total e Pagamento):
test('test', async ({ page }) => {
  test.setTimeout(60000);
  await page.goto('https://mariameiretreinamento.botvendas.com/login');
  await page.getByRole('textbox', { name: 'Senha' }).click();
  await page.getByRole('textbox', { name: 'Senha' }).fill('https://mariameiretreinamento.botvendas.com/contexts/contexts');
  await page.getByRole('textbox', { name: 'Senha' }).dblclick();
  await page.getByRole('textbox', { name: 'Senha' }).fill('Bot@iq587!');
  await page.getByRole('textbox', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Login' }).fill('admin@iqnus.com.br');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await page.getByText('Loja 01Desconfig.(85) 3034-').click();
  await page.goto('https://mariameiretreinamento.botvendas.com/contexts/contexts');
  await page.getByRole('link', { name: ' Lojas ' }).click();
  await page.getByRole('link', { name: ' Configurações' }).click();
  await page.goto('https://mariameiretreinamento.botvendas.com/contexts/contexts');
  await page.getByRole('link', { name: ' Lojas ' }).click();
  await page.getByRole('link', { name: ' Configurações' }).click();
  // await page.locator('div:nth-child(6)').click();

  // CT12 - Limite de Descontos (Item, Total e Pagamento)
  await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/general?2=');
  // await page.locator('input[name="max_discount_per_item"]').click();
  await page.locator('input[name="max_discount_per_item"]').fill('2%6');
  await page.locator('input[name="max_items_total_discount"]').click();
  await page.locator('input[name="max_items_total_discount"]').fill('2%0');
  await page.locator('input[name="max_order_discount"]').click();
  await page.locator('input[name="max_order_discount"]').fill('1%');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/general?2=');
  await page.locator('input[name="max_discount_per_item"]').click();
  await page.locator('input[name="max_items_total_discount"]').click();
  await page.locator('.row > div:nth-child(3)').first().click();
  await page.locator('input[name="max_discount_per_item"]').click();
  await page.locator('input[name="max_discount_per_item"]').click();
  await page.locator('input[name="max_discount_per_item"]').click();
  await page.locator('input[name="max_discount_per_item"]').click();
  await page.locator('input[name="max_discount_per_item"]').fill('20%0');
  await page.locator('input[name="max_items_total_discount"]').click();
  await page.locator('input[name="max_items_total_discount"]').fill('99%9');
  await page.locator('input[name="max_order_discount"]').click();
  await page.locator('input[name="max_order_discount"]').fill('99%9');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.getByText('O campo max items total').nth(1).click();
  await page.getByText('O campo max discount per item').nth(1).click();
  await page.getByText('O campo max order discount nã').nth(1).click();

// CT13 - Multi-seleção de gerentes que autorizam desconto:
  await page.getByRole('list').filter({ hasText: '×× Raquel Novais × Andreza' }).getByRole('searchbox').click();
  await page.getByRole('button', { name: 'Salvar' }).click();

// CT14 - Switches/Toggles de regras de negócio:

  // await page.getByText('Iniciar pedido pela filiação').click();
  await page.getByRole('checkbox', { name: 'Iniciar pedido pela filiação' }).check();
  // await page.getByText('Enviar marca na mensagem do').click();
  await page.getByRole('checkbox', { name: 'Enviar marca na mensagem do' }).check();
  // await page.getByText('Utilizar pós atendimento (').click();
  await page.getByRole('checkbox', { name: 'Utilizar pós atendimento (' }).check();
  await page.getByText('Pesquisa de produtos de outras lojas:').click();
  // await page.getByRole('checkbox', { name: 'Pesquisa de produtos de outras lojas:' }).check();
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/general?2=');
  // await expect(page.getByText(/Essa ação não p.de ser/i)).toBeVisible({ timeout: 5000 });
  await expect(page.getByText(/Essa ação não p.de ser/i).first());

  await expect(page.getByText(/Pelo menos uma loja deve ser/i).first());
  // await page.getByText('Pelo menos uma loja deve ser').nth(1).click();
  
// CT15 - Pesquisa de produtos de outras lojas:
  await page.getByText('Pesquisa de produtos de').click();
  await page.locator('.select2-selection--multiple').last().click();
  await page.getByRole('option', { name: 'Loja 02' }).click();

  // await page.getByText('Pesquisa de produtos de').click();
  // // await page.getByRole('checkbox', { name: 'Pesquisa de produtos de' }).check();
  // await page.getByRole('list').filter({ hasText: '×× Loja' }).getByRole('searchbox').click();
  await page.getByText('Loja 02', { exact: true }).last().click();
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/general?2=');
  await expect(page.getByText('Loja 02').last()).toBeVisible();

});