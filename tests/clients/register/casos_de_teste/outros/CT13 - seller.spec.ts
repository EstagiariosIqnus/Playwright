//CT13 - Atribuição de Vendedor carteirizado:
// precisa da visão do atendente -> 
//Alterar o vendedor responsável e validar se a carteira reflete no painel comercial do vendedor.


import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('https://roselanematostreinamento.botvendas.com/login');
    await page.getByRole('textbox', { name: 'Login' }).fill('admin@iqnus.com.br');
    await page.getByRole('textbox', { name: 'Senha' }).click();
    await page.getByRole('textbox', { name: 'Senha' }).fill('Bot@iq587!');
    await page.getByRole('button', { name: 'Entrar' }).click();
    await page.goto('https://roselanematostreinamento.botvendas.com/dashboard');
    await page.getByRole('link', { name: ' Clientes ' }).click();
    await page.getByRole('link', { name: ' Cadastros' }).click();
    await page.goto('https://roselanematostreinamento.botvendas.com/clients/3/edit?tab=client');

    //
    const campoVendC = page.getByRole('combobox', {
    name: 'Vendedor carteirizado:'
    });
    await campoVendC.selectOption({ value: '4'});
    await page.getByRole('button', { name: 'Salvar' }).click();
    await expect(page.getByText(/Sucesso!Cliente atualizado/i).first());
    await page.reload();
    await page.goto('https://roselanematostreinamento.botvendas.com/clients/3/edit?tab=client');
    await expect(campoVendC.locator('option:checked')).toHaveText('Andreza Leite');
    // await page.getByLabel('Vendedor carteirizado:').selectOption('4');

    //
    await campoVendC.selectOption({ label: '1' });
    await page.getByRole('button', { name: 'Salvar' }).click();
    await expect(page.getByText(/Sucesso!Cliente atualizado/i).first());
    await page.reload();
    await page.goto('https://roselanematostreinamento.botvendas.com/clients/3/edit?tab=client');
    await expect(campoVendC.locator('option:checked')).toHaveText('1');
    // await page.getByRole('link', { description: 'Editar', exact: true }).click();
    // await page.getByLabel('Vendedor carteirizado:').selectOption('1');
    // await page.getByRole('button', { name: 'Salvar' }).click();
    // await expect(page.getByText(/Sucesso!Cliente atualizado/i).first());

    //
    await campoVendC.selectOption({ label: '8' });
    await page.getByRole('button', { name: 'Salvar' }).click();
    await expect(page.getByText(/Sucesso!Cliente atualizado/i).first());
    await page.reload();
    await page.goto('https://roselanematostreinamento.botvendas.com/clients/3/edit?tab=client');
    await expect(campoVendC.locator('option:checked')).toHaveText('8');
    // await page.getByRole('link', { description: 'Editar', exact: true }).click();
    // await page.getByLabel('Vendedor carteirizado:').selectOption('8');
    // await page.getByRole('button', { name: 'Salvar' }).click();
    // await expect(page.getByText(/Sucesso!Cliente atualizado/i).first());

    //
    await campoVendC.selectOption({ label: '6' });
    await page.getByRole('button', { name: 'Salvar' }).click();
    await expect(page.getByText(/Sucesso!Cliente atualizado/i).first());
    await page.reload();
    await page.goto('https://roselanematostreinamento.botvendas.com/clients/3/edit?tab=client');
    await expect(campoVendC.locator('option:checked')).toHaveText('6');
    // await page.getByRole('link', { description: 'Editar', exact: true }).click();
    // await page.getByLabel('Vendedor carteirizado:').selectOption('6');
    // await page.getByRole('button', { name: 'Salvar' }).click();
    // await expect(page.getByText(/Sucesso!Cliente atualizado/i).first());

    //
    await campoVendC.selectOption({ label: '7' });
    await page.getByRole('button', { name: 'Salvar' }).click();
    await expect(page.getByText(/Sucesso!Cliente atualizado/i).first());
    await page.reload();
    await page.goto('https://roselanematostreinamento.botvendas.com/clients/3/edit?tab=client');
    await expect(campoVendC.locator('option:checked')).toHaveText('7');
    // await page.getByRole('link', { description: 'Editar', exact: true }).click();
    // await page.getByLabel('Vendedor carteirizado:').selectOption('7');
    // await page.getByRole('button', { name: 'Salvar' }).click();
    // await expect(page.getByText(/Sucesso!Cliente atualizado/i).first());

    //
    await campoVendC.selectOption({ label: '5' });
    await page.getByRole('button', { name: 'Salvar' }).click();
    await expect(page.getByText(/Sucesso!Cliente atualizado/i).first());
    await page.reload();
    await page.goto('https://roselanematostreinamento.botvendas.com/clients/3/edit?tab=client');
    await expect(campoVendC.locator('option:checked')).toHaveText('5');
    // await page.getByRole('link', { description: 'Editar', exact: true }).click();
    // await page.getByLabel('Vendedor carteirizado:').selectOption('5');
    // await page.getByRole('button', { name: 'Salvar' }).click();
    // await expect(page.getByText(/Sucesso!Cliente atualizado/i).first());

    //
    await page.goto('https://roselanematostreinamento.botvendas.com/clients/3/edit?tab=client');
    await page.getByLabel('Vendedor carteirizado:').selectOption('');
    await page.getByRole('button', { name: 'Salvar' }).click();
    await expect(page.getByText(/Sucesso!Cliente atualizado/i).first());
});