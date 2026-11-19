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

test('CT01 - CT02: Configuração da mensagem de boas-vindas com emojis e formatação', async ({ page }) => {
    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    // await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });

    await page.getByRole('heading', { name: 'Fluxo de loja' }).click();
    await page.getByRole('heading', { name: 'Abertura' }).click();

    await page.locator('.fa-stack').first().click();
    await page.locator('div:nth-child(2) > .h-100.w-100 > .preview-container > .preview-badge > .text-uppercase > .fa-stack').click();

    await page.getByTitle('Editar mensagem').first().click();

    await page.getByRole('textbox', { name: 'Mensagem' }).click();
    await page.locator('form').filter({ hasText: 'Configuração de aplicação (' }).click();
    await page.getByRole('textbox', { name: 'Mensagem' }).fill('');
    await page.getByRole('textbox', { name: 'Mensagem' }).fill('Olá! Seja muito bem-vindo(a) à Drogarias Fortaleza! 😊 Como podemos cuidar de você hoje?');
    
    await page.locator('.fa-solid.fa-face-smile').click();
    await page.getByRole('button', { name: '🙃' }).click();
    await page.locator('.fa-solid.fa-face-smile').click();

    await page.locator('#send-text-modal').click();
    await page.getByRole('textbox', { name: 'Mensagem' }).fill('Olá! Seja muito bem-vindo(a) à Drogarias Fortaleza! 😊 Como podemos cuidar de você hoje?🙃**');
    await page.locator('#send-text-modal').click();
    await page.getByRole('textbox', { name: 'Mensagem' }).fill('Olá! Seja muito bem-vindo(a) à Drogarias Fortaleza! 😊 Como podemos cuidar de você hoje?🙃*__*');
    await page.locator('#send-text-modal').click();
    await page.getByRole('textbox', { name: 'Mensagem' }).fill('Olá! Seja muito bem-vindo(a) à Drogarias Fortaleza! 😊 Como podemos cuidar de você hoje?🙃*_~~_*');
    await page.locator('#send-text-modal').click();
    await page.getByRole('textbox', { name: 'Mensagem' }).fill('Olá! Seja muito bem-vindo(a) à Drogarias Fortaleza! 😊 Como podemos cuidar de você hoje?🙃*_~``````~_*');

    await page.getByRole('textbox', { name: 'Mensagem' }).click();
    await page.getByText('Adicionar variável').click();
    await page.getByText('#client_name#').click();
    await page.getByRole('textbox', { name: 'Mensagem' }).click();
    await page.getByRole('textbox', { name: 'Mensagem' }).fill('1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111');

    await page.getByRole('button', { name: 'Salvar', exact: true }).click();
});

test('CT03: Upload de PDF de logotipia e configuração de URL de redirecionamento', async ({ page }) => {
    const imagePath = path.join(__dirname, 'Logo_ Drogarias Fortaleza.pdf');
    const imageTest = path.join(__dirname, 'lista2detestes');

    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    // await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });

    await page.getByRole('heading', { name: 'Fluxo de loja' }).click();
    await page.getByRole('heading', { name: 'Abertura' }).click();

    await page.getByTitle('Editar mensagem').nth(1).click();

    await page.getByText('PDF').click();

    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.getByText('Clique, arraste ou cole um arquivoFormatos aceitos: .pdf de até 20MB').click();
    const filechooser = await fileChooserPromise;
    await filechooser.setFiles(imageTest);
    await filechooser.setFiles(imagePath);

    await page.getByRole('textbox', { name: 'Nome do arquivo *' }).click();
    await page.getByRole('textbox', { name: 'Nome do arquivo *' }).fill('Logo Drogarias Fortaleza');
    await page.getByRole('button', { name: 'Salvar', exact: true }).click();

    await page.getByTitle('Editar mensagem').nth(1).click();

    await page.getByText('URL').click();
    await page.getByRole('radio', { name: 'URL' }).check();
    await page.getByRole('textbox', { name: 'https://www.exemplo.com' }).click();
    await page.getByRole('textbox', { name: 'https://www.exemplo.com' }).fill('https://kaduemanueltreinamento.botvendas.com/login');
    await page.getByRole('button', { name: 'Salvar', exact: true }).click();
});

test('CT04 - CT05: Configuração de encartes promocionais por loja', async ({ page }) => {
    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    // await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });

    await page.getByRole('heading', { name: 'Fluxo de loja' }).click();
    await page.getByRole('heading', { name: 'Abertura' }).click();

    await page.getByTitle('Editar mensagem').nth(2).click();
    await page.getByRole('button', { name: 'Salvar', exact: true }).click();


    await page.getByTitle('Editar mensagem').nth(3).click();
    await page.getByLabel('Envio de encarte por loja').selectOption('1');
    await page.getByRole('button', { name: 'Salvar', exact: true }).click();
});

