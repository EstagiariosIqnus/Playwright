
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

  //CT09 - Dropdown Preço atacado no carrinho:
  const campoPriceAt = page.getByRole('combobox', {
  name: 'Preço atacado no carrinho'
  });
  //Opção ON
  await campoPriceAt.selectOption({ label: 'Ativo'});

  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText(/sucesso|atualizado/i).first());
  await page.reload();
  await page.goto('https://roselanematostreinamento.botvendas.com/clients/3/edit?tab=client');
  await expect(campoPriceAt.locator('option:checked')).toHaveText('Ativo');
  await campoPriceAt.selectOption({ label: 'Desativado'});
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText('sucesso|atualizado').first());
  await page.goto('https://roselanematostreinamento.botvendas.com/clients/3/edit?tab=client');
  await expect(campoPriceAt.locator('option:checked')).toHaveText('Desativado'); //verifica se esta desativado
});