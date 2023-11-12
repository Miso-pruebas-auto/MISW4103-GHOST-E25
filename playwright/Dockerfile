FROM node:latest

# Add playwright test source
COPY . .

CMD ["ls"]

# Run tests
ENTRYPOINT ["/bin/sh"]
CMD ["/playwright/entrypoint.sh"]