test('CT06: Configuração da mensagem de boas-vindas secundária e seleção de grupo de banners', async ({ page }) => {
    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    // await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });

    await page.getByRole('heading', { name: 'Fluxo de loja' }).click();
    await page.getByRole('heading', { name: 'Abertura' }).click();    

    await page.getByTitle('Editar mensagem').nth(4).click();
    await page.getByRole('main').filter({ hasText: 'Mensagem39/1024Adicionar vari' }).click();
    await page.getByRole('textbox', { name: 'Mensagem' }).fill('Olá, #first_client_name#! Bem-vindo(a) à Drogarias Fortaleza! 💊✨ Em que podemos ajudar?');
    await page.getByRole('button', { name: 'Salvar', exact: true }).click();
    
    await page.getByTitle('Editar mensagem').nth(5).click();
    await page.getByLabel('Grupo de Banners').selectOption('9');
    await page.getByRole('button', { name: 'Salvar', exact: true }).click();

    await page.locator('div:nth-child(2) > .h-100.w-100 > .preview-container > .position-relative > .d-flex.flex-column.align-items-center > .custom-scrollbar > div:nth-child(4) > .edit-button').click();
    await page.getByLabel('Envio de encarte por loja').selectOption('all');
    await page.getByRole('button', { name: 'Salvar', exact: true }).click();

    await page.getByRole('button', { name: ' Voltar' }).click();
    await page.waitForTimeout(1000);

    await page.getByRole('button', { name: 'Salvar e avançar' }).click();
    await page.getByRole('button', { name: 'Pular etapa  ' }).click();
});

test('CT07: Configuração completa e encadeada do fluxo de abertura da loja', async ({ page }) => {
    const imagePath = path.join(__dirname, 'Logo_ Drogarias Fortaleza.pdf');

    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    // await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });

    await page.getByRole('heading', { name: 'Fluxo de loja' }).click();
    await page.getByRole('heading', { name: 'Abertura' }).click();

    await page.locator('.fa-stack').first().click();
    await page.locator('div:nth-child(2) > .h-100.w-100 > .preview-container > .preview-badge > .text-uppercase > .fa-stack').click();

    await page.getByTitle('Editar mensagem').first().click();

    await page.getByRole('textbox', { name: 'Mensagem' }).click();
    await page.locator('form').filter({ hasText: 'Configuração de aplicação (' }).click();
    await page.getByRole('textbox', { name: 'Mensagem' }).fill('');
    await page.getByRole('textbox', { name: 'Mensagem' }).fill('Olá! Seja muito bem-vindo(a) à Drogarias Fortaleza! 😊 Como podemos cuidar de você hoje?');
    
    await page.locator('.fa-solid.fa-face-smile').click();
    await page.getByRole('button', { name: '🙃' }).click();
    await page.locator('.fa-solid.fa-face-smile').click();

    await page.getByRole('button', { name: 'Salvar', exact: true }).click();

    await page.getByTitle('Editar mensagem').nth(1).click();

    await page.getByText('PDF').click();

    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.getByText('Clique, arraste ou cole um arquivoFormatos aceitos: .pdf de até 20MB').click();
    const filechooser = await fileChooserPromise;
    await filechooser.setFiles(imagePath);

    await page.getByRole('textbox', { name: 'Nome do arquivo *' }).click();
    await page.getByRole('textbox', { name: 'Nome do arquivo *' }).fill('Logo Drogarias Fortaleza');
    await page.getByRole('button', { name: 'Salvar', exact: true }).click();

    await page.getByTitle('Editar mensagem').nth(2).click();
    await page.getByRole('button', { name: 'Salvar', exact: true }).click();

    await page.getByTitle('Editar mensagem').nth(3).click();
    await page.getByLabel('Envio de encarte por loja').selectOption('1');
    await page.getByRole('button', { name: 'Salvar', exact: true }).click();

    await page.getByTitle('Editar mensagem').nth(4).click();
    await page.getByRole('textbox', { name: 'Mensagem' }).fill('Olá, #first_client_name#! Bem-vindo(a) à Drogarias Fortaleza! 💊✨ Em que podemos ajudar?');
    await page.getByRole('button', { name: 'Salvar', exact: true }).click();
    
    await page.getByTitle('Editar mensagem').nth(5).click();
    await page.getByLabel('Grupo de Banners').selectOption('9');
    await page.getByRole('button', { name: 'Salvar', exact: true }).click();

    await page.locator('div:nth-child(2) > .h-100.w-100 > .preview-container > .position-relative > .d-flex.flex-column.align-items-center > .custom-scrollbar > div:nth-child(4) > .edit-button').click();
    await page.getByLabel('Envio de encarte por loja').selectOption('all');
    await page.getByRole('button', { name: 'Salvar', exact: true }).click();

    await page.getByRole('button', { name: 'Salvar e avançar' }).click();
    await page.getByRole('button', { name: 'Sim, salvar' }).click();
});

test('CT08 - CT09: Associação de ID de agenda para mensagens de loja fechada', async ({ page }) => {
    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    // await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });

    await page.getByRole('heading', { name: 'Fluxo de loja' }).click();
    await page.getByText('Configure as mensagens a serem enviadas quando sua loja estiver fechada').click();

    await page.locator('.fa-stack').first().click();
    await page.locator('div:nth-child(2) > .h-100.w-100 > .preview-container > .preview-badge > .text-uppercase > .fa-stack').click();
    await page.locator('div:nth-child(3) > .h-100.w-100 > .preview-container > .preview-badge > .text-uppercase > .fa-stack').click();

    await page.getByTitle('Editar mensagem').first().click();
    await page.locator('#schedule_id').selectOption('12');
    await page.getByRole('button', { name: 'Salvar', exact: true }).click();
});

