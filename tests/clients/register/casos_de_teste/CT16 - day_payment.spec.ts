// CT16 - Campo Prazo de pagamento (dias):

import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  test.setTimeout(60000);
  await page.goto('https://roselanematostreinamento.botvendas.com/login');
  await page.getByRole('textbox', { name: 'Login' }).fill('admin@iqnus.com.br');
  await page.getByRole('textbox', { name: 'Senha' }).click();
  await page.getByRole('textbox', { name: 'Senha' }).fill('Bot@iq587!');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await page.getByText('Loja 1Desconfig.(85) 3034-').click();
  await page.goto('https://roselanematostreinamento.botvendas.com/contexts/contexts');
  await page.getByRole('link', { name: ' Clientes ' }).click();
  await page.getByRole('link', { name: ' Cadastros' }).click();
  await page.goto('https://roselanematostreinamento.botvendas.com/clients/3/edit?tab=client');
  await page.getByRole('textbox', { name: 'Prazo de pagamento (dias)  ' }).click();
  await page.getByRole('textbox', { name: 'Prazo de pagamento (dias)  ' }).fill('30');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText(/Sucesso!Cliente atualizado/i).first());
  await page.goto('https://roselanematostreinamento.botvendas.com/clients/3/edit?tab=client');
  await page.getByRole('textbox', { name: 'Prazo de pagamento (dias)  ' }).click();
  await page.getByRole('textbox', { name: 'Prazo de pagamento (dias)  ' }).fill('60');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText(/Sucesso!Cliente atualizado/i).first());
  await page.goto('https://roselanematostreinamento.botvendas.com/clients/3/edit?tab=client');
  await page.getByRole('textbox', { name: 'Prazo de pagamento (dias)  ' }).click();
  await page.getByRole('textbox', { name: 'Prazo de pagamento (dias)  ' }).fill('78');
  await page.getByRole('textbox', { name: 'Prazo de pagamento (dias)  ' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Prazo de pagamento (dias)  ' }).press('ArrowRight');
  await page.getByRole('textbox', { name: 'Prazo de pagamento (dias)  ' }).fill('');
  await page.getByRole('textbox', { name: 'Prazo de pagamento (dias)  ' }).press('Alt+2');
  await page.getByRole('textbox', { name: 'Prazo de pagamento (dias)  ' }).press('Alt+2');
  await page.getByRole('textbox', { name: 'Prazo de pagamento (dias)  ' }).press('Alt+5');
  await page.getByRole('textbox', { name: 'Prazo de pagamento (dias)  ' }).press('Alt+5');
  await page.getByRole('textbox', { name: 'Prazo de pagamento (dias)  ' }).press('Alt+5');
  await page.getByRole('textbox', { name: 'Prazo de pagamento (dias)  ' }).fill('5');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText(/Sucesso!Cliente atualizado/i).first());
  await page.goto('https://roselanematostreinamento.botvendas.com/clients/3/edit?tab=client');
  await page.getByRole('textbox', { name: 'Prazo de pagamento (dias)  ' }).click();
  await page.getByRole('textbox', { name: 'Prazo de pagamento (dias)  ' }).fill('');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText(/Sucesso!Cliente atualizado/i).first());


});