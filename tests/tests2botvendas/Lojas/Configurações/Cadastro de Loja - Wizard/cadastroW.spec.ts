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

test('CT01 - Validação de campos obrigatórios em branco', async ({ page }) => {
    
    // await page.getByTitle('Possui configurações').nth(1).click();
    const imageTest = path.join(__dirname, 'lista2detestes');
    const imagePath1 = path.join(__dirname, 'Logo Quadrada.png');
    const imagePath = path.join(__dirname, 'Logo_ Drogarias Fortaleza.jpeg');

    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();

    await page.goto('https://kaduemanueltreinamento.botvendas.com/shops/create?process=company-data');

    await page.getByRole('button', { name: 'Salvar e avançar' }).click();
});

test('CT02 - CT03 - Consulta por CNPJ válido e validação de CNPJ inválido', async ({ page }) => {
    // await page.getByTitle('Possui configurações').nth(1).click();

    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();

    await page.goto('https://kaduemanueltreinamento.botvendas.com/shops/create?process=company-data');

    await page.getByRole('textbox', { name: '/0000-00' }).click();
    await page.getByRole('textbox', { name: '/0000-00' }).fill('12.674.491/0001-35');
    await page.locator('#search-cnpj-button').click();

    await page.getByRole('textbox', { name: '/0000-00' }).click();
    await page.getByRole('textbox', { name: '/0000-00' }).fill('12.674.491/0001-33');

    await page.getByRole('textbox', { name: '-000' }).click();

    await page.getByRole('textbox', { name: '/0000-00' }).click();
    await page.getByRole('textbox', { name: '/0000-00' }).fill('12.674.491/0001-35');
});

test('CT04 - Autocomplete de endereço via CEP e preenchimento de número', async ({ page }) => {
    // await page.getByTitle('Possui configurações').nth(1).click();

    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();

    await page.goto('https://kaduemanueltreinamento.botvendas.com/shops/create?process=company-data');

    await page.waitForTimeout(1000);
    await page.getByRole('textbox', { name: '-000' }).press('ControlOrMeta+a');
    await page.getByRole('textbox', { name: '-000' }).fill('60761-285');
    await page.waitForTimeout(1000);

    await page.getByRole('textbox', { name: '0000', exact: true }).click();
    await page.getByRole('textbox', { name: '0000', exact: true }).fill('400');
});

test('CT05 - CT07 - Upload de logos e manipulação do modal de recorte (Cropper)', async ({ page }) => {
    // await page.getByTitle('Possui configurações').nth(1).click();

    const image = path.join(__dirname, 'Monster Watermelon.png');
    const imageTest = path.join(__dirname, 'lista2detestes');
    const imagePath1 = path.join(__dirname, 'Logo Quadrada.png');
    const imagePath = path.join(__dirname, 'Logo_ Drogarias Fortaleza.jpeg');

    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();

    await page.goto('https://kaduemanueltreinamento.botvendas.com/shops/create?process=company-data');

    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.locator('div').filter({ hasText: /^Importe aqui\(Arquivos permitidos: JPEG, PNG, JPG até 20MB\)$/ }).nth(1).click();
    const filechooser = await fileChooserPromise;
    await filechooser.setFiles(imageTest);
    await filechooser.setFiles(imagePath);

    await page.getByRole('button', { name: 'Salvar', exact: true }).click();

    const fileChooserPromise1 = page.waitForEvent('filechooser');
    await page.locator('div').filter({ hasText: /^Importe aqui\(Arquivos permitidos: JPEG, PNG, JPG até 20MB\)$/ }).nth(1).click();
    const filechooser1 = await fileChooserPromise1;
    await filechooser1.setFiles(image);

    await page.getByRole('checkbox', { name: 'Limitar Borda de corte' }).check();
    await page.getByRole('checkbox', { name: 'Limitar Borda de corte' }).uncheck();
    await page.getByRole('button', { name: 'Ajuste Automático' }).click();
    await page.getByRole('button', { name: 'Trocar imagem' }).click();
    await page.getByRole('button', { name: 'Remover' }).click();

    const fileChooserPromise2 = page.waitForEvent('filechooser');
    await page.locator('div').filter({ hasText: 'Clique, arraste ou cole uma' }).nth(4).click();
    const filechooser2 = await fileChooserPromise2;
    await filechooser2.setFiles(imagePath1);

    await page.getByRole('button', { name: 'Salvar', exact: true }).click();
});

