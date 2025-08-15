import asyncio
from playwright.async_api import async_playwright, expect

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        try:
            print("Navigating to page...")
            await page.goto("http://localhost:5173", timeout=15000)

            print("Waiting for page to load...")
            await asyncio.sleep(10) # Generous wait for compilation

            # Desktop verification
            print("Verifying desktop view...")
            await page.set_viewport_size({"width": 1280, "height": 720})
            await asyncio.sleep(3)

            drawer_desktop = page.locator('nav[aria-label="mailbox folders"] .MuiDrawer-permanent')
            await expect(drawer_desktop).to_be_visible(timeout=10000)
            print("Desktop drawer found.")
            await page.screenshot(path="jules-scratch/verification/desktop_view.png")
            print("Desktop screenshot taken.")

            # Mobile verification
            print("Verifying mobile view...")
            await page.set_viewport_size({"width": 375, "height": 667})
            await asyncio.sleep(3)

            menu_button = page.get_by_label("open drawer")
            await expect(menu_button).to_be_visible()
            print("Mobile menu button found.")
            await menu_button.click()

            drawer_mobile = page.locator('.MuiDrawer-temporary .MuiPaper-root')
            await expect(drawer_mobile).to_be_visible()
            print("Mobile drawer found after click.")
            await page.screenshot(path="jules-scratch/verification/mobile_view_drawer_open.png")
            print("Mobile screenshot taken.")

            print("Verification successful!")

        except Exception as e:
            print(f"An error occurred during verification: {e}")
            await page.screenshot(path="jules-scratch/verification/final_fail.png")

        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
