FROM mcr.microsoft.com/playwright:v1.39.0-jammy

# Add playwright test source
COPY ./playwright-ghost-4-48.9/ .

# Run tests
ENTRYPOINT ["/bin/sh"]
CMD ["entrypoint.sh"]