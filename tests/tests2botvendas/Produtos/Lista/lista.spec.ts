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

// Cobre abertura do modal de filtro e preenchimento dos campos EAN, Título, Dropdowns e Cód. ERP
test('CT10 - CT14: Filtragem e busca de produtos por múltiplos critérios', async ({ page }) => {
  await page.getByRole('link', { name: ' Produtos ' }).click();
  await page.getByRole('link', { name: ' Lista' }).click();

  await page.getByText('Sem filtros').click();
  await page.getByRole('spinbutton', { name: 'Digite o EAN' }).click();
  await page.getByRole('spinbutton', { name: 'Digite o EAN' }).fill('7898355841767');

  await page.getByRole('textbox', { name: 'Digite o título' }).click();
  await page.getByRole('textbox', { name: 'Digite o título' }).fill('100 PESO 500MG 60CAP');

  await page.getByRole('combobox').nth(3).click();
  await page.waitForTimeout(500);
  await page.getByRole('option', { name: 'Promoção' }).click();
  await page.getByRole('list').filter({ hasText: '××Promoção' }).getByRole('searchbox').click();

  await page.getByRole('combobox').nth(5).click();
  await page.getByRole('option', { name: 'Ativo', exact: true }).click();

  await page.getByRole('list').filter({ hasText: '××Ativo' }).getByRole('searchbox').click();
  await page.waitForTimeout(500);

  await page.getByRole('combobox').nth(6).click();
  await page.getByRole('option', { name: 'Habilitado' }).click();
  await page.getByRole('list').filter({ hasText: '××Habilitado' }).getByRole('searchbox').click();

  await page.getByRole('spinbutton', { name: 'Digite o código no ERP' }).click();
  await page.getByRole('spinbutton', { name: 'Digite o código no ERP' }).fill('23605');

  await page.getByRole('button', { name: ' Filtrar' }).click();
});

// Cobre a ordenação e visualização das colunas na tabela da listagem
test('CT01: Exibição da tabela e ordenação das colunas', async ({ page }) => {
  await page.getByRole('link', { name: ' Produtos ' }).click();
  await page.getByRole('link', { name: ' Lista' }).click();

  await page.getByRole('columnheader', { name: 'EAN: Ordenar colunas de forma' }).first().click();
  await page.getByRole('columnheader', { name: 'EAN: Ordenar colunas de forma descendente' }).click();

  await page.getByRole('row', { name: 'EAN: Ordenar colunas de forma ascendente Título: Ordenar colunas de forma' }).getByLabel('Título: Ordenar colunas de').click();
  await page.getByRole('columnheader', { name: 'Título: Ordenar colunas de forma descendente' }).click();

  await page.getByRole('row', { name: 'EAN: Ordenar colunas de forma ascendente Título: Ordenar colunas de forma ascendente Preços: Ordenar colunas de forma ascendente Opções: Ordenar colunas de forma ascendente Status: Ordenar colunas de forma ascendente Ações', exact: true }).getByLabel('Preços: Ordenar colunas de').click();
  await page.getByRole('columnheader', { name: 'Preços: Ordenar colunas de forma descendente' }).click();

  await page.getByRole('row', { name: 'EAN: Ordenar colunas de forma ascendente Título: Ordenar colunas de forma ascendente Preços: Ordenar colunas de forma ascendente Opções: Ordenar colunas de forma ascendente Status: Ordenar colunas de forma ascendente Ações', exact: true }).getByLabel('Opções: Ordenar colunas de').click();
  await page.getByRole('columnheader', { name: 'Opções: Ordenar colunas de forma descendente' }).click();

  await page.getByRole('row', { name: 'EAN: Ordenar colunas de forma ascendente Título: Ordenar colunas de forma ascendente Preços: Ordenar colunas de forma ascendente Opções: Ordenar colunas de forma ascendente Status: Ordenar colunas de forma ascendente Ações', exact: true }).getByLabel('Status: Ordenar colunas de').click();
  await page.getByRole('columnheader', { name: 'Status: Ordenar colunas de forma descendente' }).click();
});

