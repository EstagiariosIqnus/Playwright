import { test, expect } from '@playwright/test';
// CT17 - Campos regulatórios obrigatórios/opcionais: Preencher Farmacêutico responsável, CRF, Registro Sanitário e AFE; testar persistência dos dados.
test('test', async ({ page }) => {
  await page.goto('about:blank');
  await page.goto('https://mariameiretreinamento.botvendas.com/login');
  await page.getByRole('textbox', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Login' }).fill('admin@iqnus.com.br');
  await page.getByRole('textbox', { name: 'Senha' }).click();
  await page.getByRole('textbox', { name: 'Senha' }).fill('Bot@iq587!');
  await page.getByRole('textbox', { name: 'Senha' }).press('Enter');
  await page.getByRole('link', { name: ' Lojas ' }).click();
  await page.getByRole('link', { name: ' Configurações' }).click(); 
  await page.getByText('Loja 01Desconfig.(85) 3034-').click();
  await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/general?2=');
  // await page.getByRole('textbox', { name: ' Farmacêutico responsável:' }).click();
  await page.getByRole('textbox', { name: ' Farmacêutico responsável:' }).fill('');
  await page.getByRole('textbox', { name: ' Farmacêutico responsável:' }).click();
  await page.getByRole('textbox', { name: ' Farmacêutico responsável:' }).fill('Maria Oliveira Santos');
  await page.getByRole('textbox', { name: ' CRF do farmacêutico respons' }).click();
  await page.getByRole('textbox', { name: ' CRF do farmacêutico respons' }).fill('987654');
  await page.getByRole('textbox', { name: ' Registro Sanitário:' }).click();
  await page.getByRole('textbox', { name: ' Registro Sanitário:' }).fill('54321');
  await page.getByRole('textbox', { name: ' Autorização de' }).click();
  await page.getByRole('textbox', { name: ' Autorização de' }).fill('8002');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.reload();
  // await page.locator('div:nth-child(6)').click();
  await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/general?2=');
  await expect(page.getByRole('textbox', { name: ' Farmacêutico responsável:' })).toHaveValue('Maria Oliveira Santos');
  await expect(page.getByRole('textbox', { name: ' CRF do farmacêutico respons' })).toHaveValue('987654');
  await expect(page.getByRole('textbox', { name: ' Registro Sanitário:' })).toHaveValue('54321');
  await expect(page.getByRole('textbox', { name: ' Autorização de' })).toHaveValue('8002');

  await page.getByRole('textbox', { name: ' Farmacêutico responsável:' }).fill('José Silva Lima');
  await page.getByRole('textbox', { name: ' CRF do farmacêutico respons' }).fill('129800');
  await page.getByRole('textbox', { name: ' Registro Sanitário:' }).fill('122300');
  await page.getByRole('textbox', { name: ' Autorização de' }).fill('6001');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/general?2=');

// CT18 - Link externo "Consultar registro na Anvisa": Clicar no botão e verificar se abre a página oficial de consulta em nova aba com URL válida 
  // CT18 - Link externo "Consultar registro na Anvisa"
  await expect(page.getByRole('link', { name: /Consultar registro na Anvisa/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /Consultar registro na Anvisa/i })).toHaveAttribute('href', /anvisa/i);
  await expect(page.getByRole('link', { name: /Consultar registro na Anvisa/i })).toHaveAttribute('target', '_blank');
  await page.getByRole('link', { name: /Consultar registro na Anvisa/i }).click();

});