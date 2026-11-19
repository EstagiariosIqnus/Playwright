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

test('CT14 - CT20: Cadastro de mundo com controle de data, vínculos (categorias, grupos, produtos) e cancelamento', async ({ page }) => {
    const timestamp = Date.now();
    const Nomemundo = `Mundo_${timestamp}`;

    await page.getByRole('link', { name: ' Produtos ' }).click();
    await page.getByRole('link', { name: ' Mundos' }).click();

    await page.getByRole('link', { name: '+' }).click();

    await page.getByRole('button', { name: 'Salvar' }).click();
    await page.locator('input[name="name"]').click();

    await page.locator('input[name="name"]').fill(Nomemundo);
   await page.waitForTimeout(1000);
   await page.getByText('Controle de data').click();
  
   await page.getByRole('textbox', { name: 'DD/MM/YYYY até DD/MM/YYYY' }).click();
   await page.getByLabel('Novembro 5,').click();
   await page.getByRole('textbox', { name: 'DD/MM/YYYY até DD/MM/YYYY' }).fill('05/11/2026');
   await page.getByLabel('Novembro 5,').click();
   await page.getByRole('textbox', { name: 'DD/MM/YYYY até DD/MM/YYYY' }).fill('05/11/2026');

  await page.getByRole('searchbox', { name: 'Selecione as categorias...' }).click();
  await page.getByRole('searchbox', { name: 'Selecione as categorias...' }).fill('categoria');
  
  await page.getByRole('option', { name: 'Categoria_1793910348358' }).click();
  await page.getByRole('list').filter({ hasText: '××Categoria_1793910348358' }).getByRole('searchbox').click();

  
  await page.getByRole('searchbox', { name: 'Selecione os grupos...' }).click();
  await page.getByRole('searchbox', { name: 'Selecione os grupos...' }).fill('gru');
await page.getByRole('option', { name: 'Grupo_1794333475113' }).click();
await page.getByRole('list').filter({ hasText: '××Grupo_1794333475113' }).getByRole('searchbox').click();
  
  await page.getByRole('searchbox', { name: 'Selecione os produtos...' }).click();
  await page.getByRole('searchbox', { name: 'Selecione os produtos...' }).fill('pro');
await page.getByRole('option', { name: 'ProdutoTeste' }).first().click();
await page.getByRole('list').filter({ hasText: '××ProdutoTeste' }).getByRole('searchbox').click();  
  await page.getByRole('button', { name: 'Salvar' }).click();

  await page.getByRole('link', { name: '+' }).click();
  await page.getByRole('link', { name: 'Cancelar' }).click();
  await page.getByRole('link', { name: '+' }).click();
  await page.getByRole('link', { name: 'Mundos', exact: true }).click();
});

test('CT01 - CT11: Pesquisa por nome, ordenação de colunas e navegação por paginação', async ({ page }) => {
  await page.getByRole('link', { name: ' Produtos ' }).click();
  await page.getByRole('link', { name: ' Mundos' }).click();

  await page.getByPlaceholder('Pesquisar', { exact: true }).click();
  await page.getByPlaceholder('Pesquisar', { exact: true }).fill('mundoteste');
  await page.getByPlaceholder('Pesquisar', { exact: true }).press('Enter');
  await page.waitForTimeout(1000);

  await page.getByPlaceholder('Pesquisar', { exact: true }).click();
  await page.getByPlaceholder('Pesquisar', { exact: true }).fill('mundo');
  await page.getByPlaceholder('Pesquisar', { exact: true }).press('Enter');
  await page.waitForTimeout(1000);

  await page.getByPlaceholder('Pesquisar', { exact: true }).click();
  await page.getByPlaceholder('Pesquisar', { exact: true }).fill('z');
  await page.getByPlaceholder('Pesquisar', { exact: true }).press('Enter');
  await page.waitForTimeout(1000);

  await page.getByPlaceholder('Pesquisar', { exact: true }).fill('');

  await page.getByRole('columnheader', { name: 'Nome: Ordenar colunas de' }).first().click();
  await page.getByRole('columnheader', { name: 'Nome: Ordenar colunas de forma descendente' }).click();
  await page.getByRole('row', { name: 'Nome: Ordenar colunas de forma ascendente Ações: Ordenar colunas de forma' }).getByLabel('Ações: Ordenar colunas de').click();
  await page.getByRole('columnheader', { name: 'Ações: Ordenar colunas de forma descendente' }).click();

  await page.locator('a').filter({ hasText: '«' }).click();
  await page.getByRole('navigation', { name: 'Paginação' }).getByText('1').click();
  await page.locator('a').filter({ hasText: '»' }).click();
});

test('CT05 - CT06: Ações de linha (Disponibilidade na loja virtual, Edição e Modal de Exclusão)', async ({ page }) => {
    await page.getByRole('link', { name: ' Produtos ' }).click();
    await page.getByRole('link', { name: ' Mundos' }).click();

    const productRow = page.locator('tr').filter({ hasText: '1' }).first();

    const dispButton = productRow.locator('button.btn-secondary, button.btn-xs').first();

    await dispButton.click({ force: true });
    await page.getByText('Disponibilidade na Loja Virtual× Status: IndisponívelInformações:Ativo na loja').click();
    await page.getByRole('button', { name: 'close' }).click();

    const editButton = page.locator('a[href*="Editar"], a.btn-warning, button.btn-warning, a:has(.fa-edit), a:has(.fa-pencil)').first();

    await editButton.scrollIntoViewIfNeeded();
    await editButton.click({ force: true });
    await page.getByRole('link', { description: 'Editar', exact: true }).click();

    await page.waitForTimeout(1000);

    await page.getByRole('button', { name: 'Salvar' }).click();

    const deleteButton = productRow.locator('button[data-remove], button.btn-danger').first();

  await deleteButton.scrollIntoViewIfNeeded();
  await deleteButton.click({ force: true });
  // await page.getByRole('button', { description: 'Excluir', exact: true }).click();

  const modalInput = page.getByRole('textbox').last();
  await modalInput.fill('1');
  await page.getByRole('button', { name: 'SIM, QUERO REMOVER' }).click();
  await page.getByRole('button', { name: 'close' }).click();
});

test('CT06: Exclusão confirmada de mundo com validação do ID no modal', async ({ page }) => {
  await page.getByRole('link', { name: ' Produtos ' }).click();
    await page.getByRole('link', { name: ' Mundos' }).click();

    const productRow = page.locator('tr').filter({ hasText: '1' }).first();
    const deleteButton = productRow.locator('button[data-remove], button.btn-danger').first();

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