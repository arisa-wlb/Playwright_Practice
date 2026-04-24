import { test, expect } from '@playwright/test';


test('กรอก Shipping details ', async ({ page }) => {
  await page.goto('https://ui-sandbox-omega.vercel.app');
  await page.getByRole('link', { name: 'Shipping Form' }).click()
  await page.getByTestId('shipping-form-first-name').fill('Somchai')
  await page.getByTestId('shipping-form-last-name').fill('Jaidee')
  await page.getByTestId('shipping-form-phone').fill('089-654-2124')
  await page.getByTestId('shipping-form-address').fill('43/8 หมู่บ้านเปี่ยมสุข ถนนลาดพร้าว ซอย 63')
  await page.getByTestId('shipping-form-province-select').selectOption({label : 'กรุงเทพมหานคร (Bangkok)'})
  await page.getByTestId('shipping-form-district-select').selectOption({label : 'เขตวังทองหลาง (Khet Wang Thonglang)'})
  await page.getByTestId('shipping-form-subdistrict-select').selectOption({label : 'วังทองหลาง (Wang Thonglang)'})
  await expect(page.getByTestId('shipping-form-postal-code')).toHaveValue('10310')
  await page.getByTestId('shipping-submit').click()
  await expect(page).toHaveURL('https://ui-sandbox-omega.vercel.app/shipping/success');
  await expect(page.getByTestId('success-heading')).toHaveText('Shipping confirmed')
  await expect(page.getByTestId('success-recipient')).toHaveText('Somchai Jaidee')
  await expect(page.getByTestId('success-phone')).toHaveText('089-654-2124')
  await expect(page.getByTestId('success-address')).toHaveText('43/8 หมู่บ้านเปี่ยมสุข ถนนลาดพร้าว ซอย 63')
  await expect(page.getByTestId('success-subdistrict')).toHaveText('วังทองหลาง (Wang Thonglang)')
  await expect(page.getByTestId('success-district')).toHaveText('เขตวังทองหลาง (Khet Wang Thonglang)')
  await expect(page.getByTestId('success-province')).toHaveText('กรุงเทพมหานคร (Bangkok)')
  await expect(page.getByTestId('success-postal-code')).toHaveText('10310')

})

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
  await expect(page.getByTestId('shipping-form-subdistrict-select')).toHaveText('Please select a subdistrict.')
})