test('CT10: Configuração da mensagem de transferência e regras para clientes e lojas favoritas', async ({ page }) => {
    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    // await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });

    await page.getByRole('heading', { name: 'Fluxo de loja' }).click();
    await page.getByText('Configure as mensagens a serem enviadas quando sua loja estiver fechada').click();

    await page.getByTitle('Editar mensagem').nth(1).click();
    await page.locator('#contact-seller-modal').click();
    await page.getByRole('textbox', { name: 'Mensagem de transferência *' }).fill('');
    await page.getByRole('textbox', { name: 'Mensagem de transferência *' }).fill('Confira nosso catálogo completo e compre sem sair de casa pela Loja Virtual da Drogarias Fortaleza: 🛍️💙 #webapp_link#\n\nCaso precise de ajuda, envie sua lista de produtos por texto ou áudio por aqui. 👇🏻');

    await page.getByRole('radio', { name: 'Apenas clientes carteirizados' }).check();
    await page.locator('#form-select').selectOption('1');

    await page.getByRole('radio', { name: 'Todos os clientes' }).check();
    await page.locator('#form-select').selectOption('1');

    await page.getByLabel('Loja', { exact: true }).selectOption('1');
    await page.locator('#contact-seller-modal').click();

    await page.getByText('Usar loja favorita de compras').click();
    await page.getByRole('checkbox', { name: 'Usar loja favorita de compras' }).check();
    await page.getByText('Usar loja favorita de compras').click();

    await page.getByRole('button', { name: 'Salvar', exact: true }).click();
});

test('CT11: Configuração da mensagem de ausência com horário de atendimento e tratamento de erros', async ({ page }) => {
    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    // await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });

    await page.getByRole('heading', { name: 'Fluxo de loja' }).click();
    await page.getByText('Configure as mensagens a serem enviadas quando sua loja estiver fechada').click();

    await page.getByTitle('Editar mensagem').nth(3).click();
    await page.locator('#schedule_id').selectOption('12');

    await page.getByRole('textbox', { name: 'Mensagem' }).click();
    await page.getByRole('textbox', { name: 'Mensagem' }).fill('');
    await page.getByRole('textbox', { name: 'Mensagem' }).fill('Nosso horário de atendimento é de:\n\n    Segunda a Sexta: 07:00 às 22:00\n\n    Sábado: 08:00 às 21:00\n\n    Domingo: 08:00 às 14:00\n\nMas não se preocupe, escreva sua mensagem com a sua dúvida, pedido ou receita e, assim que um de nossos atendentes estiver disponível, retornaremos o seu contato para cuidar da sua saúde e bem-estar! 💚');

    await page.getByRole('link', { name: 'Tag' }).click();
    await page.getByRole('link', { name: 'Fixo' }).click();

    await page.locator('#out_of_schedule_flow_flow_type').selectOption('2');
    await page.locator('#out_of_schedule_flow_flow_type').selectOption('3');

    await page.getByRole('spinbutton', { name: 'Ex:' }).click();
    await page.getByRole('spinbutton', { name: 'Ex:' }).fill('3');

    await page.getByRole('link', { name: 'Customizado' }).click();
    await page.getByRole('textbox', { name: 'Escreva...' }).click();
    await page.getByRole('textbox', { name: 'Escreva...' }).fill('Ajuda');

    await page.locator('#out_of_schedule_flow_error_message').click();
    await page.locator('#out_of_schedule_flow_error_message').fill('erro');

    await page.getByRole('link', { name: 'Fixo' }).click();
    await page.getByRole('button', { name: 'Salvar', exact: true }).click();
});

test('CT12: Configuração da mensagem automática para dias de feriado', async ({ page }) => {
    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    // await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });

    await page.getByRole('heading', { name: 'Fluxo de loja' }).click();
    await page.getByText('Configure as mensagens a serem enviadas quando sua loja estiver fechada').click();

    await page.getByTitle('Editar mensagem').nth(5).click();
    await page.getByRole('textbox', { name: 'Mensagem  ' }).click();
    await page.getByRole('textbox', { name: 'Mensagem  ' }).fill('');

    await page.getByRole('link', { name: 'Tag' }).click();
    await page.locator('#is_holiday_flow_tag').click();
    await page.getByRole('link', { name: 'Fixo' }).click();
    await page.getByRole('link', { name: 'Customizado' }).click();
    await page.getByRole('link', { name: 'Fixo' }).click();
    await page.getByRole('textbox', { name: 'Mensagem  ' }).fill('Olá, #first_client_name#! Informamos que hoje a Drogarias Fortaleza estará fechada devido ao feriado.\n\nMas fique tranquilo: escreva sua mensagem ou deixe sua dúvida/receita por aqui. Assim que retornarmos às nossas atividades normais, entraremos em contato para cuidar de você! 💚');
    await page.locator('#schedule_id').selectOption('12');
    await page.getByRole('button', { name: 'Salvar', exact: true }).click();  
});

test('CT13: Navegação e pulo de etapas no assistente de configuração de loja', async ({ page }) => {
    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    // await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });

    await page.getByRole('heading', { name: 'Fluxo de loja' }).click();
    await page.getByText('Configure as mensagens a serem enviadas quando sua loja estiver fechada').click();
    await page.getByRole('button', { name: ' Voltar' }).click();
    await page.getByRole('button', { name: 'Pular etapa  ' }).click();
});

