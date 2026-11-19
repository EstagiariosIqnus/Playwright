import { test, expect } from '@playwright/test';
import path from 'path';

test.beforeEach('Login', async ({ page }) => {
  const maxTentativas = 3;

  for (let tentativa = 1; tentativa <= maxTentativas; tentativa++) {
    await page.goto('https://kaduemanueltreinamento.botvendas.com/login');

    await page.getByRole('textbox', { name: 'Login' }).fill('admin@iqnus.com.br');
    await page.getByRole('textbox', { name: 'Senha' }).fill('Bot@iq587!');
    await page.getByRole('button', { name: 'Entrar' }).click();

    // Trata eventual mensagem de "Verificação incompleta"
    const erroVerificacao = page.getByText('Verificação incompleta', { exact: false });
    const falhou = await erroVerificacao.isVisible({ timeout: 2500 }).catch(() => false);

    if (falhou) {
      console.warn(`Tentativa ${tentativa}: Erro de verificação detectado. Recarregando...`);

      if (tentativa === maxTentativas) {
        throw new Error('Falha no login após atingir o número máximo de tentativas.');
      }

      await page.reload();
    } else {
      // Aguarda o redirecionamento direto para o dashboard
      await page.waitForURL('**/dashboard**', { timeout: 15000 });
      break;
    }
  }
});

test('CT01 - CT14', async ({ page }) => {
    const timestamp = Date.now();
    const Nomegrupo = `Grupo_${timestamp}`;
    const imagePath = path.join(__dirname, 'lista2detestes');
    const imagePath1 = path.join(__dirname, 'Monster Watermelon.png');

    await page.getByRole('link', { name: ' Produtos ' }).click();
    await page.getByRole('link', { name: ' Grupos' }).click();
    await page.getByRole('link', { name: '+' }).click();

    await page.waitForTimeout(1000);

    const fileChooserPromise = page.waitForEvent('filechooser');

    await page.locator('.dropzone').click();
    
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(imagePath1);

    await page.waitForTimeout(500);

    const fileChooser1 = await fileChooserPromise;
    await fileChooser.setFiles(imagePath);
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Ajuste Automático' }).click();
    // await page.locator('#cropper-modal').getByRole('button', { name: 'Salvar' }).click();
    await page.locator('#edit-image-modal').getByRole('button', { name: 'Salvar' }).click();

    await page.locator('input[name="name"]').click();
    await page.locator('input[name="name"]').fill(Nomegrupo);
    await page.locator('input[name="webapp_name"]').click();
    await page.locator('input[name="webapp_name"]').fill(Nomegrupo);
    await page.locator('input[name="external_code"]').click();
    await page.locator('input[name="external_code"]').fill('1');
    await page.getByRole('button', { name: 'Salvar' }).click();

    await page.getByRole('link', { name: '+' }).click();
    await page.locator('input[name="name"]').click();
    await page.locator('input[name="name"]').fill('1');
    await page.locator('input[name="webapp_name"]').click();
    await page.locator('input[name="webapp_name"]').fill('1');
    await page.locator('input[name="external_code"]').click();
    await page.locator('input[name="external_code"]').fill('1');
    await page.getByRole('link', { name: 'Cancelar' }).click();
    await page.getByRole('link', { name: '+' }).click();

    await page.getByRole('link', { name: 'Grupos', exact: true }).click();
});

test('CT19 - CT22', async ({ page }) => {
    await page.getByRole('link', { name: ' Produtos ' }).click();
    await page.getByRole('link', { name: ' Grupos' }).click();
    await page.getByPlaceholder('Pesquisar', { exact: true }).click();
    await page.getByPlaceholder('Pesquisar', { exact: true }).fill('Grupo_1793899217045');

    // await page.getByPlaceholder('Pesquisar', { exact: true }).click();
    // await page.getByPlaceholder('Pesquisar', { exact: true }).fill('nom');

    // await page.getByPlaceholder('Pesquisar', { exact: true }).click();
    // await page.getByPlaceholder('Pesquisar', { exact: true }).fill('');

    await page.getByPlaceholder('Pesquisar', { exact: true }).press('Enter');
    await page.waitForTimeout(1000);    

    await page.getByPlaceholder('Pesquisar', { exact: true }).click();
    await page.getByPlaceholder('Pesquisar', { exact: true }).fill('');
    
    await page.getByPlaceholder('Pesquisar', { exact: true }).fill('nom');
    await page.getByPlaceholder('Pesquisar', { exact: true }).press('Enter');
    await page.waitForTimeout(1000);
    
    await page.getByPlaceholder('Pesquisar', { exact: true }).click();
    await page.getByPlaceholder('Pesquisar', { exact: true }).fill('');
    await page.getByPlaceholder('Pesquisar', { exact: true }).press('Enter');
});

