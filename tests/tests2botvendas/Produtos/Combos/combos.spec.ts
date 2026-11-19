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

test('CT01 - CT02', async ({ page }) => {
    await page.getByRole('link', { name: ' Produtos ' }).click();

    await page.getByRole('link', { name: 'C Combos' }).click();
    await page.getByRole('link', { name: 'C Combos' }).click();
    await page.getByRole('link', { name: 'Configurações', exact: true }).click();
    await page.getByRole('link', { name: 'Lista de combos' }).click();
});

test('CT03 - CT04', async ({ page }) => {
    await page.getByRole('link', { name: ' Produtos ' }).click();

    await page.getByRole('link', { name: 'C Combos' }).click();
    await page.getByRole('link', { name: 'C Combos' }).click();
    await page.getByRole('link', { name: 'Configurações', exact: true }).click();

    await page.getByText('Adicionar combo').click();
    await page.locator('.fa-stack').first().click();
});

test('CT05 - CT08', async ({ page }) => {
    await page.getByRole('link', { name: ' Produtos ' }).click();

    await page.getByRole('link', { name: 'C Combos' }).click();
    await page.getByRole('link', { name: 'C Combos' }).click();
    await page.getByRole('link', { name: 'Configurações', exact: true }).click();

    await page.getByRole('radio').nth(1).check();
    await page.getByRole('radio').nth(2).check();
    await page.getByRole('radio').first().check();

    await page.getByText('Personalizar').first().click();
});

test('CT09', async ({ page }) => {
    await page.getByRole('link', { name: ' Produtos ' }).click();

    await page.getByRole('link', { name: 'C Combos' }).click();
    await page.getByRole('link', { name: 'C Combos' }).click();
    await page.getByRole('link', { name: 'Configurações', exact: true }).click();

    await page.getByText('Adicionar combo').click();
    // await page.getByRole('checkbox', { name: '✔ Adicionar combo' }).uncheck();
    await page.locator('.fa-stack').first().click();
    // await page.getByRole('checkbox', { name: '× Adicionar combo' }).check();
    await page.getByRole('radio').nth(2).check();
    await page.getByRole('button', { name: 'Salvar' }).click();
});

test('CT10', async ({ page }) => {
      await page.getByRole('link', { name: ' Produtos ' }).click();

    await page.getByRole('link', { name: 'C Combos' }).click();
    await page.getByRole('link', { name: 'C Combos' }).click();
    await page.getByRole('link', { name: 'Configurações', exact: true }).click();

    await page.getByText('Adicionar combo').click();
    await page.locator('.fa-stack').first().click();
    await page.getByRole('radio').nth(2).check();

    await page.getByRole('link', { name: 'Cancelar' }).click();
});

test('CT11 - CT12 - CT18', async ({ page }) => {
      await page.getByRole('link', { name: ' Produtos ' }).click();

    await page.getByRole('link', { name: 'C Combos' }).click();
    await page.getByRole('link', { name: 'C Combos' }).click();
    await page.getByRole('link', { name: 'Configurações', exact: true }).click();

    const imagePath = path.join(__dirname, 'Monster Watermelon.png');

    const fileChooserPromise = page.waitForEvent('filechooser');
  await page.waitForTimeout(1000);

  await page.getByText('Personalizar').first().click();

  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(imagePath);

  await page.locator('#image-layout-cropper-modal').getByRole('button', { name: 'Salvar' }).click();

  await page.getByRole('button', { name: 'Salvar' }).click();
});

test('CT13 - CT17', async ({ page }) => {
    const imagePath = path.join(__dirname, 'Monster Watermelon.png');

    await page.getByRole('link', { name: ' Produtos ' }).click();

    await page.getByRole('link', { name: 'C Combos' }).click();
    await page.getByRole('link', { name: 'C Combos' }).click();
    await page.getByRole('link', { name: 'Configurações', exact: true }).click();


    await page.getByText('Editar').first().click();
  await page.waitForTimeout(2000);
  await page.getByText('Limitar Borda de corte').click();

  await page.locator('#image-layout-cropper-modal').click();
  await page.getByRole('button', { name: 'Ajuste Automático' }).click();

    const fileChooserPromise = page.waitForEvent('filechooser');
  await page.waitForTimeout(1000);


  await page.getByRole('button', { name: 'Trocar imagem' }).click();

  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(imagePath);

  await page.getByRole('button', { name: 'Remover' }).click();
});

test('CT19', async ({ page }) => {
      await page.getByRole('link', { name: ' Produtos ' }).click();

    await page.getByRole('link', { name: 'C Combos' }).click();
    await page.getByRole('link', { name: 'C Combos' }).click();
    await page.getByRole('link', { name: 'Configurações', exact: true }).click();

    const imagePath = path.join(__dirname, 'Monster Watermelon.png');

    const fileChooserPromise = page.waitForEvent('filechooser');
  await page.waitForTimeout(1000);

  await page.getByText('Personalizar').first().click();

  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(imagePath);

  await page.getByRole('button', { name: 'close' }).click();
});

test('CT20 - CT23', async ({ page }) => {
        await page.getByRole('link', { name: ' Produtos ' }).click();

    await page.getByRole('link', { name: 'C Combos' }).click();
    await page.getByRole('link', { name: 'C Combos' }).click();
    await page.getByRole('link', { name: 'Configurações', exact: true }).click();

  await page.getByText('Editar').first().click();
});