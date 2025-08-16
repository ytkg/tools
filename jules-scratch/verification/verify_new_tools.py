from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    page.goto("http://localhost:5173/")

    # Take a screenshot of the home page with the new tools
    page.screenshot(path="jules-scratch/verification/01_home_page.png")

    # Use a more specific selector to avoid ambiguity
    main_content = page.get_by_role("main")

    # Test Unit Converter
    main_content.get_by_role("link", name="Unit Converter").click()
    expect(page).to_have_url("http://localhost:5173/unit-converter")
    page.screenshot(path="jules-scratch/verification/02_unit_converter.png")

    # Test UUID Generator
    page.goto("http://localhost:5173/")
    page.get_by_role("main").get_by_role("link", name="UUID/GUID Generator").click()
    expect(page).to_have_url("http://localhost:5173/uuid-generator")
    page.screenshot(path="jules-scratch/verification/03_uuid_generator.png")

    # Test Password Generator
    page.goto("http://localhost:5173/")
    page.get_by_role("main").get_by_role("link", name="Password Generator").click()
    expect(page).to_have_url("http://localhost:5173/password-generator")
    page.screenshot(path="jules-scratch/verification/04_password_generator.png")

    # Test Image to Base64
    page.goto("http://localhost:5173/")
    page.get_by_role("main").get_by_role("link", name="Image to Base64").click()
    expect(page).to_have_url("http://localhost:5173/image-to-base64")
    page.screenshot(path="jules-scratch/verification/05_image_to_base64.png")

    context.close()
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
