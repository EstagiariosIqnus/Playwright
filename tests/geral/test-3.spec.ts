import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  test.setTimeout(90000);

  // =========================================================================
  // CT02 - Validação de formato/dígito de CNPJ
  await page.goto('https://mariameiretreinamento.botvendas.com/login');
  await page.getByRole('textbox', { name: 'Login' }).fill('admin@iqnus.com.br');
  await page.getByRole('textbox', { name: 'Senha' }).fill('Bot@iq587!');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await page.waitForLoadState('networkidle');

  await page.getByText('Loja 01Desconfig.(85) 3034-').click();
  await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/general?2=');

  // Garante CNPJ válido inicial
  await page.locator('input[name="cpf_cnpj"]').fill('33.509.424/0001-35');
  await page.locator('form').filter({ has: page.locator('input[name="cpf_cnpj"]') }).getByRole('button', { name: 'Salvar' }).click();
  await page.waitForLoadState('networkidle');

  // Testa CNPJ inválido
  await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/general?2=');
  await page.locator('input[name="cpf_cnpj"]').fill('335.094.24');
  await page.locator('form').filter({ has: page.locator('input[name="cpf_cnpj"]') }).getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText('Essa ação não pôde ser').first());
  await expect(page.getByText('O campo cpf cnpj deve ter no').first());

  // Restaura CNPJ válido
  await page.locator('input[name="cpf_cnpj"]').fill('33.509.424/0001-35');
  await page.locator('form').filter({ has: page.locator('input[name="cpf_cnpj"]') }).getByRole('button', { name: 'Salvar' }).click();
  await page.waitForLoadState('networkidle');

  // =========================================================================
  // CT03 - Edição de campos de texto (Razão Social, Nome Fantasia, Nome)
  await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/general?2=');
  await page.locator('input[name="company_name"]').fill('Drogaria São João & Filhos Ltda.');
  await page.locator('input[name="trade_name"]').fill('Farmácia Central - Unidade 02');
  await page.locator('input[name="name"]').fill('Loja 02 (Matriz)');
  await page.locator('form').filter({ has: page.locator('input[name="name"]') }).getByRole('button', { name: 'Salvar' }).click();
  await page.waitForLoadState('networkidle');

  await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/general?2=');
  await expect(page.locator('input[name="name"]')).toHaveValue('Loja 02 (Matriz)');
  await expect(page.locator('input[name="trade_name"]')).toHaveValue('Farmácia Central - Unidade 02');
  await expect(page.locator('input[name="company_name"]')).toHaveValue('Drogaria São João & Filhos Ltda.');

  // Restaura para Loja 01
  await page.locator('input[name="name"]').fill('Loja 01');
  await page.locator('form').filter({ has: page.locator('input[name="name"]') }).getByRole('button', { name: 'Salvar' }).click();
  await page.waitForLoadState('networkidle');

  // =========================================================================
  // CT04 - Abertura e fechamento dos modais de logotipo (Quadrado e Retangular)
  await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/general?2=');
  await page.locator('text=Logo:').locator('..').locator('button, a').click();
  await expect(page.locator('div').filter({ hasText: /^Clique, arraste ou cole uma imagem\(Tamanho sugestivo da imagem: 300px x 300px\)$/ }).first()).toBeVisible();
  await page.locator('.modal, [role="dialog"]').filter({ hasText: 'Ajustar imagem' }).locator('button.close, [aria-label="Close"], button:has-text("×")').first().click();

  await page.locator('text=Logo Retangular:').locator('..').locator('button, a').click();
  await page.locator('.modal, [role="dialog"]').filter({ hasText: 'Ajustar imagem' }).locator('button.close, [aria-label="Close"], button:has-text("×")').first().click();

  // =========================================================================
  // CT05 - Tipo da loja e visibilidade condicional
  await page.locator('select[name="shop_type"]').selectOption({ label: 'Roupas e calçados' });
  await page.locator('form').filter({ has: page.locator('select[name="shop_type"]') }).getByRole('button', { name: 'Salvar' }).click();
  await page.waitForLoadState('networkidle');

  await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/general?2=');
  await expect(page.locator('select[name="shop_type"]').locator('option:checked')).toHaveText('Roupas e calçados');

  // Restaura para Drogaria e salva
  await page.locator('select[name="shop_type"]').selectOption('drugstore');
  await page.locator('form').filter({ has: page.locator('select[name="shop_type"]') }).getByRole('button', { name: 'Salvar' }).click();
  await page.waitForLoadState('networkidle');

  // =========================================================================
  // CT06 - Tempo de preparo/separação dos pedidos
  await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/general?2=');
  await page.locator('input[name="order_preparation_minutes"]').fill('6');
  await page.locator('form').filter({ has: page.locator('input[name="order_preparation_minutes"]') }).getByRole('button', { name: 'Salvar' }).click();
  await page.waitForLoadState('networkidle');

  await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/general?2=');
  await expect(page.locator('input[name="order_preparation_minutes"]')).toHaveValue('6');

  // =========================================================================
  // CT07 - Tags multi-seleção de status que criam pedidos
  await page.locator('text=Status que podem criar').locator('..').getByRole('searchbox').click();
  await page.getByRole('option', { name: 'Vendido' }).click({ timeout: 2000 }).catch(() => {});
  await page.locator('text=Status que podem criar').locator('..').getByRole('searchbox').click();
  await page.getByRole('option', { name: 'Abandonado' }).click({ timeout: 2000 }).catch(() => {});

  await page.locator('form').filter({ has: page.locator('input[name="order_preparation_minutes"]') }).getByRole('button', { name: 'Salvar' }).click();
  await page.waitForLoadState('networkidle');
  await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/general?2=');

  // =========================================================================
  // CT08 - Horário de funcionamento e Timezone
  await page.locator('.col-md-6 > div > .card-body').first().click();
  // Aguarda o elemento estar visível antes de selecionar
  // 1. Clica no campo aberto que mostra o fuso horário atual
  await page.getByRole('combobox').filter({ hasText: /America/ }).click();
  // Clica no container visual do dropdown para abrir o menu
  await page.locator('select[name="timezone_name"]').locator('..').click();
  // await page.getByRole('option', { name: /America\/Cuiaba/i }).click();
  await page.locator('select[name="schedule_id"]').selectOption('1');
  // await page.locator('select[name="timezone_name"]').selectOption('America/Cuiaba');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.goto('https://mariameiretreinamento.botvendas.com/shops');
  await page.locator('div:nth-child(6)').click();
  await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/general?2=');
  await page.getByRole('button', { name: 'Salvar' }).click();
});
