test('CT09 - Preenchimento completo da Etapa 1 e avanço para Horários e feriados', async ({ page }) => {
    const timestamp = Date.now();
    const nomeLoja = `Drogarias Fortaleza_${timestamp}`;
    const image = path.join(__dirname, 'Monster Watermelon.png');
    const imageTest = path.join(__dirname, 'lista2detestes');
    const imagePath1 = path.join(__dirname, 'Logo Quadrada.png');
    const imagePath = path.join(__dirname, 'Logo_ Drogarias Fortaleza.jpeg');

    // await page.getByTitle('Possui configurações').nth(1).click();

    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();

    await page.goto('https://kaduemanueltreinamento.botvendas.com/shops/create?process=company-data');

    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Salvar e avançar' }).click();
    await page.waitForTimeout(1000);

    await page.locator('input[name="cpf_cnpj"]').click();
    await page.locator('input[name="cpf_cnpj"]').fill('12.674.491/0001-35');
    await page.locator('#search-cnpj-button').click();

    await page.locator('input[name="cpf_cnpj"]').click();
    await page.locator('input[name="cpf_cnpj"]').fill('12.674.491/0001-33');
    await page.locator('#search-cnpj-button').click();

    await page.locator('input[name="cpf_cnpj"]').click();
    await page.locator('input[name="cpf_cnpj"]').fill('12.674.491/0001-35');

    await page.waitForTimeout(1000);
    await page.getByRole('textbox', { name: '-000' }).press('ControlOrMeta+a');
    await page.getByRole('textbox', { name: '-000' }).fill('60761-285');
    await page.waitForTimeout(1000);

    await page.locator('input[name="trade_name"]').click();
    await page.locator('input[name="trade_name"]').fill(nomeLoja);
    await page.locator('input[name="name"]').click();
    await page.locator('input[name="name"]').fill(nomeLoja);
    await page.locator('input[name="company_name"]').click();
    await page.locator('input[name="company_name"]').press('ControlOrMeta+a');
    await page.locator('input[name="company_name"]').fill(nomeLoja);

    await page.locator('input[name="number"]').click();
    await page.locator('input[name="number"]').fill('');
    await page.locator('input[name="number"]').fill('400');

    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.locator('div').filter({ hasText: /^Importe aqui\(Arquivos permitidos: JPEG, PNG, JPG até 20MB\)$/ }).nth(1).click();
    const filechooser = await fileChooserPromise;
    await filechooser.setFiles(imageTest);
    await filechooser.setFiles(imagePath);

    await page.getByRole('button', { name: 'Salvar', exact: true }).click();

    const fileChooserPromise1 = page.waitForEvent('filechooser');
    await page.locator('div').filter({ hasText: /^Importe aqui\(Arquivos permitidos: JPEG, PNG, JPG até 20MB\)$/ }).nth(1).click();
    const filechooser1 = await fileChooserPromise1;
    await filechooser1.setFiles(image);

    await page.getByRole('checkbox', { name: 'Limitar Borda de corte' }).check();
    await page.getByRole('checkbox', { name: 'Limitar Borda de corte' }).uncheck();
    await page.getByRole('button', { name: 'Ajuste Automático' }).click();
    await page.getByRole('button', { name: 'Trocar imagem' }).click();
    await page.getByRole('button', { name: 'Remover' }).click();

    const fileChooserPromise2 = page.waitForEvent('filechooser');
    await page.locator('div').filter({ hasText: 'Clique, arraste ou cole uma' }).nth(4).click();
    const filechooser2 = await fileChooserPromise2;
    await filechooser2.setFiles(imagePath1);

    await page.getByRole('button', { name: 'Salvar', exact: true }).click();

    await page.getByRole('button', { name: 'Salvar e avançar' }).click();
    await page.waitForTimeout(5000);

});

test('CT10 - Alternância para selecionar horário existente', async ({ page }) => {
    // await page.getByTitle('Possui configurações').nth(1).click();

    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\Drogarias Fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });

    // await page.getByRole('link', { description: 'Atualizar Loja com Wizard', exact: true }).click();

    await page.getByText('Configure os dados essenciais').click();
    await page.getByText('Configure os horários de').click();
    await page.getByRole('heading', { name: 'Horários e feriados' }).click();
    await page.getByRole('radio', { name: 'Selecionar horário existente' }).check();
});

