//CT18 - Camawait page.getByText('Loja 1Desconfig.(85) 3034-').click();

//maximo de caracteres: 500

import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    test.setTimeout(60000);
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
    await page.getByRole('textbox', { name: 'Observações:' }).click();
    await page.getByRole('textbox', { name: 'Observações:' }).fill('Esse cliente costuma comprar fraldas, medicamentos, \n  produtos capilares e produtos para skincare. \n\n\n\n\n');
    await page.getByRole('textbox', { name: 'Observações:' }).click();
    await page.getByRole('textbox', { name: 'Observações:' }).fill('Esse cliente costuma comprar fraldas, medicamentos, \n  produtos capilares e produtos para skincare. 😀\n\n\n\n\n\n\n\n');
    await page.getByRole('button', { name: 'Salvar' }).click();
    await expect(page.getByText(/Sucesso!Cliente atualizado/i).first());
    await page.goto('https://roselanematostreinamento.botvendas.com/clients/3/edit?tab=client');
    await page.getByRole('textbox', { name: 'Observações:' }).click();
    // await page.getByText('Informações adicionais EtiquetasFralda× Observações: Esse cliente costuma').click();
    await page.getByRole('textbox', { name: 'Observações:' }).press('ControlOrMeta+a');
    await page.getByRole('textbox', { name: 'Observações:' }).press('ControlOrMeta+c');
    await page.getByRole('textbox', { name: 'Observações:' }).click();
    await page.getByRole('textbox', { name: 'Observações:' }).fill('Esse cliente costuma comprar fraldas, medicamentos, \n  produtos capilares e produtos para skincare. 😀Esse cliente costuma comprar fraldas, medicamentos, \n  produtos capilares e produtos para skincare. 😀Esse cliente costuma comprar fraldas, medicamentos, \n  produtos capilares e produtos para skincare. 😀Esse cliente costuma comprar fraldas, medicamentos, \n  produtos capilares e produtos para skincare. 😀Esse cliente costuma comprar fraldas, medicamentos, \n  produtos capilares e produtos para sk');
    await page.getByRole('textbox', { name: 'Observações:' }).press('ControlOrMeta+a');
    await page.getByRole('textbox', { name: 'Observações:' }).press('ControlOrMeta+c');
    await page.getByRole('textbox', { name: 'Observações:' }).click();
    await page.getByRole('button', { name: 'Salvar' }).click();
    await expect(page.getByText(/Sucesso!.*Cliente atualizado/i).first());
    await page.goto('https://roselanematostreinamento.botvendas.com/clients/3/edit?tab=client');
    await page.getByRole('textbox', { name: 'Observações:' }).click();
    await page.locator('textarea').click();
    await page.getByRole('textbox', { name: 'Observações:' }).fill('Esse cliente costuma comprar fraldas, medicamentos, \n  produtos capilares e produtos para skincare. ');
    await page.getByRole('textbox', { name: 'Observações:' }).press('Alt+2');
    await page.getByRole('textbox', { name: 'Observações:' }).press('Alt+2');
    await page.getByRole('textbox', { name: 'Observações:' }).press('Alt+2');
    await page.getByRole('textbox', { name: 'Observações:' }).press('Alt+2');
    await page.getByRole('textbox', { name: 'Observações:' }).press('Alt+1');
    await page.getByRole('textbox', { name: 'Observações:' }).press('Alt+1');
    await page.getByRole('textbox', { name: 'Observações:' }).press('Alt+1');
    await page.getByRole('textbox', { name: 'Observações:' }).fill('Esse cliente costuma comprar fraldas, medicamentos, \n  produtos capilares e produtos para skincare. \n');
    await page.getByRole('textbox', { name: 'Observações:' }).click();
    await page.getByRole('textbox', { name: 'Observações:' }).click();
    await page.getByRole('textbox', { name: 'Observações:' }).fill('Esse cliente costuma comprar fraldas, medicamentos, \n  produtos capilares e produtos para skincare. \n\n');
    await page.getByRole('button', { name: 'Salvar' }).click();
    await page.goto('https://roselanematostreinamento.botvendas.com/clients/3/edit?tab=client');
    await page.getByRole('textbox', { name: 'Observações:' }).click();
    await page.getByRole('textbox', { name: 'Observações:' }).press('ControlOrMeta+a');
    await page.getByRole('textbox', { name: 'Observações:' }).fill('');
    await page.getByRole('button', { name: 'Salvar' }).click();





});