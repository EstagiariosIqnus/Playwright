//CT05 - Formatação e validação de E-mail:

import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://roselanematostreinamento.botvendas.com/login');
  await page.getByRole('textbox', { name: 'Login' }).fill('admin@iqnus.com.br');
  await page.getByRole('textbox', { name: 'Senha' }).click();
  await page.getByRole('textbox', { name: 'Senha' }).fill('Bot@iq587!');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await page.getByText('Loja 1Desconfig.(85) 3034-').click();
  await page.goto('https://roselanematostreinamento.botvendas.com/dashboard');
  await page.getByRole('link', { name: ' Clientes ' }).click();
  await page.getByRole('link', { name: ' Cadastros' }).click();
  await page.goto('https://roselanematostreinamento.botvendas.com/clients/3/edit?tab=client');
  await page.getByRole('textbox', { name: 'E-mail:' }).click();
  await page.getByRole('textbox', { name: 'E-mail:' }).fill('cliente');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.getByText('Nome fantasia:').click(); //ele volta pra vc colocar o @gmail que falta
  await page.getByRole('textbox', { name: 'Nome fantasia:' }).click();
  await page.getByRole('textbox', { name: 'E-mail:' }).click();
  await page.getByRole('textbox', { name: 'E-mail:' }).click();
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.getByRole('textbox', { name: 'E-mail:' }).fill('cliente@gmail.com');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText('Sucesso!Cliente atualizado').first()).toBeVisible();


});