test('CT13: Configuração unificada de fechamento, feriado e salvamento do fluxo completo', async ({ page }) => {
    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    // await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });

    await page.getByRole('heading', { name: 'Fluxo de loja' }).click();
    await page.getByText('Configure as mensagens a serem enviadas quando sua loja estiver fechada').click();

    await page.getByTitle('Editar mensagem').nth(1).click();
    await page.locator('#contact-seller-modal').click();
    await page.getByRole('textbox', { name: 'Mensagem de transferência *' }).fill('');
    await page.getByRole('textbox', { name: 'Mensagem de transferência *' }).fill('Confira nosso catálogo completo e compre sem sair de casa pela Loja Virtual da Drogarias Fortaleza: 🛍️💙 #webapp_link#\n\nCaso precise de ajuda, envie sua lista de produtos por texto ou áudio por aqui. 👇🏻');

    await page.getByRole('radio', { name: 'Todos os clientes' }).check();
    await page.locator('#form-select').selectOption('1');

    await page.getByLabel('Loja', { exact: true }).selectOption('1');
    await page.locator('#contact-seller-modal').click();

    await page.getByText('Usar loja favorita de compras').click();

    await page.getByRole('button', { name: 'Salvar', exact: true }).click();
    
    await page.getByTitle('Editar mensagem').nth(3).click();
    await page.locator('#schedule_id').selectOption('12');

    await page.getByRole('textbox', { name: 'Mensagem' }).click();
    await page.getByRole('textbox', { name: 'Mensagem' }).fill('');
    await page.getByRole('textbox', { name: 'Mensagem' }).fill('Nosso horário de atendimento é de:\n\n    Segunda a Sexta: 07:00 às 22:00\n\n    Sábado: 08:00 às 21:00\n\n    Domingo: 08:00 às 14:00\n\nMas não se preocupe, escreva sua mensagem com a sua dúvida, pedido ou receita e, assim que um de nossos atendentes estiver disponível, retornaremos o seu contato para cuidar da sua saúde e bem-estar! 💚');

    await page.getByRole('link', { name: 'Tag' }).click();
    await page.getByRole('link', { name: 'Fixo' }).click();
    await page.getByRole('button', { name: 'Salvar', exact: true }).click();

    await page.getByTitle('Editar mensagem').nth(5).click();
    await page.getByRole('textbox', { name: 'Mensagem  ' }).click();
    await page.getByRole('textbox', { name: 'Mensagem  ' }).fill('');

    await page.getByRole('link', { name: 'Tag' }).click();
    await page.locator('#is_holiday_flow_tag').click();
    await page.getByRole('link', { name: 'Fixo' }).click();
    await page.getByRole('link', { name: 'Customizado' }).click();
    await page.getByRole('link', { name: 'Fixo' }).click();
    await page.getByRole('textbox', { name: 'Mensagem  ' }).fill('Olá, #first_client_name#! Informamos que hoje a Drogarias Fortaleza estará fechada devido ao feriado.\n\nMas fique tranquilo: escreva sua mensagem ou deixe sua dúvida/receita por aqui. Assim que retornarmos às nossas atividades normais, entraremos em contato para cuidar de você! 💚');
    await page.locator('#schedule_id').selectOption('12');
    await page.getByRole('button', { name: 'Salvar', exact: true }).click();  

    await page.getByRole('button', { name: 'Salvar e avançar' }).click();
    await page.getByRole('button', { name: 'Cancelar' }).click();
    await page.getByRole('button', { name: 'Salvar e avançar' }).click();
    await page.getByRole('button', { name: 'Sim, salvar' }).click();
});

test('CT14: Visualização e tooltips das colunas de despedida', async ({ page }) => {
    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    // await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });

    await page.getByRole('heading', { name: 'Fluxo de loja' }).click();
    await page.getByRole('heading', { name: 'Despedida' }).click();
    await page.locator('.fa-stack').first().click();
    await page.locator('div:nth-child(2) > .h-100.w-100 > .preview-container > .preview-badge > .text-uppercase > .fa-stack').click();
    await page.locator('div:nth-child(3) > .h-100.w-100 > .preview-container > .preview-badge > .text-uppercase > .fa-stack').click();
});

test('CT15: Configuração de aplicação (Enviar texto nas despedidas)', async ({ page }) => {
    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    // await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });

    await page.getByRole('heading', { name: 'Fluxo de loja' }).click();
    await page.getByRole('heading', { name: 'Despedida' }).click();

    await page.getByTitle('Editar mensagem').first().click();

    await page.getByRole('textbox', { name: 'Mensagem' }).click();
    await page.getByRole('textbox', { name: 'Mensagem' }).fill('');
    await page.getByRole('textbox', { name: 'Mensagem' }).fill('👋 Olá! Nossa conversa está encerrando por aqui, mas **foi um prazer enorme te atender hoje!** 🌟\n\n*Esperamos que você tenha encontrado tudo o que precisava.*\n\n~~Caso tenha ficado alguma dúvida pendente~~, não se preocupe: você pode nos chamar novamente a qualquer momento. 💙\n\nAqui está o código/identificador do seu atendimento para referência futura:\n`ATD-2026-9876` 🤖✨\n\nAté logo e tenha um excelente dia! 🚀');
    
    await page.locator('.fa-solid.fa-face-smile').click();
    await page.getByRole('button', { name: '🙃' }).click();
    await page.locator('.fa-solid.fa-face-smile').click();

    await page.getByRole('textbox', { name: 'Mensagem' }).click();
    await page.getByRole('textbox', { name: 'Mensagem' }).fill('👋 Olá! Nossa conversa está encerrando por aqui, mas **foi um prazer enorme te atender hoje!** 🌟\n\n*Esperamos que você tenha encontrado tudo o que precisava.*\n\n~~Caso tenha ficado alguma dúvida pendente~~, não se preocupe: você pode nos chamar novamente a qualquer momento. 💙\n\nAqui está o código/identificador do seu atendimento para referência futura:\n`ATD-2026-9876` 🤖✨\n\nAté logo e tenha um excelente dia! 🚀🙃1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111');
    await page.getByRole('button', { name: 'Salvar', exact: true }).click();
});

