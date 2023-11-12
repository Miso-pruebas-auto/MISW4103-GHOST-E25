import { Page } from 'playwright';

export async function loginSesionAdmin(page: Page): Promise<void> {
  await page.goto('http://localhost:3001/ghost/#/dashboard');
  await page.goto('http://localhost:3001/ghost/#/signin');
  await page.getByPlaceholder('jamie@example.com').click();
  await page.getByPlaceholder('jamie@example.com').click();
  await page.getByPlaceholder('jamie@example.com').fill('admin@admin.com');
  await page.getByPlaceholder('jamie@example.com').press('Tab');
  await page.getByPlaceholder('•••••••••••••••').fill('AdminAndes1**');
  await page.getByRole('button', { name: 'Sign in →' }).click();
};
