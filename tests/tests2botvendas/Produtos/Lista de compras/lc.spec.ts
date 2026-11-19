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

test('CT04 - CT07', async ({ page }) => {
    await page.getByRole('link', { name: ' Produtos ' }).click();
    await page.getByRole('link', { name: ' Lista de compras' }).click();

const checkbox = page.locator('#toggle-is-enabled-1, input[id*="toggle-is-enabled"]').first();

await checkbox.evaluate((input: HTMLInputElement) => {
  input.click();
});
const checkbox1 = page.locator('#toggle-is-enabled-1, input[id*="toggle-is-enabled"]').first();

await checkbox1.evaluate((input: HTMLInputElement) => {
  input.click();
});
    await page.waitForTimeout(1000);
    await checkbox.scrollIntoViewIfNeeded();
    await checkbox.click({ force: true });

    const productRow = page.locator('tr').filter({ hasText: '1' }).first();
    const duplicateButton = productRow.locator('button[data-duplicate-cart-suggestion], button[data-original-title="Duplicar"], button.btn-primary, button:has(.fa-copy)').first();
    await duplicateButton.scrollIntoViewIfNeeded();
    await duplicateButton.click({ force: true });

    const editLink = productRow.locator('a[href*="Editar"], a.btn-warning, a:has(.fa-edit), a:has(.fa-pencil)').first();
    await editLink.scrollIntoViewIfNeeded();
    await editLink.click({ force: true });
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Salvar' }).click();

    const deleteButton = productRow.locator('button[data-remove], button.btn-danger').first();

    await deleteButton.scrollIntoViewIfNeeded();
    await deleteButton.click({ force: true });   
    await page.getByRole('button', { name: 'Não' }).click();
});

test('CT08 - CT09', async ({ page }) => {
    await page.getByRole('link', { name: ' Produtos ' }).click();
    await page.getByRole('link', { name: ' Lista de compras' }).click();

    await page.getByRole('listitem').filter({ hasText: /^$/ }).nth(1).click();
    await page.getByRole('link', { name: '1' }).click();
    await page.getByRole('listitem').filter({ hasText: /^$/ }).nth(2).click();

    await page.getByRole('link', { name: '+' }).click();
    await page.getByRole('link', { name: 'Cancelar' }).click();
});

test('CT10 - CT14', async ({ page }) => {
    await page.getByRole('link', { name: ' Produtos ' }).click();
    await page.getByRole('link', { name: ' Lista de compras' }).click();

    await page.getByText('Sem filtros').click();
    await page.getByRole('button', { name: 'close' }).click();
await page.goto('https://kaduemanueltreinamento.botvendas.com/cart-suggestions');
await page.getByText('Sem filtros').click();

    await page.getByRole('textbox', { name: 'Nome:' }).click();
    await page.getByRole('textbox', { name: 'Nome:' }).fill('Teste');

    await page.getByRole('textbox', { name: 'Escolha uma data' }).click();

await page.locator('.flatpickr-day, .datepicker td, .calendar-day').filter({ hasText: /^6$/ }).first().click();

await page.locator('.flatpickr-day, .datepicker td, .calendar-day').filter({ hasText: /^6$/ }).first().click();

await page.getByRole('searchbox', { name: 'Selecione...' }).click();
await page.getByRole('option', { name: 'Loja Padrão' }).click();
await page.getByRole('searchbox').click();

await page.getByRole('combobox', { name: 'Pesquisar...' }).first().click();

await page.getByRole('searchbox').nth(1).click();
await page.getByRole('searchbox').nth(1).fill('Teste');

await page.getByRole('option', { name: 'ProdutoTeste' }).nth(1).click();
await page.getByRole('combobox', { name: '×ProdutoTeste' }).click();

await page.getByRole('combobox', { name: 'Pesquisar...' }).click();

await page.getByRole('searchbox').nth(1).fill('cat');
await page.getByRole('option', { name: 'Categoria_1793910368962' }).click();
await page.getByRole('combobox', { name: '×Categoria_1793910368962' }).click();

await page.locator('#filters-submit-btn').click();
});

test('CT20', async ({ page }) => {
    await page.getByRole('link', { name: ' Produtos ' }).click();
    await page.getByRole('link', { name: ' Lista de compras' }).click();

    await page.getByRole('link', { name: '+' }).click();

    await page.waitForTimeout(1000);
    await page.goto('https://kaduemanueltreinamento.botvendas.com/cart-suggestions/create');
    await page.waitForTimeout(1000);
    await page.getByRole('searchbox').click();
    await page.getByRole('option', { name: 'Loja Padrão' }).click();
    await page.getByRole('button', { name: 'Salvar' }).click();
});

test('CT21', async ({ page }) => {
    await page.getByRole('link', { name: ' Produtos ' }).click();
    await page.getByRole('link', { name: ' Lista de compras' }).click();

    await page.getByRole('link', { name: '+' }).click();
    await page.getByRole('textbox', { name: 'Nome:* Período de vigência:*' }).click();
    await page.getByRole('textbox', { name: 'Nome:* Período de vigência:*' }).fill('111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111');
    await page.getByRole('link', { name: 'Cancelar' }).click();
});

test('CT22', async ({ page }) => {
    await page.getByRole('link', { name: ' Produtos ' }).click();
    await page.getByRole('link', { name: ' Lista de compras' }).click();

    await page.getByRole('link', { name: '+' }).click();
    await page.waitForTimeout(1000);
    await page.goto('https://kaduemanueltreinamento.botvendas.com/cart-suggestions/create');
    await page.waitForTimeout(1000);
    await page.getByRole('searchbox').click();
    await page.getByRole('option', { name: 'Loja Padrão' }).click();
});

