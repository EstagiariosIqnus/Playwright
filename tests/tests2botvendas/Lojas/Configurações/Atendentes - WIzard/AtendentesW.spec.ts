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

test('CT01: Visualização da tela de Atendentes e validação de campos obrigatórios na criação de usuários', async ({ page }) => {
    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    // await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });
    await page.getByRole('heading', { name: 'Atendentes' }).click();
    await page.locator('h6').filter({ hasText: 'Atendentes' }).click();
    await page.locator('.paginate_button').first().click();
    await page.getByRole('link', { name: '1' }).click();
    await page.locator('.paginate_button.page-item.next').click();
    await page.getByRole('button', { name: ' Voltar' }).click();
    await page.waitForTimeout(1000);

    await page.getByRole('button', { name: 'Pular etapa  ' }).click();
    await page.waitForTimeout(1000);
   
    await page.getByRole('button', { name: 'Salvar e avançar' }).click();
    await page.getByText('× Atenção! O campo E-mails é').click();
});

test('CT03: Configuração de Controle de acesso (Setores, Permissões e Tooltips)', async ({ page }) => {
    const timestamp = Date.now();
    const nome = `${timestamp}`;

    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    // await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });
    await page.getByRole('heading', { name: 'Atendentes' }).click();
    await page.locator('h6').filter({ hasText: 'Atendentes' }).click();

    await page.getByRole('textbox', { name: 'E-mails*' }).click();
    await page.getByRole('textbox', { name: 'E-mails*' }).fill('atendente_'+timestamp+'@iqnus.com.br\natendente');
    await page.getByRole('button', { name: 'Salvar e avançar' }).click();

    await page.getByRole('textbox', { name: 'E-mails*' }).click();
    await page.getByRole('textbox', { name: 'E-mails*' }).fill('');

    await page.getByRole('textbox', { name: 'E-mails*' }).click();
    await page.getByRole('textbox', { name: 'E-mails*' }).fill('atendente_'+timestamp+'@iqnus.com.br');
    // await page.getByRole('textbox', { name: 'E-mails*' }).fill('atendente_'+timestamp);

    await page.getByRole('searchbox', { name: 'Pesquisar...' }).click();
    await page.getByRole('option', { name: 'Televendas' }).click();
    await page.getByRole('listitem', { name: 'Televendas' }).click();

    // await page.getByRole('button', { name: 'Salvar e avançar' }).click();
});

test('CT04: Configurações avançadas (Mensagem inicial de atendimento)', async ({ page }) => {
    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    // await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });
    await page.getByRole('heading', { name: 'Atendentes' }).click();
    await page.locator('h6').filter({ hasText: 'Atendentes' }).click();

    await page.locator('.fa-stack').first().click();
    await page.locator('.form-input-label > .fa-stack').click();


    await page.getByRole('searchbox', { name: 'Pesquisar...' }).click();
    await page.getByRole('option', { name: 'Balcão' }).click();
    await page.getByRole('option', { name: 'Financeiro' }).click();
    await page.getByRole('option', { name: 'Logística' }).click();
    await page.getByRole('option', { name: 'Televendas' }).click();

    await page.locator('.select2-selection.select2-selection--multiple.form-control.chat_permissions > .select2-selection__rendered > li:nth-child(2) > .select2-selection__choice__remove').click();
    await page.locator('.select2-selection.select2-selection--multiple.form-control.chat_permissions > .select2-selection__rendered > li:nth-child(2) > .select2-selection__choice__remove').click();    

    await page.getByRole('list').filter({ hasText: '×Atendimento' }).getByRole('searchbox').click();
    await page.getByRole('option', { name: 'Venda', exact: true }).click();
    // await page.locator('#select2-chat_permissions-result-l0gy-3').getByText('Permitir avançar para pós-').click();
    // await page.locator('#select2-chat_permissions-result-bx0a-3 > span > .fa-stack').click();

    await page.getByRole('option', { name: 'Permitir avançar para pós-' }).click();
});

test('CT05: Navegação e conclusão da Etapa 1', async ({ page }) => {
    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    // await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });
    await page.getByRole('heading', { name: 'Atendentes' }).click();
    await page.locator('h6').filter({ hasText: 'Atendentes' }).click();

    await page.locator('.custom-switch-label > .fa-stack').click();
    // await page.getByRole('checkbox', { name: '× Enviar mensagem inicial de' }).check();
    // await page.getByText('Enviar mensagem inicial de').click();
    // await page.getByRole('checkbox', { name: '✔ Enviar mensagem inicial de' }).uncheck();

    await page.locator('.fa-solid.fa-face-smile').click();
    await page.getByRole('button', { name: '🙃' }).click();
    await page.locator('.fa-solid.fa-face-smile').click();

    await page.locator('.fas.fa-bold').click();
    await page.getByRole('textbox', { name: 'Digite a mensagem' }).fill('Olá, sou #seller_name# e vou realizar seu atendimento!\nNo que posso ajudar hoje? 🤗**');
    await page.locator('.fas.fa-italic').click();
    await page.getByRole('textbox', { name: 'Digite a mensagem' }).fill('Olá, sou #seller_name# e vou realizar seu atendimento!\nNo que posso ajudar hoje? 🤗*__*');
    
    await page.locator('.fas.fa-strikethrough').click();
    await page.getByRole('textbox', { name: 'Digite a mensagem' }).fill('Olá, sou #seller_name# e vou realizar seu atendimento!\nNo que posso ajudar hoje? 🤗*_~~_*');
    await page.locator('.fas.fa-code').click();
    await page.getByRole('textbox', { name: 'Digite a mensagem' }).fill('Olá, sou #seller_name# e vou realizar seu atendimento!\nNo que posso ajudar hoje? 🤗*_~``````~_*');

    await page.getByText('Adicionar variável').click();
    await page.getByText('#client_name#').click();
});

