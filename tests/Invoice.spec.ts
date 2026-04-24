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

   test('Tax Invoice with two item - add tree item but delete one item then submit successfully', async ({page}) => {
    // 1. Go-to- Invoice-Pacel
    await page.goto('https://ui-sandbox-omega.vercel.app/invoice')
    // 2. Select Document type
    const documentTypeDropfown = page.getByTestId('invoice-type-select')
    await documentTypeDropfown.selectOption({label: 'Tax Invoice'})
    // 3. Fill First•Item-Name
    await page.getByTestId('row-1-name').fill('C-Level Consulting')
    // 4. Search-for-Consulting in category
    // Select-Consulting-in category field
    await page.getByTestId('row-1-category').fill('Co')
    await page.getByRole('option', { name: 'Consulting' }).click()
    // 5. Fill First Item Unit-Price
    await page.getByTestId('row-1-unit-price').fill('2000')
    // 6. clear Fill and fill First Item-Qty 
    await page.getByTestId('row-1-qty').clear()
    await page.getByTestId('row-1-qty').fill('4')
    await page.locator('body').click()
    // 7. Verify First Item Total Price to be 8,000.00
    await expect(page.getByTestId('row-1-total')).toHaveValue('8,000.00')
    // 8. Add Secound Item 
    await page.getByTestId('add-row-button').click()
    // 9. Fill Secound Item-Name
    await page.getByTestId('row-2-name').fill('E2E Automation Test via APIs')
    // 10. Search-for-Maintenance in category
    // 11. Select-Maintenance in category field
    await page.getByTestId('row-2-category').fill('Mai')
    await page.getByRole('option', { name: 'Maintenance' }).click()
    // 12. Fill Secound Item Unit-Price
    await page.getByTestId('row-2-unit-price').fill('10,000.00')
    // 13. clear Fill and fill secound Item-Qty 
    await page.getByTestId('row-2-qty').clear()
    await page.getByTestId('row-2-qty').fill('1')
    await page.locator('body').click()
    // 14. Verify Secound Item Total Price to be 10,000.00
    await expect(page.getByTestId('row-2-total')).toHaveValue('10,000.00')
    // 15. Add Thrid Item 
    await page.getByTestId('add-row-button').click()
    // 16. Fill Third Item-Name
    await page.getByTestId('row-3-name').fill('E2E Automation Test via APIs')
    // 17. Search-for-Design in category
    // Select-Design in category field
    await page.getByTestId('row-3-category').fill('Des')
    await page.getByRole('option', { name: 'Design' }).click()
    // 18. Fill Third Item Unit-Price
    await page.getByTestId('row-3-unit-price').fill('1,000.00')
    // 19. clear Fill and fill third Item-Qty 
    await page.getByTestId('row-3-qty').clear()
    await page.getByTestId('row-3-qty').fill('2')
    await page.locator('body').click()
    // 20. Verify third Item Total Price to be 2,000.00
    await expect(page.getByTestId('row-3-total')).toHaveValue('2,000.00')
    // 21  Verify Subtotal to be 20,000.00
    await expect(page.getByTestId('summary-subtotal')).toHaveText('20,000.00')
    // 22. Verify VAT (7%)  to be 1,400.00
    await expect(page.getByTestId('summary-vat')).toHaveText('1,400.00')
    // 23. Verify Grand total Price to be 21,400.00
    await expect(page.getByTestId('summary-grand-total')).toHaveText('21,400.00')
    // 24. Delete third Item 
    await page.getByTestId('row-3-delete-checkbox').click()
    await page.getByTestId('delete-selected-button').click()
    // 25  Verify Subtotal to be 18,000.00
    await expect(page.getByTestId('summary-subtotal')).toHaveText('18,000.00')
    // 26. Verify VAT (7%)  to be 1,260.00
    await expect(page.getByTestId('summary-vat')).toHaveText('1,260.00')
    // 27. Verify Grand total Price to be 19,260.00
    await expect(page.getByTestId('summary-grand-total')).toHaveText('19,260.00')
       // Click Submit Document Button
       await page.getByTestId('submit-button').click()
       // ตรวจสอบ url Invoice Succsee
     await expect(page).toHaveURL('https://ui-sandbox-omega.vercel.app/invoice/success');
       // 7. ตรวจสอบข้อความบนหน้าเว็บ 
     await expect(page.getByTestId('success-heading')).toHaveText('Submit Invoice Successful')

    
   })
   