// Cobre o totalizador e a paginação da listagem
test('CT04: Navegação entre páginas e paginação', async ({ page }) => {
//   await page.getByRole('link', { name: ' Produtos ' }).click();
//   await page.getByRole('link', { name: ' Lista' }).click();

//   await page.getByText('2', { exact: true }).click();
//   await page.getByText('3', { exact: true }).click();
//   await page.getByText('4', { exact: true }).click();
//   await page.getByText('5', { exact: true }).click();
//   await page.locator('a').filter({ hasText: '»' }).click();
//   await page.locator('a').filter({ hasText: '«' }).click();
//   await page.getByText('323').click();
});

// Cobre consultas de estoque/loja, carrinho, modal de exclusão e visualização de Auditoria
test('CT05 - CT08: Ações da linha (Estoque, Carrinho, Excluir) e Auditoria', async ({ page }) => {
  await page.getByRole('link', { name: ' Produtos ' }).click();
  await page.getByRole('link', { name: ' Lista' }).click();

  const productRow = page.locator('tr').filter({ hasText: '1' }).first();

  const consultButton = productRow.locator('button[data-toogle], button.btn-secondary').first();
  await consultButton.scrollIntoViewIfNeeded();
  await consultButton.click({ force: true });

  const dispButton = productRow.locator('button[data-toogle], button.btn-secondary').first();
  await dispButton.scrollIntoViewIfNeeded();
  await dispButton.click({ force: true });
  await page.getByRole('button', { name: 'close' }).click();

  const deleteButton = productRow.locator('button[data-remove], button.btn-danger').first();
  await deleteButton.scrollIntoViewIfNeeded();
  await deleteButton.click({ force: true });
  await page.getByRole('button', { description: 'Excluir produto', exact: true }).click();
  await page.getByRole('button', { name: 'close' }).click();

  await page.locator('#content').getByText('Auditoria').click();
  await page.getByRole('button', { name: 'close' }).click();
});

// Cobre validação de campos obrigatórios vazios ao salvar e descarte via botão Cancelar
test('CT18 - CT33: Validação de campos obrigatórios e cancelamento do formulário', async ({ page }) => {
  await page.getByRole('link', { name: ' Produtos ' }).click();
  await page.getByRole('link', { name: ' Lista' }).click();

  await page.getByRole('link', { name: '+', exact: true }).click();
  await page.getByRole('button', { name: 'Salvar' }).click();

  await page.locator('input[name="title"]').fill('a');
  await page.getByRole('link', { name: 'Cancelar' }).click();
});