test('CT06: Visualização e Pré-visualização de Motivos de cancelamento', async ({ page }) => {
    const timestamp = Date.now();
    const nome = `${timestamp}`;

    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    // await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });
    await page.getByRole('heading', { name: 'Atendentes' }).click();
    await page.locator('h6').filter({ hasText: 'Atendentes' }).click();

    await page.getByRole('textbox', { name: 'E-mails*' }).click();
    await page.getByRole('textbox', { name: 'E-mails*' }).fill('atendente_'+timestamp+'@iqnus.com.br');

    await page.getByRole('searchbox', { name: 'Pesquisar...' }).click();
    await page.getByRole('option', { name: 'Televendas' }).click();
    await page.getByRole('button', { name: 'Salvar e avançar' }).click();
    await page.goto('https://kaduemanueltreinamento.botvendas.com/wizard/20/edit?process=cancel_reasons');
});

test('CT07 - CT08: Visualização, Pré-visualização e ativação/desativação de Motivos de cancelamento', async ({ page }) => {
        await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    // await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });
    await page.getByRole('heading', { name: 'Atendentes' }).click();
    await page.getByRole('heading', { name: 'Motivos de cancelamento' }).click();

    await page.getByText('Apenas Orçamento').first().click();
    await page.getByRole('checkbox', { name: 'Apenas Orçamento' }).check();
    await page.getByText('Apenas Orçamento').first().click();
    await page.getByRole('checkbox', { name: 'Apenas Orçamento' }).uncheck();

    await page.getByText('Produto sem estoque').first().click();
    await page.getByRole('checkbox', { name: 'Produto sem estoque' }).check();
    await page.getByText('Produto sem estoque').first().click();
    await page.getByRole('checkbox', { name: 'Produto sem estoque' }).uncheck();

    await page.getByText('Comprou no concorrente').first().click();
    await page.getByRole('checkbox', { name: 'Comprou no concorrente' }).check();
    await page.getByText('Comprou no concorrente').first().click();
    await page.getByRole('checkbox', { name: 'Comprou no concorrente' }).uncheck();

    await page.getByText('Comprou na loja física').first().click();
    await page.getByRole('checkbox', { name: 'Comprou na loja física' }).check();
    await page.getByText('Comprou na loja física').first().click();
    await page.getByRole('checkbox', { name: 'Comprou na loja física' }).uncheck();

    await page.getByText('Dúvidas sobre a entrega').first().click();
    await page.getByRole('checkbox', { name: 'Dúvidas sobre a entrega' }).check();
    await page.getByText('Dúvidas sobre a entrega').first().click();
    await page.getByRole('checkbox', { name: 'Dúvidas sobre a entrega' }).uncheck();
});

test('CT09: Finalização do módulo de Atendentes (Salvar e avançar / Navegação)', async ({ page }) => {
    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    // await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });
    await page.getByRole('heading', { name: 'Atendentes' }).click();
    await page.getByRole('heading', { name: 'Motivos de cancelamento' }).click();

    await page.getByRole('button', { name: ' Voltar' }).click();
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Pular etapa  ' }).click();
    // await page.waitForTimeout(2000);


    await page.getByText('Apenas Orçamento').first().click();
    await page.getByRole('checkbox', { name: 'Apenas Orçamento' }).check();
    await page.getByText('Produto sem estoque').first().click();
    await page.getByRole('checkbox', { name: 'Produto sem estoque' }).check();
    await page.getByText('Comprou no concorrente').first().click();
    await page.getByRole('checkbox', { name: 'Comprou no concorrente' }).check();
    await page.getByText('Comprou na loja física').first().click();
    await page.getByRole('checkbox', { name: 'Comprou na loja física' }).check();
    await page.getByText('Dúvidas sobre a entrega').first().click();
    await page.getByRole('checkbox', { name: 'Dúvidas sobre a entrega' }).check();

    await page.locator('body').click();

    await page.locator('#only_budget_shortcut').click();
    await page.locator('#only_budget_shortcut').fill('5');
    await page.locator('#product_out_stock_shortcut').click();
    await page.locator('#product_out_stock_shortcut').click();
    await page.locator('#product_out_stock_shortcut').fill('4');
    await page.locator('body').click();
    await page.locator('#purchase_competitor_shortcut').click();
    await page.locator('#purchase_competitor_shortcut').fill('3');
    await page.locator('#buy_physical_store_shortcut').click();
    await page.locator('#buy_physical_store_shortcut').click();
    await page.locator('#buy_physical_store_shortcut').fill('2');
    await page.locator('body').click();
    await page.locator('#delivery_questions_shortcut').click();
    await page.locator('#delivery_questions_shortcut').press('ArrowRight');
    await page.locator('#delivery_questions_shortcut').fill('1');

    await page.getByRole('button', { name: 'Salvar e avançar' }).click();
});