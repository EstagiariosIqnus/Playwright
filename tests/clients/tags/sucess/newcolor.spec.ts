import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://roselanematostreinamento.botvendas.com/login');
  await page.getByRole('textbox', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Login' }).fill('admin@iqnus.com.br');
  await page.getByRole('textbox', { name: 'Login' }).press('Enter');
  await page.getByRole('textbox', { name: 'Senha' }).fill('Bot@iq587!');
  await page.getByRole('textbox', { name: 'Senha' }).press('Enter');
  await page.getByRole('link', { name: ' Clientes ' }).click();
  await page.getByRole('link', { name: ' Etiquetas' }).click();
  await page.locator('i.fa-edit, i.fa-pencil, i.fa-pen').first().click();
  await page.getByRole('textbox', { name: 'Nome da etiqueta' }).click();
  await page.getByRole('textbox', { name: 'Nome da etiqueta' }).fill('');
  await page.getByRole('textbox', { name: 'Nome da etiqueta' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Nome da etiqueta' }).fill('F');
  await page.getByRole('textbox', { name: 'Nome da etiqueta' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Nome da etiqueta' }).fill('F');
  await page.getByRole('textbox', { name: 'Nome da etiqueta' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Nome da etiqueta' }).fill('Fralda');
  await page.locator('#add-tag-modal').click();
  await page.locator('#add-tag-modal').click();
  await page.getByRole('button').filter({ hasText: /^$/ }).nth(3).click();
  await page.getByRole('button', { name: 'Salvar' }).click();
});