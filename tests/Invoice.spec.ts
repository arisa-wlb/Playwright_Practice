import { test, expect } from "@playwright/test";

test('Tax Invoice with one item - edit price and qty then submit successfully', async ({page}) => {
    //Go-to- Invoice-Pacel
    await page.goto('https://ui-sandbox-omega.vercel.app/invoice')
    // Select Document type
    const documentTypeDropfown = page.getByTestId('invoice-type-select')
    await documentTypeDropfown.selectOption({label: 'Tax Invoice'})
    // Fill First•Item-Name
    await page.getByTestId('row-1-name').fill('C-Level Consulting')
    // Search-for-Consulting in category
    // Select-Consulting-in category field
    await page.getByTestId('row-1-category').fill('Co')
    await page.getByRole('option', { name: 'Consulting' }).click()
    // Fill First Item Unit-Price
    await page.getByTestId('row-1-unit-price').fill('2000')
    // clear Fill // First Item-Qty 
    await page.getByTestId('row-1-qty').clear()
    await page.getByTestId('row-1-qty').fill('4')
    await page.locator('body').click()
    // Verify First Item Total Price to be 8,000.00
    await expect(page.getByTestId('row-1-total')).toHaveValue('8,000.00')
    // Change First Item-Total Price to be 6,500.00
    await page.getByTestId('row-1-unit-price').clear()
    await page.getByTestId('row-1-unit-price').fill('6,500')
    // clear Fill // Change First Item-Qty 
    await page.getByTestId('row-1-qty').clear()
    await page.getByTestId('row-1-qty').fill('1')
    await page.locator('body').click()
    // Verify First-Item-Total Price to be 6,500.00
    await expect(page.getByTestId('row-1-total')).toHaveValue('6,500.00')
    // Verify-Subtotal to be 6,500.00
    await expect(page.getByTestId('summary-subtotal')).toHaveText('6,500.00')
    // Verify-Vat-to-be 455.00
    await expect(page.getByTestId('summary-vat')).toHaveText('455.00')
    // Verify Grand-Total to be 6,955.00
    await expect(page.getByTestId('summary-grand-total')).toHaveText('6,955.00')
    // Click Submit Document Button
    await page.getByTestId('submit-button').click()
    // ตรวจสอบ url Invoice Succsee
  await expect(page).toHaveURL('https://ui-sandbox-omega.vercel.app/invoice/success');

    // 7. ตรวจสอบข้อความบนหน้าเว็บ 
  await expect(page.getByTestId('success-heading')).toHaveText('Submit Invoice Successful')
   })
   