test('CT23 - CT26', async ({ page }) => {
    await page.getByRole('link', { name: ' Produtos ' }).click();
    await page.getByRole('link', { name: ' Grupos' }).click();

    await page.getByRole('columnheader', { name: 'Nome: Ordenar colunas de' }).first().click();
    await page.getByRole('columnheader', { name: 'Nome: Ordenar colunas de forma descendente' }).click();
    await page.getByRole('row', { name: 'Nome: Ordenar colunas de forma ascendente Nome na Loja Virtual: Ordenar colunas' }).getByLabel('Nome na Loja Virtual: Ordenar').click();
    await page.getByRole('columnheader', { name: 'Nome na Loja Virtual: Ordenar colunas de forma descendente' }).click();
    await page.getByRole('row', { name: 'Nome: Ordenar colunas de forma ascendente Nome na Loja Virtual: Ordenar colunas de forma ascendente Qtde de produtos: Ordenar colunas de forma ascendente Ações: Ordenar colunas de forma ascendente', exact: true }).getByLabel('Qtde de produtos: Ordenar').click();
    await page.getByRole('columnheader', { name: 'Qtde de produtos: Ordenar colunas de forma descendente' }).click();
    await page.getByRole('row', { name: 'Nome: Ordenar colunas de forma ascendente Nome na Loja Virtual: Ordenar colunas de forma ascendente Qtde de produtos: Ordenar colunas de forma ascendente Ações: Ordenar colunas de forma ascendente', exact: true }).getByLabel('Ações: Ordenar colunas de').click();
    await page.getByRole('columnheader', { name: 'Ações: Ordenar colunas de forma descendente' }).click();
    await page.locator('a').filter({ hasText: '«' }).click();
    await page.getByRole('navigation', { name: 'Paginação' }).getByText('1', { exact: true }).click();
    await page.locator('a').filter({ hasText: '»' }).click();
});

test('CT27 - CT32', async ({ page }) => {
  await page.getByRole('link', { name: ' Produtos ' }).click();
  await page.getByRole('link', { name: ' Grupos' }).click(); 

  const productRow = page.locator('tr').filter({ hasText: '1' }).first();
  const dispButton = productRow.locator('button[data-toogle], button.btn-secondary').first();

  await dispButton.scrollIntoViewIfNeeded();
  await dispButton.click({ force: true });

  await page.getByRole('button', { name: 'close' }).click();

  const editLink = productRow.locator('a[href*="Editar"], a.btn-warning, a:has(.fa-edit), a:has(.fa-pencil)').first();
  await editLink.scrollIntoViewIfNeeded();
  await editLink.click({ force: true });

  await page.getByRole('link', { description: 'Editar', exact: true }).click();
  await page.waitForTimeout(4000);
  await page.getByRole('button', { name: 'Salvar' }).click();

  // await expect(productRow).toBeVisible({ timeout: 10000 });

  const deleteButton = productRow.locator('button[data-remove], button.btn-danger').first();

  await deleteButton.scrollIntoViewIfNeeded();
  await deleteButton.click({ force: true });
  // await page.getByRole('button', { description: 'Excluir', exact: true }).click();

  const modalInput = page.getByRole('textbox').last();
  await modalInput.fill('1');
  await page.getByRole('button', { name: 'SIM, QUERO REMOVER' }).click();
  await page.getByRole('button', { name: 'close' }).click();

  await page.locator('span').filter({ hasText: 'Atenção!' }).click();
  await page.locator('span').filter({ hasText: 'Verifique o número digitado' }).click();

  await page.locator('#content').getByText('Auditoria').click();
  await page.getByRole('button', { name: 'close' }).click();
});

test('CT29', async ({ page }) => {
  await page.getByRole('link', { name: ' Produtos ' }).click();
  await page.getByRole('link', { name: ' Grupos' }).click();

    const productRow = page.locator('tr').filter({ hasText: '1' }).last();
    const deleteButton = productRow.locator('button[data-remove], button.btn-danger').last();

    const productId = await deleteButton.getAttribute('data-id');

    await deleteButton.scrollIntoViewIfNeeded();
    await deleteButton.click({ force: true });

    const modalInput = page.getByRole('textbox').last();
    await modalInput.fill('1');
    await page.getByRole('button', { name: 'SIM, QUERO REMOVER' }).click();

    await page.locator('span').filter({ hasText: 'Atenção!' }).click();
    await page.locator('span').filter({ hasText: 'Verifique o número digitado' }).click();

    await modalInput.fill(productId!);
    await page.getByRole('button', { name: 'SIM, QUERO REMOVER' }).click();
});