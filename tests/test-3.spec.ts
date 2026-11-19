import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://mariameiretreinamento.botvendas.com/login');
  await page.getByRole('textbox', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Login' }).fill('admin@iqnus.com.br');
  await page.getByRole('textbox', { name: 'Senha' }).click();
  await page.getByRole('textbox', { name: 'Senha' }).fill('Bot@iq587!');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await page.getByText('Loja 01Desconfig.(85) 3034-').click();
  await page.getByText('Loja 01Desconfig.(85) 3034-').check();
  await page.goto('https://mariameiretreinamento.botvendas.com/contexts/contexts');
  await page.getByRole('link', { name: ' Lojas ' }).click();
  await page.getByRole('link', { name: ' Configurações' }).click();
  await page.getByRole('link', { description: 'editar', exact: true }).click();
  await page.locator('select[name="shop_type"]').selectOption('drugstore');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.getByRole('link', { description: 'editar', exact: true }).click();
  await page.locator('select[name="shop_type"]').selectOption('clothing store');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.getByRole('link', { description: 'editar', exact: true }).click();
  await page.locator('select[name="shop_type"]').selectOption('drugstore');
  await page.getByRole('button', { name: 'Salvar' }).click();
});