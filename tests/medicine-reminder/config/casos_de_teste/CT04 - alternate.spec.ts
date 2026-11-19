//CT04 – Troca de formato do resumo na pré-visualização
//não terminado (quero aprender a fazer a persistencia mesmo sendo div)
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('https://roselanematostreinamento.botvendas.com/login');
    await page.getByRole('textbox', { name: 'Login' }).fill('admin@iqnus.com.br');
    await page.getByRole('textbox', { name: 'Senha' }).click();
    await page.getByRole('textbox', { name: 'Senha' }).fill('Bot@iq587!');
    await page.getByRole('button', { name: 'Entrar' }).click();

    await page.getByRole('link', { name: ' Lembrete de medicamentos ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.getByText('Loja 1Desconfig.(85) 3034-').click();
    await page.goto('https://roselanematostreinamento.botvendas.com/dashboard');
    await page.getByRole('link', { name: ' Lembrete de medicamentos ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();

    
    //selecionando a nova opção (PDF)
    // await page.getByText('PDF').click();
    // await page.locator('radio', {name: 'PDF'}).click();
    await page.getByRole('radio', { name: 'PDF' }).check();
    await page.locator('small > div:nth-child(10)').click();
    await page.getByRole('img', { name: 'Card image cap' }).click();
    await page.getByRole('button', { name: 'Salvar' }).click();
    await page.getByText('Sucesso! Configurações do').click();
    const divFormatoEnvio =  page.locator('div', {hasText: 'Formato do envio do resumo do pedido'}).last();
    const radioMarcado = divFormatoEnvio.locator('input[type="radio"]:checked');
    const opcaoSelecionada = await radioMarcado.locator('...').innerText();
    console.log('Opção selecionada: ', opcaoSelecionada);

    //voltando pra opção original (Imagem)
    await page.getByText('Imagem').click();
    await page.getByRole('radio', { name: 'Imagem' }).check();
    await page.locator('small > div:nth-child(10)').click();
    await page.getByRole('img', { name: 'Card image cap' }).click();
    await page.getByRole('button', { name: 'Salvar' }).click();
    await page.getByText('Sucesso! Configurações do').click();
    const opcaoOriginal = await radioMarcado.locator('...').innerText();
    console.log('Opção Original: ', opcaoOriginal);
    
 
});