test('CT16: Configuração de aplicação (Finalizar atendimento)', async ({ page }) => {
    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    // await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });

    await page.getByRole('heading', { name: 'Fluxo de loja' }).click();
    await page.getByRole('heading', { name: 'Despedida' }).click();

    await page.getByTitle('Editar mensagem').nth(1).click();
    await page.getByText('Redirecionar para pesquisa de').click();
    await page.getByRole('checkbox', { name: 'Redirecionar para pesquisa de' }).uncheck();
    await page.getByText('Redirecionar para pesquisa de').click();
    await page.getByRole('checkbox', { name: 'Redirecionar para pesquisa de' }).check();
    await page.getByRole('button', { name: 'Salvar', exact: true }).click();
    await page.getByTitle('Editar mensagem').nth(3).click();
    await page.getByRole('button', { name: 'Cancelar' }).click();

    await page.getByRole('button', { name: 'Salvar', exact: true }).click();

    await page.getByRole('button', { name: ' Voltar' }).click();
    await page.getByRole('button', { name: 'Pular etapa  ' }).click();
});

test('CT17: Navegação e conclusão da Etapa 3', async ({ page }) => {
    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    // await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });

    await page.getByRole('heading', { name: 'Fluxo de loja' }).click();
    await page.getByRole('heading', { name: 'Despedida' }).click();

    await page.getByTitle('Editar mensagem').first().click();

    await page.getByRole('textbox', { name: 'Mensagem' }).click();
    await page.getByRole('textbox', { name: 'Mensagem' }).fill('');
    await page.getByRole('textbox', { name: 'Mensagem' }).fill('👋 Olá! Nossa conversa está encerrando por aqui, mas **foi um prazer enorme te atender hoje!** 🌟\n\n*Esperamos que você tenha encontrado tudo o que precisava.*\n\n~~Caso tenha ficado alguma dúvida pendente~~, não se preocupe: você pode nos chamar novamente a qualquer momento. 💙\n\nAqui está o código/identificador do seu atendimento para referência futura:\n`ATD-2026-9876` 🤖✨\n\nAté logo e tenha um excelente dia! 🚀');
    await page.getByRole('button', { name: 'Salvar', exact: true }).click();

    await page.getByTitle('Editar mensagem').nth(2).click();
    await page.getByRole('textbox', { name: 'Mensagem' }).click();
    await page.getByRole('textbox', { name: 'Mensagem' }).fill('');
    await page.getByRole('textbox', { name: 'Mensagem' }).fill('👋 Olá! Nossa conversa está encerrando por aqui, mas **foi um prazer enorme te atender hoje!** 🌟\n\n*Esperamos que você tenha encontrado tudo o que precisava.*\n\n~~Caso tenha ficado alguma dúvida pendente~~, não se preocupe: você pode nos chamar novamente a qualquer momento. 💙\n\nAqui está o código/identificador do seu atendimento para referência futura:\n`ATD-2026-9876` 🤖✨\n\nAté logo e tenha um excelente dia! 🚀\n');
    await page.getByRole('button', { name: 'Salvar', exact: true }).click();

    await page.getByTitle('Editar mensagem').nth(4).click();
    await page.getByRole('textbox', { name: 'Mensagem' }).click();
    await page.getByRole('textbox', { name: 'Mensagem' }).fill('');
    await page.getByRole('textbox', { name: 'Mensagem' }).fill('👋 Olá! Nossa conversa está encerrando por aqui, mas **foi um prazer enorme te atender hoje!** 🌟\n\n*Esperamos que você tenha encontrado tudo o que precisava.*\n\n~~Caso tenha ficado alguma dúvida pendente~~, não se preocupe: você pode nos chamar novamente a qualquer momento. 💙\n\nAqui está o código/identificador do seu atendimento para referência futura:\n`ATD-2026-9876` 🤖✨\n\nAté logo e tenha um excelente dia! 🚀\n');
    await page.getByRole('button', { name: 'Salvar', exact: true }).click();


    await page.getByRole('button', { name: 'Salvar e avançar' }).click();
    await page.getByRole('button', { name: 'Cancelar' }).click();
    await page.getByRole('button', { name: 'Salvar e avançar' }).click();
    await page.getByRole('button', { name: 'Sim, salvar' }).click();
});