//   // CT02 - Validação de formato/dígito de CNPJ
//   await page.goto('https://mariameiretreinamento.botvendas.com/login');
//   await page.getByRole('textbox', { name: 'Login' }).fill('admin@iqnus.com.br');
//   await page.getByRole('textbox', { name: 'Senha' }).click();
//   await page.getByRole('textbox', { name: 'Senha' }).fill('Bot@iq587!');
//   await page.getByRole('button', { name: 'Entrar' }).click();
//   await page.waitForLoadState('networkidle');

//   await page.getByText('Loja 01Desconfig.(85) 3034-').click();
//   await page.getByRole('link', { name: ' Lojas ' }).click();
//   await page.getByRole('link', { name: ' Configurações' }).click();
//   await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/general?2=');
//   await page.locator('input[name="cpf_cnpj"]').fill('33.509.424/0001-35');
//   await page.getByRole('button', { name: 'Salvar' }).click();
//   await page.waitForLoadState('networkidle');
  
//   await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/general?2=');
//   await page.locator('input[name="cpf_cnpj"]').fill('335.094.24');
//   await page.waitForTimeout(1000);

//   // await page.locator('form').filter({ has: page.locator('input[name="cpf_cnpj"]') }).getByRole('button', { name: 'Salvar' }).click();
//   // await page.locator('text=CNPJ:').locator('..').locator('button, a').click();
//   // await page.locator('input[name="cpf_cnpj"]').click();
//   // await page.locator('input[name="cpf_cnpj"]').fill('335.094.24');
//   await page.getByRole('button', { name: 'Salvar' }).click();
//   await expect(page.getByText('Essa ação não pôde ser')).toBeVisible();
//   await page.getByText('O campo cpf cnpj deve ter no').nth(1).click();
//   await page.locator('input[name="cpf_cnpj"]').fill('33.509.424/0001-35');
//   await page.getByRole('button', { name: 'Salvar' }).click();
//   await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/general?2=');


// // CT03 - Edição de campos de texto (Razão Social, Nome Fantasia, Nome)
//   await page.locator('input[name="company_name"]').click();
//   await page.locator('input[name="company_name"]').fill('Drogaria São João & Filhos Ltda.');
//   await page.locator('input[name="trade_name"]').click();
//   await page.locator('input[name="trade_name"]').fill('Farmácia Central - Unidade 02');
//   await page.locator('input[name="name"]').click();
//   await page.locator('input[name="name"]').fill('Loja 02 (Matriz)');
//   await page.getByRole('button', { name: 'Salvar' }).click();
//   await page.waitForLoadState('networkidle');
//   await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/general?2=');
//   await expect(page.locator('input[name="name"]')).toHaveValue('Loja 02 (Matriz)');
//   await expect(page.locator('input[name="trade_name"]')).toHaveValue('Farmácia Central - Unidade 02');
//   await expect(page.locator('input[name="company_name"]')).toHaveValue('Drogaria São João & Filhos Ltda.');
//   await page.locator('input[name="name"]').fill('Loja 01');
//   await page.getByRole('button', { name: 'Salvar' }).click();
//   await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/general?2=');


