//CT15 - Campo Nível de pagamento:

//nserir valores numéricos válidos e verificar comportamento.   
//Testar valores negativos, zero, decimais ou caracteres alfabéticos.

//não aceitou caracteres alfabéticos nem valores negativos
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
    await page.locator('.table-actions').first().click();
    await page.goto('https://roselanematostreinamento.botvendas.com/clients/3/edit?tab=client');
    await page.getByRole('textbox', { name: 'Nível de pagamento  ' }).click();
    await page.getByRole('textbox', { name: 'Nível de pagamento  ' }).fill('2');
    await page.getByRole('button', { name: 'Salvar' }).click();
    await expect(page.getByText(/sucesso|Cliente atualizado/i).first());
    await page.goto('https://roselanematostreinamento.botvendas.com/clients/3/edit?tab=client');
    await page.getByRole('textbox', { name: 'Nível de pagamento  ' }).click();
    await page.getByRole('textbox', { name: 'Nível de pagamento  ' }).fill('');
    await page.getByRole('textbox', { name: 'Nível de pagamento  ' }).click();
    await page.getByRole('textbox', { name: 'Nível de pagamento  ' }).fill('2000'); //salvou 2000
    await page.getByRole('textbox', { name: 'Nível de pagamento  ' }).click();
    await page.getByRole('textbox', { name: 'Nível de pagamento  ' }).fill('0000'); //salvou e voltou pra 0
    await page.getByRole('button', { name: 'Salvar' }).click();
    await expect(page.getByText(/sucesso|Cliente atualizado/i).first());
    await page.goto('https://roselanematostreinamento.botvendas.com/clients/3/edit?tab=client');
    await page.getByRole('textbox', { name: 'Nível de pagamento  ' }).click();
    await page.getByRole('textbox', { name: 'Nível de pagamento  ' }).fill('20000');
    await page.getByRole('button', { name: 'Salvar' }).click();
    await expect(page.getByText(/sucesso|Cliente atualizado/i).first());
    await page.goto('https://roselanematostreinamento.botvendas.com/clients/3/edit?tab=client');
    await page.getByRole('textbox', { name: 'Nível de pagamento  ' }).click();
    await page.getByRole('textbox', { name: 'Nível de pagamento  ' }).fill('');
    await page.getByRole('button', { name: 'Salvar' }).click();
    await expect(page.getByText(/sucesso|Cliente atualizado/i).first());
});