test('CT18: Visualização e tooltips da Pesquisa de Sucesso', async ({ page }) => {
    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    // await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });

    await page.getByRole('heading', { name: 'Fluxo de loja' }).click();
    await page.getByRole('heading', { name: 'Pesquisa de sucesso' }).click();

    await page.locator('div:nth-child(2) > .h-100.w-100 > .preview-container > .preview-badge > .text-uppercase > .fa-stack').click();
    await page.locator('div:nth-child(3) > .h-100.w-100 > .preview-container > .preview-badge > .text-uppercase > .fa-stack').click();

});
test('CT19: Configuração de aplicação (Pesquisa de satisfação - Mensagem e filtro)', async ({ page }) => {
    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    // await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });

    await page.getByRole('heading', { name: 'Fluxo de loja' }).click();
    await page.getByRole('heading', { name: 'Pesquisa de sucesso' }).click();

    await page.getByTitle('Editar mensagem').first().click();
    await page.getByRole('textbox', { name: 'Mensagem:' }).fill('De 5 (cinco) a 1 (um), como foi a sua experiência de atendimento com a gente?\n5 - 😍 Muito bom!\n4 - 🙂 Foi bom!\n3 - 😐 Poderia ser melhor!\n2 - 🙁 Não gostei!\n1 - 😠 Muito ruim!\n');

    await page.locator('#satisfaction-survey-modal').click();
    // await page.getByRole('checkbox', { name: 'Enviar apenas para clientes' }).check();
    await page.getByRole('textbox', { name: 'Mensagem:' }).click();

    await page.getByRole('textbox', { name: 'Mensagem:' }).click();
    await page.getByRole('textbox', { name: 'Mensagem:' }).fill('De 5 (cinco) a 1 (um), como foi a sua experiência de atendimento com a gente?\n5 - 😍 Muito bom!\n4 - 🙂 Foi bom!\n3 - 😐 Poderia ser melhor!\n2 - 🙁 Não gostei!\n1 - 😠 Muito ruim!\n1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111');
    await page.getByRole('button', { name: 'Salvar', exact: true }).click();

});

test('CT20: Tratativa de nota negativa e Notificação de gerente', async ({ page }) => {
    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    // await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });

    await page.getByRole('heading', { name: 'Fluxo de loja' }).click();
    await page.getByRole('heading', { name: 'Pesquisa de sucesso' }).click();

    await page.getByTitle('Editar mensagem').nth(3).click();
    await page.locator('#tratative_question').click();
    await page.locator('#tratative_question').fill('Senti muito por não atender suas expectativas. Poderia nos contar o que motivou a nota?');
    await page.locator('#form-select').selectOption('558530349999');
    await page.locator('#satisfaction-survey-modal').click();
    // await page.getByRole('checkbox', { name: 'Enviar apenas para clientes' }).check();
    await page.getByRole('button', { name: 'Salvar', exact: true }).click();
});

test('CT21: Mensagem de agradecimento e finalização por inatividade (Sem resposta)', async ({ page }) => {
    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    // await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });

    await page.getByRole('heading', { name: 'Fluxo de loja' }).click();
    await page.getByRole('heading', { name: 'Pesquisa de sucesso' }).click();
    await page.getByTitle('Editar mensagem').nth(4).click();

    await page.getByRole('textbox', { name: 'Mensagem' }).click();
    await page.getByRole('textbox', { name: 'Mensagem' }).fill('');

    await page.getByRole('textbox', { name: 'Mensagem' }).fill('Muito obrigado(a) pelo contato! 🚀\nPrecisando de suporte novamente, é só mandar um "oi" por aqui. ~Sem problemas,~ será um prazer atender você de novo! ✨\n\nMensagem automática — não precisa responder.');
    await page.getByRole('button', { name: 'Salvar', exact: true }).click();

    await page.getByRole('button', { name: ' Voltar' }).click();
    await page.getByRole('button', { name: 'Pular etapa  ' }).click();
});

test('CT22: Navegação e conclusão da Etapa 4', async ({ page }) => {
    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    // await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });

    await page.getByRole('heading', { name: 'Fluxo de loja' }).click();
    await page.getByRole('heading', { name: 'Pesquisa de sucesso' }).click();

    await page.getByTitle('Editar mensagem').first().click();
    await page.locator('#satisfaction-survey-modal').click();
    await page.getByRole('textbox', { name: 'Mensagem:' }).fill('');

    await page.getByRole('textbox', { name: 'Mensagem:' }).click();
    await page.getByRole('textbox', { name: 'Mensagem:' }).fill('De 5 (cinco) a 1 (um), como você avalia o nosso atendimento hoje? 💬\n5 - 🤩 Excelente!4 - 😊 Muito bom!3 - 😐 Regular\n2 - 😕 Ruim\n1 - 😡 Péssimo\nSua opinião nos ajuda a melhorar ~sempre que possível~ todos os dias!Digite apenas o número correspondente.\n');
    await page.getByRole('textbox', { name: 'Mensagem:' }).click();
    await page.getByRole('textbox', { name: 'Mensagem:' }).fill('De 5 (cinco) a 1 (um), como você avalia o nosso atendimento hoje? 💬\n5 - 🤩 Excelente!\n4 - 😊 Muito bom!3 - 😐 Regular\n2 - 😕 Ruim\n1 - 😡 Péssimo\nSua opinião nos ajuda a melhorar ~sempre que possível~ todos os dias!Digite apenas o número correspondente.\n');
    await page.getByRole('textbox', { name: 'Mensagem:' }).click();
    await page.getByRole('textbox', { name: 'Mensagem:' }).fill('De 5 (cinco) a 1 (um), como você avalia o nosso atendimento hoje? 💬\n5 - 🤩 Excelente!\n4 - 😊 Muito bom!\n3 - 😐 Regular\n2 - 😕 Ruim\n1 - 😡 Péssimo\nSua opinião nos ajuda a melhorar ~sempre que possível~ todos os dias!Digite apenas o número correspondente.\n');
    await page.getByRole('button', { name: 'Salvar', exact: true }).click();

    await page.getByTitle('Editar mensagem').nth(3).click();
    await page.locator('#tratative_question').fill('');
    await page.locator('#form-select').selectOption('558530349999');
    await page.locator('#tratative_question').fill('Poxa, sentimos muito por isso! 😔\nQueremos muito melhorar. ~Não foi nossa intenção~ Poderia nos contar o que aconteceu para recebermos essa nota? 💬\nSua resposta nos ajuda a corrigir qualquer falha.');
    await page.getByRole('button', { name: 'Salvar', exact: true }).click();

    await page.getByTitle('Editar mensagem').nth(4).click();

    await page.getByRole('textbox', { name: 'Mensagem' }).click();
    await page.getByRole('textbox', { name: 'Mensagem' }).fill('');

    await page.getByRole('textbox', { name: 'Mensagem' }).fill('Muito obrigado(a) pelo contato! 🚀\nPrecisando de suporte novamente, é só mandar um "oi" por aqui. ~Sem problemas,~ será um prazer atender você de novo! ✨\n\nMensagem automática — não precisa responder.');
    await page.getByRole('button', { name: 'Salvar', exact: true }).click();
    await page.getByRole('button', { name: 'Salvar e avançar' }).click();
    await page.getByRole('button', { name: 'Cancelar' }).click();
    await page.getByRole('button', { name: 'Salvar e avançar' }).click();
    await page.getByRole('button', { name: 'Sim, salvar' }).click();
});

