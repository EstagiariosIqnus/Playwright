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

test('CT09 - CT15: Criação de novo grupo de opções e cancelamento', async ({ page }) => {
    const timestamp = Date.now();
    const NomeOP = `Grupo de Opção_${timestamp}`;

    await page.getByRole('link', { name: ' Produtos ' }).click();
    await page.getByRole('link', { name: ' Opções de prod.' }).click();

    await page.getByRole('link', { name: ' Opções de prod.' }).click();
    await page.getByRole('link', { name: '+' }).click();

    await page.getByRole('textbox').click();
    await page.getByRole('textbox').fill(NomeOP);
    await page.getByRole('button', { name: 'Criar' }).click();

    await page.getByRole('link', { name: ' Cancelar' }).click();
});

test('CT05 - CT14: Edição de grupo com validação de campo obrigatório (Título vazio)', async ({ page }) => {
    await page.getByRole('link', { name: ' Produtos ' }).click();
    await page.getByRole('link', { name: ' Opções de prod.' }).click();
  
    const productRow = page.locator('tr').filter({ hasText: '1' }).first();

    const editLink = productRow.locator('a[href*="editar"], a.btn-warning, button.btn-warning, a:has(.fa-edit), a:has(.fa-pencil)').first();
    await editLink.scrollIntoViewIfNeeded();
    await editLink.click({ force: true });
    // await page.getByRole('link', { description: 'editar', exact: true }).click();

    await page.locator('input[name="optionGroup[title]"]').click();

    await page.locator('input[name="optionGroup[title]"]').fill('');

    await page.getByRole('button', { name: 'Salvar' }).click();

    await page.getByRole('link', { name: ' Cancelar' }).click();
});

test('CT16 - CT17: Configuração de regras de seleção (Mínimo/Máximo), obrigatoriedade e modificador de quantidade', async ({ page }) => {
    await page.getByRole('link', { name: ' Produtos ' }).click();
    await page.getByRole('link', { name: ' Opções de prod.' }).click();

        const rowPergunta = page.locator('div, section').filter({
  has: page.locator('span, div').filter({ hasText: /^1$/ })
}).first();

const productRow = page.locator('tr').filter({ hasText: '1' }).first();

       const editButton = page.locator('a[href*="Editar"], a.btn-warning, button.btn-warning, a:has(.fa-edit), a:has(.fa-pencil)').first();

    await editButton.scrollIntoViewIfNeeded();
    await editButton.click({ force: true });
    // await page.getByRole('link', { description: 'editar', exact: true }).click();

    await page.getByRole('button', { name: '+ Novo grupo' }).click();
    await rowPergunta.locator('button.btn-success, .fa-plus').first().click();({
      clickCount: 3
    });

    await page.getByText('Obrigatório', { exact: true }).click();

    await page.getByText('Obrigatório', { exact: true }).click();

const campoPergunta = page.locator('input[name*="[title]"]').last();
const campoPergunta1 = page.locator('input[name*="[minimum_of_answers]"]').last();
const campoPergunta2 = page.locator('input[name*="[maximum_of_answers]"]').last();

await campoPergunta.click();
await campoPergunta.fill('Qual forma de pagamento?');

await campoPergunta1.click();
await campoPergunta1.fill('2');

await campoPergunta2.click();
await campoPergunta2.fill('');

await campoPergunta1.click();
await campoPergunta1.fill('');

await campoPergunta1.click();
await campoPergunta1.fill('1');

await campoPergunta2.click();
await campoPergunta2.fill('3');

await page.getByText('Modificar quantidade (').click();
await page.getByRole('checkbox', { name: 'Modificar quantidade (' }).check();
await page.getByText('Modificar quantidade (').click();

await page.getByRole('button').nth(4).click();
await page.getByRole('button').nth(4).click();

// await page.getByRole('button').nth(5).click();
// await page.getByRole('button', { name: 'Sim, quero remover' }).click();
});

test('CT18 - CT22: Inclusão de variação com acréscimo de preço, status padrão e salvamento', async ({ page }) => {
    await page.getByRole('link', { name: ' Produtos ' }).click();
    await page.getByRole('link', { name: ' Opções de prod.' }).click();

    const caixaPergunta1 = page.locator('div, section').filter({
  has: page.locator('span, div').filter({ hasText: /^1$/ })
}).first();
    const productRow = page.locator('tr').filter({ hasText: '1' }).first();
    const campoNovaOpcao = caixaPergunta1.locator('input[value="Nova opção"]').first();
    const campoNovaOpcao1 = caixaPergunta1.locator('input[value="0,00"]').first();
    const campoPergunta = page.locator('input[name*="[options]"]').last();
    // const campoNovaOpcao2 = caixaPergunta1.locator('input[value="1"]').first();

     const editButton = page.locator('a[href*="Editar"], a.btn-warning, button.btn-warning, a:has(.fa-edit), a:has(.fa-pencil)').first();

    await editButton.scrollIntoViewIfNeeded();
    await editButton.click({ force: true });

// await page.getByRole('link', { description: 'editar', exact: true }).click();

// await page.getByRole('link', { description: 'editar', exact: true }).click();
// await page.getByRole('button', { name: '+', exact: true }).click();

    await page.getByRole('button', { name: '+', exact: true }).click();
    await page.getByText('Padrão?').click();
    await page.getByRole('checkbox', { name: 'Padrão?' }).check();
    await page.getByText('Padrão?').click();
    await page.getByRole('checkbox', { name: 'Padrão?' }).uncheck();

    await campoNovaOpcao.click();
    await campoNovaOpcao.fill('OpçãoTeste');

    await campoNovaOpcao1.click();
    await campoNovaOpcao1.fill('550');

    await campoPergunta.click();
    await campoPergunta.fill('2');
    // await page.getByRole('textbox', { name: 'Campo obrigatório' }).click();
    // await page.getByRole('textbox', { name: 'Campo obrigatório' }).fill('550');

    // await page.locator('#data-pickers').getByRole('button', { name: 'Salvar' }).click();
    // await page.locator('#collapse-0').getByRole('button').click();
    // await page.getByRole('button', { name: 'Cancelar' }).click();
    // await page.getByRole('button', { name: 'Sim, quero remover' }).click();

    await page.getByRole('button', { name: 'Salvar' }).nth(1).click();
});

test('CT20: Remoção de item/variação individual do grupo de opções', async ({ page }) => {
    await page.getByRole('link', { name: ' Produtos ' }).click();
    await page.getByRole('link', { name: ' Opções de prod.' }).click();

    const productRow = page.locator('tr').filter({ hasText: '1' }).first();        
    const editLink = productRow.locator('a[href*="editar"], a.btn-warning, button.btn-warning, a:has(.fa-edit), a:has(.fa-pencil)').first();
    await editLink.scrollIntoViewIfNeeded();
    await editLink.click({ force: true });

    await page.getByRole('button').nth(4).click();
    await page.getByRole('button', { name: 'Sim, quero remover' }).click();
});

test('CT06: Exclusão confirmada de grupo de opções na listagem', async ({ page }) => {
    await page.getByRole('link', { name: ' Produtos ' }).click();
    await page.getByRole('link', { name: ' Opções de prod.' }).click();

    const productRow = page.locator('tr').filter({ hasText: '1' }).first();

    const deleteButton = productRow.locator('a[href*="editar"], a.btn-danger').first();
   
    await deleteButton.scrollIntoViewIfNeeded();
    await deleteButton.click({ force: true });

    await page.getByRole('button', { name: 'Sim, remover' }).click();
});
