import { test, expect } from '@playwright/test';
import path from 'path';

test.beforeEach('Login', async ({ page }) => {

    await page.goto('https://kaduemanueltreinamento.botvendas.com/login');
    await page.getByRole('textbox', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'Login' }).fill('admin@iqnus.com.br');

    await page.getByRole('textbox', { name: 'Senha' }).click();
    await page.getByRole('textbox', { name: 'Senha' }).fill('Bot@iq587!');

    await page.getByRole('button', { name: 'Entrar' }).click();

    await page.waitForLoadState('networkidle');

// Verifica se caiu na tela de "Selecionar loja" (/contexts)
if (page.url().includes('/contexts')) {
  // Localiza o card da segunda loja (ou qualquer card que contenha "Drogarias Fortaleza")
  const cardLoja = page.locator('div, a, button')
    .filter({ hasText: /Drogarias Fortaleza/i })
    .last();

  await cardLoja.waitFor({ state: 'visible', timeout: 10000 });
  await cardLoja.click();

  // Garante que saiu da tela de seleção antes de iniciar o teste
  await expect(page).not.toHaveURL(/\/contexts/, { timeout: 10000 });
}
});

test('CT01', async ({ page }) => {
    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    // await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });

    await page.getByRole('link', { name: 'Acessar ' }).click();

    await page.getByRole('columnheader', { name: 'Atalho: Ordenar colunas de' }).dblclick();
    await page.getByRole('columnheader', { name: 'Mensagem: Ordenar colunas de' }).dblclick();
    await page.getByRole('columnheader', { name: 'Setores: Ordenar colunas de' }).dblclick();
});

test('CT02', async ({ page }) => {
    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    // await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });

    await page.getByRole('link', { name: 'Acessar ' }).click();

    await page.getByRole('link', { name: '+' }).click();

    await page.goto('https://kaduemanueltreinamento.botvendas.com/quick_responses/create');
    await page.getByRole('textbox', { name: 'Atalho:*' }).click();
    await page.getByRole('textbox', { name: 'Atalho:*' }).fill('teste');


    await page.locator('#exampleFormControlTextarea1').click();
    await page.getByText('Adicionar variável').click();
    await page.getByText('#first_client_name#').click();
    await page.getByRole('searchbox').click();
    await page.getByRole('option', { name: 'Todos' }).click();
    await page.getByRole('option', { name: 'andreza.leite1795029725978@' }).click();
    await page.getByRole('button', { name: 'Salvar' }).click();
});

test('CT03', async ({ page }) => {
    const imageTest = path.join(__dirname, 'lista2detestes');
    const imagePath = path.join(__dirname, 'Logo_ Drogarias Fortaleza.jpeg');

    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    // await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });

    await page.getByRole('link', { name: 'Acessar ' }).click()
  await page.getByRole('link', { name: '+' }).click();

    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.waitForTimeout(1000);

    await page.locator('#dropzone').click();
    const filechooser = await fileChooserPromise;
    await filechooser.setFiles(imageTest);

    await page.waitForTimeout(1000);
    await filechooser.setFiles(imagePath);

    await page.locator('#cropper-modal').getByRole('button', { name: 'Salvar' }).click();
    await page.locator('.fa-stack').first().click();

    await page.getByRole('button', { name: 'Salvar' }).click();
});

test('CT04', async ({ page }) => {
    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    // await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });

    await page.getByRole('link', { name: 'Acessar ' }).click()
    await page.getByRole('link', { description: 'editar', exact: true }).first().click();

    await page.getByRole('textbox', { name: 'Atalho:*' }).click();
    await page.getByRole('textbox', { name: 'Atalho:*' }).fill('setor');


    await page.locator('#exampleFormControlTextarea1').click();
    await page.locator('#exampleFormControlTextarea1').fill('Estou te transferindo para a equipe responsável e eles irão dar continuidade');
    await page.getByRole('searchbox').click();
    await page.getByRole('option', { name: 'andreza.leite1795029725978@' }).click();
    await page.getByRole('button', { name: 'Salvar' }).click();
});

test('CT05', async ({ page }) => {
    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    // await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });

    await page.getByRole('link', { name: 'Acessar ' }).click()
    await page.getByRole('link', { description: 'editar', exact: true }).first().click();

    await page.getByRole('textbox', { name: 'Atalho:*' }).click();
    await page.getByRole('textbox', { name: 'Atalho:*' }).fill('setor');

    await page.locator('#exampleFormControlTextarea1').click();
    await page.locator('#exampleFormControlTextarea1').fill('Estou te transferindo para a equipe responsável e eles irão dar continuidade');
    await page.getByRole('searchbox').click();
    await page.getByRole('option', { name: 'andreza.leite1795029725978@' }).click();

    await page.getByRole('link', { name: 'Cancelar' }).click();

    await page.getByRole('link', { name: '+' }).click();

    await page.getByRole('textbox', { name: 'Atalho:*' }).click();
    await page.getByRole('textbox', { name: 'Atalho:*' }).fill('setor');

    await page.locator('#exampleFormControlTextarea1').click();
    await page.locator('#exampleFormControlTextarea1').fill('Estou te transferindo para a equipe responsável e eles irão dar continuidade');
    await page.getByRole('searchbox').click();
    await page.getByRole('option', { name: 'andreza.leite1795029725978@' }).click();
    await page.getByRole('link', { name: 'Cancelar' }).click();
});

test('CT06', async ({ page }) => {
    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    // await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });

    await page.getByRole('link', { name: 'Acessar ' }).click()

    await page.locator('tr:nth-child(7) > td:nth-child(4) > .table-actions > form > .btn').click();
    await page.getByRole('button', { name: 'Cancelar' }).click();
    await page.locator('tr:nth-child(7) > td:nth-child(4) > .table-actions > form > .btn').click();
    await page.getByRole('button', { name: 'Sim, remover' }).click();
});
git config --global user.email "kaduemanuel7@gmail.com"
git config --global user.name "kaduem"