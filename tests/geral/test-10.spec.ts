import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('about:blank');
  await page.goto('https://mariameiretreinamento.botvendas.com/login');
  await page.getByRole('textbox', { name: 'Login' }).fill('admin@iqnus.com.br');
  await page.getByRole('textbox', { name: 'Senha' }).click();
  await page.getByRole('textbox', { name: 'Senha' }).fill('Bot@iq587!');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await page.getByRole('link', { name: ' Lojas ' }).click();
  await page.getByRole('link', { name: ' Configurações' }).click();
  await page.getByText('Loja 01Desconfig.(85) 3034-').click();
  await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/general?2=');

  // CT26 - Parte 1: Altera campos e recarrega sem salvar (verifica se descartou)
  await page.locator('input[name="company_name"]').fill('');
  await page.locator('input[name="company_name"]').fill('manos');
  await page.reload();
  await expect(page.locator('input[name="company_name"]')).not.toHaveValue('manos');

  await page.locator('input[name="name"]').fill('lojsijfgLoja 01');
  await page.locator('input[name="max_order_discount"]').fill('70');
  await page.reload();
  await expect(page.locator('input[name="name"]')).not.toHaveValue('lojsijfgLoja 01');
  await expect(page.locator('input[name="max_order_discount"]')).not.toHaveValue('70');

  // CT26 - Parte 2: Ativa opção do ERP, salva, valida e restaura desligando
  await page.getByText('Criar pedido automaticamente').first().click();
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.waitForLoadState('networkidle');

  await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/general?2=');
  await expect(page.locator('#webapp_not_paid_integrate_erp_toggle')).toBeChecked();

  // Desmarca e salva para voltar ao estado original
  await page.getByText('Criar pedido automaticamente').first().click();
  await page.getByRole('button', { name: 'Salvar' }).click();
});













//   await page.locator('input[name="company_name"]').click();
//   await page.locator('input[name="company_name"]').fill('');
//   await page.locator('input[name="company_name"]').click();
//   await page.locator('input[name="company_name"]').fill('manos');
//   await page.locator('input[name="company_name"]').press('F5');
//   await page.locator('input[name="company_name"]').click();
//   await page.locator('input[name="name"]').click();
//   await page.locator('input[name="name"]').fill('lojsijfgLoja 01');
//   await page.locator('input[name="max_order_discount"]').click();
//   await page.locator('input[name="max_order_discount"]').fill('7%0');
//   await page.locator('input[name="max_order_discount"]').press('F5');
//   await page.locator('input[name="name"]').click();
//   await page.locator('input[name="max_order_discount"]').click();
//   await page.getByText('Criar pedido automaticamente').first().click();
//   await page.locator('#webapp_not_paid_integrate_erp_toggle').check();
//   await page.getByRole('button', { name: 'Salvar' }).click();
//   await page.getByRole('link', { description: 'editar', exact: true }).click();
//   await page.getByText('Criar pedido automaticamente').first().click();
//   await page.locator('#webapp_not_paid_integrate_erp_toggle').uncheck();
// });await page.goto('about:blank');