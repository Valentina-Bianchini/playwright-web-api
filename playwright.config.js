// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Configuración unificada de Playwright para tests de Frontend (E2E) y API
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Timeout for each test */
  timeout: 30000,

  /* Configure projects for major browsers (Frontend E2E) and API tests */
  projects: [
    // ============================================
    // FRONTEND E2E TESTS - Navegadores
    // ============================================
    {
      name: 'frontend-chromium',
      testDir: './frontend/tests',
      use: { 
        ...devices['Desktop Chrome'],
        trace: 'on',
      },
      fullyParallel: false,
      workers: 1,
    },

    {
      name: 'frontend-firefox',
      testDir: './frontend/tests',
      use: { 
        ...devices['Desktop Firefox'],
        trace: 'on',
      },
      fullyParallel: false,
      workers: 1,
    },

    {
      name: 'frontend-webkit',
      testDir: './frontend/tests',
      use: { 
        ...devices['Desktop Safari'],
        trace: 'on',
      },
      fullyParallel: false,
      workers: 1,
    },

    // ============================================
    // API TESTS - Pruebas de endpoints REST
    // ============================================
    {
      name: 'api',
      testDir: './api/tests',
      use: {
        baseURL: 'https://api.restful-api.dev',
        extraHTTPHeaders: {
          'Accept': 'application/json',
        },
      },
      fullyParallel: true,
    },
  ],
});

