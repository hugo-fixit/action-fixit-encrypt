# action-fixit-encrypt

GitHub Action for [fixit-encrypt](https://github.com/hugo-fixit/fixit-encrypt) — Setup fixit-encrypt to encrypt your [FixIt](https://github.com/hugo-fixit/FixIt) Hugo site content.

## Usage

### Basic

```yaml
- name: Setup fixit-encrypt
  uses: hugo-fixit/action-fixit-encrypt@v1

- name: Build Hugo site
  run: hugo --gc --minify

- name: Encrypt content
  run: fixit-encrypt --input public
```

### Specify Version

```yaml
- name: Setup fixit-encrypt
  uses: hugo-fixit/action-fixit-encrypt@v1
  with:
    version: '0.2.0'
```

### Complete Workflow Example

```yaml
name: Build and Deploy

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v7

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v3
        with:
          hugo-version: 'latest'
          extended: true

      - name: Setup fixit-encrypt
        uses: hugo-fixit/action-fixit-encrypt@v1

      - name: Build
        run: hugo --gc --minify

      - name: Encrypt content
        run: fixit-encrypt --input public

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```

## Inputs

| Input     | Description                                       | Required | Default  |
| --------- | ------------------------------------------------- | -------- | -------- |
| `version` | fixit-encrypt version (e.g., `0.2.0`) or `latest` | No       | `latest` |

## Supported Platforms

| OS      | Architecture | Status |
| ------- | ------------ | ------ |
| Linux   | amd64        | ✅     |
| Linux   | arm64        | ✅     |
| macOS   | amd64        | ✅     |
| macOS   | arm64        | ✅     |
| Windows | amd64        | ✅     |
| Windows | arm64        | ✅     |

## License

MIT
