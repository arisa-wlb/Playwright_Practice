import { test, expect } from '@playwright/test';
import path from 'path';

test('กรอกข้อมูลหน้า Payment และ Confirm Payment สำเร็จ', async ({ page }) => {
  // 1. เปิด browser
  // 2. ไปหน้า Payment
  await page.goto('https://ui-sandbox-omega.vercel.app');
  await page.getByRole('link', { name: 'Confirm Payment' }).click();

  // 3. อัพโหลดรูปภาพผ่าน input file
  const imagePath = path.join(__dirname, '..', 'test-assets', 'sample-slip.jpg');
  await page.getByTestId('slip-file-input').setInputFiles(imagePath);

  // 4. ตรวจปุ่ม Remove — แสดงว่าอัพโหลดสำเร็จ
  await expect(page.getByTestId('slip-remove')).toBeVisible();

  // 5. กรอกเลข Order ID
  await page.getByTestId('order-id').fill('6117011612040')

  // 6. กรอก Amount 10000
  await page.getByTestId('payment-amount').fill('10,000')

  // 7. กรอก Transaction date
  await page.getByTestId('transaction-date').fill('2026-04-24');

  // 8. กรอก Transaction time
  await page.getByTestId('transaction-time').fill('1510');

  // 9. กด ปุ่ม Confirm Payment
  await page.getByTestId('payment-submit').click()

  // 10. ตรวจสอบว่าไปยังหน้า Payment received
  await expect(page).toHaveURL('https://ui-sandbox-omega.vercel.app/payment/success');

  // 11. ตรวจสอบรูปภาพ slip preview
  await expect(page.getByTestId('success-slip-preview')).toBeVisible()

  // 12. ตรวจสอบข้อมูลที่หน้า Payment received
  await expect(page.getByTestId('success-order-id')).toHaveText('6117011612040')
  await expect(page.getByTestId('success-amount')).toHaveText('฿ 10,000.00')
  await expect(page.getByTestId('success-date')).toHaveText('24/04/2026')
  await expect(page.getByTestId('success-time')).toHaveText('15:10')
  await expect(page.getByTestId('success-filename')).toHaveText('sample-slip.jpg')

});