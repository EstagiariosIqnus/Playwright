import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  test.setTimeout(60000);
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

  // CT19 - Ativação do Preço Atacado
  await page.getByRole('checkbox', { name: /Ativar\/Desativar preço/i }).check({ force: true });
  await page.locator('input[name="wholesale_min_quantity"]').fill('10');
  await page.locator('input[name="wholesale_min_total"]').click();
  await page.locator('input[name="wholesale_min_total"]').fill('15,000');
  await page.locator('select[name="wholesale_days_length"]').selectOption('30');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/general?2=');
  await expect(page.getByRole('checkbox', { name: /Ativar\/Desativar preço/i })).toBeChecked();
  await expect(page.locator('input[name="wholesale_min_quantity"]')).toHaveValue('10');
  await expect(page.locator('input[name="wholesale_min_total"]')).toHaveValue(/150/);
  await expect(page.locator('select[name="wholesale_days_length"]')).toHaveValue('30');
  await page.locator('input[name="wholesale_min_quantity"]').fill('2');
  await page.locator('input[name="wholesale_min_total"]').fill('66,00');
  await page.locator('select[name="wholesale_days_length"]').selectOption('60');
  await page.getByRole('checkbox', { name: /Ativar\/Desativar preço/i }).uncheck({ force: true });
  await page.getByRole('button', { name: 'Salvar' }).click();

// CT20 - Validação de valores mínimos de atacado (Formatação R$)
  await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/general?2=');
  await page.getByRole('checkbox', { name: /Ativar\/Desativar preço/i }).check({ force: true });
  await page.locator('input[name="wholesale_min_total"]').fill('667,67,');
  await page.locator('input[name="wholesale_min_total"]').click();
  await page.locator('input[name="wholesale_min_total"]').fill('89.90');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/general?2=');
  // await expect(page.locator('input[name="wholesale_min_total"]')).toHaveValue('667,67,');
  await expect(page.locator('input[name="wholesale_min_total"]')).toHaveValue('89,90');
  await page.getByRole('button', { name: 'Salvar' }).click();

  
  await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/general?2=');

  // CT21 - Mapeamento de Setor e Status Padrão (Loja Virtual)
  await page.locator('select[name="webapp_not_paid_sector_id"]').selectOption('10');
  await page.locator('select[name="webapp_not_paid_status"]').selectOption('8');
  await page.locator('select[name="webapp_paid_status"]').selectOption('2');
  await page.locator('select[name="webapp_not_paid_status"]').selectOption('2');
  await page.locator('div:nth-child(4) > .col-md-12').click();
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.locator('body').press('F5');
  await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/general?2=');
  await page.locator('select[name="webapp_not_paid_sector_id"]').click();
  await page.locator('select[name="webapp_not_paid_status"]').click();
  
  

});