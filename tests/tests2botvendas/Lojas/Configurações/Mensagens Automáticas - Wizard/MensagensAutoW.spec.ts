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

test('CT01 - Visualização geral e elementos da tela de Mensagens automáticas', async ({ page }) => {
    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    // await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });
    await page.getByRole('heading', { name: 'Mensagens automáticas' }).click();
    await page.getByRole('heading', { name: 'Configuração das mensagens' }).click();
    await page.locator('.fa-stack').first().click();
    await page.locator('div:nth-child(2) > .h-100.w-100 > .preview-container > .preview-badge > .text-uppercase > .fa-stack').click();
    await page.getByRole('button', { name: ' Voltar' }).click();
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Pular etapa  ' }).click();
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Salvar e avançar' }).click();
});

test('CT02 - Ativação/Desativação das mensagens de Aguardando Atendimento', async ({ page }) => {
    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    // await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });
    await page.getByRole('heading', { name: 'Mensagens automáticas' }).click();
    await page.getByRole('heading', { name: 'Configuração das mensagens' }).click();  
    
    await page.getByTitle('Editar mensagem').first().click();
    await page.getByText('Ativar envio de mensagens').click();
    await page.getByRole('checkbox', { name: 'Ativar envio de mensagens' }).uncheck();
    await page.locator('#waiting-seller-modal').click();
    // await page.getByRole('checkbox', { name: 'Ativar envio de mensagens' }).check();
    await page.locator('#waiting-seller-modal').click();
    await page.getByRole('checkbox', { name: 'Ativar envio de mensagens' }).uncheck();
    await page.getByRole('button', { name: 'Salvar', exact: true }).click();
});

test('CT03 - Configuração de tempo e texto na Primeira e Segunda mensagem (Aguardando Atendimento)', async ({ page }) => {
    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    // await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });
    await page.getByRole('heading', { name: 'Mensagens automáticas' }).click();
    await page.getByRole('heading', { name: 'Configuração das mensagens' }).click();  
    await page.getByTitle('Editar mensagem').first().click();
    await page.locator('input[name="waiting_time_first_message"]').click();
    await page.locator('input[name="waiting_time_first_message"]').fill('1');
    await page.locator('input[name="waiting_time_second_message"]').click();
    await page.locator('input[name="waiting_time_second_message"]').fill('2');

    await page.locator('.fa-solid.fa-face-smile').first().click();
    await page.getByRole('button', { name: '🙃' }).click();
    await page.locator('.fa-solid.fa-face-smile').first().click();

    await page.locator('.fas.fa-bold').first().click();
    await page.locator('#first_message_text').fill('😉 *Agradecemos o contato!*\nNossa equipe está sobrecarregada no momento, mas logo um especialista estará disponível para você.🙃**');
    await page.locator('#waiting-seller-modal').click();
    await page.locator('#first_message_text').fill('😉 *Agradecemos o contato!*\nNossa equipe está sobrecarregada no momento, mas logo um especialista estará disponível para você.🙃*__*');
    await page.locator('#waiting-seller-modal').click();
    await page.locator('#first_message_text').fill('😉 *Agradecemos o contato!*\nNossa equipe está sobrecarregada no momento, mas logo um especialista estará disponível para você.🙃*_~~_*');
    await page.locator('#waiting-seller-modal').click();
    await page.locator('#first_message_text').fill('😉 *Agradecemos o contato!*\nNossa equipe está sobrecarregada no momento, mas logo um especialista estará disponível para você.🙃*_~``````~_*');

    await page.locator('.fa-solid.fa-face-smile').last().click();
    await page.getByRole('button', { name: '🙃' }).click();
    await page.locator('.fa-solid.fa-face-smile').last().click();

    await page.locator('#second-message-section > .rounded > .form-group.form-input.col-12 > .d-flex.flex-column > .custom-textarea-label > .d-flex.align-items-center > .markdown-shortcuts > .list-inline > li > .fas').first().click();
    await page.locator('#second_message_text').fill('*Por favor, aguarde mais alguns instantes!* 😉\nEstamos enfrentando um volume elevado de mensagens e em breve, um especialista estará à sua disposição.🙃**');
    await page.locator('#waiting-seller-modal').click();
    await page.locator('#second_message_text').fill('*Por favor, aguarde mais alguns instantes!* 😉\nEstamos enfrentando um volume elevado de mensagens e em breve, um especialista estará à sua disposição.🙃*__*');
    await page.locator('#waiting-seller-modal').click();
    await page.locator('#second_message_text').fill('*Por favor, aguarde mais alguns instantes!* 😉\nEstamos enfrentando um volume elevado de mensagens e em breve, um especialista estará à sua disposição.🙃*_~~_*');
    await page.locator('#waiting-seller-modal').click();
    await page.locator('#second_message_text').fill('*Por favor, aguarde mais alguns instantes!* 😉\nEstamos enfrentando um volume elevado de mensagens e em breve, um especialista estará à sua disposição.🙃*_~``````~_*');

    await page.locator('#first_message_text').click();
    await page.locator('#first_message_text').fill('😉 *Agradecemos o contato!*\nNossa equipe está sobrecarregada no momento, mas logo um especialista estará disponível para você.🙃*_~``````~_*11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111');


    await page.locator('#second_message_text').click();
    await page.locator('#second_message_text').fill('*Por favor, aguarde mais alguns instantes!* 😉\nEstamos enfrentando um volume elevado de mensagens e em breve, um especialista estará à sua disposição.🙃*_~``````~_*11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111');

    await page.getByRole('button', { name: 'Salvar', exact: true }).click();
});

