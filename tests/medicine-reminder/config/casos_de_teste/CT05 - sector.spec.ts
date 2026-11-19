// CT05 – Atualização do setor na pré-visualização

//deu certo, mas ele da o id e não o nome do atendente selecionado

import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://roselanematostreinamento.botvendas.com/login');
  await page.getByRole('textbox', { name: 'Login' }).fill('admin@iqnus.com.br');
  await page.getByRole('textbox', { name: 'Senha' }).click();
  await page.getByRole('textbox', { name: 'Senha' }).fill('Bot@iq587!');
  await page.getByRole('button', { name: 'Entrar' }).click();

  await page.getByText('Loja 1Desconfig.(85) 3034-').click();
  await page.goto('https://roselanematostreinamento.botvendas.com/dashboard');
  await page.getByRole('link', { name: ' Lembrete de medicamentos ' }).click();
  await page.getByRole('link', { name: ' Configurações' }).click();

  //selecionando um outro setor/atendente

  const campoSetor = page.locator('#sector_id');
  const setorOriginal = await campoSetor.inputValue();
  console.log('O setor original: ', setorOriginal);
  await page.getByText('Setor: Atendente Iqnus').click();
  await page.locator('#sector_id').selectOption('8');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText('Sucesso! Configurações do').first());
  await page.getByText('Setor: Lidia Gomes').click();
  const novoSetor = await campoSetor.inputValue();
  console.log('O Novo setor selecionado foi: ', novoSetor);


  //voltando pra opção original
  await page.locator('#sector_id').selectOption('2');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.getByText('Sucesso! Configurações do').click();
});