import { test, expect } from '@playwright/test';



test('Error Shiping From แสดงถูกต้อง', async ({ page }) => {
  await page.goto('https://ui-sandbox-omega.vercel.app');
  await page.getByRole('link', { name: 'Shipping Form' }).click()
  await page.getByTestId('shipping-submit').click()
  await expect(page.getByTestId('shipping-form-first-name-error')).toHaveText('First name is required.')
  await expect(page.getByTestId('shipping-form-last-name-error')).toHaveText('Last name is required.')
  await expect(page.getByTestId('shipping-form-phone-error')).toHaveText('Phone number is required.')
  await expect(page.getByTestId('shipping-form-address-error')).toHaveText('Address is required.')
  await expect(page.getByTestId('shipping-form-province-error')).toHaveText('Please select a province.')
  await expect(page.getByTestId('shipping-form-district-error')).toHaveText('Please select a district.')
  await expect(page.getByTestId('shipping-form-subdistrict-error')).toHaveText('Please select a subdistrict.')
})
