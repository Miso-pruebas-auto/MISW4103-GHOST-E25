FROM node:latest

# Add playwright test source
COPY . .

# Run tests
ENTRYPOINT ["/bin/sh"]
CMD ["/playwright/entrypoint.sh"]