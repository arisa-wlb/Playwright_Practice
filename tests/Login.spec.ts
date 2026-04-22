import { test, expect } from '@playwright/test';

test('Login Success', async ({ page }) => {
  // 1. เปิด browser
  // 2. navigate ไปหน้า login
  await page.goto('https://ui-sandbox-omega.vercel.app');
  await page.getByRole('link', { name: 'Login Form Practice login' }).click()

  // 3. กรอก email
  const emailInput = page.getByTestId('email-input')
  await expect(emailInput).toBeVisible()
  await emailInput.fill('user@company.com')

  // 4. กรอก password
  await page.getByTestId('password-input').fill('Test1234!')

  // 5. กดปุ่ม login
  await page.getByTestId('login-btn').click()

  // 6. ตรวจสอบ url /login/sucess
  await expect(page).toHaveURL('https://ui-sandbox-omega.vercel.app/login/success');

  // 7. ตรวจสอบข้อความบนหน้าเว็บ
  await expect(page.getByTestId('success-heading')).toHaveText('Login successful')
  await expect(page.getByTestId('signin-user-message')).toHaveText('You have signed in as user@company.com')

})

test('Login Fail', async ({ page }) => {
  // 1. เปิด browser
  // 2. navigate ไปหน้า login
  await page.goto('https://ui-sandbox-omega.vercel.app');
  await page.getByRole('link', { name: 'Login Form Practice login' }).click()

  // 3. กรอก email
  const emailInput = page.getByTestId('email-input')
  await expect(emailInput).toBeVisible()
  await emailInput.fill('user@company.com')

  // 4. กรอก password
  await page.getByTestId('password-input').fill('Invalid1234!')

  // 5. กดปุ่ม login
  await page.getByTestId('login-btn').click()

  // 6. ตรวจสอบ url /login
  await expect(page).toHaveURL('https://ui-sandbox-omega.vercel.app/login');

  // 7. ตรวจสอบว่ามี popup
  const toast = page.getByTestId('toast-msg')
  await expect(toast).toBeVisible()
  //8.  ตรวจสอบข้อความใน popup
  await expect(toast).toHaveText('Invalid email or password. Please try again.')
})

