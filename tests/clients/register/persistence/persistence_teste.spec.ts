import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://roselanematostreinamento.botvendas.com/login');
  await page.getByRole('textbox', { name: 'Login' }).fill('admin@iqnus.com.br');
  await page.getByRole('textbox', { name: 'Senha' }).click();
  await page.getByRole('textbox', { name: 'Senha' }).fill('Bot@iq587!');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await page.getByText('Loja 1Desconfig.(85) 3034-').click();
  await page.goto('https://roselanematostreinamento.botvendas.com/dashboard');
  await page.getByRole('link', { name: ' Clientes ' }).click();
  await page.getByRole('link', { name: ' Cadastros' }).click();
  await page.goto('https://roselanematostreinamento.botvendas.com/clients/3/edit?tab=client');
  const campoNome = page.getByRole('textbox', {
    name: 'Nome/Razão Social:'
  });
  const nomeOriginal = await campoNome.inputValue();
  const nomeNovo = `Cliente-teste-${Date.now()}`;
  console.log('Nome original: ', nomeOriginal);
  console.log('Nome novo:', nomeNovo);
  await campoNome.fill(nomeNovo);
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText(nomeNovo, { exact:true })).toBeVisible();
  await page.reload();
  await expect(page.getByText(nomeNovo, { exact:true })).toBeVisible();
  await page.goto('https://roselanematostreinamento.botvendas.com/clients/3/edit?tab=client');
  await page.getByRole('textbox', { name: 'Nome/Razão social:' }).click();
  await page.getByRole('textbox', { name: 'Nome/Razão social:' }).fill('');
  await page.getByRole('textbox', { name: 'Nome/Razão social:' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Nome/Razão social:' }).fill('C');
  await page.getByRole('textbox', { name: 'Nome/Razão social:' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Nome/Razão social:' }).fill('Cliente14');
  await page.getByRole('button', { name: 'Salvar' }).click();

});