test('CT11 - Validação de campo obrigatório Nome ao tentar avançar', async ({ page }) => {
    // await page.getByTitle('Possui configurações').nth(1).click();
    // await page.getByTitle('Possui configurações').nth(1).check();
    // await page.goto('https://kaduemanueltreinamento.botvendas.com/dashboard');
    // await page.getByRole('heading', { name: 'Drogarias Fortaleza' }).click();

    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    // await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });

    await page.getByText('Configure os dados essenciais').click();
    await page.getByText('Configure os horários de').click();
    await page.getByRole('heading', { name: 'Horários e feriados' }).click();
    await page.getByRole('button', { name: 'Salvar e avançar' }).click();
});

test('CT12 - Ativação e desativação dos switches de dias da semana', async ({ page }) => {
    // await page.getByTitle('Possui configurações').nth(1).click();

    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });

    await page.getByText('Configure os dados essenciais').click();
    await page.getByText('Configure os horários de').click();
    await page.getByRole('heading', { name: 'Horários e feriados' }).click();

    await page.locator('#schedules_shop_form').getByText('Segunda-feira').click();
    await page.getByRole('checkbox', { name: 'Segunda-feira' }).uncheck();
    await page.locator('#schedules_shop_form').getByText('Segunda-feira').click();
    await page.getByRole('checkbox', { name: 'Segunda-feira' }).check();

    await page.locator('#schedules_shop_form').getByText('Terça-feira').click();
    await page.getByRole('checkbox', { name: 'Terça-feira' }).uncheck();
    await page.locator('#schedules_shop_form').getByText('Terça-feira').click();
    await page.getByRole('checkbox', { name: 'Terça-feira' }).check();

    await page.locator('#schedules_shop_form').getByText('Quarta-feira').click();
    await page.getByRole('checkbox', { name: 'Quarta-feira' }).uncheck();
    await page.locator('#schedules_shop_form').getByText('Quarta-feira').click();
    await page.getByRole('checkbox', { name: 'Quarta-feira' }).check();

    await page.locator('#schedules_shop_form').getByText('Quinta-feira').click();
    await page.getByRole('checkbox', { name: 'Quinta-feira' }).uncheck();
    await page.locator('#schedules_shop_form').getByText('Quinta-feira').click();
    await page.getByRole('checkbox', { name: 'Quinta-feira' }).check();

    await page.locator('#schedules_shop_form').getByText('Sexta-feira').click();
    await page.getByRole('checkbox', { name: 'Sexta-feira' }).uncheck();
    await page.locator('#schedules_shop_form').getByText('Sexta-feira').click();
    await page.getByRole('checkbox', { name: 'Sexta-feira' }).check();

    await page.locator('#schedules_shop_form').getByText('Sábado').click();
    await page.getByRole('checkbox', { name: 'Sábado' }).check();

    await page.locator('#schedules_shop_form').getByText('Domingo').click();
    await page.getByRole('checkbox', { name: 'Domingo' }).check();
});

test('CT13 - Validação de formato e intervalo de horário inválido', async ({ page }) => {
    // await page.getByTitle('Possui configurações').nth(1).click();

    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });

    await page.getByText('Configure os dados essenciais').click();
    await page.getByText('Configure os horários de').click();
    await page.getByRole('heading', { name: 'Horários e feriados' }).click();
    await page.getByText('Criar novo horário').click();
    await page.getByRole('radio', { name: 'Criar novo horário' }).check();
    await page.locator('#name').click();
    await page.locator('#name').fill('1');
    await page.locator('div').filter({ hasText: /^Segunda-feira$/ }).first().click();
    await page.locator('#schedule_monday_input').fill('');
    await page.locator('#schedule_monday_input').fill('23:00-22:00,');
    await page.getByRole('button', { name: 'Salvar e avançar' }).click();
});

