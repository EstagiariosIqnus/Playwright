//CT02 – Atualização ao vivo da "Pergunta de ativação"

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
    await page.getByRole('button').nth(2).click();
    await page.getByRole('textbox', { name: 'Mensagem de introdução *' }).click();
    await page.getByRole('textbox', { name: 'Mensagem de introdução *' }).click();
    //mensagem original
    const campoMensagem = page.getByRole('textbox', {
        name: 'Mensagem de introdução *' 
    });
    const mensagemOriginal = await campoMensagem.inputValue();
    console.log('Mensagem Original: ', mensagemOriginal);
    await page.getByRole('textbox', { name: 'Mensagem de introdução *' }).fill('Olá #first_client_name#, vi que no seu pedido existem medicamentos de uso contínuo. Você que eu te lembre de compra-los novamente?');
    await page.getByRole('textbox', { name: 'Mensagem de introdução *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem de introdução *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem de introdução *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem de introdução *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem de introdução *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem de introdução *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem de introdução *' }).press('ArrowLeft');


    //Nova mensagem
    await page.getByRole('textbox', { name: 'Mensagem de introdução *' }).fill('Olá #first_client_name#, vi que no seu pedido existem medicamentos de uso contínuo. Você gostaria que eu te lembre de compra-los novamente?');
    await page.getByRole('textbox', { name: 'Mensagem de introdução *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem de introdução *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem de introdução *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem de introdução *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem de introdução *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem de introdução *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem de introdução *' }).press('ArrowUp');
    await page.getByRole('textbox', { name: 'Mensagem de introdução *' }).press('ArrowDown');
    await page.getByRole('textbox', { name: 'Mensagem de introdução *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem de introdução *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem de introdução *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem de introdução *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem de introdução *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem de introdução *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem de introdução *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem de introdução *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem de introdução *' }).press('ArrowLeft');
    await page.getByRole('textbox', { name: 'Mensagem de introdução *' }).press('ArrowUp');
    await page.getByRole('textbox', { name: 'Mensagem de introdução *' }).press('ArrowDown');
    await page.getByRole('textbox', { name: 'Mensagem de introdução *' }).click();
    await page.getByRole('textbox', { name: 'Mensagem de introdução *' }).fill('Olá #first_client_name#, vi que no seu pedido existem medicamentos de uso contínuo. Você gostaria que eu te lembre de compra-los novamente no futuro?');
    const mensagemNova = await campoMensagem.inputValue();
    await page.locator('#active-reminder-modal').getByRole('button', { name: 'Salvar' }).click();
    await expect(page.getByText('Sucesso! Pergunta de ativação').first());
    await page.getByText('Olá #first_client_name#, vi').nth(1).click(); //mensagem nova na vizualiação 
    console.log('Mensagem Nova: ', mensagemNova); 


    //voltando pra mensagem original
    await page.getByRole('button').nth(2).click();
    await page.getByRole('textbox', { name: 'Mensagem de introdução *' }).click();
    await page.getByRole('textbox', { name: 'Mensagem de introdução *' }).fill('Olá #first_client_name#, vi que no seu pedido existem medicamentos de uso contínuo. Você quer que eu te lembre de compra-los novamente no futuro?');
    await page.getByRole('textbox', { name: 'Mensagem de introdução *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem de introdução *' }).click();
    await page.getByRole('textbox', { name: 'Mensagem de introdução *' }).press('ArrowLeft');
    await page.getByRole('textbox', { name: 'Mensagem de introdução *' }).fill('Olá #first_client_name#, vi que no seu pedido existem medicamentos de uso contínuo. Você quer que eu te lembre de compra-los novamente?');
    await page.getByRole('textbox', { name: 'Mensagem de introdução *' }).press('ArrowUp');
    await page.locator('#active-reminder-modal').getByRole('button', { name: 'Salvar' }).click();
    await page.getByText('Olá #first_client_name#, vi').nth(1).click(); //mensagem antiga na vizualição
    await expect(page.getByText('Sucesso! Pergunta de ativação').first());
  
});