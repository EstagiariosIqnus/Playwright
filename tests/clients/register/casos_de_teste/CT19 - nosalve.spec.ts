//CT19 - Persistência entre abas sem salvar:

//não apresentou nenhuma mensagem e tbm não salvou nada
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
    await page.getByRole('textbox', { name: 'Nível de pagamento  ' }).click();
    await page.getByRole('textbox', { name: 'Nível de pagamento  ' }).fill('1');
    await page.getByRole('tab', { name: 'Filiações' }).click();
    await page.getByRole('tab', { name: 'Cadastro' }).click();
    await page.getByRole('tab', { name: 'Endereços' }).click();
    await page.getByRole('button', { name: ' Adicionar' }).click();
    await page.locator('input[name="zipcode"]').last().click();
    await page.locator('input[name="zipcode"]').last().fill('60760-445');
    await page.getByRole('dialog', { name: 'Adicionar Endereço' }).click();
    await page.waitForLoadState('networkidle');

    //
    const modal = page.locator('.modal.show');
    await modal.locator('button.btn.btn-primary[type="submit"]', { hasText: 'Adicionar' }).click();
    await expect(modal).toBeHidden();
    await page.getByRole('button', { description: 'excluir', exact: true }).click();
    await page.getByRole('button', { name: 'Sim, remover' }).click();
    // await page.getByRole('button', { description: 'excluir', exact: true }).click();
    // await page.getByRole('button', { description: 'excluir', exact: true }).click();
    // await page.getByRole('button', { name: 'Sim, remover' }).click();
  
});