// Cobre upload de imagem, preenchimento de medidas, preços, canais e cadastro final com sucesso
test('CT16 - CT32: Cadastro completo de produto com imagem, medidas, preços e canais', async ({ page }) => {
  const timestamp = Date.now();
  const Ean = `${timestamp}`;
  const imagePath = path.join(__dirname, 'listadetestes - Imagens');
  const imagePath1 = path.join(__dirname, 'Monster Watermelon.png');

  await page.getByRole('link', { name: ' Produtos ' }).click();
  await page.getByRole('link', { name: ' Lista' }).click();
  await page.getByRole('link', { name: '+' }).click();
  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Adicionar imagem' }).click();

  await page.locator('div').filter({ hasText: 'Clique, arraste ou cole uma' }).nth(4).click();

  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(imagePath);

  await page.waitForTimeout(500);

  await fileChooser.setFiles(imagePath1);

  await page.getByRole('button', { name: 'Ajuste Automático' }).click();
  await page.locator('#cropper-modal').getByRole('button', { name: 'Salvar' }).click();

  await page.locator('input[name="title"]').click();
  await page.locator('input[name="title"]').fill('ProdutoTeste');
  await page.locator('input[name="title"]').press('Enter');
  await page.locator('input[name="price"]').fill('1');
  await page.locator('input[name="ean"]').click();
  await page.locator('input[name="ean"]').fill(Ean);

  await page.locator('select[name="schedule_id"]').selectOption('2');

  await page.getByRole('spinbutton').click();
  await page.getByRole('spinbutton').fill('-1.50');

  await page.locator('select[name="status"]').selectOption('disabled');
  await page.locator('select[name="measure"]').selectOption('kg');

  await page.locator('input[name="average_weight"]').click();
  await page.locator('input[name="average_weight"]').fill('1');
  await page.locator('input[name="cm_height"]').click();
  await page.locator('input[name="cm_height"]').fill('10,5');
  await page.locator('input[name="wholesales_price"]').click();

  await page.locator('input[name="wholesales_price"]').fill('1,000');
  await page.locator('input[name="daily_promo_price"]').click();
  await page.locator('input[name="daily_promo_price"]').fill('010');
  await page.locator('input[name="daily_promo_price"]').press('ArrowLeft');
  await page.locator('input[name="daily_promo_price"]').press('ArrowLeft');
  await page.locator('input[name="daily_promo_price"]').press('ArrowLeft');
  await page.locator('input[name="daily_promo_price"]').press('ArrowLeft');
  await page.locator('input[name="price"]').click();
  await page.locator('input[name="price"]').fill('1');

  await page.getByText('Bloqueado', { exact: true }).click();
  await page.getByRole('checkbox', { name: 'Bloqueado' }).check();
  await page.getByRole('checkbox', { name: 'Bloqueado' }).click();

  await page.locator('label').filter({ hasText: 'Ativado' }).click();
  await page.getByRole('checkbox', { name: 'Ativado' }).check();
  await page.getByRole('checkbox', { name: 'Ativado' }).click();

  await page.getByText('Em destaque').click();
  await page.getByRole('checkbox', { name: 'Em destaque' }).check();
  await page.getByRole('checkbox', { name: 'Em destaque' }).click();

  await page.locator('label').filter({ hasText: 'Ativado' }).click();

  await page.locator('label').filter({ hasText: 'Ver como unidade' }).click();
  await page.getByRole('checkbox', { name: 'Ver como unidade' }).check();
  await page.locator('label').filter({ hasText: 'Ver como unidade' }).click();

  await page.getByText('Ativar no catálogo').click();
  await page.getByRole('button', { name: 'Ok' }).click();
  await page.getByText('Ativar no catálogo').click();

  await page.locator('textarea[name="description"]').click();
  await page.locator('textarea[name="description"]').fill('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');

  await page.getByRole('button', { name: 'Salvar' }).click();

  await page.getByRole('spinbutton').click();
  await page.getByRole('spinbutton').fill('1');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.locator('input[name="price"]').click();
  await page.locator('input[name="price"]').click();
  await page.locator('input[name="price"]').fill('10,000');
  await page.getByRole('button', { name: 'Salvar' }).click();
});

// Cobre busca prévia por título e exclusão com modal de confirmação por ID
test('CT07 - CT12: Exclusão confirmada de produto com busca prévia', async ({ page }) => {
  await page.getByRole('link', { name: ' Produtos ' }).click();
  await page.getByRole('link', { name: ' Lista' }).click();
  await page.getByText('Sem filtros').click();

  const searchInput = page.getByRole('textbox', { name: 'Digite o título' });
  await searchInput.fill('ProdutoTeste');
  await searchInput.press('Enter');

  const productRow = page.locator('tr').filter({ hasText: 'ProdutoTeste' }).last();
  await expect(productRow).toBeVisible({ timeout: 10000 });

  const deleteButton = productRow.locator('button[data-remove], button.btn-danger').last();
  const productId = await deleteButton.getAttribute('data-id');

  await deleteButton.scrollIntoViewIfNeeded();
  await deleteButton.click({ force: true });
  await page.getByRole('button', { description: 'Excluir produto', exact: true }).click();

  const modalInput = page.getByRole('textbox').last();
  await modalInput.fill('1');
  await page.getByRole('button', { name: 'SIM, QUERO REMOVER' }).click();

  await page.locator('span').filter({ hasText: 'Atenção!' }).click();
  await page.locator('span').filter({ hasText: 'Verifique o número digitado' }).click();

  await modalInput.fill(productId!);
  await page.getByRole('button', { name: 'SIM, QUERO REMOVER' }).click();
});