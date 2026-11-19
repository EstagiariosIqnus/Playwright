import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  test.setTimeout(60000);

  // Login e acesso às configurações gerais da Loja 01
  await page.goto('https://mariameiretreinamento.botvendas.com/login');
  await page.getByRole('textbox', { name: 'Login' }).fill('admin@iqnus.com.br');
  await page.getByRole('textbox', { name: 'Senha' }).fill('Bot@iq587!');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await page.waitForLoadState('networkidle');

  await page.getByRole('link', { name: ' Lojas ' }).click();
  await page.getByRole('link', { name: ' Configurações' }).click();
  await page.getByText('Loja 01Desconfig.(85) 3034-').click();
  await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/general?2=');

  // =========================================================================
  // CT23 - Inserção de variáveis dinâmicas no template
  await page.getByText('Mensagem automática de mudanç').first().click();
  await page.locator('#webapp_auto_message').fill('Olá , seu pedido foi atualizado.');
  await page.locator('#webapp_auto_message').evaluate((el: HTMLTextAreaElement) => {
    el.focus();
    el.setSelectionRange(4, 4);
  });
  await page.getByText('Nome do cliente', { exact: true }).click();
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.waitForLoadState('networkidle');

  // Recarrega e valida se a variável foi salva
  await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/general?2=');
  await expect(page.getByRole('checkbox', { name: 'Mensagem automática de mudanç' })).toBeChecked();
  await expect(page.locator('#webapp_auto_message')).toHaveValue('Olá  {client_name}, seu pedido foi atualizado.');

  // Restaura o campo e desliga o switch
  await page.locator('#webapp_auto_message').fill('');
  await page.getByText('Mensagem automática de mudanç').first().click();
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.waitForLoadState('networkidle');
  await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/general?2=');

  // =========================================================================
  // CT24 - Checkboxes de regras de abandono
  // =========================================================================
  await page.getByText('Mensagem automática de mudanç').first().click();

  await page.getByRole('checkbox', { name: 'Enviar mensagem de abandono mesmo que o carrinho esteja zerado (R$)' }).check({ force: true });
  await page.getByRole('checkbox', { name: 'Enviar resumo do pedido junto' }).check({ force: true });
  await page.getByRole('checkbox', { name: /Enviar mensagem de abandono apenas uma vez/i }).check({ force: true });

  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.waitForLoadState('networkidle');

  // Recarrega e valida que salvaram marcados
  await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/general?2=');
  await expect(page.getByRole('checkbox', { name: 'Enviar mensagem de abandono mesmo que o carrinho esteja zerado (R$)' })).toBeChecked();
  await expect(page.getByRole('checkbox', { name: 'Enviar resumo do pedido junto' })).toBeChecked();
  await expect(page.getByRole('checkbox', { name: 'Enviar mensagem de abandono apenas uma vez' })).toBeChecked();

  // Destrava, desmarca os checkboxes, desliga o switch e salva
  await page.getByText('Mensagem automática de mudanç').first().click();
  await page.getByRole('checkbox', { name: 'Enviar mensagem de abandono mesmo que o carrinho esteja zerado (R$)' }).uncheck({ force: true });
  await page.getByRole('checkbox', { name: 'Enviar resumo do pedido junto' }).uncheck({ force: true });
  await page.getByRole('checkbox', { name: /Enviar mensagem de abandono apenas uma vez/i }).uncheck({ force: true });

  await page.getByText('Mensagem automática de mudanç').first().click();
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.waitForLoadState('networkidle');
  await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/general?2=');

  // =========================================================================
  // CT25 - Mapeamento de Setores por Status
  await page.getByLabel('Setor padrão para pedidos no status de separação:').selectOption('1');
  await page.getByLabel('Setor padrão para pedidos no status de separado:').selectOption('1');
  await page.getByLabel('Setor padrão para pedidos no status de delivery:').selectOption('1');
  await expect(page.getByLabel('Setor padrão para pedidos no status de separação:')).toHaveValue('1');
  await expect(page.getByLabel('Setor padrão para pedidos no status de separado:')).toHaveValue('1');
  await expect(page.getByLabel('Setor padrão para pedidos no status de delivery:')).toHaveValue('1');

  // Altera para os novos setores e salva
  await page.getByLabel('Setor padrão para pedidos no status de separação:').selectOption('2');
  await page.getByLabel('Setor padrão para pedidos no status de separado:').selectOption('10');
  await page.getByLabel('Setor padrão para pedidos no status de delivery:').selectOption('11');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.waitForLoadState('networkidle');

  // Recarrega e valida se persistiu
  await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/general?2=');
  await expect(page.getByLabel('Setor padrão para pedidos no status de separação:')).toHaveValue('2');
  await expect(page.getByLabel('Setor padrão para pedidos no status de separado:')).toHaveValue('10');
  await expect(page.getByLabel('Setor padrão para pedidos no status de delivery:')).toHaveValue('11');

  // Restaura para '1', salva e sai
  await page.getByLabel('Setor padrão para pedidos no status de separação:').selectOption('1');
  await page.getByLabel('Setor padrão para pedidos no status de separado:').selectOption('1');
  await page.getByLabel('Setor padrão para pedidos no status de delivery:').selectOption('1');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.reload();
  // await page.waitForLoadState('networkidle');
  await page.goto('https://mariameiretreinamento.botvendas.com/shops');
});