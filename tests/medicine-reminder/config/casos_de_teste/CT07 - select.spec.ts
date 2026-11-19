//CT07 – Selecionar e remover Lojas

import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('https://roselanematostreinamento.botvendas.com/login');
    await page.getByRole('textbox', { name: 'Login' }).fill('admin@iqnus.com.br');
    await page.getByRole('textbox', { name: 'Senha' }).click();
    await page.getByRole('textbox', { name: 'Senha' }).fill('Bot@iq587!');
    await page.getByRole('button', { name: 'Entrar' }).click();
    await page.getByText('Loja 1Desconfig.(85) 3034-').click();
    await page.goto('https://roselanematostreinamento.botvendas.com/dashboard');
    await page.getByRole('link', { name: ' Lembrete de medicamentos ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    //

    //seleciona as duas lojas
    await page.getByRole('searchbox', { name: 'Selecione...' }).click();
    await page.getByRole('option', { name: 'Loja 1' }).click();
    await page.getByRole('option', { name: 'Loja 2' }).click();
    await page.locator('form').filter({ hasText: 'Lembrete de medicamentoCom' }).click();
    await page.getByRole('button', { name: 'Salvar' }).click();
    await expect(page.getByText('Sucesso!', { exact: true }).first());
    await page.getByRole('searchbox').click();
    await page.locator('form').filter({ hasText: 'Lembrete de medicamentoCom' }).click();
    await page.getByRole('button', { name: 'Salvar' }).click();
    await expect(page.getByText('Sucesso!', { exact: true }).first());
  

});