test('CT14 - CT16 - Cadastro manual de feriado, limites de caracteres e opção fixo anual', async ({ page }) => {
    // await page.getByTitle('Possui configurações').nth(1).click();

    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });

    await page.getByText('Configure os dados essenciais').click();
    await page.getByText('Configure os horários de').click();
    await page.getByRole('heading', { name: 'Horários e feriados' }).click();
    await page.getByText('Criar novo horário').click();
    await page.getByRole('radio', { name: 'Criar novo horário' }).check();

    await page.getByRole('button', { name: ' Adicionar' }).click();

    await page.getByRole('button', { name: 'Salvar', exact: true }).click();
    await page.getByRole('textbox', { name: 'Nome' }).click();
    await page.getByRole('textbox', { name: 'Nome' }).fill('111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111');
    await page.getByRole('textbox', { name: 'Mensagem Opcional  ' }).click();
    await page.getByRole('textbox', { name: 'Mensagem Opcional  ' }).fill('1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111');

    await page.getByRole('textbox', { name: 'Nome' }).click();
    await page.getByRole('textbox', { name: 'Nome' }).dblclick();
    await page.getByRole('textbox', { name: 'Nome' }).fill('');
    await page.getByRole('textbox', { name: 'Mensagem Opcional  ' }).click();
    await page.getByRole('textbox', { name: 'Mensagem Opcional  ' }).press('ControlOrMeta+a');
    await page.getByRole('textbox', { name: 'Mensagem Opcional  ' }).fill('');

    await page.getByRole('textbox', { name: 'Nome' }).click();
    await page.getByRole('textbox', { name: 'Nome' }).fill('Dia da Confraternização Mundial'); 
    await page.getByRole('textbox', { name: 'Escolha uma data' }).click();
    await page.getByRole('textbox', { name: 'Escolha uma data' }).fill('01/01/26');
    await page.getByRole('textbox', { name: 'Nome' }).click();

    await page.locator('#holidays-config-modal').click();

    await page.getByRole('button', { name: 'Salvar', exact: true }).click();

    await page.locator('.fa-solid.fa-pen').first().click();
    await page.getByText('Válido para todos os anos').click();
    await page.getByRole('checkbox', { name: 'Válido para todos os anos  ' }).check();
    await page.getByRole('button', { name: 'Salvar', exact: true }).click();
});   

test('CT18 - CT21 - Abertura e inclusão/remoção de sugestões de feriados nacionais', async ({ page }) => {
    // await page.getByTitle('Possui configurações').nth(1).click();

    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });

    await page.getByText('Configure os dados essenciais').click();
    await page.getByText('Configure os horários de').click();
    await page.getByRole('heading', { name: 'Horários e feriados' }).click();
    await page.getByText('Criar novo horário').click();
    await page.getByRole('radio', { name: 'Criar novo horário' }).check();

    await page.getByRole('button', { name: ' Adicionar' }).click();
    await page.getByRole('button', { name: 'Sugestões de feriados' }).click();
    await page.getByRole('button', { name: '+' }).first().click();
    await page.getByText('×').nth(1).click();

    await page.getByRole('button', { name: 'close' }).click();
    await page.getByRole('button', { name: ' Adicionar' }).click();
    await page.getByRole('button', { name: 'Sugestões de feriados' }).click();

    await page.getByRole('button', { name: 'Adicionar todas as sugestões' }).click();
    await page.getByRole('button', { name: 'close' }).click();
    await page.getByRole('button', { name: ' Adicionar' }).click();
    await page.getByRole('button', { name: 'Sugestões de feriados' }).click();
    await page.getByRole('button', { name: 'Remover todas as sugestões' }).click();

    await page.getByText('×').nth(1).click();
    await page.getByText('×').nth(2).click();
});   

test('CT22 - Edição e exclusão de feriado cadastrado na listagem', async ({ page }) => {
    // await page.getByTitle('Possui configurações').nth(1).click();

    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });

    await page.getByText('Configure os dados essenciais').click();
    await page.getByText('Configure os horários de').click();
    await page.getByRole('heading', { name: 'Horários e feriados' }).click();
    await page.getByText('Criar novo horário').click();
    await page.getByRole('radio', { name: 'Criar novo horário' }).check();

    await page.getByRole('button', { name: ' Adicionar' }).click();
    await page.getByRole('button', { name: 'Sugestões de feriados' }).click();
    await page.getByRole('button', { name: '+' }).first().click();
    await page.getByRole('button', { name: 'close' }).click();
        
    await page.locator('.fa-solid.fa-pen').first().click();

    await page.getByText('Válido para todos os anos').click();
    await page.getByRole('checkbox', { name: 'Válido para todos os anos  ' }).uncheck();
    await page.getByRole('textbox', { name: 'Nome' }).click();
    await page.getByRole('textbox', { name: 'Nome' }).fill('Dia da Confraternização');

    await page.getByRole('button', { name: 'Salvar', exact: true }).click();
    await page.locator('.fa-trash').first().click();
    await page.getByRole('button', { name: 'Apagar' }).click();
});   