test('CT23: Visualização e navegação na Etapa 5 (Ajuda)', async ({ page }) => {
    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    // await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });

    await page.getByRole('heading', { name: 'Fluxo de loja' }).click();
    await page.getByRole('heading', { name: 'Ajuda' }).click();

    await page.locator('.fa-stack').first().click();
    await page.locator('div:nth-child(2) > .h-100.w-100 > .preview-container > .preview-badge > .text-uppercase > .fa-stack').click();
    await page.locator('div:nth-child(3) > .h-100.w-100 > .preview-container > .preview-badge > .text-uppercase > .fa-stack').click();

    await page.getByRole('button', { name: ' Voltar' }).click();
    await page.waitForTimeout(1000);

    await page.getByRole('button', { name: 'Pular etapa  ' }).click();
    await page.waitForTimeout(1000);

    await page.getByRole('button', { name: 'Salvar e avançar' }).click();

    await page.getByRole('button', { name: 'Cancelar' }).click();
});

test('CT24: Configuração de aplicação (Checar horários e Fluxo de Redirecionamento)', async ({ page }) => {
    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    // await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });

    await page.getByRole('heading', { name: 'Fluxo de loja' }).click();
    await page.getByRole('heading', { name: 'Ajuda' }).click();

    await page.getByTitle('Editar mensagem').nth(3).click();

    await page.getByRole('textbox', { name: 'Mensagem' }).click();
    await page.getByRole('textbox', { name: 'Mensagem' }).fill('');
    await page.getByRole('textbox', { name: 'Mensagem' }).fill('Só um instante! ⏳\nEstou transferindo você para um de nossos atendentes. ~Não vai demorar~ Por favor, aguarde um momento. 😉\nEm breve você será atendido.');

    await page.locator('.fa-solid.fa-face-smile').click();
    await page.getByRole('button', { name: '🙃' }).click();
    await page.locator('.fa-solid.fa-face-smile').click();

    await page.locator('#select-schedule-modal').click();
    await page.getByRole('textbox', { name: 'Mensagem' }).fill('Só um instante! ⏳\nEstou transferindo você para um de nossos atendentes. ~Não vai demorar~ Por favor, aguarde um momento. 😉\nEm breve você será atendido.🙃**');
    await page.locator('#select-schedule-modal').click();
    await page.getByRole('textbox', { name: 'Mensagem' }).fill('Só um instante! ⏳\nEstou transferindo você para um de nossos atendentes. ~Não vai demorar~ Por favor, aguarde um momento. 😉\nEm breve você será atendido.🙃*__*');
    await page.locator('#select-schedule-modal').click();
    await page.getByRole('textbox', { name: 'Mensagem' }).fill('Só um instante! ⏳\nEstou transferindo você para um de nossos atendentes. ~Não vai demorar~ Por favor, aguarde um momento. 😉\nEm breve você será atendido.🙃*_~~_*');
    await page.locator('#select-schedule-modal').click();
    await page.getByRole('textbox', { name: 'Mensagem' }).fill('Só um instante! ⏳\nEstou transferindo você para um de nossos atendentes. ~Não vai demorar~ Por favor, aguarde um momento. 😉\nEm breve você será atendido.🙃*_~``````~_*');
    await page.getByRole('textbox', { name: 'Mensagem' }).fill('Só um instante! ⏳\nEstou transferindo você para um de nossos atendentes. ~Não vai demorar~ Por favor, aguarde um momento. 😉\nEm breve você será atendido.🙃*_~``````~_*111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111');

    await page.getByRole('link', { name: 'Tag' }).click();
    await page.getByRole('link', { name: 'Fixo' }).click();
    await page.getByRole('spinbutton', { name: 'Ex:' }).click();
    await page.getByRole('link', { name: 'Customizado' }).click();
    await page.getByRole('textbox', { name: 'Escreva...' }).click();
    await page.getByRole('textbox', { name: 'Escreva...' }).fill('Ajuda');
    await page.locator('#out_of_schedule_flow_error_message').click();
    await page.locator('#out_of_schedule_flow_error_message').fill('erro');
    await page.getByRole('link', { name: 'Fixo' }).click();
    await page.getByRole('link', { name: 'Fixo' }).click();

    await page.locator('#schedule_id').selectOption('12');

    await page.getByRole('button', { name: 'Salvar', exact: true }).click();
});