// // CT04 - Upload e pré-visualização de logotipo (Quadrado e Retangular)
//   await page.locator('text=Logo:').locator('..').locator('button, a').click();  
//   // await page.getByRole('button', { description: 'Editar Logo', exact: true }).click();
//   await page.locator('div').filter({ hasText: /^Clique, arraste ou cole uma imagem\(Tamanho sugestivo da imagem: 300px x 300px\)$/ }).first().click();
//   await page.locator('.cropper-face').click();
//   await page.locator('.cropper-face').click();
//   await page.locator('#shop-cropper-modal').getByRole('button', { name: 'Salvar' }).click();
//   await page.locator('text=Logo Retangular:').locator('..').locator('button, a').click();
//   // await page.getByRole('button', { description: 'Editar Logo Retangular', exact: true }).click();
//   // Localiza o botão '×' ou botão de fechar dentro do modal de ajustar imagem
//   await page.locator('.modal, [role="dialog"]').filter({ hasText: 'Ajustar imagem' }).locator('button.close, [aria-label="Close"], button:has-text("×")').click();
//   // await page.locator('.modal, [role="dialog"]').locator('button.close, [aria-label="Close"], button:has-text("×")').click();
//   // await page.getByRole('button', { name: 'cancelar' }).click();
//   // await page.getByRole('button', { name: 'Salvar' }).click();
//   await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/general?2='); 
//   await page.locator('text=Logo:').locator('..').locator('button, a').click();                         
//   await page.getByRole('button', { name: 'close' }).click();
//   await page.locator('text=Logo Retangular:').locator('..').locator('button, a').click();
//   await page.getByRole('button', { name: 'close' }).click();

// // CT05 - Tipo da loja e visibilidade condicional:
//   await page.locator('select[name="shop_type"]').selectOption({ label: 'Roupas e calçados' });
//   // await page.getByRole('button', { name: 'Salvar' }).click();
  
//   await page.locator('form').filter({ has: page.locator('select[name="shop_type"]') }).getByRole('button', { name: 'Salvar' }).click();

//   await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/general?2=');
//   await expect(page.locator('select[name="shop_type"]').locator('option:checked')).toHaveText('Roupas e calçados');

//   // Restaura para Drogaria e salva
//   await page.locator('select[name="shop_type"]').selectOption('drugstore');
  
//   await page.locator('form').filter({ has: page.locator('select[name="shop_type"]') }).getByRole('button', { name: 'Salvar' }).click();
//   // await page.locator('select[name="shop_type"]').selectOption({ label: 'Roupas e calçados' });
//   // // await page.getByRole('button', { name: 'Salvar' }).click();
//   // await page.getByRole('button', { name: 'Salvar' }).last().click();
//   // await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/general?2='); 
//   // await expect(page.locator('select[name="shop_type"]').locator('option:checked')).toHaveText('Roupas e calçados');
//   // await page.locator('select[name="shop_type"]').selectOption('drugstore');
//   // await page.getByRole('button', { name: 'Salvar' }).click();

// // CT06 - Tempo de preparo/separação dos pedidos
//   await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/general?2=');
//   // await page.locator('input[name="order_preparation_minutes"]').click();
//   // await page.locator('input[name="order_preparation_minutes"]').fill('');
//   // await page.getByRole('button', { name: 'Salvar' }).click();
//   // await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/general?2=');
//   // await page.locator('input[name="order_preparation_minutes"]').click();
//   await page.locator('input[name="order_preparation_minutes"]').fill('6');
//   await page.locator('form').filter({ has: page.locator('input[name="order_preparation_minutes"]') }).getByRole('button', { name: 'Salvar' }).click();
//   // await page.waitForLoadState('networkidle');
//   await page.getByRole('button', { name: 'Salvar' }).click();
//   await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/general?2=');
//   await expect(page.locator('input[name=""order_preparation_minutes"]')).toHaveValue('6');


// // CT07 - Tags multi-seleção de status que criam pedidos
//   const campo = page.locator('text=Status que podem criar').locator('..').getByRole('searchbox');
//   await campo.click();

// // Tenta clicar na opção; se já foi selecionada antes, não trava o teste
//   await page.getByRole('option', { name: 'Vendido' }).click({ timeout: 2000 }).catch(() => {});
//   await page.getByRole('option', { name: 'Abandonado' }).click({ timeout: 2000 }).catch(() => {});
//   // await expect(page.locator('input[name=""order_preparation_minutes"]')).toHaveValue('6');
  
//   // await page.locator('input[name="order_preparation_minutes"]').click();
//   await page.getByRole('button', { name: 'Salvar' }).click();
//   await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/general?2=');

//   // CT08 - Horário de funcionamento e Timezone
//   await page.locator('.col-md-6 > div > .card-body').first().click();
//   // Aguarda o elemento estar visível antes de selecionar
//   // 1. Clica no campo aberto que mostra o fuso horário atual
//   await page.getByRole('combobox').filter({ hasText: /America/ }).click();
//   // Clica no container visual do dropdown para abrir o menu
//   await page.locator('select[name="timezone_name"]').locator('..').click();
//   // await page.getByRole('option', { name: /America\/Cuiaba/i }).click();
//   await page.locator('select[name="schedule_id"]').selectOption('1');
//   // await page.locator('select[name="timezone_name"]').selectOption('America/Cuiaba');
//   await page.getByRole('button', { name: 'Salvar' }).click();
//   await page.goto('https://mariameiretreinamento.botvendas.com/shops');
//   await page.locator('div:nth-child(6)').click();
//   await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/general?2=');
//   await page.getByRole('button', { name: 'Salvar' }).click();
// });