test('CT23 - CT24 - Navegação pelos botões Pular etapa e Voltar', async ({ page }) => {
    // await page.getByTitle('Possui configurações').nth(1).click();

    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });

    await page.getByText('Configure os dados essenciais').click();
    await page.getByText('Configure os horários de').click();
    await page.getByRole('heading', { name: 'Horários e feriados' }).click();
    await page.getByText('Criar novo horário').click();
    await page.getByRole('radio', { name: 'Criar novo horário' }).check();

    await page.getByRole('button', { name: 'Pular etapa  ' }).click();
    await page.getByRole('button', { name: ' Voltar' }).click();
});

test('CT25 - Configuração completa da grade de horários/feriados e avanço para Setores', async ({ page }) => {
    // await page.getByTitle('Possui configurações').nth(1).click();

    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });

    await page.getByText('Configure os dados essenciais').click();
    await page.getByText('Configure os horários de').click();
    await page.getByRole('heading', { name: 'Horários e feriados' }).click();
    await page.getByText('Criar novo horário').click();
    await page.getByRole('radio', { name: 'Criar novo horário' }).check();

    await page.locator('#name').click();
    await page.locator('#name').fill('Horario Teste');

    await page.locator('#schedules_shop_form').getByText('Sábado').click();
    await page.getByRole('checkbox', { name: 'Sábado' }).check();
    await page.locator('div').filter({ hasText: /^Domingo$/ }).nth(2).click();

    await page.locator('#schedule_monday_input').click();
    await page.locator('#schedule_monday_input').fill('');
    await page.locator('#schedule_monday_input').fill('07:00-20:30,');

    await page.locator('#schedule_tuesday_input').click();
    await page.locator('#schedule_tuesday_input').fill('');
    await page.locator('#schedule_tuesday_input').fill('07:00-20:30,');

    await page.locator('#schedule_wednesday_input').click();
    await page.locator('#schedule_wednesday_input').fill('');
    await page.locator('#schedule_wednesday_input').fill('07:00-20:30,');

    await page.locator('#schedule_thursday_input').click();
    await page.locator('#schedule_thursday_input').fill('');
    await page.locator('#schedule_thursday_input').fill('07:00-20:30,');

    await page.locator('#schedule_friday_input').click();
    await page.locator('#schedule_friday_input').fill('');
    await page.locator('#schedule_friday_input').fill('07:00-20:30,');

    await page.locator('#schedule_saturday_input').click();
    await page.locator('#schedule_saturday_input').fill('07:00-20:30,');

    await page.locator('#schedule_sunday_input').click();
    await page.locator('#schedule_sunday_input').fill('07:00-20:30,');

    await page.getByRole('button', { name: ' Adicionar' }).click();

    await page.getByRole('button', { name: 'Sugestões de feriados' }).click();
    await page.getByRole('button', { name: '+' }).first().click();
    await page.getByRole('button', { name: '+' }).first().click();
    await page.getByRole('button', { name: '+' }).first().click();
    await page.getByRole('button', { name: '+' }).first().click();
    await page.getByRole('button', { name: '+' }).first().click();

    await page.getByText('×').nth(1).click();
    await page.getByText('×').nth(2).click();
    await page.getByText('×').nth(3).click();
    await page.getByText('×').nth(4).click();
    await page.getByText('×').nth(5).click();

    // await page.getByRole('button', { name: '+' }).first().click();
    // await page.getByRole('button', { name: '+' }).first().click();
    // await page.getByRole('button', { name: '+' }).first().click();
    // await page.getByRole('button', { name: '+' }).click();

    // await page.getByText('×').nth(1).click();
    // await page.getByText('×').nth(2).click();
    // await page.getByText('×').nth(3).click();
    // await page.getByText('×').nth(4).click();

    await page.getByRole('button', { name: 'close' }).click();

    await page.getByRole('button', { name: 'Salvar e avançar' }).click();
});