test('CT25: Configuração de transferência no fluxo de Ajuda (Dentro/Fora do horário e Feriado)', async ({ page }) => {
    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    // await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });

    await page.getByRole('heading', { name: 'Fluxo de loja' }).click();
    await page.getByRole('heading', { name: 'Ajuda' }).click();

    await page.getByTitle('Editar mensagem').nth(4).click();
    await page.locator('#contact-seller-modal').click();
    await page.getByRole('textbox', { name: 'Mensagem de transferência *' }).fill('Só um instante! ⏳\nEstou transferindo você para um de nossos atendentes. ~Não vai demorar~ Por favor, aguarde um momento. 😉\nEm breve você será atendido');

    await page.locator('#contact-seller-modal').click();
    await page.getByRole('radio', { name: 'Apenas clientes carteirizados' }).check();
    await page.locator('#form-select').selectOption('1');

    await page.getByText('Usar loja favorita de compras').click();
    await page.getByText('Usar loja favorita de compras').click();

    await page.locator('#contact-seller-modal').click();
    await page.getByRole('radio', { name: 'Todos os clientes' }).check();
    await page.locator('#form-select').selectOption('1');
    await page.getByLabel('Loja', { exact: true }).selectOption('1');

    await page.getByText('Usar loja favorita de compras').click();
    await page.getByText('Usar loja favorita de compras').click();

    await page.locator('#contact-seller-modal').click();
    await page.getByRole('textbox', { name: 'Mensagem de transferência *' }).fill('Só um minuto. Estou buscando um atendente para você.\nPor favor, aguarde. 😉**');
    await page.locator('#contact-seller-modal').click();
    await page.getByRole('textbox', { name: 'Mensagem de transferência *' }).fill('Só um minuto. Estou buscando um atendente para você.\nPor favor, aguarde. 😉*__*');
    await page.locator('#contact-seller-modal').click();
    await page.getByRole('textbox', { name: 'Mensagem de transferência *' }).fill('Só um minuto. Estou buscando um atendente para você.\nPor favor, aguarde. 😉*_~~_*');
    await page.locator('#contact-seller-modal').click();
    await page.getByRole('textbox', { name: 'Mensagem de transferência *' }).fill('Só um minuto. Estou buscando um atendente para você.\nPor favor, aguarde. 😉*_~``````~_*');    
    await page.getByRole('textbox', { name: 'Mensagem de transferência *' }).fill('Só um minuto. Estou buscando um atendente para você.\nPor favor, aguarde. 😉*_~``````~_*1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111');

    await page.getByRole('button', { name: 'Salvar', exact: true }).click();
});
    
test('CT26: Finalização dos Fluxos de Loja (Salvar e avançar / Pular etapa)', async ({ page }) => {
    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    // await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });

    await page.getByRole('heading', { name: 'Fluxo de loja' }).click();
    await page.getByRole('heading', { name: 'Ajuda' }).click();

    await page.getByTitle('Editar mensagem').first().click();
    await page.locator('#schedule_id').selectOption('12');
    await page.getByRole('button', { name: 'Salvar', exact: true }).click();

    await page.getByTitle('Editar mensagem').nth(3).click();

    await page.getByRole('textbox', { name: 'Mensagem' }).click();
    await page.getByRole('textbox', { name: 'Mensagem' }).fill('');
    await page.getByRole('textbox', { name: 'Mensagem' }).fill('Só um instante! ⏳\nEstou transferindo você para um de nossos atendentes. ~Não vai demorar~ Por favor, aguarde um momento. 😉\nEm breve você será atendido.');

    await page.locator('.fa-solid.fa-face-smile').click();
    await page.getByRole('button', { name: '🙃' }).click();
    await page.locator('.fa-solid.fa-face-smile').click();

    await page.getByRole('button', { name: 'Salvar', exact: true }).click();

    await page.getByTitle('Editar mensagem').nth(4).click();
    await page.getByText('Todos os clientes').click();
    await page.getByRole('radio', { name: 'Todos os clientes' }).check();
    await page.getByRole('textbox', { name: 'Mensagem de transferência *' }).fill('Só um instante! ⏳\nEstou transferindo você para um de nossos atendentes. ~Não vai demorar~ Por favor, aguarde um momento. 😉\nEm breve você será atendido');
    
    await page.locator('#form-select').selectOption('1');
    await page.getByLabel('Loja', { exact: true }).selectOption('1');
    
    await page.getByText('Usar loja favorita de compras').click();

    await page.getByRole('button', { name: 'Salvar', exact: true }).click();

    await page.getByRole('button', { name: 'Salvar e avançar' }).click();
    await page.getByRole('button', { name: 'Sim, salvar' }).click();
});

