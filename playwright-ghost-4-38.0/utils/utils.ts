export async function screenshotPagePath(page, file, path_name_test, paso) {
    const name_file = `paso${paso}`;
    await page.screenshot({ path: `screenshots/${file}/${path_name_test}/${name_file}.png`, fullPage: true });
  }