test('CT26 - CT28 - Seleção de múltiplos setores, tabela de pré-visualização e paginação', async ({ page }) => {
    // await page.getByTitle('Possui configurações').nth(1).click();

    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
      await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });

    await page.getByRole('heading', { name: 'Cadastro de loja' }).click();
    await page.getByRole('heading', { name: 'Setores' }).click();

   await page.getByRole('checkbox').nth(1).check();
   await page.getByRole('checkbox').nth(2).check();
   await page.getByRole('checkbox').nth(3).check();
   await page.getByRole('checkbox').first().uncheck();
   await page.getByRole('checkbox').first().check();
   await page.getByRole('checkbox').nth(1).uncheck();
   await page.getByRole('checkbox').nth(1).check();
   await page.getByRole('checkbox').nth(2).click();
   await page.getByRole('checkbox').nth(2).check();
   await page.getByRole('checkbox').nth(3).uncheck();
   await page.getByRole('checkbox').nth(3).check(); 

   await page.getByRole('link', { name: '1' }).click();

   await page.getByRole('button', { name: 'Salvar e avançar' }).click();
});

test('CT29 - CT31 - Link externo Setores, botão Pular etapa e Voltar', async ({ page }) => {
    // await page.getByTitle('Possui configurações').nth(1).click();

    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });

    await page.getByRole('heading', { name: 'Cadastro de loja' }).click();
    await page.getByRole('heading', { name: 'Setores' }).click();

    await page.getByRole('button', { name: 'Pular etapa  ' }).click();
    await page.getByRole('button', { name: ' Voltar' }).click();
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('link').filter({ hasText: /^$/ }).first().click();
    const page1 = await page1Promise;
});

test('CT32 - Conclusão da Etapa 3 e avanço para Timeouts', async ({ page }) => {
    // await page.getByTitle('Possui configurações').nth(1).click();

    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });

    await page.getByRole('heading', { name: 'Cadastro de loja' }).click();
    await page.getByRole('heading', { name: 'Setores' }).click();

   await page.getByRole('checkbox').nth(1).check();
   await page.getByRole('checkbox').nth(2).check();
   await page.getByRole('checkbox').nth(3).check();
   await page.getByRole('checkbox').first().uncheck();
   await page.getByRole('checkbox').first().check();

   await page.getByRole('button', { name: 'Salvar e avançar' }).click();
});

test('CT33 - CT34 - Validação de campo obrigatório e seleção do Setor de transferência', async ({ page }) =>{
    // await page.getByTitle('Possui configurações').nth(1).click();

    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });

    await page.getByText('Configure os dados essenciais').click();

    await page.getByText('Configure o tempo limite de').click();
    await page.locator('#abandoned_sector_id').click();
    await page.locator('#abandoned_sector_id').selectOption('');

    await page.getByRole('button', { name: 'Salvar e avançar' }).click();

    await page.locator('#abandoned_sector_id').selectOption('1');

    // await page.locator('#abandoned_sector_id').selectOption('1');

    // await page.getByText('60 Min').nth(4).click();
    // await page.locator('input[name="attendance_idle_timeout"]').click();
    // await page.locator('input[name="attendance_idle_timeout"]').fill('60');
    // await page.locator('input[name="attendance_client_idle_timeout"]').click();
    // await page.locator('input[name="attendance_client_idle_timeout"]').fill('60');
    // await page.getByRole('button', { name: 'Salvar e avançar' }).click();
});