test('CT23', async ({ page }) => {
    await page.getByRole('link', { name: ' Produtos ' }).click();
    await page.getByRole('link', { name: ' Lista de compras' }).click();

    await page.getByRole('link', { name: '+' }).click();
    await page.waitForTimeout(1000);
    await page.getByRole('textbox', { name: 'Escolha uma data' }).click();
    await page.getByLabel('Novembro 9,').click();
    await page.getByLabel('Novembro 9,').click();

});

test('CT24 - CT25', async ({ page }) => {
    await page.getByRole('link', { name: ' Produtos ' }).click();
    await page.getByRole('link', { name: ' Lista de compras' }).click();

    await page.getByRole('link', { name: '+' }).click();
    await page.waitForTimeout(1000);

    await page.getByRole('button', { name: ' Adicionar' }).click();

    await page.getByRole('row', { name: 'Imagem do produto' }).locator('[id="15"]').click();
    await page.getByRole('button', { name: 'close' }).click();

await page.locator('.main-products .card-header button.btn-danger, button.btn-danger.rounded-0').first().evaluate((btn: HTMLElement) => {
  btn.click();
});
    await page.getByRole('button', { name: 'Sim' }).click();
});

test('CT26', async ({ page }) => {
    await page.getByRole('link', { name: ' Produtos ' }).click();
    await page.getByRole('link', { name: ' Lista de compras' }).click();

    await page.getByRole('link', { name: '+' }).click();
    await page.locator('#textarea').click();
    
    await page.locator('#textarea').fill('11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111');

});

test('CT27 - CT28', async ({ page }) => {
    await page.getByRole('link', { name: ' Produtos ' }).click();
    await page.getByRole('link', { name: ' Lista de compras' }).click();

    await page.getByRole('link', { name: '+' }).click();

});

test('CT29 - CT30', async ({ page }) => {
    await page.getByRole('link', { name: ' Produtos ' }).click();
    await page.getByRole('link', { name: ' Lista de compras' }).click();

    await page.getByRole('link', { name: '+' }).click();
    await page.waitForTimeout(1000);

    await page.getByRole('button', { name: ' Adicionar' }).click();

    await page.getByRole('row', { name: 'Imagem do produto' }).locator('[id="15"]').click();
    await page.getByRole('button', { name: 'close' }).click();

    await page.getByRole('button', { name: ' Adicionar produto substituto' }).click();
    await page.getByRole('row', { name: 'Imagem do produto ProdutoTeste ⚠ 1 kg disp. EAN [1794256860570] R$ 100,00 kg ' }).locator('[id="14"]').click();
});

test('CT31', async ({ page }) => {
    const timestamp = Date.now();
    const Nomelista = `Lista de compras_${timestamp}`;

    await page.getByRole('link', { name: ' Produtos ' }).click();
    await page.getByRole('link', { name: ' Lista de compras' }).click();

    await page.getByRole('link', { name: ' Produtos ' }).click();
    await page.getByRole('link', { name: ' Lista de compras' }).click();

    await page.getByRole('link', { name: '+' }).click();

    await page.waitForTimeout(1000);
    await page.goto('https://kaduemanueltreinamento.botvendas.com/cart-suggestions/create');
    await page.waitForTimeout(1000);

    await page.getByRole('button', { name: ' Adicionar' }).click();



    await page.getByRole('row', { name: 'Imagem do produto' }).locator('[id="15"]').click();
    await page.getByRole('button', { name: 'close' }).click();

    await page.getByRole('button', { name: ' Adicionar produto substituto' }).click();
    await page.getByRole('row', { name: 'Imagem do produto ProdutoTeste ⚠ 1 kg disp. EAN [1794256860570] R$ 100,00 kg ' }).locator('[id="14"]').click();

    await page.getByRole('textbox', { name: 'Nome:* Período de vigência:*' }).click();
    await page.getByRole('textbox', { name: 'Nome:* Período de vigência:*' }).fill(Nomelista);

    await page.getByRole('textbox', { name: 'Escolha uma data' }).click();
    await page.getByLabel('Novembro 9,').click();
    await page.getByLabel('Novembro 9,').click();

    await page.getByRole('button', { name: 'Salvar' }).click();
});

test('CT32', async ({ page }) => {
    const timestamp = Date.now();
    const Nomelista = `Lista de compras_${timestamp}`;

    await page.getByRole('link', { name: ' Produtos ' }).click();
    await page.getByRole('link', { name: ' Lista de compras' }).click();

    await page.getByRole('link', { name: ' Produtos ' }).click();
    await page.getByRole('link', { name: ' Lista de compras' }).click();

    await page.getByRole('link', { name: '+' }).click();

    await page.waitForTimeout(1000);
    await page.goto('https://kaduemanueltreinamento.botvendas.com/cart-suggestions/create');
    await page.waitForTimeout(1000);

    await page.getByRole('button', { name: ' Adicionar' }).click();

    await page.getByRole('row', { name: 'Imagem do produto' }).locator('[id="15"]').click();
    await page.getByRole('button', { name: 'close' }).click();

    await page.getByRole('button', { name: ' Adicionar produto substituto' }).click();
    await page.getByRole('row', { name: 'Imagem do produto ProdutoTeste ⚠ 1 kg disp. EAN [1794256860570] R$ 100,00 kg ' }).locator('[id="14"]').click();

    await page.getByRole('textbox', { name: 'Nome:* Período de vigência:*' }).click();
    await page.getByRole('textbox', { name: 'Nome:* Período de vigência:*' }).fill(Nomelista);

    await page.getByRole('textbox', { name: 'Escolha uma data' }).click();
    await page.getByLabel('Novembro 9,').click();
    await page.getByLabel('Novembro 9,').click();

    await page.getByRole('link', { name: 'Cancelar' }).click();
});

