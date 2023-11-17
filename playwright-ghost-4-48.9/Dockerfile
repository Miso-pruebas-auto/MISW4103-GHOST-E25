FROM mcr.microsoft.com/playwright:v1.39.0-jammy

# Add playwright test source
COPY ./playwright/ .

# Run tests
ENTRYPOINT ["/bin/sh"]
CMD ["entrypoint.sh"]