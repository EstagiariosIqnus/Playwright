// CT03 – Atualização ao vivo da "Mensagem da campanha"

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

    await page.getByRole('button').nth(3).click();
    await page.getByRole('button', { name: 'close' }).click();
    await page.getByText('Oi, #first_client_name#. Tudo').first().click();
    await page.getByRole('button').nth(3).click();
    await page.getByRole('textbox', { name: 'Mensagem *' }).click();
    await page.getByRole('textbox', { name: 'Mensagem *' }).click();
    await page.getByRole('textbox', { name: 'Mensagem *' }).click();
    //
    const campoMensagemCampanha = page.getByRole('textbox' , {
        name: 'Mensagem *' 
    });
    const mensagemOriginal = await campoMensagemCampanha.inputValue();
    console.log('Mensagem Original: ', mensagemOriginal);
    await page.getByRole('textbox', { name: 'Mensagem *' }).fill('Oi, #first_client_name#. Tudo bem? Você me pediu pra te lembrar do seu medicamento. Se quiser ver o preço, clique no botão abaixo.'); //mensagem antiga
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowUp');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowLeft');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowLeft');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowLeft');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowLeft');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowLeft');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowLeft');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowLeft');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowLeft');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowLeft');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowLeft');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowLeft');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowLeft');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowLeft');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowLeft');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowLeft');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowLeft');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowLeft');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowLeft');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowLeft');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowLeft');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowLeft');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowLeft');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowLeft');
    await page.getByRole('textbox', { name: 'Mensagem *' }).click();
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem *' }).fill('Olá, #first_client_name#. Tudo bem? Você me pediu pra te lembrar do seu medicamento. Se quiser ver o preço, clique no botão abaixo.');
    await page.getByRole('textbox', { name: 'Mensagem *' }).click();
    await page.getByRole('textbox', { name: 'Mensagem *' }).fill('Olá, #first_client_name#. Tudo bem? Você havia me pediu pra te lembrar do seu medicamento. Se quiser ver o preço, clique no botão abaixo.');
    await page.getByRole('textbox', { name: 'Mensagem *' }).click();
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowLeft');


    //mensagem nova
    await page.getByRole('textbox', { name: 'Mensagem *' }).fill('Olá, #first_client_name#. Tudo bem? Você havia me pedido pra te lembrar do seu medicamento. Se quiser ver o preço, clique no botão abaixo.');
    const mensagemNova = await campoMensagemCampanha.inputValue();
    console.log('Mensagem Nova: ', mensagemNova);
    await page.locator('#reminder-submit').click();
    await page.getByText('Sucesso! Mensagem da campanha').click();
    await page.getByRole('button', { name: 'Salvar' }).click();
    await page.getByRole('button', { name: 'Salvar' }).click();
    await page.getByRole('button').nth(3).click();
    await page.getByRole('textbox', { name: 'Mensagem *' }).click();
    await page.getByRole('textbox', { name: 'Mensagem *' }).fill('Oi, #first_client_name#. Tudo bem? Você havia me pedido pra te lembrar do seu medicamento. Se quiser ver o preço, clique no botão abaixo.');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem *' }).click();
    await page.getByRole('textbox', { name: 'Mensagem *' }).fill('Oi, #first_client_name#. Tudo bem? Você havia me pedido pra te lembrar do seu medicamento. Se quiser ver o preço, clique no botão abaixo.');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowLeft');
    await page.getByRole('textbox', { name: 'Mensagem *' }).press('ArrowLeft');
    await page.getByRole('textbox', { name: 'Mensagem *' }).fill('Oi, #first_client_name#. Tudo bem? Você me pediu pra te lembrar do seu medicamento. Se quiser ver o preço, clique no botão abaixo.');
    //voltando pra mensagem original
    await page.getByRole('textbox', { name: 'Mensagem *' }).click();
    await page.getByRole('textbox', { name: 'Mensagem *' }).fill('Oi, #first_client_name#. Tudo bem? Você me pediu pra te lembrar do seu medicamento. Se quiser ver o preço, clica no botão abaixo.'); 
    await page.locator('#reminder-submit').click();
    await page.getByText('Oi, #first_client_name#. Tudo').nth(1).click();


    await page.getByRole('button').nth(3).click();
    await page.getByRole('textbox', { name: 'Mensagem *' }).click();
    await page.getByRole('textbox', { name: 'Mensagem *' }).click();

    await page.getByRole('button', { name: 'close' }).click();
    await page.getByText('Oi, #first_client_name#. Tudo').nth(1).click();


  
});