test('CT35 - CT38 - Configuração de timeouts por canal, diagrama visual e tooltips de ajuda', async ({ page }) => {
    // await page.getByTitle('Possui configurações').nth(1).click();

    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });

    await page.getByText('Configure os dados essenciais').click();

    await page.getByText('Configure o tempo limite de').click();

    await page.locator('input[name="open_timeout"]').click();
    await page.locator('input[name="open_timeout"]').fill('');
    await page.locator('input[name="open_timeout"]').fill('40');

    await page.locator('input[name="webapp_timeout"]').click();
    await page.locator('input[name="webapp_timeout"]').fill('');
    await page.locator('input[name="webapp_timeout"]').fill('30');


    await page.locator('input[name="api_timeout"]').click();
    await page.locator('input[name="api_timeout"]').fill('');
    await page.locator('input[name="api_timeout"]').fill('20');

    await page.locator('input[name="attendance_idle_timeout"]').click();
    await page.locator('input[name="attendance_idle_timeout"]').fill('');
    await page.locator('input[name="attendance_idle_timeout"]').fill('5');


    await page.locator('input[name="attendance_idle_alert"]').click();
    await page.locator('input[name="attendance_idle_alert"]').fill('');
    await page.locator('input[name="attendance_idle_alert"]').fill('4');

    await page.locator('input[name="attendance_client_idle_timeout"]').click();
    await page.locator('input[name="attendance_client_idle_timeout"]').fill('');
    await page.locator('input[name="attendance_client_idle_timeout"]').fill('3');


    await page.locator('input[name="waiting_client_timeout"]').click();
    await page.locator('input[name="waiting_client_timeout"]').fill('');
    await page.locator('input[name="waiting_client_timeout"]').fill('2');

    await page.locator('input[name="abandoned_timeout"]').click();
    await page.locator('input[name="abandoned_timeout"]').fill('');
    await page.locator('input[name="abandoned_timeout"]').fill('1');

    await page.locator('div:nth-child(7) > .w-100.d-flex.align-items-center.mb-3 > .w-100.mb-2 > .fa-stack').click();
    await page.locator('div:nth-child(6) > .w-100.d-flex.align-items-center.mb-3 > .w-100.mb-2 > .fa-stack').click();
    await page.locator('div:nth-child(5) > .w-100.d-flex.align-items-center.mb-3 > .w-100.mb-2 > .fa-stack').click();
    await page.locator('div:nth-child(4) > .w-100.d-flex.align-items-center.mb-3 > .w-100.mb-2 > .fa-stack').click();
    await page.locator('.w-100 > .w-100.mb-2 > .fa-stack').first().click();
    await page.locator('.fa-stack').first().click();
});

test('CT39 - Navegação de retorno pela ação Voltar na Etapa 4', async ({ page }) => {
    // await page.getByTitle('Possui configurações').nth(1).click();

    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });

    await page.getByText('Configure os dados essenciais').click();

    await page.getByText('Configure o tempo limite de').click();await page.getByRole('button', { name: ' Voltar' }).click();
    await page.getByRole('button', { name: 'Pular etapa  ' }).click();
});

test('CT40 - Configuração completa dos timeouts e finalização do cadastro da loja', async ({ page }) => {
    // await page.getByTitle('Possui configurações').nth(1).click();

    await page.getByRole('link', { name: ' Lojas ' }).click();
    await page.getByRole('link', { name: ' Configurações' }).click();
    await page.waitForTimeout(1000);

    const productRow = page.locator('tr').filter({ hasText: '\fortaleza' }).last();
    await expect(productRow).toBeVisible({ timeout: 10000 });

    const wizardButton = productRow.locator('i.fa-wand-magic-sparkles').first();

    await wizardButton.scrollIntoViewIfNeeded();
    await wizardButton.click({ force: true });

    await page.getByText('Configure os dados essenciais').click();

    await page.getByText('Configure o tempo limite de').click();
    
    await page.locator('#abandoned_sector_id').selectOption('1');

    await page.locator('input[name="open_timeout"]').click();
    await page.locator('input[name="open_timeout"]').fill('');
    await page.locator('input[name="open_timeout"]').fill('40');

    await page.locator('input[name="webapp_timeout"]').click();
    await page.locator('input[name="webapp_timeout"]').fill('');
    await page.locator('input[name="webapp_timeout"]').fill('30');


    await page.locator('input[name="api_timeout"]').click();
    await page.locator('input[name="api_timeout"]').fill('');
    await page.locator('input[name="api_timeout"]').fill('20');

    await page.locator('input[name="attendance_idle_timeout"]').click();
    await page.locator('input[name="attendance_idle_timeout"]').fill('');
    await page.locator('input[name="attendance_idle_timeout"]').fill('5');


    await page.locator('input[name="attendance_idle_alert"]').click();
    await page.locator('input[name="attendance_idle_alert"]').fill('');
    await page.locator('input[name="attendance_idle_alert"]').fill('4');

    await page.locator('input[name="attendance_client_idle_timeout"]').click();
    await page.locator('input[name="attendance_client_idle_timeout"]').fill('');
    await page.locator('input[name="attendance_client_idle_timeout"]').fill('3');


    await page.locator('input[name="waiting_client_timeout"]').click();
    await page.locator('input[name="waiting_client_timeout"]').fill('');
    await page.locator('input[name="waiting_client_timeout"]').fill('2');

    await page.locator('input[name="abandoned_timeout"]').click();
    await page.locator('input[name="abandoned_timeout"]').fill('');
    await page.locator('input[name="abandoned_timeout"]').fill('1');

    await page.getByRole('button', { name: 'Salvar e avançar' }).click();
});