test('CT04 - Remoção e validações de campos obrigatórios em Aguardando Atendimento', async ({ page }) => {
    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    // await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });
    await page.getByRole('heading', { name: 'Mensagens automáticas' }).click();
    await page.getByRole('heading', { name: 'Configuração das mensagens' }).click();  
    await page.getByTitle('Editar mensagem').first().click();
    
    await page.getByTitle('Remover segunda mensagem').click();
    await page.locator('#waiting-seller-modal').click();
    await page.getByRole('textbox', { name: 'Mensagem *' }).fill('');


    await page.getByRole('button', { name: 'Salvar', exact: true }).click();
    await page.locator('input[name="waiting_time_first_message"]').click();
    await page.locator('input[name="waiting_time_first_message"]').fill('0');
    await page.getByRole('textbox', { name: 'Mensagem *' }).click();
    await page.getByRole('textbox', { name: 'Mensagem *' }).fill('1');

    await page.getByRole('button', { name: 'Salvar', exact: true }).click();
});

test('CT05 - Configuração de Template e Mensagem no fluxo de Abandono', async ({ page }) => {
    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    // await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });
    await page.getByRole('heading', { name: 'Mensagens automáticas' }).click();
    await page.getByRole('heading', { name: 'Configuração das mensagens' }).click();  
    await page.getByTitle('Editar mensagem').nth(1).click();

    await page.locator('.fa-solid.fa-face-smile').first().click();
    await page.getByRole('button', { name: '🙃' }).click();
    await page.locator('.fa-solid.fa-face-smile').first().click();

    await page.locator('.fas.fa-bold').first().click();
    await page.locator('#abandoned-seller-modal').click();
    await page.getByRole('textbox', { name: 'Mensagem *' }).fill('Oi. Podemos continuar nosso atendimento? 😉🙃*__*');
    await page.locator('#abandoned-seller-modal').click();
    await page.getByRole('textbox', { name: 'Mensagem *' }).fill('Oi. Podemos continuar nosso atendimento? 😉🙃*_~~_*');
    await page.locator('#abandoned-seller-modal').click();
    await page.getByRole('textbox', { name: 'Mensagem *' }).fill('Oi. Podemos continuar nosso atendimento? 😉🙃*_~``````~_*');
    
    await page.getByText('Adicionar variável').click();
    // await page.locator('#abandoned-seller-modal').click();
    await page.getByText('#first_client_name#').click();

    await page.getByRole('textbox', { name: 'Mensagem *' }).click();
    await page.getByRole('textbox', { name: 'Mensagem *' }).fill('Oi. Podemos continuar nosso atendimento? 😉🙃*_~``````~_*1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111');

    await page.getByRole('button', { name: 'Selecione um template... ' }).click();
    await page.getByRole('button', { name: 'Salvar', exact: true }).click();
});

test('CT06 - Cancelamento e fechamento dos modais sem salvar', async ({ page }) => {
    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    // await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });
    await page.getByRole('heading', { name: 'Mensagens automáticas' }).click();
    await page.getByRole('heading', { name: 'Configuração das mensagens' }).click();  
    await page.getByTitle('Editar mensagem').nth(1).click();
    await page.locator('#abandoned-seller-modal').click();
    await page.getByRole('textbox', { name: 'Mensagem *' }).fill('');
    await page.getByRole('button', { name: 'Salvar', exact: true }).click();
    await page.getByRole('button', { name: 'Cancelar' }).click();
    await page.getByTitle('Editar mensagem').first().click();
    await page.locator('#waiting-seller-modal').click();
    await page.locator('#first_message_text').fill('');

    await page.locator('#second_message_text').click();
    await page.locator('#waiting-seller-modal').click();
    await page.locator('#second_message_text').fill('');

    await page.getByRole('button', { name: 'Salvar', exact: true }).click();
    await page.getByRole('button', { name: 'Cancelar' }).click();
});

test('CT07 - Navegação e conclusão da configuração de Mensagens Automáticas', async ({ page }) => {
    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    // await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });
    await page.getByRole('heading', { name: 'Mensagens automáticas' }).click();
    await page.getByRole('heading', { name: 'Configuração das mensagens' }).click();  
    await page.getByRole('button', { name: 'Salvar e avançar' }).click();
});